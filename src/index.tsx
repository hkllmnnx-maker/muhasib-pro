import { Hono } from 'hono'
import { HomePage } from './pages/home'
import { CoursesPage } from './pages/courses'
import { CoursePage } from './pages/course'
import { LessonPage } from './pages/lesson'
import { QuizPage } from './pages/quiz'
import { ToolsPage } from './pages/tools'
import { RoadmapPage } from './pages/roadmap'
import { GlossaryPage } from './pages/glossary'
import { BlogPage, ArticlePage } from './pages/blog'
import { AboutPage } from './pages/about'
import { getCourseBySlug, findLesson } from './data'
import { getQuizById } from './data/quizzes'
import { getArticleBySlug } from './data/articles'

const app = new Hono()

// ==========================================================================
//  المسارات (Routes) - منصة محاسب برو
// ==========================================================================

// الصفحة الرئيسية
app.get('/', (c) => c.html(HomePage().toString()))

// الدورات
app.get('/courses', (c) => c.html(CoursesPage().toString()))

// مسار التعلّم
app.get('/roadmap', (c) => c.html(RoadmapPage().toString()))

// الأدوات الحاسبية
app.get('/tools', (c) => c.html(ToolsPage().toString()))

// القاموس
app.get('/glossary', (c) => c.html(GlossaryPage().toString()))

// المدونة
app.get('/blog', (c) => c.html(BlogPage().toString()))
app.get('/blog/:slug', (c) => {
  const slug = c.req.param('slug')
  const article = getArticleBySlug(slug)
  if (!article) return c.notFound()
  return c.html(ArticlePage(article).toString())
})

// عن المنصة
app.get('/about', (c) => c.html(AboutPage().toString()))

// الاختبار
app.get('/quiz/:id', (c) => {
  const id = c.req.param('id')
  const quiz = getQuizById(id)
  if (!quiz) return c.notFound()
  return c.html(QuizPage(quiz).toString())
})

// صفحة الدرس — يجب أن تأتي قبل تفاصيل الدورة لتجنّب التعارض في المطابقة
app.get('/course/:slug/:lessonSlug', (c) => {
  const slug = c.req.param('slug')
  const lessonSlug = c.req.param('lessonSlug')
  const found = findLesson(slug, lessonSlug)
  if (!found) return c.notFound()
  return c.html(LessonPage(found.course, found.lesson, found.flatIndex).toString())
})

// تفاصيل الدورة
app.get('/course/:slug', (c) => {
  const slug = c.req.param('slug')
  const course = getCourseBySlug(slug)
  if (!course) return c.notFound()
  return c.html(CoursePage(course).toString())
})

// صفحة 404
app.notFound((c) =>
  c.html(
    `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>الصفحة غير موجودة | محاسب برو</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap"><style>body{font-family:'Cairo',sans-serif;background:#0f172a;color:#fff;text-align:center;padding:80px 20px;margin:0;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center}h1{font-size:7rem;margin:0;background:linear-gradient(135deg,#3b82f6,#fbbf24);-webkit-background-clip:text;background-clip:text;color:transparent}p{font-size:1.3rem;opacity:.8;margin:10px 0 30px}a{background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:700;font-size:1.1rem}</style></head><body><h1>404</h1><p>عذرًا، الصفحة التي تبحث عنها غير موجودة.</p><a href="/">🏠 العودة للرئيسية</a></body></html>`,
    404
  )
)

export default app
