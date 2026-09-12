import { existsSync, mkdirSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import jsonServer from 'json-server'
import multer from 'multer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = process.env.CMS_PORT || 3001
const AUTH_SECRET = process.env.CMS_AUTH_SECRET || 'zyloop-cms-secret'

const server = jsonServer.create()
const router = jsonServer.router(join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults({ noCors: false })

const uploadsDir = join(__dirname, 'public', 'uploads')
if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase()
    cb(null, `${Date.now()}-${safeName}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image uploads are allowed'))
      return
    }
    cb(null, true)
  },
})

function createToken(username) {
  return Buffer.from(`${username}:${AUTH_SECRET}:${Date.now()}`).toString('base64')
}

function isValidToken(token) {
  if (!token) return false
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8')
    const [username, secret] = decoded.split(':')
    return Boolean(username && secret === AUTH_SECRET)
  } catch {
    return false
  }
}

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post('/auth/login', (req, res) => {
  const { username, password } = req.body || {}
  const db = router.db
  const user = db.get('users').find({ username, password }).value()

  if (!user) {
    res.status(401).json({ message: 'Invalid username or password' })
    return
  }

  res.json({
    token: createToken(user.username),
    user: { id: user.id, username: user.username },
  })
})

server.post('/upload', (req, res) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''

  if (!isValidToken(token)) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  upload.single('image')(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err.message || 'Upload failed' })
      return
    }
    if (!req.file) {
      res.status(400).json({ message: 'No image file provided' })
      return
    }
    res.json({ url: `/uploads/${req.file.filename}` })
  })
})

server.use((req, res, next) => {
  const isWrite = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)
  const isPublicRead = req.method === 'GET'
  const isAuthRoute = req.path.startsWith('/auth')
  const isUploadRoute = req.path === '/upload'

  if (isPublicRead || isAuthRoute || isUploadRoute) {
    next()
    return
  }

  if (isWrite) {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
    if (!isValidToken(token)) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
  }

  next()
})

server.use(router)

server.listen(PORT, () => {
  console.log(`CMS JSON Server running at http://localhost:${PORT}`)
})
