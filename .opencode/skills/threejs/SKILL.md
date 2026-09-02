---
name: threejs
description: Three.js engineering guidance for 3D scenes, cameras, controls, animation, geometry, materials, particles, interaction, and performance.
---

# Three.js Skill

## Architecture

Separate concerns where appropriate:

- Scene
- Camera
- Renderer
- Player
- Controls
- Environment
- Animation
- Effects
- HUD
- Game/application loop

Do not over-engineer small projects.

## Render Loop

Use delta time for movement and animation.

Avoid creating unnecessary objects inside the render loop.

Do not recreate:

- Geometry
- Materials
- Textures
- Large arrays

every frame.

## Camera

For follow cameras:

- Keep camera updates predictable.
- Use smooth interpolation when appropriate.
- Avoid competing camera controllers.
- Avoid updating the camera from multiple unrelated systems.
- Ensure movement and camera updates use consistent timing.

When debugging camera jitter:

1. Reproduce the issue.
2. Inspect player transform updates.
3. Inspect camera target updates.
4. Inspect interpolation.
5. Inspect render/update order.
6. Check for multiple camera updates.
7. Identify the actual root cause.
8. Apply the smallest appropriate fix.
9. Test normal movement and high-speed movement.

Do not guess that interpolation is the cause without evidence.

## Movement

Use delta time.

Movement speed should not depend on FPS.

Separate:

- Input state
- Movement calculation
- Transform update
- Camera update

when practical.

## Performance

Prefer:

- Reusable geometry.
- Reusable materials.
- InstancedMesh for repeated objects.
- Efficient texture sizes.
- Controlled particle counts.
- Frustum culling where useful.

Avoid:

- Excessive draw calls.
- Excessive individual Mesh objects.
- Heavy computation every frame.
- Creating/discarding objects every frame.

## Materials

Reuse materials where possible.

Avoid unnecessary shader complexity.

## Effects

Particles, glow, trails, and post-processing should be introduced only when they provide meaningful visual value.

Always consider performance.

## Interaction

Use Raycaster when object selection or interaction is required.

Keep interaction logic separate from rendering logic when practical.
