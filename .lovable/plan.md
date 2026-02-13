

## Memory Gallery Section

A new "Memory Gallery" section will be added between the Memory Vault and the Valentines Finale sections, featuring a masonry layout, Polaroid-style frames, a lightbox viewer, and heart-toggle interactivity.

### What will be built

**New component: `src/components/MemoryGallery.tsx`**
- Masonry layout using CSS `columns` (4 columns on desktop, 2 on tablet, 1 on mobile) with 16px gap
- 89 mock image entries using `https://picsum.photos` with varied dimensions for natural aspect ratios
- Each image wrapped in a Polaroid-style frame:
  - Cream background (`#FFFDD0`), `rounded-xl`, subtle shadow
  - Hover: `scale-105` with deeper shadow transition
  - Caption placeholder underneath in a handwritten-style font
  - Floating heart icon (bottom-right corner) that toggles filled/unfilled red on click
- Native `loading="lazy"` on all images
- Lightbox modal using the existing Radix Dialog component:
  - Blurred backdrop, centered full-size image display
  - Close button and click-outside-to-close behavior
- State: `useState` set for liked image IDs, `useState` for selected lightbox image

**Updates to `src/pages/Index.tsx`**
- Import and place `<MemoryGallery />` in a new section (`id="memory-gallery"`) between the vault and finale sections
- Warm peach background (`bg-[#FFDAB9]`)
- Section header with Camera icon, title "Our Memory Gallery", and subtitle
- Add `"memory-gallery"` to the navigation dots array

**Updates to `index.html`**
- Add Google Fonts import for "Dancing Script" (handwritten captions)

**Updates to `tailwind.config.ts`**
- Add `dancing` font family mapped to `'Dancing Script'`

### Technical details

- Masonry via CSS `columns` property (no JS library needed) -- `columns-1 sm:columns-2 lg:columns-4` with `break-inside: avoid` on each item
- Mock images: array of 89 objects with `id`, `src` (picsum with unique seed + varied height), and `caption`
- Heart toggle uses a `Set<number>` pattern via useState for O(1) lookups
- Lightbox uses the existing `Dialog`/`DialogContent` from `src/components/ui/dialog.tsx` with custom styling for full-width image display and backdrop blur

