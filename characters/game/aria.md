# Aria
<<<<<<< HEAD
Status: approved
Art direction: ../game-art-design-guideline.md (v1.0)
Design version: 1 (costume description corrected from user-supplied image, 2026-09-17)

## Identity lock
- Adult age impression and personality: Young adult, mid-20s, composed and disciplined warrior bearing; calm confidence with subtle intensity
- Exact body proportion within 7.5–8 heads: 7.8 heads tall; small refined head; long elegant legs; athletic but feminine build with defined musculature
- Face structure, eye shape/color, nose, lips: Soft oval jaw; almond-shaped eyes with detailed iris, deep blue color; straight refined nose; delicate lips with natural pink tone
- Skin tone and undertone: Fair porcelain skin with warm peach undertone
- Hairline, cut, length, silhouette, parting, color: Center-parted hairline; straight long silver-white hair falling to lower back; major locks frame face; secondary locks cascade over shoulders; subtle directional semi-gloss highlights following curvature; color: pure silver-white (#E8E8F0)
- Distinguishing marks and their left/right location: None

## Anatomy and pose rules

Use this compact anatomy clause once per variation prompt, immediately after the
requested pose. These are generation targets and visual checks, not a guarantee.

<!-- anatomy-compact:start -->
One Aria only, exactly two arms and two hands, each hand connected to its own arm with natural anatomy; no duplicated limbs or ghost hands.
<!-- anatomy-compact:end -->

### Waving preset

When the user requests waving without further details, use:

<!-- pose-wave:start -->
Aria waves with her right hand: right elbow bent, open right palm raised beside her head facing the viewer, five naturally separated fingers. Left arm relaxed beside her body, left hand visible below her waist. Both hands empty; no sword in this pose.
<!-- pose-wave:end -->

- Right/left refer to Aria's anatomy, not the viewer's screen coordinates.
- The waving pose replaces the previous arm pose completely. Do not retain a
  second lowered right hand, crossed arms or a sword-holding gesture from another prompt.
- Keep costume, face and hair unchanged. Omitting a held sword for this pose is
  a pose-specific choice, not a permanent change to the character's equipment.
- If the user explicitly requests a weapon, assign it to a compatible hand once;
  never describe the waving hand as holding a weapon at the same time.
- For other poses, specify one action per arm and avoid overlapping alternatives.
- Validate the requested gesture, limb connections, hand count and visible fingers.
  An extra hand/arm or missing wave is a failed candidate; never promote it to the
  approved reference. If viewing is unavailable, report anatomy as unverified.
- Observed issue: user reported a variation with three hands. Do not use that
  output as the reference for later images. No corrected result is verified yet.

### Two-handed sword preset

For requests to hold a sword with both hands, use this preset instead of the
waving preset. The previous empty-hand instruction does not apply to this pose.

<!-- pose-sword-two-hands:start -->
Aria holds one complete unsheathed longsword with both hands on its grip at waist height, right hand below the crossguard and left hand nearer the pommel. The continuous long steel blade extends diagonally upward into clear space beside her face; its pointed tip and the entire sword fit inside the frame. Keep the blade broadside to the camera, not pointing toward it. Relaxed shoulders, naturally bent elbows, adult-proportioned upper arms and forearms; position the grip within reach without shortening her arms.
<!-- pose-sword-two-hands:end -->

- Require one connected weapon: pommel, grip long enough for two hands,
  crossguard, continuous long blade and visible pointed tip. A hilt alone,
  floating blade, duplicated sword or cropped tip is an incomplete result.
- Both hands wrap the same grip below the crossguard, one above the other.
  Neither hand grips the blade. Keep wrists aligned and elbow bends plausible.
- Reposition the sword or widen the framing to keep both arms proportional and
  the whole weapon visible. Do not hide a missing blade behind the body or excuse
  shortened arms as perspective when the requested pose avoids foreshortening.
- The sword must remain visibly distinct from the hair, clothing and background.
  Keep the same approved costume; do not add a belt, scabbard or armor for this pose.
- This preset specifies functional geometry, not a newly approved ornamental
  weapon design. Retain any later user-approved sword details when available.
- Review: exactly two connected arms/hands, believable arm lengths, both hands
  on one grip, complete blade and tip in frame, requested pose and unchanged costume.
  If any check fails, report the candidate as failed; if viewing is unavailable,
  report unverified. Do not claim the sword is complete from the prompt alone.
- User-reported failures: shortened arms and a sword with only a hilt. The preset
  is a corrective instruction; no successful visual result is verified yet.

## Costume and equipment lock

Visual authority for visible costume details: `characters/references/aria-costume-2026-09-17.png`, supplied by the user to clarify the original outfit. Use the compact block below for Schnell prompts. The detailed block is a visual-review specification, not text to append in full.

### Compact API costume description

<!-- costume-compact:start -->
Fitted navy short-sleeved tunic-dress; gold-edged standing collar, small gold branching chest motif, two gold torso panel lines and pointed hip tabs. Dark gunmetal rounded shoulder plates with gold borders/rivets and a lower overlapping plate. Short angular overlapping skirt with tapered center panel. Separate plain navy wrist cuffs, bare forearms and hands. Matte cloth, reflective metal. No belt, cape, gloves or added ornaments.
<!-- costume-compact:end -->

<!-- costume-lock:start -->
ARIA COSTUME LOCK: The same fitted dark navy short-sleeved high-collar tunic-dress in every image. A standing mandarin-style collar with a narrow center-front opening, thin gold edging and small gold curling embroidery on the collar sides. One small branching gold ornamental motif centered on the upper chest immediately below the collar. The fitted torso is navy fabric, not a metal breastplate, with two narrow gold vertical panel borders running from below the bust toward the waist and into the lower bodice edges. The bodice extends over the hips into angular pointed side tabs outlined with narrow gold trim. No visible waist belt. Short fitted navy sleeves end above the elbows, leaving the forearms bare. Each shoulder carries a rounded dark gunmetal-gray metallic pauldron, a narrow gold border, a few small gold rivets and a curved overlapping lower plate with gold edging. The pauldrons are dark metal with gold trim, not solid gold armor. The short navy skirt consists of overlapping angular panels: a broad tapered center-front hanging panel, flanking side panels and openings between panels exposing portions of the upper thighs. Skirt edges have dark edging; do not add gold embroidery all along the skirt hem. Separate broad plain navy wrist cuffs on both wrists, slightly angular/flared, with no gold decoration. Bare hands, no gloves. Preserve the exact collar, chest ornament, gold panel-line placement, short sleeves, shoulder-plate construction, layered skirt silhouette and wrist cuffs. No added corset lacing, belt, chains, cape, jewelry or new ornament. Matte softly shaded navy fabric contrasted with reflective dark metal pauldrons and restrained gold trim.
<!-- costume-lock:end -->

### Fixed visible construction
- Palette: dark navy cloth, dark gunmetal shoulder plates, restrained gold trim/rivets. Existing hex codes are approximate design notes, not measured color samples.
- Embroidery placement: collar and the small central upper-chest ornament. Do not distribute the chest motif over sleeves, waist or skirt.
- Sleeve/cuff construction: short sleeves above elbows plus independent wrist cuffs; these are not long sleeves or attached flared sleeve ends.
- Waist: fitted fabric panels with gold boundary lines; no visible belt, buckle or scabbard attachment in this reference.
- Skirt: preserve the same overlapping pointed panels and visible openings. Do not substitute trousers, a long gown, an unrelated pleated skirt or an armored battle skirt.
- Left/right: matching shoulder armor and wrist cuffs; do not add unilateral accessories during pose changes.

### Equipment and unseen details
- This crop ends at the upper thighs. Boots, lower legs, back construction, sword and scabbard are not visually established by it.
- Earlier profile text described thigh-high boots, a filigree belt and a left-hip scabbard. These were not visually verified and must not be presented as approved costume facts. The visible belt description is superseded by this correction.
- A sword may be requested separately, but its exact geometry/material details and carrying arrangement need an approved reference or explicit user specification. Do not add a belt to accommodate it without a requested costume variant.
- When a full-body/back view needs unseen details, mark them as draft assumptions and ask for approval before treating them as locked design. Do not guess that those details existed in the original image.

## Approved reference
- Original approved local image path: generated-images/aria-01-19bd9ce2-85da-4883-a67f-0faec3521dad.jpg
- Costume clarification image: characters/references/aria-costume-2026-09-17.png (user supplied 2026-09-17; authoritative for visible clothing)
- Source URL if available: N/A
- User approval / pending approval: approved by user (2026-09-17)
- Model, seed, dimensions and parameters used, if known: Schnell text-to-image, seed 40, 1024x1024, num_steps 4, no guidance_scale
- Unseen details that remain assumptions: Back view, footwear and lower legs in the costume crop, weapon construction, hair back silhouette. Exact full-body head count cannot be measured from this crop.

## Variants
- Name, requested changes, reference path, approval status: (none yet)

## Validation notes
- Initial generation metadata above is retained from the previous profile; it was not re-verified during this costume correction.
- Visible garment construction was inspected against the user-supplied costume image on 2026-09-17. Corrected short sleeves, separate plain cuffs, gunmetal pauldrons with gold trim, panel layout, limited embroidery, and absence of a visible waist belt.
- The costume reference is a front-facing crop on a near-white background, not evidence of a full-body 3/4 composition. Use the series presentation rules for new key art without changing the garment construction.
- Future variations must be compared for collar, sleeve length, pauldron shape, chest motif, waist panel borders, skirt panel structure and cuffs; unchanged colors alone do not constitute a match.
- No new image was generated or visually validated after this correction. Text-only generation still cannot guarantee costume identity.
=======

Status: draft
Art direction: ../game-art-design-guideline.md (v1.0)
Design version: 1

## Identity lock
- Adult age impression and personality: mature adult woman, calm disciplined swordswoman (pendekar), composed and focused.
- Exact body proportion within 7.5–8 heads: 7.5–8 heads tall, small head, elegant long-legged silhouette, believable adult anatomy.
- Face structure, eye shape/color, nose, lips: refined mature anime face, soft oval jaw, large but believable blue eyes with detailed iris, subtle eyelashes, small refined nose, delicate lips.
- Skin tone and undertone: soft natural fair skin with warm undertones.
- Hairline, cut, length, silhouette, parting, color: long silver hair, center parting, flowing past mid-back, structured large masses → major locks → secondary locks → selected strands, directional semi-gloss highlights following hair curvature.
- Distinguishing marks and their left/right location: none specified; none assumed.

## Costume and equipment lock
- Garment layers, cuts, seams, fastenings and silhouette: navy warrior outfit with gold accents — structured fitted tunic/armor top, layered skirt or hakama-style lower garment, gold trim and fastenings; silhouette elegant and martial.
- Material assigned to each garment/accessory: matte fabric for cloth, semi-gloss leather for straps/belt, reflective metal for armor plates and sword.
- Main, secondary and accent colors: main navy blue, secondary deep desaturated blue/charcoal, accent gold.
- Weapon: single-edged or double-edged sword, elegant katana-like or straight blade, gold-accented guard and navy-wrapped hilt; right-handed.
- Accessories: gold-trimmed belt/sash at waist; placement assumed symmetrical unless approved.

## Approved reference
- Original approved local image path: (pending)
- Source URL if available: (pending)
- User approval / pending approval: pending
- Model, seed, dimensions and parameters used, if known: flux-1-schnell, seed 40, 1024x1024, 20 steps, guidance 5 (candidate only)
- Unseen details that remain assumptions: back view, exact armor construction, belt/sash details, sword crossguard shape, footwear.

## Variants
- (none yet)

## Validation notes
- Checks actually performed: (pending first candidate)
- Remaining mismatches or unverified details: text-only generation cannot guarantee identity; visual review required.
>>>>>>> a1d7ba22806d7923f32abf71a0d923ebacbacf93
