import { html, raw } from 'hono/html'
import { Layout } from '../components/layout'
import { Quiz } from '../data/types'
import { getCourseBySlug } from '../data'

// ==========================================================================
//  صفحة الاختبار (Quiz Page)
// ==========================================================================

export const QuizPage = (quiz: Quiz) => {
  const course = quiz.courseSlug ? getCourseBySlug(quiz.courseSlug) : undefined

  // بيانات الاختبار للمتصفح.
  // تأمين الحقن داخل وسم <script>: نهرّب المحارف التي قد تُنهي الوسم مبكرًا
  // (</script>) أو تكسر السياق (<, >, &, U+2028, U+2029) لمنع XSS / JSON injection.
  const quizJson = JSON.stringify({
    id: quiz.id,
    title: quiz.title,
    questions: quiz.questions.map((q) => ({
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    })),
  })
    .replace(/</g, '\\u003C')
    .replace(/>/g, '\\u003E')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')

  const content = html`
    <section class="quiz-page">
      <div class="container">
        <nav class="breadcrumb">
          <a href="/">الرئيسية</a> <i class="fas fa-angle-left"></i>
          ${course ? html`<a href="/course/${course.slug}">${course.shortTitle}</a> <i class="fas fa-angle-left"></i>` : ''}
          <span>اختبار</span>
        </nav>

        <header class="quiz-header">
          <span class="quiz-header-icon"><i class="fas fa-clipboard-question"></i></span>
          <h1 class="quiz-header-title">${quiz.title}</h1>
          <p class="quiz-header-desc">${quiz.description}</p>
          <div class="quiz-header-meta">
            <span><i class="fas fa-list-ol"></i> ${quiz.questions.length} أسئلة</span>
            <span><i class="fas fa-circle-check"></i> تصحيح فوري مع الشرح</span>
          </div>
        </header>

        <div id="quiz-root" class="quiz-root">
          <div class="quiz-loading"><i class="fas fa-spinner fa-spin"></i> جارٍ تحميل الاختبار...</div>
        </div>

        ${course
          ? html`<div class="quiz-back">
              <a href="/course/${course.slug}" class="btn btn-outline">
                <i class="fas fa-arrow-right"></i> العودة لصفحة الدورة
              </a>
            </div>`
          : ''}
      </div>
    </section>

    <script>
      ${raw(`window.QUIZ_DATA = ${quizJson};`)}
    </script>
  `

  return Layout({
    title: quiz.title,
    description: quiz.description,
    activeNav: 'courses',
    children: content,
  })
}
