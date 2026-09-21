# Game Character Design & Consistency Guideline

Version: 1.0

## Scope

Use this guideline for development of adult human game characters in the premium
semi-realistic anime art direction below. It is the default for new characters in
this game-art series. Existing characters from other art directions, including
Luna the lavender kitten, retain their approved style unless the user explicitly
requests a redesign. Do not blend Luna's chibi 3D style into this series.

This is an art-direction requirement and a review standard, not proof that the
current text-to-image API can enforce identical identity. Never claim a visual
match based only on a prompt, seed, HTTP success or downloaded file.

## Canonical style specification — full design and review reference

<!-- game-style:start -->
GAME ART STYLE LOCK: Premium semi-realistic anime game character illustration. Adult human proportions, 7.5–8 heads tall, relatively small head, elegant long-legged silhouette, anatomically believable body. Refined mature anime face, soft oval jaw, large but believable eyes, detailed iris, subtle eyelashes, small refined nose and delicate lips. Highly structured hair rendering: large hair masses → major locks → secondary locks → selected individual strands. Directional semi-gloss highlights following hair curvature. Soft natural skin with warm undertones. Rendering uses soft controlled cel-shading combined with subtle gradients. Approx. 70% base/light, 20% primary shadow, 8% secondary shadow, 2% deep occlusion. Large soft key light from upper front-left. Subtle fill. Controlled rim light. Clean variable-weight linework. Strong outer silhouette, medium secondary contours, delicate internal lines. Avoid pure black wherever possible. Sophisticated slightly desaturated color palette. Controlled saturation. Premium cinematic color grading. Differentiate materials through physically believable highlight behavior: matte fabric, soft skin, semi-gloss hair/leather, reflective metal. Full-body 3/4 presentation, neutral camera, 50–85mm equivalent perspective, light gray background. High-end professional game character key art. Consistency is mandatory: body proportion, face style, eyes, hair rendering, outlines, shadows, lighting, materials, color grading and rendering quality must remain unchanged between characters. Only character identity, costume, hairstyle, weapon, accessories, personality and accent colors may change.
<!-- game-style:end -->

## Two levels of consistency

### Series style: fixed across all characters

| Area | Required treatment | Reject drift such as |
| --- | --- | --- |
| Proportions | Adult, 7.5–8 heads tall; small head; long-legged, believable anatomy | Chibi, childlike proportions, oversized head, extreme limb distortion |
| Face and eyes | Mature anime face, soft oval jaw, believable eye scale, detailed iris, refined nose/lips | Doll face, huge eyes, comic caricature, photoreal face pasted into anime rendering |
| Hair | Masses → major locks → secondary locks → selective strands; highlights follow curvature | Uniform strand noise, plastic helmet hair, random sparkle, flat single-color hair |
| Skin | Soft, natural, warm undertones; preserve the character's skin tone | Waxy/plastic skin, excessive pores, inconsistent undertone |
| Shading | Controlled soft cel-shading plus subtle gradients; approximately 70/20/8/2 light-to-occlusion balance | Harsh banding, airbrush-only volume, crushed blacks, equally dark shadows everywhere |
| Lighting | Large soft upper front-left key, subtle fill, restrained rim | Reversed key direction, hard spotlight, neon rim dominating the silhouette |
| Linework | Strong exterior, medium secondary contours, delicate internal lines; chromatic darks | Uniform thick outlines, scratchy sketchwork, pure-black contour dominance |
| Palette | Slightly desaturated sophisticated colors, controlled accents, consistent cinematic grade | Neon saturation, unrelated grade or contrast between characters |
| Materials | Matte cloth, soft skin, semi-gloss hair/leather, sharper reflective metal | Identical shiny finish on every surface, metallic cloth, dull painted metal |
| Presentation | Full body, 3/4 view, neutral perspective, 50–85mm equivalent, light gray backdrop | Cropped feet/weapon, wide-angle distortion, dramatic low-angle view, busy scenery |
| Finish | Consistent professional key-art polish | Unfinished hands, inconsistent detail density, text/watermarks, noisy over-detail |

The shading percentages and lens equivalent are visual targets, not measured
guarantees of the generation model. Do not invent numeric compliance scores.

### Character identity: fixed across images of the same person

Once the user approves a design, preserve its facial structure, eye shape and
color, skin tone, body proportions, hairline, hair silhouette and color, costume
construction, material assignments, weapon shape, accessory placement, signature
marks and accent palette. These details may differ BETWEEN characters, but must
not change accidentally BETWEEN images of the same character.

