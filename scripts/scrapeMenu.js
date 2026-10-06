import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import axios from 'axios'
import * as cheerio from 'cheerio'

const BASE = 'https://www.familymartindonesia.com/'
const CANDIDATES = ['', 'menu/', 'famicafe/', 'promo/']
const OUT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/data/products.json',
)
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml',
}

const FALLBACK_CATEGORIES = [
  {
    id: 'famicafe',
    label: 'FamiCafe',
    items: [
      { name: 'Kopi Susu Keluarga', price: 15000 },
      { name: 'Ice Doger', price: 15000 },
      { name: 'Matcha Green Tea', price: 18000 },
    ],
  },
  {
    id: 'hot-snacks',
    label: 'Hot Snacks',
    items: [
      { name: 'Crispy Chicken Dada/Paha', price: 17000 },
      { name: 'Sosis Bakar Bratwurst', price: 12000 },
      { name: 'Pao Telur Asin', price: 9000 },
    ],
  },
  {
    id: 'oden',
    label: 'Oden',
    items: [
      { name: 'Oden Kuah Spicy Combo', price: 25000 },
      { name: 'Fish Cake', price: 6000 },
      { name: 'Lobak', price: 5000 },
    ],
  },
  {
    id: 'meals',
    label: 'Meals & Bento',
    items: [
      { name: 'Nasi Ayam Teriyaki', price: 28000 },
      { name: 'Spaghetti Bolognese', price: 22000 },
    ],
  },
  {
    id: 'famiice',
    label: 'FamiIce',
    items: [
      { name: 'FamiIce Cone Vanilla', price: 9000 },
      { name: 'FamiIce Cup Chocolate', price: 12000 },
    ],
  },
]

const PRICE_RE = /^(.+?)\s*[—–\-:]?\s*Rp\.?\s*([\d.,]{2,})\s*$/i
const HEADINGS = ['h1', 'h2', 'h3', 'h4']

function extractFromHtml(html) {
  const $ = cheerio.load(html)
  const root = $('#root')
  if (root.length > 0 && root.children().length === 0) {
    return { error: 'client-side rendered SPA shell: no server HTML to parse' }
  }
  const slug = (label) =>
    label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  const categories = []
  let current = null
  $('h1, h2, h3, h4, li, p, td, span').each((_, el) => {
    const tag = (el.tagName || '').toLowerCase()
    if (HEADINGS.includes(tag)) {
      const label = $(el).text().trim()
      const masked = label.replace(/\s+/g, ' ')
      if (masked.length >= 3 && masked.length <= 40) {
        current = { id: slug(masked), label: masked, items: [] }
        categories.push(current)
      }
      return
    }
    if (!current) return
    const text = $(el).clone().children().remove().end().text().trim()
    const match = PRICE_RE.exec(text.replace(/\s+/g, ' '))
    if (!match) return
    const name = match[1].trim()
    const digits = match[2].replace(/[^\d]/g, '')
    const price = Number(digits)
    if (!name || name.length < 3 || name.length > 60 || price < 500) return
    if (current.items.some((item) => item.name.toLowerCase() === name.toLowerCase())) return
    current.items.push({ name, price })
  })
  return { categories: categories.filter((category) => category.items.length > 0) }
}

async function fetchPage(url) {
  try {
    const response = await axios.get(url, {
      headers: HEADERS,
      timeout: 15000,
      validateStatus: () => true,
    })
    if (response.status !== 200) return null
    return String(response.data)
  } catch {
    return null
  }
}

async function main() {
  let result = null

  for (const suffix of CANDIDATES) {
    const url = BASE + suffix
    console.log(`fetching ${url}`)
    const html = await fetchPage(url)
    if (!html) {
      console.log(`  blocked or not found, skipping`)
      continue
    }
    const extracted = extractFromHtml(html)
    if (extracted.error) {
      console.log(`  ${extracted.error}, skipping`)
      continue
    }
    if (extracted.categories.length > 0) {
      const items = extracted.categories.reduce(
        (sum, category) => sum + category.items.length,
        0,
      )
      console.log(
        `  parsed ${extracted.categories.length} categories / ${items} items`,
      )
      result = { source: url, categories: extracted.categories }
      break
    }
    console.log(`  no priced menu items found, trying next candidate`)
  }

  if (!result) {
    console.log(
      'live scrape produced no priced menu data, writing realistic local fallback',
    )
    result = { source: 'local-fallback', categories: FALLBACK_CATEGORIES }
  }

  const data = {
    generatedAt: new Date().toISOString(),
    source: result.source,
    categories: result.categories,
  }
  await writeFile(OUT, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  const items = data.categories.reduce(
    (sum, category) => sum + category.items.length,
    0,
  )
  console.log(
    `wrote ${data.categories.length} categories / ${items} items (${data.source}) to ${OUT}`,
  )
}

main()
