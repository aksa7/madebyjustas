# Higgsfield asset plan — Velvet Noir

Models (exact, per brief): **Seedance 2.5** (video), **ChatGPT Image 2.5** (images).
If either isn't available, stop and ask before substituting.

Workflow: generate each still first, then animate it with Seedance image-to-video
using the still as the start frame. That way the poster, the reduced-motion image
and the first video frame are the same picture, and the loop has nothing to jump to.

Palette reference for prompts: Ink #0F0E0E · Rouge Noir #5B0D18 · Amaranth #6E1E3B ·
Bone #E8DFD0. Never gold, glitter, sparkle, lens flares, text or logos.

---

## 1. The Fold — hero centerpiece

**Still (ChatGPT Image 2.5), 16:9 and 9:16**

> Extreme macro photograph of heavy velvet drapery in deep oxblood and amaranth,
> one deep vertical fold receding into near-black shadow, center-right of frame.
> A single soft raking light from the upper left grazes the velvet pile, revealing
> fine fabric texture and a muted rose-bone sheen on the highest ridges. About 80% of
> the frame falls into deep shadow, almost black. Calm, rich, expensive. Shot on
> medium-format film, shallow depth of field, fine natural film grain. Empty dark
> negative space on the left third. No gold, no glitter, no sparkle, no text, no logo,
> no people, no objects.

(9:16 version: same, fold centered and running top to bottom, dark space in the top third.)

**Video (Seedance 2.5, image-to-video from the still), 8 s, loopable**

> Locked-off camera, no zoom, no cuts. The velvet folds breathe very slowly, as if a
> faint draft moves behind the fabric. The raking light drifts a few degrees across
> the pile and back. Motion is subtle and continuous so the clip loops seamlessly.

Scroll choreography (in code, not in the video): the video layer scales into the
deepest fold until the frame is black, then the Manifesto resolves out of the dark.

## 2. Projector beam — atmosphere + preloader

**Still (ChatGPT Image 2.5), 16:9**

> A single cinema projector beam cutting diagonally from the top-left corner through
> a pitch-black room. Warm bone-white light with a faint amaranth edge. Fine dust
> motes drift slowly inside the beam and catch the light. Soft volumetric haze,
> pure black everywhere outside the beam (for screen blending). Cinematic, fine
> film grain. No gold, no sparkle, no lens flare, no text.

**Video (Seedance 2.5, image-to-video from the still), 8 s, loopable**

> Locked-off camera. Dust motes drift slowly upward and sideways through the beam;
> the haze shifts gently. The beam itself stays still. Seamless loop.

Used: behind the preloader (beam fades up, MJ mark draws in), as a screen-blended
layer over the hero and the showcase, and as a static image for reduced motion.

## Built in code (not generated)

- Film grain (SVG noise), vignette.
- The Screen (viewport frame, hairlines, viewfinder corners, light spill).
- MJ logo (vector, from `design/logo`).
- OG image (composed from the Fold still + logo at build time).
