import { html, raw } from 'hono/html'
import { Layout } from '../components/layout'
import { Course } from '../data/types'
import { countLessons, getFlatLessons } from '../data'
import { levelNames } from '../data/types'

// ==========================================================================
//  صفحة تفاصيل الدورة (Course Detail Page)
// ==========================================================================

export const CoursePage = (course: Course) => {
  const totalLessons = countLessons(course)
  const flat = getFlatLessons(course)
  const firstLesson = flat[0]?.lesson

  const content = html`
    <!-- ترويسة الدورة -->
    <section class="course-hero" style="--course-color:${course.color}">
      <div class="course-hero-bg" style="background:${course.color}"></div>
      <div class="container course-hero-inner">
        <nav class="breadcrumb">
          <a href="/">الرئيسية</a> <i class="fas fa-angle-left"></i>
          <a href="/courses">الدورات</a> <i class="fas fa-angle-left"></i>
          <span>${course.shortTitle}</span>
        </nav>
        <div class="course-hero-grid">
          <div class="course-hero-text">
            <span class="course-hero-level"><i class="fas ${course.icon}"></i> ${levelNames[course.level]}</span>
            <h1 class="course-hero-title">${course.title}</h1>
            <p class="course-hero-desc">${course.longDescription}</p>
            <div class="course-hero-stats">
              <div><strong>${totalLessons}</strong><span>درس</span></div>
              <div><strong>${course.modules.length}</strong><span>وحدة</span></div>
              <div><strong>${course.duration}</strong><span>المدة</span></div>
              <div><strong><i class="fas fa-star" style="color:#fbbf24"></i> ${course.rating.toFixed(1)}</strong><span>التقييم</span></div>
            </div>
            <div class="course-hero-actions">
              ${firstLesson
                ? html`<a href="/course/${course.slug}/${firstLesson.slug}" class="btn btn-accent btn-lg">
                    <i class="fas fa-play"></i> ابدأ الدورة الآن
                  </a>`
                : ''}
              <span class="course-progress-pill" data-course-progress="${course.slug}" data-total="${totalLessons}">
                <i class="fas fa-circle-check"></i> تقدّمك: <b>0%</b>
              </span>
            </div>
          </div>
          <aside class="course-hero-card">
            <h3><i class="fas fa-bullseye"></i> ماذا ستتعلّم؟</h3>
            <ul class="objectives-list">
              ${course.objectives.map((o) => html`<li><i class="fas fa-check"></i> ${raw(o)}</li>`)}
            </ul>
            ${course.prerequisites.length
              ? html`<div class="prereq-box">
                  <h4><i class="fas fa-circle-info"></i> المتطلّبات السابقة</h4>
                  <ul>${course.prerequisites.map((p) => html`<li>${raw(p)}</li>`)}</ul>
                </div>`
              : html`<div class="prereq-box">
                  <h4><i class="fas fa-circle-check"></i> المتطلّبات السابقة</h4>
                  <p>لا توجد — هذه الدورة مناسبة للبدء من الصفر.</p>
                </div>`}
          </aside>
        </div>
      </div>
    </section>

    <!-- محتوى الدورة -->
    <section class="section">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">محتوى الدورة</h2>
          <p class="section-subtitle">${course.modules.length} وحدات تعليمية · ${totalLessons} درسًا</p>
        </div>

        <div class="curriculum" id="curriculum">
          ${course.modules.map(
            (mod, mi) => html`
              <div class="module-block accordion-group ${mi === 0 ? 'open' : ''}">
                <button class="module-head accordion-trigger" type="button">
                  <span class="module-head-left">
                    <span class="module-number">${mi + 1}</span>
                    <span>
                      <span class="module-title">${mod.title}</span>
                      <span class="module-meta">${mod.lessons.length} دروس · ${mod.description}</span>
                    </span>
                  </span>
                  <i class="fas fa-chevron-down accordion-arrow"></i>
                </button>
                <div class="module-lessons accordion-body">
                  ${mod.lessons.map(
                    (lesson, li) => html`
                      <a href="/course/${course.slug}/${lesson.slug}" class="lesson-row" data-lesson-id="${lesson.id}">
                        <span class="lesson-row-check" data-lesson-check="${lesson.id}"><i class="fas fa-circle"></i></span>
                        <span class="lesson-row-info">
                          <span class="lesson-row-title">${li + 1}. ${lesson.title}</span>
                          <span class="lesson-row-summary">${lesson.summary}</span>
                        </span>
                        <span class="lesson-row-meta">
                          ${lesson.quizId ? html`<span class="lesson-quiz-tag"><i class="fas fa-clipboard-question"></i></span>` : ''}
                          <span><i class="fas fa-clock"></i> ${lesson.duration} د</span>
                        </span>
                      </a>
                    `
                  )}
                </div>
              </div>
            `
          )}
        </div>
      </div>
    </section>
  `

  return Layout({
    title: course.title,
    description: course.description,
    activeNav: 'courses',
    children: content,
  })
}
