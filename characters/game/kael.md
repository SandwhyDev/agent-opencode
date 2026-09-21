# Kael
Status: draft
Art direction: ../game-art-design-guideline.md (v1.0)
Design version: 1

## Identity lock
- Adult age impression and personality: Adult male, late 20s; calm, composed and mysterious bearing; quiet intensity, minimal expression
- Exact body proportion within 7.5–8 heads: 7.8 heads tall; small refined head; long legs; lean athletic build with defined but not bulky musculature
- Face structure, eye shape/color, nose, lips: Mature oval face with soft jaw; almond-shaped eyes with detailed iris, deep emerald green; straight refined nose; firm thin lips, neutral calm set
- Skin tone and undertone: Fair skin with warm undertone
- Hairline, cut, length, silhouette, parting, color: Short black hair, side-parted, structured major locks swept back from the face, clean neckline; subtle directional semi-gloss highlights; color: near-black (#1A1A1E)
- Distinguishing marks and their left/right location: None

## Anatomy and pose rules

Use this compact anatomy clause once per variation prompt, immediately after the
requested pose. These are generation targets and visual checks, not a guarantee.

<!-- anatomy-compact:start -->
One Kael only, exactly two arms and two hands, each hand connected to its own arm with natural anatomy; no duplicated limbs or ghost hands.
<!-- anatomy-compact:end -->

### Spear presentation preset

Default key-art pose for Kael unless the user requests otherwise:

<!-- pose-spear:start -->
Kael stands in a calm full-body 3/4 presentation pose, right hand gripping the spear shaft at mid-height, spear planted vertically beside him, left arm relaxed at his side, calm mysterious expression.
<!-- pose-spear:end -->

- Right/left refer to Kael's anatomy, not the viewer's screen coordinates.
- The spear pose replaces any previous arm pose completely. Do not retain a
  second lowered right hand, crossed arms or a sword-holding gesture.
- Keep costume, face and hair unchanged. The spear is his signature weapon;
  do not swap it for a sword unless the user explicitly requests a variant.
- Validate the requested gesture, limb connections, hand count, spear continuity
  (shaft + head + visible tip) and visible fingers. An extra hand/arm, a missing
  spearhead or a cropped shaft is a failed candidate; never promote it to the
  approved reference. If viewing is unavailable, report anatomy as unverified.

## Costume and equipment lock

Visual authority for visible costume details: pending first approved reference.
Use the compact block below for Schnell prompts. The detailed block is a
visual-review specification, not text to append in full.

### Compact API costume description

<!-- costume-compact:start -->
Deep forest-green fitted long coat with standing collar, narrow silver trim on collar and center front, small silver clasps, matte cloth. Dark green trousers, dark leather boots, silver buckle belt. Silver pauldron on left shoulder, reflective metal. Long spear with dark wooden shaft and polished silver leaf-shaped head.
<!-- costume-compact:end -->

<!-- costume-lock:start -->
KAEL COSTUME LOCK: The same deep forest-green fitted long coat in every image. A standing collar with narrow silver edging, a center-front opening with small silver clasps and a thin silver trim line running down the front placket. The coat is matte cloth, not armor; it fits the torso and falls to about mid-thigh. Dark green trousers below, tucked into dark leather boots. A simple dark belt with a silver buckle at the waist. One silver pauldron on the left shoulder only, reflective metal with a subtle rim; the right shoulder stays bare cloth. No cape, hood, gloves, chains or added ornament. The spear is a long dark wooden shaft with a polished silver leaf-shaped spearhead and a visible pointed tip; the whole weapon stays in frame.
<!-- costume-lock:end -->

### Fixed visible construction
- Palette: deep forest green cloth, dark leather, restrained silver trim and one silver pauldron. Hex codes are approximate design notes, not measured color samples.
- Trim placement: collar edge and center-front placket only. Do not distribute silver trim over sleeves, hem or trousers.
- Shoulder: single pauldron on the left shoulder; do not add a matching right pauldron or remove the left one during pose changes.
- Coat length: about mid-thigh; do not substitute a long robe, armor breastplate or short jacket.
- Weapon: spear only by default; a sword or other weapon requires an explicit variant request.

### Equipment and unseen details
- Back view, coat back construction, pauldron back strap and spear length below the grip are not visually established yet; mark them as draft assumptions until an approved reference exists.
- Do not invent a scabbard, quiver, hood or cape without an explicit request.

## Approved reference
- Original approved local image path: (none yet — draft)
- Source URL if available: N/A
- User approval / pending approval: pending approval
- Model, seed, dimensions and parameters used, if known: Schnell text-to-image, seed 40, 1024x1024, num_steps 4, no guidance_scale (planned)
- Unseen details that remain assumptions: Back view, coat back, pauldron attachment, spear total length, footwear detail above the boot line

## Variants
- Name, requested changes, reference path, approval status: (none yet)

## Validation notes
- Draft profile created from user brief 2026-09-17: adult male spear user, short black hair, dark green costume with silver accents, calm mysterious personality.
- Eye color (deep emerald) and costume construction details are designer choices pending user approval; they are not yet locked.
- No candidate image generated or visually validated yet.