# Web servers and reverse proxies

Serve sites, terminate TLS and route traffic to services.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [frp](https://github.com/fatedier/frp) | Go | Apache-2.0 | [v0.72.0](https://github.com/fatedier/frp/releases/tag/v0.72.0) | 110781 | ngrok (partial), Cloudflare Tunnel (partial) |
| [Caddy](https://github.com/caddyserver/caddy) | Go | Apache-2.0 | [v2.11.9](https://github.com/caddyserver/caddy/releases/tag/v2.11.9) signed | 79511 | nginx (full) |
| [Traefik](https://github.com/traefik/traefik) | Go | MIT | [v3.8.0](https://github.com/traefik/traefik/releases/tag/v3.8.0) signed | 65686 | nginx (partial), ingress-nginx (full) |
| [Nginx Proxy Manager](https://github.com/NginxProxyManager/nginx-proxy-manager) | JavaScript | MIT | [v2.17.1](https://github.com/NginxProxyManager/nginx-proxy-manager/releases/tag/v2.17.1) signed | 34873 | Traefik (partial), Caddy (partial) |
| [nginx](https://github.com/nginx/nginx) | C | BSD-2-Clause | [release-1.31.10](https://github.com/nginx/nginx/releases/tag/release-1.31.10) | 33253 | HAProxy (partial) |
| [Envoy](https://github.com/envoyproxy/envoy) | C++ | Apache-2.0 | [v1.40.2](https://github.com/envoyproxy/envoy/releases/tag/v1.40.2) | 29290 | nginx (partial) |
| [Pangolin](https://github.com/fosrl/pangolin) | TypeScript | Other | [1.27.1](https://github.com/fosrl/pangolin/releases/tag/1.27.1) signed | 23979 | Cloudflare Tunnel (full), ngrok (partial) |
| [ingress-nginx](https://github.com/kubernetes/ingress-nginx) archived | Go | Apache-2.0 | [controller-v1.15.1](https://github.com/kubernetes/ingress-nginx/releases/tag/controller-v1.15.1) signed | 19430 | none |
| [rathole](https://github.com/rathole-org/rathole) | Rust | Apache-2.0 | [v0.5.0](https://github.com/rathole-org/rathole/releases/tag/v0.5.0) signed | 14497 | ngrok (partial), frp (full) |
| [OpenResty](https://github.com/openresty/openresty) | C | Other | [v1.27.1.2](https://github.com/openresty/openresty/releases/tag/v1.27.1.2) | 14174 | nginx (drop-in) |
| [Tengine](https://github.com/alibaba/tengine) | C | BSD-2-Clause | [3.1.0](https://github.com/alibaba/tengine/releases/tag/3.1.0) signed | 13435 | nginx (drop-in) |
| [Nginx UI](https://github.com/0xJacky/nginx-ui) | Go | AGPL-3.0 | [v3.0.7](https://github.com/0xJacky/nginx-ui/releases/tag/v3.0.7) | 11903 | Nginx Proxy Manager (partial) |
| [H2O](https://github.com/h2o/h2o) | C | MIT | [tag-no-more-releases](https://github.com/h2o/h2o/releases/tag/tag-no-more-releases) | 11576 | nginx (partial) |
| [FrankenPHP](https://github.com/php/frankenphp) | Go | MIT | [v1.14.0](https://github.com/php/frankenphp/releases/tag/v1.14.0) | 11557 | nginx (partial) |
| [BunkerWeb](https://github.com/bunkerity/bunkerweb) | Python | AGPL-3.0 | [v1.6.18](https://github.com/bunkerity/bunkerweb/releases/tag/v1.6.18) signed | 11315 | Cloudflare WAF (partial), ModSecurity (partial) |
| [HAProxy](https://github.com/haproxy/haproxy) | C | Other | [v3.4.0](https://github.com/haproxy/haproxy/releases/tag/v3.4.0) | 7012 | nginx (partial) |
| [Zoraxy](https://github.com/tobychui/zoraxy) | HTML | AGPL-3.0 | [v3.3.5](https://github.com/tobychui/zoraxy/releases/tag/v3.3.5) signed | 5593 | Nginx Proxy Manager (full) |
| [zrok](https://github.com/openziti/zrok) | Go | Apache-2.0 | [v2.0.11](https://github.com/openziti/zrok/releases/tag/v2.0.11) signed | 4827 | ngrok (full), Cloudflare Tunnel (partial) |
| [sish](https://github.com/antoniomika/sish) | Go | MIT | [v4.1.1](https://github.com/antoniomika/sish/releases/tag/v4.1.1) | 4821 | ngrok (full) |
| [Keepalived](https://github.com/acassen/keepalived) | C | GPL-2.0 | [v2.4.3](https://github.com/acassen/keepalived/releases/tag/v2.4.3) | 4748 | none |
| [Emissary-ingress](https://github.com/emissary-ingress/emissary) | Python | Apache-2.0 | [v4.2.0](https://github.com/emissary-ingress/emissary/releases/tag/v4.2.0) signed | 4526 | ingress-nginx (full), Kong Gateway (partial) |
| [Octelium](https://github.com/octelium/octelium) | Go | AGPL-3.0 | [v0.52.0](https://github.com/octelium/octelium/releases/tag/v0.52.0) | 4201 | Cloudflare Tunnel (partial) |
| [Apache HTTP Server](https://github.com/apache/httpd) | C | Apache-2.0 | [2.4.71](https://github.com/apache/httpd/releases/tag/2.4.71) | 4058 | none |
| [Contour](https://github.com/projectcontour/contour) | HTML | Apache-2.0 | [v1.33.8](https://github.com/projectcontour/contour/releases/tag/v1.33.8) | 3971 | ingress-nginx (full) |
| [Sōzu](https://github.com/sozu-proxy/sozu) | Rust | AGPL-3.0 | [2.3.7](https://github.com/sozu-proxy/sozu/releases/tag/2.3.7) | 3763 | HAProxy (partial) |
| [Envoy Gateway](https://github.com/envoyproxy/gateway) | Go | Apache-2.0 | [v1.10.0](https://github.com/envoyproxy/gateway/releases/tag/v1.10.0) | 3166 | ingress-nginx (full) |
| [Squid](https://github.com/squid-cache/squid) | C++ | GPL-2.0 | [SQUID_7_8](https://github.com/squid-cache/squid/releases/tag/SQUID_7_8) | 3160 | Apache Traffic Server (partial) |
| [Angie](https://github.com/webserver-llc/angie) | C | BSD-2-Clause | [Angie-1.12.5](https://github.com/webserver-llc/angie/releases/tag/Angie-1.12.5) | 2628 | nginx (drop-in) |
| [Static Web Server](https://github.com/static-web-server/static-web-server) | Rust | Apache-2.0 | [v2.44.3](https://github.com/static-web-server/static-web-server/releases/tag/v2.44.3) signed | 2420 | nginx (partial) |
| [Apache Traffic Server](https://github.com/apache/trafficserver) | C++ | Apache-2.0 | [10.2.1](https://github.com/apache/trafficserver/releases/tag/10.2.1) | 2001 | nginx (partial) |
| [OpenLiteSpeed](https://github.com/litespeedtech/openlitespeed) | C++ | GPL-3.0 | [v1.9.4](https://github.com/litespeedtech/openlitespeed/releases/tag/v1.9.4) | 1495 | nginx (partial) |

[All categories](../README.md#catalog)
