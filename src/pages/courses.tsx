import { html } from 'hono/html'
import { Layout } from '../components/layout'
import { courses, countLessons, countCoursesByCategory } from '../data'
import { levelNames, categoryList } from '../data/types'

// ==========================================================================
//  صفحة قائمة الدورات (Courses Listing Page)
//  محسّنة: بحث فوري + تصنيفات موضوعية + فلترة بالمستوى + حالة فارغة
// ==========================================================================

export const CoursesPage = () => {
  const content = html`
    <!-- ترويسة الصفحة -->
    <section class="page-hero">
      <div class="container">
        <span class="page-hero-badge"><i class="fas fa-graduation-cap"></i> الدورات التعليمية</span>
        <h1 class="page-hero-title">مسارك المتكامل لإتقان المحاسبة المالية</h1>
        <p class="page-hero-desc">
          محتوى تعليمي عربي موجّه للمحاسب العربي وبصفة خاصة في الجمهورية اليمنية،
          منظّم في تصنيفات واضحة مع بحث فوري يأخذك مباشرة إلى الدورة أو الدرس الذي تريده.
        </p>
      </div>
    </section>

    <!-- أدوات البحث والفلترة -->
    <section class="section section-courses">
      <div class="container">
        <!-- صندوق البحث -->
        <div class="search-box" role="search">
          <i class="fas fa-magnifying-glass search-box-icon" aria-hidden="true"></i>
          <input
            type="search"
            id="courses-search-input"
            class="search-box-input"
            placeholder="ابحث عن دورة بالاسم أو الموضوع أو الوسوم..."
            aria-label="بحث في الدورات"
            autocomplete="off"
          />
          <button type="button" class="search-box-clear" id="courses-search-clear" aria-label="مسح البحث" hidden>
            <i class="fas fa-xmark"></i>
          </button>
        </div>

        <!-- تصنيفات موضوعية -->
        <div class="filter-section" aria-label="تصنيفات الدورات">
          <span class="filter-label"><i class="fas fa-tags"></i> التصنيف:</span>
          <div class="filter-bar" id="course-category-bar" role="group" aria-label="تصفية حسب التصنيف">
            <button class="filter-chip active" data-category="all" aria-pressed="true">
              <i class="fas fa-layer-group"></i> الكل
              <span class="chip-count">${courses.length}</span>
            </button>
            ${categoryList.map(
              (cat) => html`
                <button class="filter-chip" data-category="${cat.key}" aria-pressed="false">
                  <i class="fas ${cat.icon}"></i> ${cat.label}
                  <span class="chip-count">${countCoursesByCategory(cat.key)}</span>
                </button>
              `
            )}
          </div>
        </div>

        <!-- فلترة بالمستوى -->
        <div class="filter-section" aria-label="مستوى الدورات">
          <span class="filter-label"><i class="fas fa-signal"></i> المستوى:</span>
          <div class="filter-bar" id="course-level-bar" role="group" aria-label="تصفية حسب المستوى">
            <button class="filter-chip filter-chip-sm active" data-level="all" aria-pressed="true"><i class="fas fa-list"></i> الكل</button>
            <button class="filter-chip filter-chip-sm" data-level="beginner" aria-pressed="false"><i class="fas fa-seedling"></i> مبتدئ</button>
            <button class="filter-chip filter-chip-sm" data-level="intermediate" aria-pressed="false"><i class="fas fa-chart-line"></i> متوسط</button>
            <button class="filter-chip filter-chip-sm" data-level="advanced" aria-pressed="false"><i class="fas fa-gem"></i> متقدم</button>
            <button class="filter-chip filter-chip-sm" data-level="professional" aria-pressed="false"><i class="fas fa-award"></i> احترافي</button>
          </div>
        </div>

        <!-- عدّاد النتائج -->
        <div class="results-summary" id="courses-results-summary" aria-live="polite">
          عرض <strong id="courses-visible-count">${courses.length}</strong> من ${courses.length} دورة
        </div>

        <div class="courses-grid" id="courses-grid">
          ${courses.map(
            (course, idx) => {
              const cat = categoryList.find((c) => c.key === course.category)
              return html`
              <article
                class="course-card reveal"
                data-course-card
                data-level="${course.level}"
                data-category="${course.category}"
                data-search="${course.title} ${course.shortTitle} ${course.description} ${course.tags.join(' ')} ${cat ? cat.label : ''}"
                style="--course-color:${course.color};--delay:${idx * 0.05}s"
              >
                <div class="course-card-top" style="background:${course.color}">
                  <span class="course-card-level">${levelNames[course.level]}</span>
                  <span class="course-card-icon"><i class="fas ${course.icon}"></i></span>
                  ${cat
                    ? html`<span class="course-card-category"><i class="fas ${cat.icon}"></i> ${cat.label}</span>`
                    : ''}
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
            }
          )}
        </div>

        <!-- حالة عدم وجود نتائج -->
        <div class="empty-state" id="courses-empty-state" hidden>
          <div class="empty-state-icon"><i class="fas fa-magnifying-glass-minus"></i></div>
          <h3 class="empty-state-title">لا توجد دورات تطابق بحثك</h3>
          <p class="empty-state-desc">
            جرّب كلمات أبسط أو غيّر التصنيف والمستوى المحددين. يمكنك أيضاً إعادة تعيين كل عوامل التصفية.
          </p>
          <button type="button" class="btn btn-outline btn-sm" id="courses-reset-filters">
            <i class="fas fa-rotate-left"></i> إعادة تعيين البحث والفلاتر
          </button>
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
    description:
      'استكشف دورات تعلّم المحاسبة المالية للمحاسب العربي واليمني: محاسبة عامة ويمنية وضرائب يمنية وحكومية وIFRS وأدوات — مع بحث وتصنيفات.',
    activeNav: 'courses',
    children: content,
  })
}
