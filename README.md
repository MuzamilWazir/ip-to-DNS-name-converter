# IP to DNS Name Converter

A simple full-stack web application that converts IP addresses to their DNS hostnames using reverse DNS lookup.

![App Screenshot](assets/screenshot.png)

## Features

- **Reverse DNS Lookup** — Resolve any IPv4 address to its associated hostname
- **CIDR Support** — Works with CIDR notation (e.g. `104.237.160.0/19`), automatically strips the prefix for lookup
- **Error Handling** — Shows clear error messages for invalid IPs or failed lookups
- **Modern UI** — Dark theme with glassmorphism design, animated results, and responsive layout

## How It Works

1. User enters an IP address (or CIDR range) in the frontend form
2. Frontend sends a `GET` request to the backend: `GET /dns?ip=<address>`
3. Backend strips any CIDR suffix and uses Node.js `dns.reverse()` to perform a PTR record lookup
4. The resolved hostname(s) are returned as JSON
5. Frontend displays the result with a success badge, or an error badge on failure

### Example

```
Input:  8.8.8.8
Output: dns.google

Input:  104.237.160.0/19
Output: (lookup is done on 104.237.160.0)
```

## Tech Stack

| Layer    | Technology            |
|----------|-----------------------|
| Frontend | React 19, TypeScript, Vite |
| Backend  | Node.js, Express 5    |
| DNS      | Node.js built-in `dns` module |

## Project Structure

```
iptodns/
├── backend/
│   ├── index.js          # Express server entry point
│   ├── routes/
│   │   └── dns.js        # DNS lookup route handler
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx        # Main UI component
│   │   ├── App.css        # Styles
│   │   ├── index.css      # Global reset
│   │   └── main.tsx       # React entry point
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── assets/
│   └── screenshot.png     # App screenshot
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm

## Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd iptodns

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Usage

Start both servers in separate terminals:

```bash
# Terminal 1 — Backend (runs on port 3000)
cd backend
node index.js

# Terminal 2 — Frontend (runs on port 5173)
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## API Reference

### `GET /dns?ip={ip_address}`

Performs a reverse DNS lookup on the given IP.

**Parameters:**

| Name | Type   | Required | Description                          |
|------|--------|----------|--------------------------------------|
| ip   | string | Yes      | IPv4 address or CIDR (e.g. `8.8.8.8`) |

**Success Response (200):**

```json
{
  "ip": "8.8.8.8",
  "hostnames": ["dns.google"]
}
```

**Error Response (400):**

```json
{
  "error": "getHostByAddr ENOTFOUND 104.237.160.0"
}
```
