# Node.js Training — Day Two

Scripts covering Node.js event loop, file I/O, HTTP servers, and streams.

## Prerequisites

- Node.js v18+ (uses built-in `fetch`)
- No external npm packages required

---

## Scripts

### 1. `index.js` — Event Loop Order

Demonstrates the execution order of `setTimeout`, `Promise`, `setImmediate`, and `process.nextTick`.

```bash
node index.js
```

Expected output order: `1, 6, 7, 3, 2, 4, 5`

---

### 2. `readFileHandler.js` — File Reading (3 styles)

Reads `read.txt` using callback, Promise, and async/await patterns.

```bash
node readFileHandler.js
```

Requires `read.txt` to exist in the same directory.

---

### 3. `httpServer.js` — HTTP Server

A minimal HTTP server on port **3000** with a body-parsing middleware.

```bash
node httpServer.js
```

| Route | Method | Description |
|-------|--------|-------------|
| `/health` | GET | Returns server status |
| `/echo` | POST | Echoes back a success response |

**Example requests:**

```bash
# Health check
curl http://localhost:3000/health

# Echo endpoint
curl -X POST http://localhost:3000/echo \
  -H "Content-Type: application/json" \
  -d '{"message": "hello"}'
```

---

### 4. `fetchHandler.js` — Parallel vs Sequential API Requests

Fires requests to 8 public APIs in **parallel** (`Promise.allSettled`) and then **sequentially** (`for...of`), logging the time taken for each approach.

```bash
node fetchHandler.js
```

Requires internet access. Some APIs may be slow or unavailable.

---

### 5. `largerFileTransfer.js` — Stream with Transform

Reads `sample.txt`, transforms its content to **uppercase**, and writes the result to `export.txt` using Node.js streams.

```bash
node largerFileTransfer.js
```

Requires `sample.txt` to exist in the same directory. Output is written to `export.txt`.

---

## File Dependencies

| Script | Input file needed | Output file |
|--------|-------------------|-------------|
| `readFileHandler.js` | `read.txt` | — |
| `largerFileTransfer.js` | `sample.txt` | `export.txt` |
