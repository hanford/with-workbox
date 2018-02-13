const { createServer } = require('http')
const { parse } = require('url')

const next = require('next')
const { join } = require('path')

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl

      if (pathname === '/workbox-sw.prod.v2.1.2.js') {
        app.serveStatic(req, res, join(__dirname, '.next', 'workbox-sw.prod.v2.1.2.js'))
      }

      if (pathname === '/service-worker.js' || pathname === '/sw.js') {
        app.serveStatic(req, res, join(__dirname, '.next', 'service-worker.js'))
      } else {
        handle(req, res, parsedUrl)
      }
    })
    .listen(3000, () => {
      console.log(`> Ready on http://localhost:${3000}`)
    })
  })
