import { html } from 'hono/html'
import { Layout } from '../components/layout'
import { courses, getPlatformStats, countCoursesByCategory } from '../data'
import { levelNames, categoryList } from '../data/types'
import { countLessons } from '../data'

// ==========================================================================
//  الصفحة الرئيسية (Home Page)
// ==========================================================================

export const HomePage = () => {
  const stats = getPlatformStats()

  const content = html`
    <!-- قسم البطل Hero -->
    <section class="hero">
      <div class="hero-grid-pattern"></div>
      <div class="container hero-inner">
        <div class="hero-text">
          <span class="hero-badge"><i class="fas fa-star"></i> منصة عربية تخدم المحاسب — وبتركيز على الجمهورية اليمنية</span>
          <h1 class="hero-title">
            تعلّم <span class="highlight">المحاسبة المالية</span><br />
            من الصفر إلى الاحتراف
          </h1>
          <p class="hero-desc">
            رحلة تعليمية متكاملة بأسلوب عصري وأمثلة عملية وأدوات تفاعلية، مصمّمة للمحاسب العربي
            ومع مسار تعليمي خاص بالمحاسب اليمني — تأخذك من المفاهيم الأساسية حتى الاحتراف، مجاناً وبالكامل بالعربية.
          </p>
          <div class="hero-actions">
            <a href="/courses" class="btn btn-accent btn-lg">
              <i class="fas fa-graduation-cap"></i> ابدأ التعلّم مجاناً
            </a>
            <a href="/roadmap" class="btn btn-outline btn-lg" style="color:#fff;border-color:rgba(255,255,255,0.4)">
              <i class="fas fa-route"></i> استكشف مسار التعلّم
            </a>
          </div>
          <div class="hero-stats">
            <div>
              <div class="hero-stat-value"><span data-counter="${stats.lessons}">0</span>+</div>
              <div class="hero-stat-label">درس تفصيلي</div>
            </div>
            <div>
              <div class="hero-stat-value"><span data-counter="${stats.courses}">0</span></div>
              <div class="hero-stat-label">مسارات تعليمية</div>
            </div>
            <div>
              <div class="hero-stat-value"><span data-counter="${Math.round(stats.students / 1000)}">0</span>K+</div>
              <div class="hero-stat-label">متعلّم</div>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-card">
            <div style="font-weight:800;font-size:1.1rem;margin-bottom:16px;color:#fff">
              <i class="fas fa-file-invoice-dollar" style="color:var(--color-accent-light)"></i>
              قائمة المركز المالي
            </div>
            <div class="hero-card-row">
              <span>إجمالي الأصول</span>
              <strong style="color:var(--color-accent-light)">310,000</strong>
            </div>
            <div class="hero-card-row">
              <span>الالتزامات</span>
              <strong>110,000</strong>
            </div>
            <div class="hero-card-row">
              <span>حقوق الملكية</span>
              <strong>200,000</strong>
            </div>
            <div class="hero-card-row" style="border-top:2px solid rgba(255,255,255,0.3);margin-top:8px;padding-top:14px">
              <span style="font-weight:800">المعادلة متوازنة</span>
              <span style="color:#4ade80"><i class="fas fa-circle-check"></i> صحيح</span>
            </div>
          </div>
          <div class="float-badge float-badge-1">
            <i class="fas fa-chart-pie" style="color:var(--color-primary)"></i>
            <span>تحليل مالي</span>
          </div>
          <div class="float-badge float-badge-2">
            <i class="fas fa-award" style="color:var(--color-accent)"></i>
            <span>شهادات مهنية</span>
          </div>
        </div>
      </div>
    </section>

    <!-- شريط الإحصائيات -->
    <section class="stats-bar">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-icon"><i class="fas fa-book-open"></i></div>
            <div class="stat-value"><span data-counter="${stats.lessons}">0</span></div>
            <div class="stat-label">درس شامل</div>
          </div>
          <div class="stat-item">
            <div class="stat-icon"><i class="fas fa-layer-group"></i></div>
            <div class="stat-value"><span data-counter="${stats.modules}">0</span></div>
            <div class="stat-label">وحدة تعليمية</div>
          </div>
          <div class="stat-item">
            <div class="stat-icon"><i class="fas fa-circle-question"></i></div>
            <div class="stat-value"><span data-counter="40">0</span>+</div>
            <div class="stat-label">سؤال تفاعلي</div>
          </div>
          <div class="stat-item">
            <div class="stat-icon"><i class="fas fa-calculator"></i></div>
            <div class="stat-value"><span data-counter="5">0</span></div>
            <div class="stat-label">أداة حاسبية</div>
          </div>
        </div>
      </div>
    </section>

    <!-- مسار المحاسب اليمني (مميّز) -->
    <section class="section">
      <div class="container">
        <div class="yemen-path reveal">
          <div class="yemen-path-pattern"></div>
          <div class="yemen-path-inner">
            <div class="yemen-path-text">
              <span class="yemen-path-badge"><i class="fas fa-mosque"></i> مسار خاص</span>
              <h2 class="yemen-path-title">مسار المحاسب اليمني</h2>
              <p class="yemen-path-desc">
                محتوى تعليمي عربي موجّه لمن يعمل في المحاسبة داخل الجمهورية اليمنية: من الأساسيات
                إلى التصنيفات التعليمية الخاصة باليمن — محاسبة يمنية، ضرائب يمنية، ومحاسبة حكومية يمنية —
                لتطبّق ما تتعلّمه في بيئة عملك بأسلوب عملي.
              </p>
              <p class="yemen-path-note">
                <i class="fas fa-circle-info"></i>
                هذه التصنيفات تعليمية لتنظيم المحتوى وتسهيل البحث، ولا تُغني عن التشريعات الرسمية أو الاستشارة المهنية.
              </p>
              <div class="yemen-path-actions">
                <a href="/courses?cat=yemeni" class="btn btn-accent btn-lg">
                  <i class="fas fa-graduation-cap"></i> ابدأ مسار المحاسب اليمني
                </a>
                <a href="/roadmap" class="btn btn-outline btn-lg" style="color:#fff;border-color:rgba(255,255,255,.45)">
                  <i class="fas fa-route"></i> خارطة الطريق الكاملة
                </a>
              </div>
            </div>
            <div class="yemen-path-cats">
              ${categoryList
                .filter((c) => c.key === 'yemeni' || c.key === 'yemeni-tax' || c.key === 'governmental')
                .map(
                  (cat) => html`
                    <a href="/courses?cat=${cat.key}" class="yemen-cat-card">
                      <span class="yemen-cat-icon"><i class="fas ${cat.icon}"></i></span>
                      <div>
                        <strong>${cat.label}</strong>
                        <span>${countCoursesByCategory(cat.key)} دورة تعليمية</span>
                      </div>
                      <i class="fas fa-arrow-left yemen-cat-arrow"></i>
                    </a>
                  `
                )}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- تصفّح حسب التصنيف -->
    <section class="section" style="background:var(--bg-surface)">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-badge"><i class="fas fa-tags"></i> تصفّح حسب التصنيف</span>
          <h2 class="section-title">اختر المجال الذي يهمّك</h2>
          <p class="section-subtitle">
            تصنيفات تعليمية تنظّم الدورات وتسهّل عليك الوصول السريع لما تحتاجه — للمحاسب العربي واليمني.
          </p>
        </div>
        <div class="category-grid">
          ${categoryList.map(
            (cat) => html`
              <a href="/courses?cat=${cat.key}" class="category-tile reveal" style="--cat-color:${cat.color}">
                <span class="category-tile-icon"><i class="fas ${cat.icon}"></i></span>
                <h3 class="category-tile-title">${cat.label}</h3>
                <p class="category-tile-desc">${cat.description}</p>
                <span class="category-tile-count"><i class="fas fa-book-open"></i> ${countCoursesByCategory(cat.key)} دورة</span>
              </a>
            `
          )}
        </div>
      </div>
    </section>

    <!-- المسارات التعليمية -->
    <section class="section">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-badge"><i class="fas fa-graduation-cap"></i> مساراتنا التعليمية</span>
          <h2 class="section-title">أربعة مستويات نحو الاحتراف</h2>
          <p class="section-subtitle">
            مسار متدرّج بعناية يأخذ بيدك خطوة بخطوة من المفاهيم الأولى حتى أعلى مستويات الخبرة المحاسبية
          </p>
        </div>
        <div class="grid grid-4">
          ${courses.map(
            (course) => html`
              <article class="card course-card reveal" data-course-card data-level="${course.level}">
                <div class="course-card-banner" style="background:${course.color}">
                  <span class="badge badge-accent course-level-badge">${levelNames[course.level]}</span>
                  <i class="fas ${course.icon}"></i>
                </div>
                <div class="course-card-content">
                  <h3 class="course-card-title">${course.shortTitle}</h3>
                  <p class="course-card-desc">${course.description}</p>
                  <div class="course-meta">
                    <span><i class="fas fa-book"></i> ${countLessons(course)} درس</span>
                    <span><i class="fas fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-star" style="color:var(--color-accent)"></i> ${course.rating}</span>
                  </div>
                  <a href="/course/${course.slug}" class="btn btn-primary btn-block">
                    عرض الدورة <i class="fas fa-arrow-left"></i>
                  </a>
                </div>
              </article>
            `
          )}
        </div>
      </div>
    </section>

    <!-- المميزات -->
    <section class="section" style="background:var(--bg-surface)">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-badge"><i class="fas fa-gem"></i> لماذا محاسب برو؟</span>
          <h2 class="section-title">تجربة تعليمية لا مثيل لها</h2>
          <p class="section-subtitle">صُممت كل تفصيلة لتجعل رحلة تعلّمك للمحاسبة ممتعة وفعّالة</p>
        </div>
        <div class="grid grid-3">
          ${[
            { icon: 'fa-language', color: '#1e3a8a', title: 'محتوى عربي أصيل', desc: 'شرح مبسّط بلغة عربية واضحة مع المصطلحات الإنجليزية، مصمّم خصيصاً للمتعلّم العربي.' },
            { icon: 'fa-flask', color: '#0d9488', title: 'أمثلة عملية محلولة', desc: 'كل مفهوم مدعوم بأمثلة محلولة خطوة بخطوة وقيود محاسبية حقيقية تطبّق ما تعلّمته.' },
            { icon: 'fa-circle-question', color: '#f59e0b', title: 'اختبارات تفاعلية', desc: 'اختبر فهمك بعد كل درس بأسئلة تفاعلية مع شرح فوري للإجابات الصحيحة.' },
            { icon: 'fa-calculator', color: '#7c3aed', title: 'أدوات حاسبية ذكية', desc: 'حاسبات تفاعلية للإهلاك ونقطة التعادل والنسب المالية تطبّق المفاهيم عملياً.' },
            { icon: 'fa-chart-line', color: '#16a34a', title: 'تتبّع تقدّمك', desc: 'سجّل إكمالك للدروس وتابع نسبة تقدّمك في كل دورة لتبقى متحفّزاً.' },
            { icon: 'fa-moon', color: '#0284c7', title: 'تصميم عصري ومريح', desc: 'واجهة حديثة متجاوبة مع وضع ليلي مريح للعين، تعمل على كل الأجهزة.' },
          ].map(
            (f) => html`
              <article class="card feature-card reveal">
                <div class="feature-icon" style="background:${f.color}"><i class="fas ${f.icon}"></i></div>
                <h3>${f.title}</h3>
                <p>${f.desc}</p>
              </article>
            `
          )}
        </div>
      </div>
    </section>

    <!-- خطوات التعلّم -->
    <section class="section">
      <div class="container">
        <div class="section-header reveal">
          <span class="section-badge"><i class="fas fa-shoe-prints"></i> كيف تبدأ؟</span>
          <h2 class="section-title">رحلتك في ٤ خطوات بسيطة</h2>
        </div>
        <div class="grid grid-4">
          ${[
            { n: '١', icon: 'fa-route', title: 'اختر مسارك', desc: 'حدّد مستواك الحالي وابدأ من المسار المناسب لك.' },
            { n: '٢', icon: 'fa-book-open', title: 'ادرس الدروس', desc: 'تابع الدروس بالترتيب واستوعب الأمثلة العملية.' },
            { n: '٣', icon: 'fa-pen-to-square', title: 'اختبر نفسك', desc: 'طبّق ما تعلّمته عبر الاختبارات والأدوات.' },
            { n: '٤', icon: 'fa-trophy', title: 'احترف', desc: 'تقدّم نحو المستويات الأعلى حتى الاحتراف.' },
          ].map(
            (s) => html`
              <div class="text-center reveal">
                <div style="width:80px;height:80px;margin:0 auto 18px;border-radius:50%;background:var(--gradient-primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.8rem;position:relative;box-shadow:var(--shadow-lg)">
                  <i class="fas ${s.icon}"></i>
                  <span style="position:absolute;top:-8px;right:-8px;width:32px;height:32px;border-radius:50%;background:var(--color-accent);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0.9rem">${s.n}</span>
                </div>
                <h3 style="font-size:1.15rem;margin-bottom:8px">${s.title}</h3>
                <p style="color:var(--text-secondary)">${s.desc}</p>
              </div>
            `
          )}
        </div>
      </div>
    </section>

    <!-- دعوة للعمل CTA -->
    <section class="section">
      <div class="container">
        <div class="reveal" style="background:var(--gradient-hero);border-radius:var(--radius-xl);padding:60px 40px;text-align:center;color:#fff;position:relative;overflow:hidden">
          <div class="hero-grid-pattern"></div>
          <div style="position:relative;z-index:2">
            <h2 style="color:#fff;font-size:clamp(1.6rem,3.5vw,2.4rem);margin-bottom:16px">جاهز لتصبح محترفاً في المحاسبة؟</h2>
            <p style="font-size:1.15rem;color:rgba(255,255,255,0.9);max-width:560px;margin:0 auto 32px">
              انضم إلى آلاف المتعلّمين وابدأ رحلتك اليوم. كل المحتوى متاح مجاناً وبالكامل.
            </p>
            <a href="/courses" class="btn btn-accent btn-lg">
              <i class="fas fa-rocket"></i> ابدأ الآن مجاناً
            </a>
          </div>
        </div>
      </div>
    </section>
  `

  return Layout({ title: 'الرئيسية', activeNav: 'home', children: content, description: 'منصة محاسب برو — تعلّم المحاسبة المالية من الصفر إلى الاحتراف بمحتوى عربي احترافي وأدوات تفاعلية' })
}
