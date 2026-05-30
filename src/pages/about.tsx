import { html } from 'hono/html'
import { Layout } from '../components/layout'
import { getPlatformStats } from '../data'

// ==========================================================================
//  صفحة عن المنصة (About Page)
// ==========================================================================

export const AboutPage = () => {
  const stats = getPlatformStats()

  const values = [
    { icon: 'fa-book-open', title: 'محتوى عربي أصيل', text: 'كل المحتوى مكتوب بالعربية بأسلوب مبسّط يراعي القارئ العربي والبيئة المحاسبية المحلية.' },
    { icon: 'fa-flask', title: 'تطبيق عملي', text: 'لا نكتفي بالنظريات؛ كل مفهوم مدعوم بأمثلة محلولة وقيود محاسبية واقعية وأدوات حاسبة.' },
    { icon: 'fa-layer-group', title: 'تدرّج منطقي', text: 'مسار متكامل من الصفر إلى الاحتراف، كل مرحلة تبني على ما قبلها بترتيب مدروس.' },
    { icon: 'fa-gift', title: 'مجاني بالكامل', text: 'نؤمن أن المعرفة المحاسبية حق للجميع، لذا كل المحتوى متاح مجانًا دون قيود.' },
  ]

  const content = html`
    <section class="page-hero">
      <div class="container">
        <span class="page-hero-badge"><i class="fas fa-circle-info"></i> عن المنصة</span>
        <h1 class="page-hero-title">رسالتنا: تبسيط المحاسبة للعالم العربي</h1>
        <p class="page-hero-desc">
          «محاسب برو» منصة تعليمية عربية وُلدت من إيمان عميق بأن المحاسبة لغة الأعمال التي يجب أن
          يتقنها كل طالب وموظف ورائد أعمال — لا المحاسبون فقط.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="about-stats">
          <div class="about-stat"><strong data-counter="${stats.courses}">0</strong><span>دورات متكاملة</span></div>
          <div class="about-stat"><strong data-counter="${stats.lessons}">0</strong><span>درس تفصيلي</span></div>
          <div class="about-stat"><strong data-counter="${stats.modules}">0</strong><span>وحدة تعليمية</span></div>
          <div class="about-stat"><strong data-counter="${stats.students}">0</strong><span>متعلّم</span></div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">قيمنا ومبادئنا</h2>
          <p class="section-subtitle">ما الذي يميّز تجربة التعلّم في محاسب برو</p>
        </div>
        <div class="values-grid">
          ${values.map(
            (v) => html`
              <div class="value-card reveal">
                <span class="value-icon"><i class="fas ${v.icon}"></i></span>
                <h3>${v.title}</h3>
                <p>${v.text}</p>
              </div>
            `
          )}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container about-mission">
        <div class="about-mission-text">
          <h2><i class="fas fa-bullseye"></i> منهجيتنا في التعليم</h2>
          <p>
            نتبع منهجية «الفهم قبل الحفظ». بدلاً من تلقين القواعد، نشرح <strong>لماذا</strong> تعمل المحاسبة بهذه الطريقة،
            ثم نُتبع كل مفهوم بمثال عملي وقيد محاسبي حقيقي، وأخيرًا اختبار قصير لترسيخ المعلومة.
          </p>
          <ul class="check-list">
            <li><i class="fas fa-check"></i> شرح نظري مبسّط مدعوم بالأمثلة.</li>
            <li><i class="fas fa-check"></i> قيود محاسبية وجداول توضيحية.</li>
            <li><i class="fas fa-check"></i> اختبارات ذاتية بتصحيح فوري وشرح.</li>
            <li><i class="fas fa-check"></i> أدوات حاسبة لتطبيق المفاهيم.</li>
            <li><i class="fas fa-check"></i> تتبّع تقدّمك ومراجعة ما أنجزته.</li>
          </ul>
        </div>
        <div class="about-mission-card">
          <i class="fas fa-quote-right"></i>
          <p>«المحاسبة لا تخلق الثروة، لكنها تكشف لك أين هي وأين تتسرّب.»</p>
          <span>— فلسفة محاسب برو</span>
        </div>
      </div>
    </section>

    <section class="section cta-band">
      <div class="container cta-inner">
        <div>
          <h2>جاهز لبدء رحلتك؟</h2>
          <p>انضم لآلاف المتعلّمين وابدأ أول دورة مجانًا اليوم.</p>
        </div>
        <a href="/courses" class="btn btn-accent btn-lg"><i class="fas fa-graduation-cap"></i> ابدأ التعلّم الآن</a>
      </div>
    </section>
  `

  return Layout({
    title: 'عن المنصة',
    description: 'تعرّف على منصة محاسب برو ورسالتها ومنهجيتها في تعليم المحاسبة المالية.',
    activeNav: 'about',
    children: content,
  })
}
