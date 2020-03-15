// Super simple web server just to serve static files on local computer.
import { createServer, IncomingMessage, ServerResponse } from "http";
import { createReadStream, exists } from "fs";
import { extname, join } from "path";

const mimes: Record<string, string> = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".map": "application/octet-stream",
};

const port = process.env.port ?? 1337
createServer((req: IncomingMessage, res: ServerResponse) => {
    const url = (req.url === "/" ? "index.html" : req.url) ?? "index.html";
    if (url.indexOf("..") > -1) {
        res.writeHead(404);
        res.end();
        return;
    }

    let fileExt = extname(url);
    let mimeType = mimes[fileExt];

    if (!mimeType) {
        res.writeHead(404);
        res.end();
        return;
    }

    const fullPath = join(__dirname, url);
    exists(fullPath, (exists: boolean) => {
        if (!exists) {
            res.writeHead(404);
            res.end();
            return;
        }

        res.writeHead(200, { "Content-Type": mimeType });
        createReadStream(fullPath).pipe(res);
    });
}).listen(port);