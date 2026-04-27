## Design System: Sapient.IA Clinic

### Pattern
- **Name:** Social Proof-Focused
- **CTA Placement:** Above fold
- **Sections:** Hero > Features > CTA

### Style
- **Name:** Neumorphism
- **Keywords:** Soft UI, embossed, debossed, convex, concave, light source, subtle depth, rounded (12-16px), monochromatic
- **Best For:** Health/wellness apps, meditation platforms, fitness trackers, minimal interaction UIs
- **Performance:** ÔÜí Good | **Accessibility:** ÔÜá Low contrast

### Colors
| Role | Hex |
|------|-----|
| Primary | #3B82F6 |
| Secondary | #60A5FA |
| CTA | #F97316 |
| Background | #F8FAFC |
| Text | #1E293B |

*Notes: Medical Blue (#0077B6) + Trust White + Calm Green*

### Typography
- **Heading:** Figtree
- **Body:** Noto Sans
- **Mood:** medical, clean, accessible, professional, healthcare, trustworthy
- **Best For:** Healthcare, medical clinics, pharma, health apps, accessibility
- **Google Fonts:** https://fonts.google.com/share?selection.family=Figtree:wght@300;400;500;600;700|Noto+Sans:wght@300;400;500;700
- **CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&family=Noto+Sans:wght@300;400;500;700&display=swap');
```

### Key Effects
Soft box-shadow (multiple: -5px -5px 15px, 5px 5px 15px), smooth press (150ms), inner subtle shadow

### Avoid (Anti-patterns)
- Bright neon colors
- Motion-heavy animations
- AI purple/pink gradients

### Pre-Delivery Checklist
- [ ] No emojis as icons (use SVG: Heroicons/Lucide)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px