Pose and expression may vary on request while staying inside the presentation
and anatomical rules. Pose changes must not silently redesign the costume or
swap equipment. Preserve left/right accessory placement and weapon handedness.
An outfit, hairstyle or equipment variant requires an explicit request and a
named variant; it does not replace the approved base design.

## Character profile template

Store reusable profiles at `characters/game/<character-slug>.md`.
Profiles persist after temporary generation JSON is deleted.

```markdown
# Character name
Status: draft / approved
Art direction: ../game-art-design-guideline.md (v1.0)
Design version: 1

## Identity lock
- Adult age impression and personality:
- Exact body proportion within 7.5–8 heads:
- Face structure, eye shape/color, nose, lips:
- Skin tone and undertone:
- Hairline, cut, length, silhouette, parting, color:
- Distinguishing marks and their left/right location:

## Costume and equipment lock
- Garment layers, cuts, seams, fastenings and silhouette:
- Material assigned to each garment/accessory:
- Main, secondary and accent colors:
- Weapon: shape, scale, material, handedness:
- Accessories: shape and exact placement:

## Approved reference
- Original approved local image path:
- Source URL if available:
- User approval / pending approval:
- Model, seed, dimensions and parameters used, if known:
- Unseen details that remain assumptions:

## Variants
- Name, requested changes, reference path, approval status:

## Validation notes
- Checks actually performed:
- Remaining mismatches or unverified details:
```

Never label a design approved until the user approves it. Keep rejected or draft
images out of the canonical-reference field. Do not invent unobserved back-view
details as established design facts.

## Prompt assembly for Schnell

The documented Schnell prompt limit is 2048 characters. The full style specification
and a detailed costume specification together can exceed it. They are reference
and review documents; do NOT concatenate them verbatim into the API request.
Keep the final prompt preferably below 1800 characters and always at most 2048.

Use this order:
1. REQUESTED ACTION first, with observable anatomy. For waving: right elbow bent,
   right hand raised beside the head, open palm toward viewer, fingers naturally
   spread, left arm relaxed. Do not assign a weapon to the waving hand.
2. Concise identity: name, adult appearance, face, eye color, hair silhouette/color.
3. The profile's costume-compact block, preserving construction, not just colors.
4. The compact style block below. Do not append the full reference specification.

<!-- game-style-compact:start -->
Premium semi-realistic anime game key art, adult 7.5-8-head proportions, small head, long legs, mature oval face and believable detailed eyes. Structured hair locks with directional semi-gloss highlights; warm soft skin. Controlled cel-shading with subtle gradients, approx. 70/20/8/2 light-to-occlusion balance. Soft upper-front-left key, subtle fill/rim. Variable-weight chromatic linework, restrained slightly desaturated cinematic palette. Distinct matte cloth, soft skin, semi-gloss hair/leather, reflective metal. Full-body 3/4 view, neutral 50-85mm perspective, light gray background.
<!-- game-style-compact:end -->

Pose is the changed element; do not mix it into the identity lock. Avoid lengthy
negative lists and repeated preservation instructions. Count the final prompt
before sending. If too long, reduce redundant prose, not the requested action or
costume construction; never silently truncate. The helper rejects oversized prompts.

Use the generic prompt route for game art; character is the separate legacy
inpainting route. Local reference paths are not image inputs to Schnell. Current
text-only outputs are candidates, not guaranteed same-character edits. Verify the
requested action as well as style and clothing; a missing wave is a failed result.

## Development workflow and review gate

1. Identify whether this is a new identity, a same-character variation, or a redesign.
2. Read this guideline and the existing profile before writing a prompt. For a new
   identity, draft a concise profile from the brief; ask only about essential gaps.
3. Keep the same model and generation settings during comparisons unless the user
   requests a change. A fixed seed does not lock identity when the prompt changes.
4. Generate and save the candidate image. Inspect it against the canonical style
   and approved reference when image viewing is available.
5. Report style and identity separately: conforming, visible mismatch, or not
   visually verified. Describe concrete mismatches, not a vague consistency score.
6. Treat anatomy defects, altered face/costume, reversed light direction, wrong
   proportions, material drift and presentation drift as failures to the brief.
   Do not promote a failing result to the canonical design or promise perfection.
7. After user approval, record the reference path and stable identity details in
   the profile. Preserve the original reference; variants stay separate.

The guideline is intentionally strict about artistic targets. If a requested
variation conflicts with it, explain the conflict and preserve the lock unless
the user explicitly authorizes a separate art direction or versioned redesign.
