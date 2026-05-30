import { html } from 'hono/html'
import { Layout } from '../components/layout'
import { courses, countLessons } from '../data'
import { levelNames } from '../data/types'

// ==========================================================================
//  صفحة قائمة الدورات (Courses Listing Page)
// ==========================================================================

export const CoursesPage = () => {
  const content = html`
    <!-- ترويسة الصفحة -->
    <section class="page-hero">
      <div class="container">
        <span class="page-hero-badge"><i class="fas fa-graduation-cap"></i> الدورات التعليمية</span>
        <h1 class="page-hero-title">مسارك المتكامل لإتقان المحاسبة المالية</h1>
        <p class="page-hero-desc">
          أربع دورات متدرّجة بعناية تأخذك خطوة بخطوة من أول مفهوم محاسبي حتى المستوى الاحترافي،
          مع أمثلة محلولة وقيود عملية واختبارات لكل مرحلة.
        </p>
      </div>
    </section>

    <!-- شريط الفلترة -->
    <section class="section">
      <div class="container">
        <div class="filter-bar" id="course-filter-bar">
          <button class="filter-chip active" data-filter="all"><i class="fas fa-layer-group"></i> الكل</button>
          <button class="filter-chip" data-filter="beginner"><i class="fas fa-seedling"></i> مبتدئ</button>
          <button class="filter-chip" data-filter="intermediate"><i class="fas fa-chart-line"></i> متوسط</button>
          <button class="filter-chip" data-filter="advanced"><i class="fas fa-gem"></i> متقدم</button>
          <button class="filter-chip" data-filter="professional"><i class="fas fa-award"></i> احترافي</button>
        </div>

        <div class="courses-grid" id="courses-grid">
          ${courses.map(
            (course, idx) => html`
              <article class="course-card reveal" data-level="${course.level}" style="--course-color:${course.color};--delay:${idx * 0.08}s">
                <div class="course-card-top" style="background:${course.color}">
                  <span class="course-card-level">${levelNames[course.level]}</span>
                  <span class="course-card-icon"><i class="fas ${course.icon}"></i></span>
                  <span class="course-card-order">دورة ${idx + 1}</span>
                </div>
                <div class="course-card-body">
                  <h3 class="course-card-title">${course.title}</h3>
                  <p class="course-card-desc">${course.description}</p>
                  <ul class="course-card-meta">
                    <li><i class="fas fa-book-open"></i> ${countLessons(course)} درس</li>
                    <li><i class="fas fa-cubes"></i> ${course.modules.length} وحدات</li>
                    <li><i class="fas fa-clock"></i> ${course.duration}</li>
                  </ul>
                  <div class="course-card-tags">
                    ${course.tags.slice(0, 3).map((t) => html`<span class="tag">${t}</span>`)}
                  </div>
                </div>
                <div class="course-card-footer">
                  <div class="course-card-rating">
                    <i class="fas fa-star"></i> ${course.rating.toFixed(1)}
                    <span class="muted">(${course.studentsCount.toLocaleString('ar-EG')} متعلّم)</span>
                  </div>
                  <a href="/course/${course.slug}" class="btn btn-primary btn-sm">
                    التفاصيل <i class="fas fa-arrow-left"></i>
                  </a>
                </div>
              </article>
            `
          )}
        </div>
      </div>
    </section>

    <!-- شريط دعوة لاتخاذ إجراء -->
    <section class="section cta-band">
      <div class="container cta-inner">
        <div>
          <h2>غير متأكد من أين تبدأ؟</h2>
          <p>اطّلع على مسار التعلّم المتدرّج الذي يرتّب لك الدورات بالترتيب الأمثل.</p>
        </div>
        <a href="/roadmap" class="btn btn-accent btn-lg"><i class="fas fa-route"></i> عرض مسار التعلّم</a>
      </div>
    </section>
  `

  return Layout({
    title: 'الدورات التعليمية',
    description: 'استكشف دورات تعلّم المحاسبة المالية من المبتدئ إلى الاحترافي في منصة محاسب برو.',
    activeNav: 'courses',
    children: content,
  })
}
