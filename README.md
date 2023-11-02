# file-resize

Server for file resize

## Commands

Command to run Docker

```bash
docker build -t file-resize .
docker run -d -p 127.0.0.1:5000:5000/tcp file-resize 
```

Command to run locally

```bash
npm ci
npm run dev # start in dev mode with nodemon

# or
npm ci
npm run build 
npm start # start in production mode
```

## Usage

For PDF reduce quality and join multiples files into one

```json
{
  "files": ["base64file-1","base64file-2"],
  "resolution": "screen"
}
```

For Image reduce quality

```json
{
  "file": "base64file",
  "extension": "png",
  "resolution": 8
}
```
