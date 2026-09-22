use std::net::{IpAddr, Ipv4Addr, Ipv6Addr, SocketAddr};

use axum::http::HeaderMap;

pub fn client_ip(headers: &HeaderMap, peer: SocketAddr, trust_proxy: bool) -> IpAddr {
    if !trust_proxy || !is_trusted(peer.ip()) {
        return peer.ip();
    }
    forwarded_for(headers).unwrap_or_else(|| peer.ip())
}

fn forwarded_for(headers: &HeaderMap) -> Option<IpAddr> {
    headers
        .get("x-forwarded-for")?
        .to_str()
        .ok()?
        .rsplit(',')
        .next()?
        .trim()
        .parse()
        .ok()
}

fn is_trusted(ip: IpAddr) -> bool {
    match ip {
        IpAddr::V4(v4) => is_trusted_v4(v4),
        IpAddr::V6(v6) => is_trusted_v6(v6),
    }
}

fn is_trusted_v4(ip: Ipv4Addr) -> bool {
    ip.is_loopback() || ip.is_private() || ip.is_link_local()
}

fn is_trusted_v6(ip: Ipv6Addr) -> bool {
    if let Some(v4) = ip.to_ipv4_mapped() {
        return is_trusted_v4(v4);
    }
    let first = ip.segments()[0];
    ip.is_loopback() || first & 0xfe00 == 0xfc00 || first & 0xffc0 == 0xfe80
}

#[cfg(test)]
mod tests {
    use super::*;

    fn forwarded(value: &str) -> HeaderMap {
        let mut headers = HeaderMap::new();
        headers.insert("x-forwarded-for", value.parse().unwrap());
        headers
    }

    fn peer(ip: [u8; 4]) -> SocketAddr {
        SocketAddr::from((ip, 1))
    }

    #[test]
    fn a_proxy_on_the_private_network_is_believed() {
        let headers = forwarded("6.6.6.6, 203.0.113.7");
        assert_eq!(
            client_ip(&headers, peer([10, 0, 0, 2]), true),
            IpAddr::from([203, 0, 113, 7])
        );
    }

    #[test]
    fn a_client_talking_to_the_container_directly_cannot_forge_its_address() {
        let headers = forwarded("203.0.113.7");
        let direct = peer([198, 51, 100, 4]);
        assert_eq!(client_ip(&headers, direct, true), direct.ip());
    }

    #[test]
    fn the_header_is_ignored_when_no_proxy_is_configured() {
        let headers = forwarded("203.0.113.7");
        let behind = peer([10, 0, 0, 2]);
        assert_eq!(client_ip(&headers, behind, false), behind.ip());
    }

    #[test]
    fn a_header_that_does_not_parse_falls_back_to_the_peer() {
        let behind = peer([10, 0, 0, 2]);
        assert_eq!(client_ip(&forwarded("garbage"), behind, true), behind.ip());
        assert_eq!(client_ip(&HeaderMap::new(), behind, true), behind.ip());
    }

    #[test]
    fn loopback_counts_as_a_proxy_so_a_local_run_still_works() {
        let headers = forwarded("203.0.113.7");
        let local = SocketAddr::from(([127, 0, 0, 1], 1));
        assert_eq!(
            client_ip(&headers, local, true),
            IpAddr::from([203, 0, 113, 7])
        );
    }

    #[test]
    fn a_dual_stack_listener_sees_through_an_ipv4_mapped_peer() {
        let headers = forwarded("203.0.113.7");
        let mapped: IpAddr = "::ffff:10.0.0.2".parse().unwrap();
        let public: IpAddr = "::ffff:198.51.100.4".parse().unwrap();
        assert_eq!(
            client_ip(&headers, SocketAddr::new(mapped, 1), true),
            IpAddr::from([203, 0, 113, 7])
        );
        assert_eq!(
            client_ip(&headers, SocketAddr::new(public, 1), true),
            public
        );
    }

    #[test]
    fn an_ipv6_peer_is_trusted_only_inside_a_private_range() {
        let headers = forwarded("203.0.113.7");
        let expected = IpAddr::from([203, 0, 113, 7]);
        for trusted in ["::1", "fd00::1", "fe80::1"] {
            let address: IpAddr = trusted.parse().unwrap();
            assert_eq!(
                client_ip(&headers, SocketAddr::new(address, 1), true),
                expected,
                "{trusted} should be trusted"
            );
        }
        let public: IpAddr = "2001:db8::1".parse().unwrap();
        assert_eq!(
            client_ip(&headers, SocketAddr::new(public, 1), true),
            public
        );
    }
}
