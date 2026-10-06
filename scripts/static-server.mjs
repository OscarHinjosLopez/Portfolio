import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

export async function browserOutput() {
  const config = JSON.parse(await readFile('angular.json', 'utf8'));
  const project = Object.values(config.projects).find(
    (project) => project.projectType === 'application',
  );
  const build = project.architect.build;
  const options = { ...build.options, ...build.configurations[build.defaultConfiguration] };
  const output = options.outputPath;
  return path.resolve(
    typeof output === 'string'
      ? path.join(output, 'browser')
      : path.join(output.base, output.browser ?? 'browser'),
  );
}

/** Serve actual SSG files, gzip text responses and preserve HTTP 404 semantics. */
export async function startStaticServer(port = 4173) {
  const root = await browserOutput();
  const mime = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain',
    '.xml': 'application/xml',
    '.pdf': 'application/pdf',
  };
  const server = http.createServer(async (req, res) => {
    try {
      let file = path.resolve(
        root,
        `.${decodeURIComponent(new URL(req.url, 'http://localhost').pathname)}`,
      );
      if (!file.startsWith(root + path.sep) && file !== root) {
        res.writeHead(400).end();
        return;
      }
      try {
        if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
        await stat(file);
      } catch {
        file = path.join(root, '404/index.html');
        res.statusCode = 404;
      }
      const type = mime[path.extname(file)] ?? 'application/octet-stream';
      let body = await readFile(file);
      res.setHeader('Content-Type', type);
      res.setHeader('Vary', 'Accept-Encoding');
      if (
        /text|javascript|json|xml|svg/.test(type) &&
        req.headers['accept-encoding']?.includes('gzip')
      ) {
        body = gzipSync(body);
        res.setHeader('Content-Encoding', 'gzip');
      }
      res.end(body);
    } catch {
      res.writeHead(500).end();
    }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', resolve);
  });
  return server;
}
