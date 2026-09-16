# Standalone image generator

Requires Node.js 18+. On a new device, copy `.env.example` to `.env` in the
workspace root, then set `PIXAZO_API_KEY=your_key` in that file.

The helper reads the root .env on every run. A non-empty .env key overrides the
environment variable; an empty or missing .env key falls back to the environment.
No terminal restart is required after editing .env. Only PIXAZO_API_KEY is loaded.
.env is ignored by Git; .env.example contains no credentials and can be committed.
Never paste API keys into tracked documentation or chat output.

Run `opencode --agent image-generator` from this workspace.
Generic images use free Flux Schnell. Paid routes remain disabled.

## Character pose changes

The local mask tool and manual mask workflow have been removed at the user's
request. Luna's profile and original reference are preserved. Keeping the exact
same character with a different pose is not currently supported by this setup.

The low-level inpainting API integration is retained for explicit inpainting
requests with an existing public mask URL; it is not a pose-consistency solution.
No mask editor or automatic upload service is included.

Validation: `node --test .opencode/scripts/generate-image.test.mjs`.


## Automatic local image saving

Completed results are downloaded automatically to `generated-images/` as PNG,
JPEG or WebP, using unique filenames without overwriting existing images.
The CLI reports absolute paths in `image_files`. Request and response JSON are temporary and removed after all images are saved successfully. Downloads never forward your Pixazo API key to image storage.

If generation succeeds but download fails, retry only the download:
`node .opencode/scripts/generate-image.mjs --download generated-images/<saved-response>.json`
This also downloads images from earlier saved responses without generating again.
Pending jobs do not create image files; `--status <request_id>` downloads once a
completed result is returned. Repeating a download creates a separate local copy.

Checks: `node --test .opencode/scripts/*.test.mjs`.


## Temporary JSON cleanup

After every image is saved successfully, the helper deletes the matching request
and response JSON inside generated-images. Pending, failed and partially failed
downloads keep JSON for recovery. Files changed since generation are preserved.
Download retries also clean up the associated JSON. Legacy responses without
request metadata can remove only their own response file, not guess a request.
Existing JSON is not bulk-deleted. Image files and character profiles are retained.
