1. Shrink floating WhatsApp logo
   - File: src/components/global/FloatingWhatsApp.tsx
   - Reduce button from w-14 h-14 to w-11 h-11 (44px) and SVG icon from 26px to 22px. Keep existing animation and green color.

2. Apply lavender→blue→beige gradient to hero "R$23.000/mês"
   - File: src/components/landing/Hero.tsx
   - The <em> already uses gradient-warm (lavanda→bege). Replace with a new utility class that inserts the blue/cyan midpoint so the gradient reads lavender → blue → beige as requested.
   - File: src/index.css — add a new .gradient-hero-value utility with the three-stop gradient.

3. Replace all "5 dias" / "~5 dias" / "5 dias úteis" copy with "poucos dias"
   - Files to edit:
     - src/pages/Index.tsx (meta description + og:description + FAQ entity)
     - src/components/landing/FAQ.tsx (answer text)
     - src/components/landing/FinalCTA.tsx (guarantees list)
   - No structural changes; only string replacement.

4. Recolor the guarantee card in FinalCTA from green/mint to theme tones
   - File: src/components/landing/FinalCTA.tsx
   - Replace green background (#ECFDF5), border (#BCEFD6), shadow (green tint), and text/icon colors (#0F3D2E, #16A875) with warm theme equivalents:
     - background → #F1EEFF (lavender tint) or #FBFAF7 (warm off-white)
     - border → #DED8FF or #EEE7DE
     - shadow → warm shadow (rgba(70,55,35,0.10))
     - text → var(--text) or #1D1D24
     - check icon → #8A7CF6
   - Keep layout, copy, and Eyebrow unchanged.