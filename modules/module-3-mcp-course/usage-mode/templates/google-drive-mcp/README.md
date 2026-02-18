# Google Drive MCP Server

Connect Claude Code to Google Drive. List files, read documents, create Google Docs, and share files.

## Tools

| Tool | Description |
|------|-------------|
| `list_files` | List recent files from Google Drive |
| `read_file` | Read content from Google Docs, Sheets, Slides, or regular files |
| `create_doc` | Create a new Google Doc |
| `share_file` | Share a file with another user by email |

## Setup

### 1. Google Cloud credentials

Download OAuth credentials JSON from Google Cloud Console and save to:
```
~/.google-drive-credentials.json
```

### 2. Install and build

```bash
cd ~/mcp-servers/google-drive
npm install
npm run build
```

### 3. Authorize

```bash
node dist/auth.js
```

Open the URL shown in your browser, sign in with Google, and click "Allow".
Token is saved to `~/.google-drive-token.json`.

### 4. Register in .mcp.json

Add to your project's `.mcp.json`:

```json
{
  "mcpServers": {
    "google-drive": {
      "command": "node",
      "args": ["/Users/YOUR_USERNAME/mcp-servers/google-drive/dist/index.js"]
    }
  }
}
```

### 5. Restart Claude Code

Type `/exit`, then `claude` to load the new tools.

## Permissions

This server uses two scopes:
- `drive.file` — Create and edit only files that Claude creates (can't touch your existing files)
- `drive.readonly` — Read and list all files (but can't modify or delete them)
