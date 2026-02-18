#!/usr/bin/env node

/**
 * Google Sheets OAuth Authentication Script
 *
 * Run this ONCE to authorize Claude to access your Google Sheets.
 * It opens a browser window where you sign in and click "Allow".
 * After that, Claude can access your Sheets automatically.
 *
 * If you already authorized Google Drive (Lesson 4), this script
 * will reuse those credentials — you may just need to authorize
 * the additional Sheets scope.
 *
 * Usage: node dist/auth.js
 */

import { google } from "googleapis";
import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import { URL } from "url";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets", // Read and write spreadsheets
  "https://www.googleapis.com/auth/drive.readonly", // List/find spreadsheets in Drive
];

const HOME = process.env.HOME || "";

// Reuse Google Drive credentials if they exist (same Google Cloud project)
const DRIVE_CREDENTIALS_PATH = path.join(HOME, ".google-drive-credentials.json");
const SHEETS_CREDENTIALS_PATH = path.join(HOME, ".google-sheets-credentials.json");
const TOKEN_PATH = path.join(HOME, ".google-sheets-token.json");

function getCredentialsPath(): string {
  // Prefer Drive credentials (same Google Cloud project, already set up in Lesson 4)
  if (fs.existsSync(DRIVE_CREDENTIALS_PATH)) {
    console.log(`\nReusing Google Drive credentials from ${DRIVE_CREDENTIALS_PATH}`);
    return DRIVE_CREDENTIALS_PATH;
  }
  if (fs.existsSync(SHEETS_CREDENTIALS_PATH)) {
    return SHEETS_CREDENTIALS_PATH;
  }
  console.error(
    `\nCredentials not found.\n` +
      `Looked for:\n` +
      `  ${DRIVE_CREDENTIALS_PATH} (from Google Drive lesson)\n` +
      `  ${SHEETS_CREDENTIALS_PATH}\n\n` +
      `If you completed Lesson 4 (Google Drive), the credentials should already be there.\n` +
      `Otherwise, download the OAuth credentials JSON from Google Cloud Console and save it to:\n` +
      `  ${SHEETS_CREDENTIALS_PATH}\n`
  );
  process.exit(1);
}

async function authenticate() {
  const credentialsPath = getCredentialsPath();
  const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf-8"));
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
  console.log("Google Sheets MCP server is now authorized.\n");
  process.exit(0);
}

authenticate().catch((err) => {
  console.error("Auth failed:", err);
  process.exit(1);
});
