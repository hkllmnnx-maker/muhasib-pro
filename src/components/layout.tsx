import { html } from 'hono/html'

// ==========================================================================
//  مكوّن التخطيط العام (Layout) - الرأس والتذييل والقالب الأساسي
// ==========================================================================

interface LayoutProps {
  title: string
  description?: string
  activeNav?: string
  children: any
  bodyClass?: string
}

export const navItems = [
  { href: '/', label: 'الرئيسية', key: 'home', icon: 'fa-house' },
  { href: '/courses', label: 'الدورات', key: 'courses', icon: 'fa-graduation-cap' },
  { href: '/roadmap', label: 'مسار التعلّم', key: 'roadmap', icon: 'fa-route' },
  { href: '/tools', label: 'الأدوات', key: 'tools', icon: 'fa-calculator' },
  { href: '/glossary', label: 'القاموس', key: 'glossary', icon: 'fa-book' },
  { href: '/blog', label: 'المدونة', key: 'blog', icon: 'fa-newspaper' },
  { href: '/about', label: 'عن المنصة', key: 'about', icon: 'fa-circle-info' },
]

export const Header = (activeNav?: string) => html`
  <header class="site-header" id="site-header">
    <div class="container header-inner">
      <a href="/" class="logo">
        <span class="logo-icon"><i class="fas fa-chart-line"></i></span>
        <span class="logo-text">محاسب<span>برو</span></span>
      </a>
      <nav class="main-nav">
        ${navItems.map(
          (item) => html`
            <a href="${item.href}" class="nav-link ${activeNav === item.key ? 'active' : ''}">
              ${item.label}
            </a>
          `
        )}
      </nav>
      <div class="header-actions">
        <button class="theme-toggle" id="theme-toggle" aria-label="تبديل الوضع الليلي" title="الوضع الليلي/النهاري">
          <i class="fas fa-moon"></i>
        </button>
        <a href="/courses" class="btn btn-primary btn-sm hide-mobile">
          <i class="fas fa-play"></i> ابدأ التعلّم
        </a>
        <button class="menu-toggle" id="menu-toggle" aria-label="القائمة">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
  </header>
  <div class="mobile-overlay" id="mobile-overlay"></div>
  <nav class="mobile-menu" id="mobile-menu">
    ${navItems.map(
      (item) => html`
        <a href="${item.href}" class="nav-link ${activeNav === item.key ? 'active' : ''}">
          <i class="fas ${item.icon}" style="width:22px"></i> ${item.label}
        </a>
      `
    )}
    <a href="/courses" class="btn btn-primary btn-block mt-2">
      <i class="fas fa-play"></i> ابدأ التعلّم الآن
    </a>
  </nav>
`

export const Footer = () => html`
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="logo">
            <span class="logo-icon"><i class="fas fa-chart-line"></i></span>
            <span class="logo-text">محاسب<span>برو</span></span>
          </a>
          <p class="footer-about">
            منصة تعليمية عربية متخصصة في تعليم المحاسبة المالية من الصفر إلى الاحتراف،
            بمحتوى احترافي وأمثلة عملية وأدوات تفاعلية تساعدك على إتقان لغة الأعمال.
          </p>
          <div class="footer-social">
            <a href="#" class="social-link" aria-label="تويتر"><i class="fab fa-x-twitter"></i></a>
            <a href="#" class="social-link" aria-label="لينكدإن"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" class="social-link" aria-label="يوتيوب"><i class="fab fa-youtube"></i></a>
            <a href="#" class="social-link" aria-label="فيسبوك"><i class="fab fa-facebook-f"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>المنصة</h4>
          <ul class="footer-links">
            <li><a href="/courses">جميع الدورات</a></li>
            <li><a href="/roadmap">مسار التعلّم</a></li>
            <li><a href="/tools">الأدوات الحاسبية</a></li>
            <li><a href="/glossary">القاموس المحاسبي</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>المستويات</h4>
          <ul class="footer-links">
            <li><a href="/course/fundamentals">المبتدئ</a></li>
            <li><a href="/course/financial-statements">المتوسط</a></li>
            <li><a href="/course/advanced-accounting">المتقدم</a></li>
            <li><a href="/course/professional-cma">الاحترافي</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>تواصل معنا</h4>
          <ul class="footer-links">
            <li><i class="fas fa-envelope"></i> info@muhasibpro.com</li>
            <li><i class="fas fa-globe"></i> www.muhasibpro.com</li>
            <li><a href="/about">عن المنصة</a></li>
            <li><a href="/blog">المدونة</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 منصة محاسب برو — جميع الحقوق محفوظة. صُنع بشغف لتعليم المحاسبة العربية.</p>
      </div>
    </div>
  </footer>
`

export const Layout = ({ title, description, activeNav, children, bodyClass }: LayoutProps) => html`
  <!DOCTYPE html>
  <html lang="ar" dir="rtl" data-theme="light">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="${description || 'منصة محاسب برو لتعليم المحاسبة المالية من الصفر إلى الاحتراف'}" />
      <title>${title} | محاسب برو</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css" />
      <link rel="stylesheet" href="/static/style.css" />
      <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>" />
      <script>
        // تطبيق الثيم المحفوظ قبل التحميل لتجنّب الوميض
        (function () {
          var t = localStorage.getItem('theme') || 'light';
          document.documentElement.setAttribute('data-theme', t);
        })();
      </script>
    </head>
    <body class="${bodyClass || ''}">
      ${Header(activeNav)}
      <main>${children}</main>
      ${Footer()}
      <button class="scroll-top" id="scroll-top" aria-label="العودة للأعلى" style="position:fixed;bottom:24px;left:24px;width:48px;height:48px;border-radius:50%;background:var(--gradient-primary);color:#fff;display:none;align-items:center;justify-content:center;box-shadow:var(--shadow-lg);z-index:900;font-size:1.1rem;cursor:pointer;">
        <i class="fas fa-arrow-up"></i>
      </button>
      <script src="/static/app.js"></script>
    </body>
  </html>
`
