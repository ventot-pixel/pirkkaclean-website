# PirkkaClean launch placeholders

Replace these literal tokens only after Kari and Ven confirm the production details. Keep API keys and bot tokens out of Git; those belong in Vercel environment variables named `STL_PIRKKACLEAN_*`.

## Confirmed contact details

- Lead and reply email: `kristiinaheritty@pirkkaclean.fi`
- Main phone display: `010 3200 730`
- International digits-only phone used by `wa.me` and local alert tests: `358103200730`

## `{{PIRKKACLEAN_SENDER_DOMAIN}}`

Use the Resend-verified sending domain, for example `mail.pirkkaclean.fi`. Verify its SPF and DKIM records before enabling email delivery.

- `Operations/speed-to-lead/clients/pirkkaclean.js` — `leadFrom` and `replyFrom`
- `Operations/speed-to-lead/tests/handler.test.js` — placeholder-presence assertions
- `PLACEHOLDERS.md` — this reference

## `{{PIRKKACLEAN_SITE_URL}}`

Use the exact production origin with scheme and no path, for example `https://www.pirkkaclean.fi`. If both apex and `www` origins serve the form, add both exact origins to `allowedOrigins`.

- `Operations/speed-to-lead/clients/pirkkaclean.js` — production `allowedOrigins`
- `Operations/speed-to-lead/tests/handler.test.js` — placeholder-presence assertion
- `PLACEHOLDERS.md` — this reference

## Local-only wiring to replace before launch

Both site forms currently load `http://localhost:8787/embed.js` so they can be tested against `npm run demo` without deploying. Before launch, replace that script URL in `kotisiivous.html` and `yhteystiedot.html` with the approved production relay `/embed.js` URL. This is intentionally not a placeholder token because no relay token was provided in the brief.
