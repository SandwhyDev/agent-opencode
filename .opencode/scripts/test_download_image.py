import io
import unittest
from unittest.mock import Mock, patch
import ssl
import urllib.error
from importlib.util import spec_from_file_location, module_from_spec
from pathlib import Path

spec = spec_from_file_location('download_image', Path(__file__).with_name('download-image.py'))
module = module_from_spec(spec)
spec.loader.exec_module(module)


class DownloaderTests(unittest.TestCase):
    def test_bytes_and_no_api_credentials(self):
        response = io.BytesIO(b'image-bytes')
        response.headers = {}
        opener = Mock()
        opener.open.return_value = response
        self.assertEqual(module.download('https://example.com/image', opener), b'image-bytes')
        request = opener.open.call_args.args[0]
        self.assertNotIn('Ocp-apim-subscription-key', request.headers)
        self.assertEqual(opener.open.call_args.kwargs['timeout'], 30)

    def test_verified_dns_fallback_only_for_pixazo_certificate_failure(self):
        failure = urllib.error.URLError(ssl.SSLCertVerificationError('hostname mismatch'))
        normal = Mock()
        normal.open.side_effect = failure
        secure = Mock()
        response = io.BytesIO(b'image')
        response.headers = {}
        secure.open.return_value = response
        with patch.object(module.urllib.request, 'build_opener', return_value=normal), patch.object(module, 'verified_doh_opener', return_value=secure) as fallback:
            self.assertEqual(module.download('https://' + module.PIXAZO_IMAGE_HOST + '/image.png'), b'image')
            fallback.assert_called_once_with(module.PIXAZO_IMAGE_HOST)
            fallback.reset_mock()
            with self.assertRaises(urllib.error.URLError):
                module.download('https://example.com/image.png')
            fallback.assert_not_called()

    def test_dns_fallback_rejects_other_hosts(self):
        with self.assertRaises(ValueError):
            module.verified_doh_opener('example.com')

    def test_rejects_unsafe_urls_and_redirects(self):
        for url in ['http://example.com/a', 'file:///a', 'https://user:pass@example.com/a']:
            with self.assertRaises(ValueError):
                module.download(url, Mock())
        with self.assertRaises(ValueError):
            module.NoRedirect().redirect_request(None, None, 302, '', {}, 'http://example.com')

    def test_size_limit(self):
        response = io.BytesIO(b'')
        response.headers = {'Content-Length': str(module.MAX_BYTES + 1)}
        opener = Mock()
        opener.open.return_value = response
        with self.assertRaisesRegex(ValueError, '32 MB'):
            module.download('https://example.com/a', opener)


if __name__ == '__main__':
    unittest.main()
