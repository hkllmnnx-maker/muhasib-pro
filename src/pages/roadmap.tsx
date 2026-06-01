import { html, raw } from 'hono/html'
import { Layout } from '../components/layout'
import { courses, countLessons, getLessonIds } from '../data'
import { levelNames } from '../data/types'
import {
  yemeniAccountantPath,
  resolvePathSteps,
  getPathTotalLessons,
  getPathLessonIds,
} from '../data/learning-paths'
import { getFlatLessons } from '../data'

// ==========================================================================
//  صفحة مسار التعلّم (Roadmap Page) — لوحة تقدّم محسّنة + مسار المحاسب اليمني
// ==========================================================================

export const RoadmapPage = () => {
  // إجمالي دروس المنصة (لاستخدامه في لوحة التقدّم العامة)
  const allLessonIds = courses.flatMap((c) => getLessonIds(c))
  const totalLessons = allLessonIds.length

  // خطوات مسار المحاسب اليمني (الدورات الموجودة فقط)
  const yemeniSteps = resolvePathSteps(yemeniAccountantPath)
  const yemeniTotal = getPathTotalLessons(yemeniAccountantPath)
  const yemeniLessonIds = getPathLessonIds(yemeniAccountantPath)

  // أول درس في المسار اليمني (لاستخدامه كرابط "ابدأ المسار")
  const firstStepCourse = yemeniSteps[0]?.course
  const firstStepFirstLesson = firstStepCourse
    ? getFlatLessons(firstStepCourse)[0]?.lesson
    : undefined

  // خريطة مسطّحة بكل دروس المنصة بالترتيب — لاقتراح "الدرس التالي" في الواجهة
  const lessonMap = courses.flatMap((c) =>
    getFlatLessons(c).map(({ lesson }) => ({
      id: lesson.id,
      title: lesson.title,
      courseTitle: c.shortTitle,
      url: `/course/${c.slug}/${lesson.slug}`,
    }))
  )

  const content = html`
    <script>
      // خريطة دروس المنصة بالترتيب (تُستخدم لاقتراح الدرس التالي)
      window.MUHASIB_LESSON_MAP = ${raw(JSON.stringify(lessonMap).replace(/</g, '\\u003c'))};
    </script>
    <section class="page-hero">
      <div class="container">
        <span class="page-hero-badge"><i class="fas fa-route"></i> مسار التعلّم</span>
        <h1 class="page-hero-title">خارطة طريقك من الصفر إلى الاحتراف</h1>
        <p class="page-hero-desc">
          تابع تقدّمك في الوقت الفعلي، واتّبع المسار المتدرّج خطوة بخطوة. كل مرحلة تبني على ما قبلها،
          لتصل في النهاية إلى مستوى محاسب محترف جاهز لسوق العمل.
        </p>
      </div>
    </section>

    <!-- ============ لوحة تقدّم المتعلّم العامة ============ -->
    <section class="section">
      <div class="container">
        <div class="progress-dashboard reveal"
             data-progress-dashboard
             data-all-lessons='${JSON.stringify(allLessonIds)}'
             data-total="${totalLessons}">
          <div class="pd-head">
            <div>
              <h2 class="pd-title"><i class="fas fa-chart-line"></i> لوحة تقدّمك</h2>
              <p class="pd-sub">ملخّص مباشر لرحلتك التعليمية على المنصة (محفوظ في متصفّحك).</p>
            </div>
            <div class="pd-ring" data-pd-ring>
              <svg viewBox="0 0 120 120" class="pd-ring-svg">
                <circle class="pd-ring-bg" cx="60" cy="60" r="52"></circle>
                <circle class="pd-ring-fill" cx="60" cy="60" r="52" data-pd-ring-fill></circle>
              </svg>
              <div class="pd-ring-label">
                <b data-pd-percent>0%</b>
                <small>مكتمل</small>
              </div>
            </div>
          </div>

          <div class="pd-stats">
            <div class="pd-stat">
              <span class="pd-stat-icon" style="background:linear-gradient(135deg,#16a34a,#4ade80)"><i class="fas fa-circle-check"></i></span>
              <div>
                <b data-pd-completed>0</b>
                <small>درس مكتمل</small>
              </div>
            </div>
            <div class="pd-stat">
              <span class="pd-stat-icon" style="background:linear-gradient(135deg,#0284c7,#38bdf8)"><i class="fas fa-book-open"></i></span>
              <div>
                <b>${totalLessons}</b>
                <small>إجمالي الدروس</small>
              </div>
            </div>
            <div class="pd-stat">
              <span class="pd-stat-icon" style="background:linear-gradient(135deg,#7c3aed,#a78bfa)"><i class="fas fa-layer-group"></i></span>
              <div>
                <b data-pd-courses-started>0</b>
                <small>دورات بدأتها</small>
              </div>
            </div>
            <div class="pd-stat">
              <span class="pd-stat-icon" style="background:linear-gradient(135deg,#d97706,#fbbf24)"><i class="fas fa-medal"></i></span>
              <div>
                <b data-pd-courses-done>0</b>
                <small>دورات مكتملة</small>
              </div>
            </div>
          </div>

          <!-- اقتراح الدرس التالي -->
          <div class="pd-next" data-pd-next style="display:none">
            <div class="pd-next-info">
              <span class="pd-next-badge"><i class="fas fa-forward"></i> تابع من حيث توقّفت</span>
              <strong data-pd-next-title>—</strong>
              <small data-pd-next-course>—</small>
            </div>
            <a href="#" class="btn btn-primary btn-sm" data-pd-next-link>
              متابعة الدرس <i class="fas fa-arrow-left"></i>
            </a>
          </div>
          <div class="pd-next pd-next-empty" data-pd-next-empty>
            <div class="pd-next-info">
              <span class="pd-next-badge" style="background:linear-gradient(135deg,#16a34a,#4ade80)"><i class="fas fa-rocket"></i> ابدأ الآن</span>
              <strong>لم تبدأ أي درس بعد</strong>
              <small>ابدأ رحلتك من مسار المحاسب اليمني أدناه أو من أي دورة تناسبك.</small>
            </div>
            ${firstStepCourse && firstStepFirstLesson
              ? html`<a href="/course/${firstStepCourse.slug}/${firstStepFirstLesson.slug}" class="btn btn-accent btn-sm">
                  ابدأ أول درس <i class="fas fa-play"></i>
                </a>`
              : html`<a href="/courses" class="btn btn-accent btn-sm">تصفّح الدورات <i class="fas fa-arrow-left"></i></a>`}
          </div>
        </div>
      </div>
    </section>

    <!-- ============ مسار المحاسب اليمني ============ -->
    <section class="section section-alt">
      <div class="container">
        <div class="ypath reveal"
             data-yemeni-path
             data-path-lessons='${JSON.stringify(yemeniLessonIds)}'
             data-path-total="${yemeniTotal}">
          <div class="ypath-head" style="background:${yemeniAccountantPath.color}">
            <div class="ypath-head-text">
              <span class="ypath-badge"><i class="fas ${yemeniAccountantPath.icon}"></i> مسار متخصّص</span>
              <h2>${yemeniAccountantPath.title}</h2>
              <p>${yemeniAccountantPath.subtitle}</p>
            </div>
            <div class="ypath-head-progress">
              <div class="ypath-progress-num"><b data-ypath-percent>0%</b></div>
              <div class="ypath-progress-bar"><span data-ypath-bar style="width:0%"></span></div>
              <small><b data-ypath-completed>0</b> من ${yemeniTotal} درس</small>
            </div>
          </div>

          <p class="ypath-desc">${yemeniAccountantPath.description}</p>

          <div class="ypath-note">
            <i class="fas fa-circle-info"></i>
            هذا المسار يربط دورات المنصة الموجودة بترتيب عملي، ولا يضيف معلومات قانونية أو ضريبية
            جديدة — المحتوى مأخوذ من الدورات نفسها.
          </div>

          <div class="ypath-steps">
            ${yemeniSteps.map(
              (step, idx) => html`
                <div class="ypath-step"
                     data-ypath-step
                     data-step-lessons='${JSON.stringify(step.lessonIds)}'
                     style="--course-color:${step.course.color}">
                  <div class="ypath-step-marker" style="background:${step.course.color}">
                    <span class="ypath-step-num">${idx + 1}</span>
                    <i class="fas fa-circle-check ypath-step-done"></i>
                  </div>
                  <div class="ypath-step-card">
                    <div class="ypath-step-top">
                      <h3><i class="fas ${step.course.icon}"></i> ${step.course.title}</h3>
                      ${step.optional ? html`<span class="ypath-optional">اختيارية</span>` : ''}
                    </div>
                    <p class="ypath-step-label">${step.label}</p>
                    <div class="ypath-step-meta">
                      <span><i class="fas fa-signal"></i> ${levelNames[step.course.level]}</span>
                      <span><i class="fas fa-book-open"></i> ${step.lessonsCount} درس</span>
                      <span><i class="fas fa-clock"></i> ${step.course.duration}</span>
                    </div>
                    <div class="ypath-step-foot">
                      <div class="ypath-step-bar"><span data-step-bar style="width:0%"></span></div>
                      <span class="ypath-step-pct" data-step-pct>0%</span>
                      <a href="/course/${step.course.slug}" class="btn btn-outline btn-sm">
                        افتح الدورة <i class="fas fa-arrow-left"></i>
                      </a>
                    </div>
                  </div>
                </div>
              `
            )}
          </div>

          <!-- شهادة إتمام المسار اليمني -->
          <div class="ypath-cert" data-ypath-cert>
            <div class="ypath-cert-locked" data-ypath-cert-locked>
              <i class="fas fa-lock"></i>
              <div>
                <strong>شهادة إتمام مسار المحاسب اليمني</strong>
                <small>أكمل جميع دروس المسار لفتح شهادة الإتمام التعليمية القابلة للطباعة.</small>
              </div>
            </div>
            <a href="/certificate/${yemeniAccountantPath.slug}"
               class="btn btn-accent btn-lg ypath-cert-btn"
               data-ypath-cert-btn
               style="display:none">
              <i class="fas fa-award"></i> استلم شهادة الإتمام
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ المسار العام (كل الدورات) ============ -->
    <section class="section">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">المسار الكامل للمنصة</h2>
          <p class="section-subtitle">جميع الدورات بترتيب متدرّج — تابع تقدّمك في كل مرحلة.</p>
        </div>
        <div class="roadmap">
          ${courses.map(
            (course, idx) => html`
              <div class="roadmap-step reveal"
                   data-roadmap-step
                   data-course-lessons='${JSON.stringify(getLessonIds(course))}'
                   style="--course-color:${course.color}">
                <div class="roadmap-marker" style="background:${course.color}">
                  <span class="roadmap-step-num">${idx + 1}</span>
                  <i class="fas ${course.icon}"></i>
                </div>
                <div class="roadmap-card">
                  <div class="roadmap-card-head">
                    <span class="roadmap-level" style="background:${course.color}">${levelNames[course.level]}</span>
                    <span class="roadmap-duration"><i class="fas fa-clock"></i> ${course.duration}</span>
                  </div>
                  <h3>${course.title}</h3>
                  <p>${course.description}</p>
                  <div class="roadmap-step-progress">
                    <div class="roadmap-step-bar"><span data-roadmap-bar style="width:0%"></span></div>
                    <span class="roadmap-step-pct" data-roadmap-pct>0% مكتمل</span>
                  </div>
                  <div class="roadmap-card-footer">
                    <span class="muted"><i class="fas fa-book-open"></i> ${countLessons(course)} درس · ${course.modules.length} وحدات</span>
                    <a href="/course/${course.slug}" class="btn btn-primary btn-sm">ابدأ هذه المرحلة <i class="fas fa-arrow-left"></i></a>
                  </div>
                </div>
              </div>
            `
          )}

          <div class="roadmap-step roadmap-final reveal">
            <div class="roadmap-marker" style="background:linear-gradient(135deg,#d97706,#fbbf24)">
              <i class="fas fa-trophy"></i>
            </div>
            <div class="roadmap-card">
              <h3>🎓 محاسب محترف!</h3>
              <p>
                بإكمالك للمسار الكامل، تكون قد بنيت أساسًا قويًا في المحاسبة المالية والإدارية،
                وأصبحت مستعدًا للتخصص أو التقدّم للشهادات المهنية مثل CMA و CPA و SOCPA.
              </p>
              <a href="/courses" class="btn btn-accent"><i class="fas fa-graduation-cap"></i> استعرض جميع الدورات</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `

  return Layout({
    title: 'مسار التعلّم',
    description: 'لوحة تقدّم تفاعلية ومسار المحاسب اليمني — تعلّم المحاسبة من الصفر إلى الاحتراف.',
    activeNav: 'roadmap',
    children: content,
  })
}
