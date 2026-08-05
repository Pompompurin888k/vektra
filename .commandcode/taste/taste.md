# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# workflow
- Build apps with preview/demo modes using mock data so the user can test end-to-end like production, since there is no real backend yet. Add "Fill demo details" autofill buttons so the user can rapidly click through flows. Confidence: 0.80

# ui
- Prefer polished toast notifications that animate (transition and fade smoothly) over prominent red inline error text; avoid developer-looking validation errors. Confidence: 0.70
- Keep styling and functional elements (like sign-out buttons) consistent and always present across related pages—new screens like admin/onboarding should mirror the existing dashboard rather than introducing a distinct design or missing shared controls. Confidence: 0.72
- Apply the mesh/gradient background everywhere across the site (landing, dashboard, admin, all pages), not just specific pages. Confidence: 0.85
- Admin list rows should be compact one-liners (summary only); full details belong on a separate detail page, not repeated inline on the list. Confidence: 0.70

# domain
- Payout flow has no "payout request"/approval concept—payments hit the creator's bank directly (lipa haraka model). Don't build a request/approval workflow for payouts. Confidence: 0.70

# deployment
- Deploy and manage the app via the Vercel CLI (not a separate backend service), and implement Google OAuth using Vercel serverless functions in an api/ folder for server-side code exchange. Confidence: 0.60
- In api/ serverless functions (Node runtime via @vercel/node), handlers must use Express-style (req, res) signatures with res.redirect()/res.setHeader(), NOT Web Response objects—returning `new Response(...)` causes the function to hang under vercel dev. Confidence: 0.70

