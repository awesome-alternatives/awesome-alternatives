# Web servers and reverse proxies

Serve sites, terminate TLS and route traffic to services.

| Tool | Language | Licence | Latest | Stars | Replaces |
|---|---|---|---|---:|---|
| [frp](https://github.com/fatedier/frp) | Go | Apache-2.0 | [v0.72.0](https://github.com/fatedier/frp/releases/tag/v0.72.0) | 110508 | ngrok (partial), Cloudflare Tunnel (partial) |
| [Caddy](https://github.com/caddyserver/caddy) | Go | Apache-2.0 | [v2.11.9](https://github.com/caddyserver/caddy/releases/tag/v2.11.9) signed | 78943 | nginx (full) |
| [Traefik](https://github.com/traefik/traefik) | Go | MIT | [v3.7.18](https://github.com/traefik/traefik/releases/tag/v3.7.18) signed | 65506 | nginx (partial), ingress-nginx (full) |
| [Nginx Proxy Manager](https://github.com/NginxProxyManager/nginx-proxy-manager) | JavaScript | MIT | [v2.16.0](https://github.com/NginxProxyManager/nginx-proxy-manager/releases/tag/v2.16.0) signed | 34667 | Traefik (partial), Caddy (partial) |
| [nginx](https://github.com/nginx/nginx) | C | BSD-2-Clause | [release-1.31.8](https://github.com/nginx/nginx/releases/tag/release-1.31.8) | 32089 | HAProxy (partial) |
| [Envoy](https://github.com/envoyproxy/envoy) | C++ | Apache-2.0 | [v1.40.2](https://github.com/envoyproxy/envoy/releases/tag/v1.40.2) | 29210 | nginx (partial) |
| [Pangolin](https://github.com/fosrl/pangolin) | TypeScript | Other | [1.26.0](https://github.com/fosrl/pangolin/releases/tag/1.26.0) signed | 23531 | Cloudflare Tunnel (full), ngrok (partial) |
| [ingress-nginx](https://github.com/kubernetes/ingress-nginx) archived | Go | Apache-2.0 | [controller-v1.15.1](https://github.com/kubernetes/ingress-nginx/releases/tag/controller-v1.15.1) signed | 19438 | none |
| [rathole](https://github.com/rathole-org/rathole) | Rust | Apache-2.0 | [v0.5.0](https://github.com/rathole-org/rathole/releases/tag/v0.5.0) signed | 14434 | ngrok (partial), frp (full) |
| [OpenResty](https://github.com/openresty/openresty) | C | Other | [v1.27.1.2](https://github.com/openresty/openresty/releases/tag/v1.27.1.2) | 14125 | nginx (drop-in) |
| [Tengine](https://github.com/alibaba/tengine) | C | BSD-2-Clause | [3.1.0](https://github.com/alibaba/tengine/releases/tag/3.1.0) signed | 13423 | nginx (drop-in) |
| [Nginx UI](https://github.com/0xJacky/nginx-ui) | Go | AGPL-3.0 | [v3.0.1](https://github.com/0xJacky/nginx-ui/releases/tag/v3.0.1) | 11754 | Nginx Proxy Manager (partial) |
| [H2O](https://github.com/h2o/h2o) | C | MIT | [tag-no-more-releases](https://github.com/h2o/h2o/releases/tag/tag-no-more-releases) | 11563 | nginx (partial) |
| [FrankenPHP](https://github.com/php/frankenphp) | Go | MIT | [v1.13.5](https://github.com/php/frankenphp/releases/tag/v1.13.5) | 11521 | nginx (partial) |
| [BunkerWeb](https://github.com/bunkerity/bunkerweb) | Python | AGPL-3.0 | [v1.6.17](https://github.com/bunkerity/bunkerweb/releases/tag/v1.6.17) signed | 11242 | Cloudflare WAF (partial), ModSecurity (partial) |
| [HAProxy](https://github.com/haproxy/haproxy) | C | Other | [v3.4.0](https://github.com/haproxy/haproxy/releases/tag/v3.4.0) | 6984 | nginx (partial) |
| [Zoraxy](https://github.com/tobychui/zoraxy) | HTML | AGPL-3.0 | [v3.3.5-rc5](https://github.com/tobychui/zoraxy/releases/tag/v3.3.5-rc5) signed | 5576 | Nginx Proxy Manager (full) |
| [sish](https://github.com/antoniomika/sish) | Go | MIT | [v4.0.0](https://github.com/antoniomika/sish/releases/tag/v4.0.0) | 4812 | ngrok (full) |
| [zrok](https://github.com/openziti/zrok) | Go | Apache-2.0 | [v2.0.9](https://github.com/openziti/zrok/releases/tag/v2.0.9) signed | 4805 | ngrok (full), Cloudflare Tunnel (partial) |
| [Keepalived](https://github.com/acassen/keepalived) | C | GPL-2.0 | [v2.4.3](https://github.com/acassen/keepalived/releases/tag/v2.4.3) | 4740 | none |
| [Emissary-ingress](https://github.com/emissary-ingress/emissary) | Python | Apache-2.0 | [v4.2.0](https://github.com/emissary-ingress/emissary/releases/tag/v4.2.0) signed | 4526 | ingress-nginx (full), Kong Gateway (partial) |
| [Octelium](https://github.com/octelium/octelium) | Go | AGPL-3.0 | [v0.50.0](https://github.com/octelium/octelium/releases/tag/v0.50.0) | 4173 | Cloudflare Tunnel (partial) |
| [Apache HTTP Server](https://github.com/apache/httpd) | C | Apache-2.0 | [2.4.70](https://github.com/apache/httpd/releases/tag/2.4.70) | 4042 | none |
| [Contour](https://github.com/projectcontour/contour) | HTML | Apache-2.0 | [v1.33.8](https://github.com/projectcontour/contour/releases/tag/v1.33.8) | 3954 | ingress-nginx (full) |
| [Sōzu](https://github.com/sozu-proxy/sozu) | Rust | AGPL-3.0 | [2.3.4](https://github.com/sozu-proxy/sozu/releases/tag/2.3.4) signed | 3756 | HAProxy (partial) |
| [Squid](https://github.com/squid-cache/squid) | C++ | GPL-2.0 | [SQUID_7_8](https://github.com/squid-cache/squid/releases/tag/SQUID_7_8) | 3147 | Apache Traffic Server (partial) |
| [Envoy Gateway](https://github.com/envoyproxy/gateway) | Go | Apache-2.0 | [v1.10.0](https://github.com/envoyproxy/gateway/releases/tag/v1.10.0) | 3137 | ingress-nginx (full) |
| [Angie](https://github.com/webserver-llc/angie) | C | BSD-2-Clause | [Angie-1.12.4](https://github.com/webserver-llc/angie/releases/tag/Angie-1.12.4) | 2614 | nginx (drop-in) |
| [Static Web Server](https://github.com/static-web-server/static-web-server) | Rust | Apache-2.0 | [v2.44.1](https://github.com/static-web-server/static-web-server/releases/tag/v2.44.1) signed | 2407 | nginx (partial) |
| [Apache Traffic Server](https://github.com/apache/trafficserver) | C++ | Apache-2.0 | [10.2.1](https://github.com/apache/trafficserver/releases/tag/10.2.1) | 1996 | nginx (partial) |
| [OpenLiteSpeed](https://github.com/litespeedtech/openlitespeed) | C++ | GPL-3.0 | [v1.9.4](https://github.com/litespeedtech/openlitespeed/releases/tag/v1.9.4) | 1490 | nginx (partial) |

[All categories](../README.md#catalog)
