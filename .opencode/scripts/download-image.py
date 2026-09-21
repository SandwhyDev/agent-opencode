"""Download image bytes over verified HTTPS; no third-party packages required."""
import ssl
import http.client
import ipaddress
import json
import socket
import sys
import urllib.error
import urllib.parse
import urllib.request

MAX_BYTES = 32 * 1024 * 1024
PIXAZO_IMAGE_HOST = 'pub-582b7213209642b9b995c96c95a30381.r2.dev'


def verified_doh_opener(host):
    """Resolve only Pixazo's known storage host; still validate TLS against host."""
    if host != PIXAZO_IMAGE_HOST:
        raise ValueError('DNS fallback is limited to Pixazo image storage.')
    request = urllib.request.Request(
        'https://dns.google/resolve?name=' + host + '&type=A',
        headers={'Accept': 'application/dns-json'})
    with urllib.request.urlopen(request, timeout=15, context=ssl.create_default_context()) as response:
        data = json.loads(response.read(65536))
    addresses = [item['data'] for item in data.get('Answer', [])
                 if item.get('type') == 1 and ipaddress.ip_address(item['data']).is_global]
    if data.get('Status') != 0 or not addresses:
        raise ValueError('Secure DNS returned no public image server address.')

    def connection(server, **kwargs):
        if server != host:
            raise ValueError('Unexpected host in secure DNS download.')
        conn = http.client.HTTPSConnection(server, **kwargs)

        def connect(address, timeout=60, source_address=None):
            last_error = None
            for ip in addresses:
                try:
                    return socket.create_connection((ip, 443), timeout, source_address)
                except OSError as error:
                    last_error = error
            raise last_error

        conn._create_connection = connect
        # HTTPSConnection.connect still uses the original hostname for SNI
        # and certificate verification, never the IP as the TLS identity.
        return conn

    class ResolvedHTTPSHandler(urllib.request.HTTPSHandler):
        def https_open(self, req):
            return self.do_open(connection, req, context=ssl.create_default_context())

    return urllib.request.build_opener(urllib.request.ProxyHandler({}), ResolvedHTTPSHandler(), NoRedirect())


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        raise ValueError('Image URL redirected. Use the final HTTPS image URL.')


def download(url, opener=None):
    parsed = urllib.parse.urlsplit(url)
    if parsed.scheme != 'https' or not parsed.hostname or parsed.username or parsed.password:
        raise ValueError('Image URL must use HTTPS without credentials.')
    use_fallback = opener is None and parsed.hostname == PIXAZO_IMAGE_HOST and parsed.port in (None, 443)
    if opener is None:
        # Uses the normal Python trust store, including Windows certificates.
        context = ssl.create_default_context()
        opener = urllib.request.build_opener(
            urllib.request.HTTPSHandler(context=context), NoRedirect())
    request = urllib.request.Request(url, headers={'Accept': 'image/*', 'User-Agent': 'PixazoImageDownloader/1.0'})
    try:
        response = opener.open(request, timeout=30)
    except urllib.error.URLError as error:
        if not use_fallback or not isinstance(error.reason, ssl.SSLCertVerificationError):
            raise
        response = verified_doh_opener(parsed.hostname).open(request, timeout=30)
    with response:
        if int(response.headers.get('Content-Length', '0')) > MAX_BYTES:
            raise ValueError('Image exceeds 32 MB.')
        data = response.read(MAX_BYTES + 1)
        if len(data) > MAX_BYTES:
            raise ValueError('Image exceeds 32 MB.')
        if not data:
            raise ValueError('Empty image response.')
        return data


def main():
    try:
        # URL travels through stdin, never through shell interpolation.
        url = sys.stdin.read().strip()
        data = download(url)
        sys.stdout.buffer.write(data)
    except urllib.error.HTTPError as error:
        print(f'Image download HTTP {error.code}.', file=sys.stderr)
        return 1
    except urllib.error.URLError as error:
        if isinstance(error.reason, ssl.SSLCertVerificationError):
            print('HTTPS certificate verification failed. Check system time and certificate chain; verification remains enabled.', file=sys.stderr)
        else:
            print(f'Python network error: {error.reason}', file=sys.stderr)
        return 1
    except Exception as error:
        print(str(error), file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
