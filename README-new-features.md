# New features — setup notes

## 1. Logo
- `src/components/SiteLogo.jsx` — reusable shield + wordmark logo, used in
  the public Navbar and Footer, and as the favicon (`public/favicon.svg`).
- This is a generated SVG, not a real uploaded logo file. If you get a real
  logo designed later, swap the SVG markup inside `SiteLogo.jsx` (or point
  it at an `<img>` instead).

## 2. Trustpilot ratings
- `src/components/TrustpilotRating.jsx` shows nothing but a quiet
  "Reviews coming soon" note until you add real values to `.env`:
  - `VITE_TRUSTPILOT_BUSINESS_UNIT_ID`
  - `VITE_TRUSTPILOT_DOMAIN` (e.g. `www.recoveryassist.example`)
- Sign up for a free Trustpilot Business account to get your Business Unit ID.
- Once both env vars are set, the real Trustpilot widget loads (lazy-loaded,
  official script) with a "Review us on Trustpilot" button.

## 3. Testimonials
- Run `recoveryassist-testimonials.sql` in Supabase first — creates the
  `testimonials` table and a public `testimonial-uploads` storage bucket.
- Public page: `/testimonials` — submission form + approved testimonials grid.
- Admin moderation: `/admin/testimonials` — approve, reject, or delete.
- Spam protection currently implemented: a honeypot hidden field (bots fill
  it, real users never see it) and consent-required inserts.
- **Not yet wired up (needs your input):**
  - **reCAPTCHA** — if you want it, get a site key + secret key from Google
    reCAPTCHA and tell me which version (v2 checkbox or v3 invisible); I'll
    wire it into the form.
  - **Rate limiting** — proper server-side rate limiting needs a Supabase
    Edge Function in front of the insert (the browser can't enforce this
    safely on its own).
  - **Email notification to admin on new submission** — this needs a
    Supabase Edge Function + an email-sending provider (e.g. Resend,
    SendGrid, Postmark). Tell me which provider you want to use and I'll
    set up the function; you'll need to create an account there and give
    me the API key to put in the function's environment variables (never
    in frontend code).

## 4. Team section
- `src/components/TeamSection.jsx` — shown on the `/about` page.
- The `teamMembers` array starts **empty** on purpose — no fake people are
  pre-filled. Add real entries directly in that file:
  ```js
  const teamMembers = [
    { name: "Jane Doe", role: "Lead Investigator", bio: "...", photo: "/images/jane.jpg", socialLinks: { linkedin: "https://..." } },
  ]
  ```
- Shows at most 7 members, responsive (4 → 3 → 2 → 1 columns), lazy-loaded
  photos, falls back to an initial-letter avatar if no photo is given.

## What I still need from you to fully finish this
1. A real logo file, if you have one (otherwise the generated SVG stays).
2. Your Trustpilot Business Unit ID + domain, once you've signed up.
3. Real team member names/roles/bios/photos for `TeamSection.jsx`.
4. Your choice of email provider (Resend, SendGrid, Postmark, or other) and
   an API key from that provider, so admin notification emails can actually
   send.
5. Confirmation on reCAPTCHA — do you want it added, and which version?
