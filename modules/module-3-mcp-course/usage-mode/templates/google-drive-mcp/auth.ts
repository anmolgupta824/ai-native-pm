#!/usr/bin/env node

/**
 * Google Drive OAuth Authentication Script
 *
 * Run this ONCE to authorize Claude to access your Google Drive.
 * It opens a browser window where you sign in and click "Allow".
 * After that, Claude can access your Drive files automatically.
 *
 * Usage: node dist/auth.js
 */

import { google } from "googleapis";
import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import { URL } from "url";

const SCOPES = [
  "https://www.googleapis.com/auth/drive.file", // Create/edit only files Claude creates
  "https://www.googleapis.com/auth/drive.readonly", // Read/list all files (can't modify)
];

const HOME = process.env.HOME || "";
const CREDENTIALS_PATH = path.join(HOME, ".google-drive-credentials.json");
const TOKEN_PATH = path.join(HOME, ".google-drive-token.json");

async function authenticate() {
  // Check for credentials file
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(
      `\nCredentials not found at ${CREDENTIALS_PATH}\n` +
        `Download the OAuth credentials JSON from Google Cloud Console and save it there.\n`
    );
    process.exit(1);
  }

  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf-8"));
  const { client_id, client_secret } = credentials.installed;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    "http://localhost:3000/callback"
  );

  // Check if token already exists
  if (fs.existsSync(TOKEN_PATH)) {
    console.log(
      `\nToken already exists at ${TOKEN_PATH}\n` +
        `To re-authenticate, delete the token file first:\n` +
        `  rm ${TOKEN_PATH}\n` +
        `Then run this script again.\n`
    );
    process.exit(0);
  }

  // Generate auth URL
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  console.log("\n🔑 Open this URL in your browser to authorize:\n");
  console.log(authUrl);
  console.log("\nWaiting for authorization...\n");

  // Start local server to catch the OAuth callback
  const code = await new Promise<string>((resolve, reject) => {
    const srv = http.createServer(async (req, res) => {
      try {
        const url = new URL(req.url!, "http://localhost:3000");
        const authCode = url.searchParams.get("code");
        if (authCode) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(
            "<h1>Authorization successful!</h1>" +
              "<p>You can close this tab and go back to Claude Code.</p>"
          );
          srv.close();
          resolve(authCode);
        }
      } catch (err) {
        reject(err);
      }
    });
    srv.listen(3000);
  });

  // Exchange code for tokens
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);

  // Save token
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  console.log(`\nToken saved to ${TOKEN_PATH}`);
  console.log("Google Drive MCP server is now authorized.\n");
  process.exit(0);
}

authenticate().catch((err) => {
  console.error("Auth failed:", err);
  process.exit(1);
});
