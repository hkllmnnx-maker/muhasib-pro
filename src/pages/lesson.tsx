import { html, raw } from 'hono/html'
import { Layout } from '../components/layout'
import { Course, Lesson } from '../data/types'
import { getFlatLessons, getAdjacentLessons } from '../data'
import { ContentBlocks } from '../components/content-blocks'

// ==========================================================================
//  صفحة الدرس التفاعلية (Lesson Page)
// ==========================================================================

export const LessonPage = (course: Course, lesson: Lesson, flatIndex: number) => {
  const flat = getFlatLessons(course)
  const { prev, next } = getAdjacentLessons(course, flatIndex)
  const total = flat.length

  const content = html`
    <div class="lesson-layout">
      <!-- الشريط الجانبي -->
      <aside class="lesson-sidebar" id="lesson-sidebar">
        <div class="lesson-sidebar-head">
          <a href="/course/${course.slug}" class="lesson-sidebar-course">
            <i class="fas ${course.icon}"></i> ${course.shortTitle}
          </a>
          <div class="lesson-sidebar-progress" data-course-progress="${course.slug}" data-total="${total}">
            <div class="lsp-bar"><span style="width:0%"></span></div>
            <small><b>0%</b> مكتمل</small>
          </div>
        </div>
        <nav class="lesson-sidebar-nav">
          ${course.modules.map(
            (mod, mi) => html`
              <div class="lsn-module">
                <div class="lsn-module-title">${mi + 1}. ${mod.title}</div>
                ${mod.lessons.map(
                  (l) => html`
                    <a href="/course/${course.slug}/${l.slug}"
                       class="lsn-lesson ${l.id === lesson.id ? 'current' : ''}"
                       data-lesson-id="${l.id}">
                      <span class="lsn-check" data-lesson-check="${l.id}"><i class="fas fa-circle"></i></span>
                      <span>${l.title}</span>
                    </a>
                  `
                )}
              </div>
            `
          )}
        </nav>
      </aside>

      <!-- المحتوى -->
      <div class="lesson-main">
        <div class="lesson-content-wrap">
          <button class="lesson-sidebar-toggle" id="lesson-sidebar-toggle" type="button">
            <i class="fas fa-list-ul"></i> فهرس الدروس
          </button>

          <nav class="breadcrumb">
            <a href="/">الرئيسية</a> <i class="fas fa-angle-left"></i>
            <a href="/courses">الدورات</a> <i class="fas fa-angle-left"></i>
            <a href="/course/${course.slug}">${course.shortTitle}</a>
          </nav>

          <header class="lesson-header">
            <span class="lesson-index">الدرس ${flatIndex + 1} من ${total}</span>
            <h1 class="lesson-title">${lesson.title}</h1>
            <p class="lesson-summary">${lesson.summary}</p>
            <div class="lesson-header-meta">
              <span><i class="fas fa-clock"></i> ${lesson.duration} دقيقة قراءة</span>
              <span class="lesson-status-badge" data-lesson-status="${lesson.id}">
                <i class="fas fa-circle"></i> غير مكتمل
              </span>
            </div>
          </header>

          <article class="lesson-article prose">
            ${ContentBlocks({ blocks: lesson.content })}
          </article>

          ${lesson.keyPoints && lesson.keyPoints.length
            ? html`<section class="key-points">
                <h3><i class="fas fa-key"></i> أهم النقاط للمراجعة</h3>
                <ul>${lesson.keyPoints.map((k) => html`<li><i class="fas fa-check"></i> ${raw(k)}</li>`)}</ul>
              </section>`
            : ''}

          ${lesson.quizId
            ? html`<div class="lesson-quiz-cta">
                <div>
                  <h3><i class="fas fa-clipboard-question"></i> اختبر فهمك</h3>
                  <p>هناك اختبار قصير مرتبط بهذا الدرس لتثبيت المعلومات.</p>
                </div>
                <a href="/quiz/${lesson.quizId}" class="btn btn-accent">ابدأ الاختبار <i class="fas fa-arrow-left"></i></a>
              </div>`
            : ''}

          <div class="lesson-complete-bar">
            <button class="btn btn-primary btn-lg" id="complete-lesson-btn" data-lesson-id="${lesson.id}">
              <i class="fas fa-circle-check"></i> <span>إكمال الدرس</span>
            </button>
          </div>

          <nav class="lesson-pager">
            ${prev
              ? html`<a href="/course/${course.slug}/${prev.slug}" class="lesson-pager-btn prev">
                  <i class="fas fa-arrow-right"></i>
                  <span><small>الدرس السابق</small><b>${prev.title}</b></span>
                </a>`
              : html`<span></span>`}
            ${next
              ? html`<a href="/course/${course.slug}/${next.slug}" class="lesson-pager-btn next">
                  <span><small>الدرس التالي</small><b>${next.title}</b></span>
                  <i class="fas fa-arrow-left"></i>
                </a>`
              : html`<a href="/course/${course.slug}" class="lesson-pager-btn next">
                  <span><small>أنهيت الدورة!</small><b>العودة لصفحة الدورة</b></span>
                  <i class="fas fa-flag-checkered"></i>
                </a>`}
          </nav>
        </div>
      </div>
    </div>
  `

  return Layout({
    title: lesson.title,
    description: lesson.summary,
    activeNav: 'courses',
    bodyClass: 'lesson-body',
    children: content,
  })
}
