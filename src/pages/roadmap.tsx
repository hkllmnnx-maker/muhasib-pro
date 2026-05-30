import { html } from 'hono/html'
import { Layout } from '../components/layout'
import { courses, countLessons } from '../data'
import { levelNames } from '../data/types'

// ==========================================================================
//  صفحة مسار التعلّم (Roadmap Page)
// ==========================================================================

export const RoadmapPage = () => {
  const content = html`
    <section class="page-hero">
      <div class="container">
        <span class="page-hero-badge"><i class="fas fa-route"></i> مسار التعلّم</span>
        <h1 class="page-hero-title">خارطة طريقك من الصفر إلى الاحتراف</h1>
        <p class="page-hero-desc">
          اتّبع هذا المسار المتدرّج خطوة بخطوة. كل مرحلة تبني على ما قبلها، لتصل في النهاية
          إلى مستوى محاسب محترف جاهز لسوق العمل والشهادات المهنية.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="roadmap">
          ${courses.map(
            (course, idx) => html`
              <div class="roadmap-step reveal" style="--course-color:${course.color}">
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
                  <div class="roadmap-objectives">
                    <strong><i class="fas fa-flag-checkered"></i> مخرجات هذه المرحلة:</strong>
                    <ul>
                      ${course.objectives.slice(0, 3).map((o) => html`<li><i class="fas fa-check"></i> ${o}</li>`)}
                    </ul>
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
    description: 'خارطة طريق متدرّجة لتعلّم المحاسبة المالية من الصفر إلى الاحتراف.',
    activeNav: 'roadmap',
    children: content,
  })
}
