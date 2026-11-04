# PirkkaClean launch placeholders

Replace these literal tokens only after Kari and Ven confirm the production details. Keep API keys and bot tokens out of Git; those belong in Vercel environment variables named `STL_PIRKKACLEAN_*`.

## `{{PIRKKACLEAN_EMAIL}}`

Use the customer-facing inbox that receives website leads and customer replies, for example `asiakaspalvelu@pirkkaclean.fi`.

- `kotisiivous.html` — quote-section and footer email links
- `yhteystiedot.html` — contact-page email link
- `Operations/speed-to-lead/clients/pirkkaclean.js` — `ownerEmail`, `replyTo`, and Finnish urgent-contact copy
- `Operations/speed-to-lead/dev.js` — local dry-run owner email
- `Operations/speed-to-lead/tests/handler.test.js` — placeholder and delivery assertions
- `PLACEHOLDERS.md` — this reference

## `{{PIRKKACLEAN_WHATSAPP}}`

Use the WhatsApp number in international digits-only format, without `+`, spaces, or punctuation, for example `358401234567`.

- `kotisiivous.html` — hero, quote section, footer, and floating mobile `wa.me` links
- `yhteystiedot.html` — quick-contact and floating mobile `wa.me` links
- `Operations/speed-to-lead/dev.js` — local dry-run WhatsApp alert target
- `Operations/speed-to-lead/tests/handler.test.js` — dry-run alert and URL assertions
- `PLACEHOLDERS.md` — this reference

## `{{PIRKKACLEAN_WHATSAPP_DISPLAY}}`

Use the human-readable phone text, for example `+358 40 123 4567`.

- `kotisiivous.html` — visible WhatsApp text in the hero, quote section, and footer
- `yhteystiedot.html` — visible WhatsApp quick-contact text
- `Operations/speed-to-lead/clients/pirkkaclean.js` — Finnish urgent-contact copy
- `PLACEHOLDERS.md` — this reference

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
