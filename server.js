import { existsSync, mkdirSync, unlinkSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import jsonServer from 'json-server'
import multer from 'multer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = process.env.CMS_PORT || 3001
const AUTH_SECRET = process.env.CMS_AUTH_SECRET || 'zyloop-cms-secret'

const server = jsonServer.create()
const router = jsonServer.router(join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults({
  noCors: false,
  bodyParser: false,
  static: join(__dirname, 'public'),
})

const uploadsDir = join(__dirname, 'public', 'uploads')
if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true })
}

const DEFAULT_SITE_SETTINGS = {
  id: 1,
  testimonialsEnabled: false,
  logoUrl: '/images/logo.png',
  heroVideoUrl: '/images/zyloop-ai.webm',
  heroVideoType: 'video/webm',
  heroPosterUrl: '/images/slide1.jpg',
  heroBadge: 'Zyloop Automate',
  heroHeading: 'Automate What',
  heroAccent: 'Matters',
  heroText:
    'Build intelligent AI workflows and let Zyloop automate WhatsApp, CRM, healthcare, finance, and everyday business operations.',
  heroPrimaryCta: 'Explore Automate',
  heroSolutionId: 'zyloopflow',
}

function ensureSettings() {
  const db = router.db
  if (!db.has('settings').value()) {
    db.set('settings', [DEFAULT_SITE_SETTINGS]).write()
    return
  }
  const current = db.get('settings').find({ id: 1 }).value()
  if (!current) {
    db.get('settings').push(DEFAULT_SITE_SETTINGS).write()
  }
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase()
    cb(null, `${Date.now()}-${safeName}`)
  },
})

const uploadImage = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image uploads are allowed'))
      return
    }
    cb(null, true)
  },
})

const uploadVideo = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const name = String(file.originalname || '').toLowerCase()
    const type = String(file.mimetype || '').toLowerCase()
    const isVideo =
      type.startsWith('video/') ||
      type === 'application/octet-stream' ||
      name.endsWith('.mp4') ||
      name.endsWith('.webm') ||
      name.endsWith('.mov') ||
      name.endsWith('.ogg')
    if (!isVideo) {
      cb(new Error('Only MP4 or WEBM video uploads are allowed'))
      return
    }
    cb(null, true)
  },
})

function deleteUploadedFile(url) {
  if (!url || typeof url !== 'string' || !url.startsWith('/uploads/')) return
  const filename = basename(url.split('?')[0])
  if (!filename || filename.includes('..')) return
  const filePath = join(uploadsDir, filename)
  if (existsSync(filePath)) unlinkSync(filePath)
}

function videoTypeFromName(filename = '') {
  const name = filename.toLowerCase()
  if (name.endsWith('.webm')) return 'video/webm'
  if (name.endsWith('.ogg') || name.endsWith('.ogv')) return 'video/ogg'
  return 'video/mp4'
}

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

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  if (!isValidToken(token)) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
  next()
}

server.use(middlewares)

server.post('/upload', requireAuth, (req, res) => {
  uploadImage.single('image')(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err.message || 'Upload failed' })
      return
    }
    if (!req.file) {
      res.status(400).json({ message: 'No image file provided' })
      return
    }
    deleteUploadedFile(req.body?.replaceUrl)
    res.json({ url: `/uploads/${req.file.filename}` })
  })
})

server.post('/upload-video', requireAuth, (req, res) => {
  uploadVideo.single('video')(req, res, (err) => {
    if (err) {
      const tooLarge = err.code === 'LIMIT_FILE_SIZE'
      res.status(400).json({
        message: tooLarge
          ? 'Video is too large. Please upload an MP4 or WEBM under 200 MB.'
          : err.message || 'Video upload failed',
      })
      return
    }
    if (!req.file) {
      res.status(400).json({ message: 'No video file provided' })
      return
    }
    deleteUploadedFile(req.body?.replaceUrl)
    res.json({
      url: `/uploads/${req.file.filename}`,
      type: videoTypeFromName(req.file.filename),
    })
  })
})

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

server.use((req, res, next) => {
  const isWrite = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)
  const isPublicRead = req.method === 'GET'
  const isAuthRoute = req.path.startsWith('/auth')
  const isUploadRoute = req.path === '/upload' || req.path === '/upload-video'

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

ensureSettings()
server.use(router)

const httpServer = server.listen(PORT, () => {
  console.log(`CMS JSON Server running at http://localhost:${PORT}`)
})

httpServer.timeout = 10 * 60 * 1000
httpServer.headersTimeout = 11 * 60 * 1000
httpServer.requestTimeout = 10 * 60 * 1000
