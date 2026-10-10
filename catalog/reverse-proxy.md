# Web servers and reverse proxies

Serve sites, terminate TLS and route traffic to services.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [frp](https://github.com/fatedier/frp) | Go | Apache-2.0 | [v0.71.0](https://github.com/fatedier/frp/releases/tag/v0.71.0) | 109805 | ngrok (partial), Cloudflare Tunnel (partial) |
| [Caddy](https://github.com/caddyserver/caddy) | Go | Apache-2.0 | [v2.11.7](https://github.com/caddyserver/caddy/releases/tag/v2.11.7) signed | 77661 | nginx (full) |
| [Traefik](https://github.com/traefik/traefik) | Go | MIT | [v3.7.14](https://github.com/traefik/traefik/releases/tag/v3.7.14) signed | 65132 | nginx (partial), ingress-nginx (full) |
| [Nginx Proxy Manager](https://github.com/NginxProxyManager/nginx-proxy-manager) | TypeScript | MIT | [v2.16.0](https://github.com/NginxProxyManager/nginx-proxy-manager/releases/tag/v2.16.0) signed | 34365 | Traefik (partial), Caddy (partial) |
| [nginx](https://github.com/nginx/nginx) | C | BSD-2-Clause | [release-1.31.6](https://github.com/nginx/nginx/releases/tag/release-1.31.6) | 31836 | HAProxy (partial) |
| [Envoy](https://github.com/envoyproxy/envoy) | C++ | Apache-2.0 | [v1.39.3](https://github.com/envoyproxy/envoy/releases/tag/v1.39.3) | 29054 | nginx (partial) |
| [Pangolin](https://github.com/fosrl/pangolin) | TypeScript | Other | [1.24.0](https://github.com/fosrl/pangolin/releases/tag/1.24.0) signed | 23044 | Cloudflare Tunnel (full), ngrok (partial) |
| [ingress-nginx](https://github.com/kubernetes/ingress-nginx) archived | Go | Apache-2.0 | [controller-v1.15.1](https://github.com/kubernetes/ingress-nginx/releases/tag/controller-v1.15.1) signed | 19454 | none |
| [rathole](https://github.com/rathole-org/rathole) | Rust | Apache-2.0 | [v0.5.0](https://github.com/rathole-org/rathole/releases/tag/v0.5.0) signed | 14319 | ngrok (partial), frp (full) |
| [OpenResty](https://github.com/openresty/openresty) | C | Other | [v1.27.1.2](https://github.com/openresty/openresty/releases/tag/v1.27.1.2) | 14068 | nginx (drop-in) |
| [Tengine](https://github.com/alibaba/tengine) | C | BSD-2-Clause | [3.1.0](https://github.com/alibaba/tengine/releases/tag/3.1.0) signed | 13384 | nginx (drop-in) |
| [Nginx UI](https://github.com/0xJacky/nginx-ui) | Go | AGPL-3.0 | [v2.8.4](https://github.com/0xJacky/nginx-ui/releases/tag/v2.8.4) | 11582 | Nginx Proxy Manager (partial) |
| [H2O](https://github.com/h2o/h2o) | C | MIT | [tag-no-more-releases](https://github.com/h2o/h2o/releases/tag/tag-no-more-releases) | 11548 | nginx (partial) |
| [FrankenPHP](https://github.com/php/frankenphp) | Go | MIT | [v1.13.0](https://github.com/php/frankenphp/releases/tag/v1.13.0) | 11394 | nginx (partial) |
| [BunkerWeb](https://github.com/bunkerity/bunkerweb) | Python | AGPL-3.0 | [v1.6.15](https://github.com/bunkerity/bunkerweb/releases/tag/v1.6.15) signed | 11059 | Cloudflare WAF (partial), ModSecurity (partial) |
| [HAProxy](https://github.com/haproxy/haproxy) | C | Other | [v3.4.0](https://github.com/haproxy/haproxy/releases/tag/v3.4.0) | 6916 | nginx (partial) |
| [Zoraxy](https://github.com/tobychui/zoraxy) | HTML | AGPL-3.0 | [v3.3.5-rc3](https://github.com/tobychui/zoraxy/releases/tag/v3.3.5-rc3) signed | 5514 | Nginx Proxy Manager (full) |
| [sish](https://github.com/antoniomika/sish) | Go | MIT | [v2.24.1](https://github.com/antoniomika/sish/releases/tag/v2.24.1) signed | 4791 | ngrok (full) |
| [zrok](https://github.com/openziti/zrok) | Go | Apache-2.0 | [v2.0.8](https://github.com/openziti/zrok/releases/tag/v2.0.8) signed | 4766 | ngrok (full), Cloudflare Tunnel (partial) |
| [Keepalived](https://github.com/acassen/keepalived) | C | GPL-2.0 | [v2.4.3](https://github.com/acassen/keepalived/releases/tag/v2.4.3) | 4718 | none |
| [Emissary-ingress](https://github.com/emissary-ingress/emissary) | Python | Apache-2.0 | [v4.1.0](https://github.com/emissary-ingress/emissary/releases/tag/v4.1.0) signed | 4522 | ingress-nginx (full), Kong Gateway (partial) |
| [Octelium](https://github.com/octelium/octelium) | Go | AGPL-3.0 | [v0.44.0](https://github.com/octelium/octelium/releases/tag/v0.44.0) | 4095 | Cloudflare Tunnel (partial) |
| [Apache HTTP Server](https://github.com/apache/httpd) | C | Apache-2.0 | [2.4.69](https://github.com/apache/httpd/releases/tag/2.4.69) | 4037 | none |
| [Contour](https://github.com/projectcontour/contour) | HTML | Apache-2.0 | [v1.33.7](https://github.com/projectcontour/contour/releases/tag/v1.33.7) | 3956 | ingress-nginx (full) |
| [Sōzu](https://github.com/sozu-proxy/sozu) | Rust | AGPL-3.0 | [2.2.1](https://github.com/sozu-proxy/sozu/releases/tag/2.2.1) | 3743 | HAProxy (partial) |
| [Squid](https://github.com/squid-cache/squid) | C++ | GPL-2.0 | [SQUID_7_7](https://github.com/squid-cache/squid/releases/tag/SQUID_7_7) signed | 3121 | Apache Traffic Server (partial) |
| [Envoy Gateway](https://github.com/envoyproxy/gateway) | Go | Apache-2.0 | [v1.9.2](https://github.com/envoyproxy/gateway/releases/tag/v1.9.2) | 3071 | ingress-nginx (full) |
| [Angie](https://github.com/webserver-llc/angie) | C | BSD-2-Clause | [Angie-1.12.2](https://github.com/webserver-llc/angie/releases/tag/Angie-1.12.2) | 2583 | nginx (drop-in) |
| [Static Web Server](https://github.com/static-web-server/static-web-server) | Rust | Apache-2.0 | [v2.44.1](https://github.com/static-web-server/static-web-server/releases/tag/v2.44.1) signed | 2375 | nginx (partial) |
| [Apache Traffic Server](https://github.com/apache/trafficserver) | C++ | Apache-2.0 | [10.2.0](https://github.com/apache/trafficserver/releases/tag/10.2.0) | 1993 | nginx (partial) |
| [OpenLiteSpeed](https://github.com/litespeedtech/openlitespeed) | C++ | GPL-3.0 | [v1.9.3](https://github.com/litespeedtech/openlitespeed/releases/tag/v1.9.3) | 1475 | nginx (partial) |

[All categories](../README.md#catalog)
