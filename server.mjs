import express from 'express'
import cors from 'cors'
import { nanoid } from 'nanoid'

const app = express()
const port = 3011

app.use(cors())
app.use(express.json())

// Mock database
const urls = {}

app.post('/api/shorten', (req, res) => {
  let { originalUrl } = req.body

  // Check if the URL starts with http:// or https://, add http:// if not
  if (!/^https?:\/\//i.test(originalUrl)) {
    originalUrl = 'http://' + originalUrl
  }

  const shortId = nanoid() // Generates a unique string
  urls[shortId] = originalUrl

  res.json({ shortUrl: `http://localhost:${port}/${shortId}` })
})

app.get('/:shortId', (req, res) => {
  const { shortId: shortedId } = req.params
  const originalUrl = urls[shortedId]

  if (originalUrl) {
    console.log('redirected')
    res.redirect(originalUrl)
  } else {
    res.status(404).send('URL not found')
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
