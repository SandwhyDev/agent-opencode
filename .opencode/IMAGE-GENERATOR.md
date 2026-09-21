# Standalone image generator

Requires Node.js 18+ and Python 3 on PATH. On a new device, copy `.env.example` to `.env` in the
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


## Schnell defaults

```json
{"prompt":"Your image description","height":1024,"width":1024,"num_steps":4,"seed":40}
```

Schnell accepts 1-8 steps; requests above 8 are rejected locally. The helper no
longer sends guidance_scale to Schnell, even if a legacy request includes it.
Inpainting retains its separate 1-20 step range and guidance parameter.
Source: https://www.pixazo.ai/models/flux (Flux 1 Schnell request parameters).


## Python image downloads

Image downloads now use `download-image.py` (Python standard library, no pip
packages). Generation still uses Node.js. Run `python --version` to check setup.
For a custom interpreter, set the environment variable PYTHON_EXECUTABLE to its
full executable path. Only PIXAZO_API_KEY is loaded from .env.

HTTPS verification remains enabled. A browser opening an image successfully does
not prove the Python certificate chain is valid; browser and Python trust/proxy
configuration may differ. Certificate errors are reported as certificate errors,
not described as an internet permission block. On failure, JSON is retained.

Python checks: `python -B .opencode/scripts/test_download_image.py`.


## Pixazo storage DNS fallback

On 2026-09-17, local DNS mapped Pixazo's R2 storage domain to a filtering page,
causing a TLS hostname mismatch. The downloader now retries certificate failures
for that exact storage hostname using Google DNS-over-HTTPS. It connects to a
public resolved address while retaining the original Host, TLS SNI and certificate
hostname verification. No Windows DNS settings are changed and TLS verification
is never disabled. Other hosts do not receive this fallback; redirects remain blocked.

An actual Aria image download succeeded after this fix. If secure DNS or the image
server is unreachable on another device, the helper still reports the failure and
keeps request/response JSON for retry without another generation.
