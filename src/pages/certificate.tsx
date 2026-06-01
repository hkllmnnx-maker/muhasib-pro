import { html, raw } from 'hono/html'
import { Layout } from '../components/layout'
import { LearningPath, resolvePathSteps, getPathTotalLessons, getPathLessonIds } from '../data/learning-paths'

// ==========================================================================
//  صفحة شهادة الإتمام التعليمية (Certificate Page)
//  مهم: هذه شهادة إتمام تعليمية صادرة من منصة محاسب برو فقط، وليست
//  اعتمادًا مهنيًا رسميًا أو ترخيصًا من أي جهة حكومية أو مهنية.
// ==========================================================================

export const CertificatePage = (path: LearningPath) => {
  const steps = resolvePathSteps(path)
  const total = getPathTotalLessons(path)
  const lessonIds = getPathLessonIds(path)

  const content = html`
    <section class="section certificate-page" data-certificate-page
             data-path-lessons='${JSON.stringify(lessonIds)}'
             data-path-total="${total}"
             data-path-title="${path.title}"
             data-path-slug="${path.slug}">
      <div class="container">
        <nav class="breadcrumb">
          <a href="/">الرئيسية</a> <i class="fas fa-angle-left"></i>
          <a href="/roadmap">مسار التعلّم</a> <i class="fas fa-angle-left"></i>
          <span>شهادة الإتمام</span>
        </nav>

        <!-- حالة عدم الإكمال -->
        <div class="cert-gate" data-cert-gate style="display:none">
          <div class="cert-gate-card">
            <i class="fas fa-lock"></i>
            <h2>الشهادة غير متاحة بعد</h2>
            <p>
              لاستلام شهادة إتمام <strong>${path.title}</strong> التعليمية، يجب إكمال جميع
              دروس المسار (<b data-gate-total>${total}</b> درسًا). أكملت حتى الآن
              <b data-gate-done>0</b> درسًا.
            </p>
            <div class="cert-gate-bar"><span data-gate-bar style="width:0%"></span></div>
            <a href="/roadmap" class="btn btn-primary"><i class="fas fa-route"></i> العودة إلى المسار لإكمال الدروس</a>
          </div>
        </div>

        <!-- حالة الإكمال: نموذج الاسم + الشهادة -->
        <div class="cert-ready" data-cert-ready style="display:none">
          <div class="cert-toolbar no-print">
            <div class="cert-name-field">
              <label for="cert-name-input"><i class="fas fa-user-pen"></i> اكتب اسمك كما تريده أن يظهر على الشهادة</label>
              <input type="text" id="cert-name-input" placeholder="مثال: محمد عبدالله" maxlength="60" />
            </div>
            <div class="cert-actions">
              <button class="btn btn-accent" id="cert-print-btn"><i class="fas fa-print"></i> طباعة / حفظ PDF</button>
            </div>
          </div>

          <!-- الشهادة القابلة للطباعة -->
          <div class="certificate" id="certificate" style="--cert-color:${path.color}">
            <div class="certificate-border">
              <div class="certificate-inner">
                <div class="cert-watermark"><i class="fas fa-chart-line"></i></div>

                <div class="cert-header">
                  <span class="cert-logo"><i class="fas fa-chart-line"></i> محاسب برو</span>
                  <span class="cert-platform">منصة تعليمية للمحاسبة</span>
                </div>

                <div class="cert-ribbon" style="background:${path.color}">
                  <i class="fas ${path.icon}"></i>
                </div>

                <h1 class="cert-title">شهادة إتمام تعليمية</h1>
                <p class="cert-subtitle">تشهد منصّة محاسب برو بأنّ</p>

                <div class="cert-recipient" data-cert-recipient>—</div>
                <div class="cert-divider"></div>

                <p class="cert-body">
                  قد أتمّ بنجاح جميع دروس مسار
                  <strong>«${path.title}»</strong>
                  المكوّن من <b>${steps.length}</b> دورات تعليمية و<b>${total}</b> درسًا،
                  على منصّة محاسب برو للتعلّم الذاتي في المحاسبة.
                </p>

                <ul class="cert-courses">
                  ${steps.map(
                    (s) => html`<li><i class="fas fa-circle-check"></i> ${s.course.title}</li>`
                  )}
                </ul>

                <div class="cert-footer">
                  <div class="cert-meta">
                    <span class="cert-meta-label">تاريخ الإصدار</span>
                    <span class="cert-meta-value" data-cert-date>—</span>
                  </div>
                  <div class="cert-seal">
                    <div class="cert-seal-circle" style="border-color:${path.color}">
                      <i class="fas fa-award"></i>
                      <small>محاسب برو</small>
                    </div>
                  </div>
                  <div class="cert-meta">
                    <span class="cert-meta-label">رقم الشهادة</span>
                    <span class="cert-meta-value" data-cert-id>—</span>
                  </div>
                </div>

                <p class="cert-disclaimer">
                  <i class="fas fa-circle-info"></i>
                  هذه <strong>شهادة إتمام تعليمية</strong> صادرة من منصّة محاسب برو لإثبات إنهاء
                  المحتوى التعليمي للمسار، وهي <strong>ليست اعتمادًا مهنيًا رسميًا</strong> ولا ترخيصًا
                  ولا بديلًا عن الشهادات المهنية أو الجهات التنظيمية المعتمدة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <script>
      window.CERT_DATA = ${raw(
        JSON.stringify({
          slug: path.slug,
          title: path.title,
          total,
          lessonIds,
        }).replace(/</g, '\\u003c')
      )};
    </script>
  `

  return Layout({
    title: 'شهادة إتمام: ' + path.title,
    description:
      'شهادة إتمام تعليمية قابلة للطباعة من منصة محاسب برو عند إكمال مسار ' + path.title + '.',
    activeNav: 'roadmap',
    bodyClass: 'certificate-body',
    children: content,
  })
}
