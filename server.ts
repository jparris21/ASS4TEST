"use strict";

import * as http from "http";
import * as fs from 'fs';
import * as mime from 'mime-types';
import connect from './config/connect'; // Import the database connection function

let lookup = mime.lookup;

const port = process.env.PORT || 3001;

async function startServer() {
    try {
        await connect(); // Connect to MongoDB
        console.log('Connected to MongoDB');

        const server = http.createServer((req, res) => {
            let path = req.url as string;

            if (path === "/" || path === "/home") {
                path = "/index.html";
            }
            let mime_type = lookup(path.substring(1)) as string;

            fs.readFile(__dirname + path, function (err, data) {
                if (err) {
                    res.writeHead(404);
                    res.end("Error 404 - File Not Found" + err.message);
                    return;
                }
                if (!mime_type) {
                    mime_type = 'test/plain';
                }

                // Set content security headers and respond with the file
                res.setHeader("X-Content-Type-Options", "nosniff");
                res.writeHead(200, { 'Content-Type': mime_type });
                res.end(data);
            });
        });

        server.listen(port, () => {
            console.log(`Server running at http://localhost:${port}/`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}

startServer();
