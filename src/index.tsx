import { Hono } from 'hono'
import { HomePage } from './pages/home'

const app = new Hono()

// الصفحة الرئيسية
app.get('/', (c) => c.html(HomePage().toString()))

// صفحة 404
app.notFound((c) =>
  c.html(
    `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>الصفحة غير موجودة</title></head><body style="font-family:sans-serif;text-align:center;padding:80px"><h1>404</h1><p>الصفحة غير موجودة</p><a href="/">العودة للرئيسية</a></body></html>`,
    404
  )
)

export default app
