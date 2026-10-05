---
reviewed: 2026-10-06
majors:
  ghost: 6
sources:
  - https://ghost.org/docs/migration/substack/
  - https://ghost.org/help/stripe/
  - https://ghost.org/tutorials/implementing-redirects/
---

## Compatibility

Ghost ships a Substack migrator in Ghost Admin under **Settings > Advanced > Import/Export**. It imports posts from Substack's export file, and free and paid subscribers from Substack's CSV files. Paid memberships require Ghost to be connected to the same Stripe account as your Substack.

## Before you switch

1. If you have paid subscribers, connect Stripe first in **Settings > Memberships > Tiers** with **Connect with Stripe**, choosing the account already connected to Substack.
2. Log in to Substack, then open the migrator and enter your Substack's public URL.
3. Follow **Open Substack Settings**, click **Create new export** and upload the zip file Substack generates.
4. Download the free subscribers CSV from Substack and upload it, then do the same for paid subscribers.
5. Review the post and member counts Ghost reports, and click **Import content and subscribers**.

For migrations the built-in tool cannot handle, Ghost(Pro) customers can ask Ghost's migrations team, and self-hosters can use the open-source command-line tools in `TryGhost/migrate`.

## Pitfalls

- **Substack keeps taking its 10% fee on existing paid subscriptions after the move.** Ghost does not take a cut, but removing Substack's fee is a request to Ghost's concierge team, not part of the import.
- The Stripe statement descriptor may still say "Substack" on readers' bank statements. Change it in Stripe's public details settings.
- With a custom domain, old links break unless you add redirects: Substack serves posts under `/p/`, which Ghost uses for post previews. The guide gives a `redirects.yaml` rule that strips `/p/` while leaving Ghost's preview URLs alone. Ghost's redirects tutorial adds a second rule the guide omits, sending `/subscribe` to `/#/portal/subscribe`.
- Redirects are managed by downloading `redirects.yaml` from Ghost Admin, editing it and uploading it again. Uploading a file with empty `301:` and `302:` keys removes all of them.
