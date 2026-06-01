import { html } from 'hono/html'
import { Layout } from '../components/layout'

// ==========================================================================
//  صفحة الأدوات الحاسبية (Tools / Calculators Page)
//  ملاحظة: الأدوات الضريبية تعليمية فقط وتستند إلى مصادر يمنية رسمية موثّقة
//  (انظر بطاقات الأدوات الضريبية في الأسفل) مع إتاحة تعديل النسبة يدويًا.
// ==========================================================================

export const ToolsPage = () => {
  const content = html`
    <section class="page-hero">
      <div class="container">
        <span class="page-hero-badge"><i class="fas fa-calculator"></i> الأدوات الحاسبية</span>
        <h1 class="page-hero-title">طبّق ما تعلّمته بأدوات تفاعلية فورية</h1>
        <p class="page-hero-desc">
          مجموعة من الآلات الحاسبة المحاسبية والمالية تعمل لحظيًا أثناء الكتابة — لا حاجة لزر حساب.
          أدخل القيم وشاهد النتائج تتحدّث مباشرة. جميع الأدوات تتحقق من المدخلات ولا تُظهر نتائج غير صالحة.
        </p>
      </div>
    </section>

    <!-- تنبيه عام للأدوات الضريبية -->
    <section class="section section-tight">
      <div class="container">
        <div class="callout callout-warning" id="tax-global-notice">
          <span class="callout-icon"><i class="fas fa-triangle-exclamation"></i></span>
          <div class="callout-content">
            <strong>تنبيه مهم بخصوص الأدوات الضريبية</strong>
            <p>
              الأدوات الضريبية (ضريبة المبيعات وكشف الرواتب) <b>تعليمية</b> فقط، الغرض منها التدريب وفهم آلية الحساب.
              <b>لا تُعدّ إقرارًا ضريبيًا رسميًا</b>، ويجب الرجوع إلى مصلحة الضرائب اليمنية أو مستشار ضريبي مختص
              للتأكد من النسب والقواعد السارية حاليًا قبل اتخاذ أي إجراء رسمي.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container tools-grid">

        <!-- 1) المعادلة المحاسبية -->
        <article class="tool-card" id="tool-equation">
          <div class="tool-card-head">
            <span class="tool-icon" style="background:linear-gradient(135deg,#1e3a8a,#3b82f6)"><i class="fas fa-scale-balanced"></i></span>
            <div>
              <h3>المعادلة المحاسبية</h3>
              <p>الأصول = الالتزامات + حقوق الملكية</p>
            </div>
          </div>
          <div class="tool-fields">
            <label>إجمالي الأصول
              <input type="number" id="eq-assets" placeholder="0" min="0" step="any" />
            </label>
            <label>إجمالي الالتزامات
              <input type="number" id="eq-liabilities" placeholder="0" min="0" step="any" />
            </label>
          </div>
          <div class="tool-result">
            <span>حقوق الملكية (المحسوبة)</span>
            <strong><span id="eq-result">0</span></strong>
            <small id="eq-status" class="tool-status">أدخل القيم لرؤية النتيجة</small>
          </div>
        </article>

        <!-- 2) الإهلاك بالقسط الثابت -->
        <article class="tool-card" id="tool-depreciation">
          <div class="tool-card-head">
            <span class="tool-icon" style="background:linear-gradient(135deg,#7c3aed,#a78bfa)"><i class="fas fa-arrow-trend-down"></i></span>
            <div>
              <h3>حاسبة الإهلاك</h3>
              <p>طريقة القسط الثابت</p>
            </div>
          </div>
          <div class="tool-fields">
            <label>تكلفة الأصل
              <input type="number" id="dep-cost" placeholder="0" min="0" step="any" />
            </label>
            <label>القيمة التخريدية (المتبقية)
              <input type="number" id="dep-salvage" placeholder="0" min="0" step="any" />
            </label>
            <label>العمر الإنتاجي (سنوات)
              <input type="number" id="dep-life" placeholder="1" min="1" step="any" />
            </label>
          </div>
          <div class="tool-result-grid">
            <div><span>الإهلاك السنوي</span><strong id="dep-annual">0</strong></div>
            <div><span>الإهلاك الشهري</span><strong id="dep-monthly">0</strong></div>
            <div><span>معدّل الإهلاك</span><strong id="dep-rate">0٪</strong></div>
          </div>
          <small id="dep-status" class="tool-status">أدخل القيم لرؤية النتيجة</small>
        </article>

        <!-- 3) هامش الربح / الربحية -->
        <article class="tool-card" id="tool-profit">
          <div class="tool-card-head">
            <span class="tool-icon" style="background:linear-gradient(135deg,#16a34a,#4ade80)"><i class="fas fa-sack-dollar"></i></span>
            <div>
              <h3>حاسبة الربحية</h3>
              <p>الربح الإجمالي والصافي والهوامش</p>
            </div>
          </div>
          <div class="tool-fields">
            <label>الإيرادات (المبيعات)
              <input type="number" id="pr-revenue" placeholder="0" min="0" step="any" />
            </label>
            <label>تكلفة البضاعة المباعة
              <input type="number" id="pr-cost" placeholder="0" min="0" step="any" />
            </label>
            <label>المصروفات التشغيلية
              <input type="number" id="pr-expenses" placeholder="0" min="0" step="any" />
            </label>
          </div>
          <div class="tool-result-grid">
            <div><span>الربح الإجمالي</span><strong id="pr-gross">0</strong></div>
            <div><span>صافي الربح</span><strong id="pr-net">0</strong></div>
            <div><span>هامش إجمالي</span><strong id="pr-gross-margin">0٪</strong></div>
            <div><span>هامش صافي</span><strong id="pr-net-margin">0٪</strong></div>
          </div>
        </article>

        <!-- 4) نقطة التعادل -->
        <article class="tool-card" id="tool-breakeven">
          <div class="tool-card-head">
            <span class="tool-icon" style="background:linear-gradient(135deg,#d97706,#fbbf24)"><i class="fas fa-bullseye"></i></span>
            <div>
              <h3>نقطة التعادل</h3>
              <p>عدد الوحدات لتغطية التكاليف</p>
            </div>
          </div>
          <div class="tool-fields">
            <label>التكاليف الثابتة
              <input type="number" id="be-fixed" placeholder="0" min="0" step="any" />
            </label>
            <label>سعر بيع الوحدة
              <input type="number" id="be-price" placeholder="0" min="0" step="any" />
            </label>
            <label>التكلفة المتغيرة للوحدة
              <input type="number" id="be-variable" placeholder="0" min="0" step="any" />
            </label>
          </div>
          <div class="tool-result-grid">
            <div><span>هامش المساهمة</span><strong id="be-contribution">0</strong></div>
            <div><span>وحدات التعادل</span><strong id="be-units">0</strong></div>
            <div><span>مبيعات التعادل</span><strong id="be-sales">0</strong></div>
          </div>
          <small id="be-status" class="tool-status">يجب أن يكون سعر البيع أكبر من التكلفة المتغيرة</small>
        </article>

        <!-- 5) هامش المساهمة (أداة مستقلة) -->
        <article class="tool-card" id="tool-contribution">
          <div class="tool-card-head">
            <span class="tool-icon" style="background:linear-gradient(135deg,#0891b2,#22d3ee)"><i class="fas fa-layer-group"></i></span>
            <div>
              <h3>هامش المساهمة</h3>
              <p>للوحدة والإجمالي ونسبة المساهمة</p>
            </div>
          </div>
          <div class="tool-fields">
            <label>سعر بيع الوحدة
              <input type="number" id="cm-price" placeholder="0" min="0" step="any" />
            </label>
            <label>التكلفة المتغيرة للوحدة
              <input type="number" id="cm-variable" placeholder="0" min="0" step="any" />
            </label>
            <label>عدد الوحدات المباعة
              <input type="number" id="cm-units" placeholder="0" min="0" step="any" />
            </label>
          </div>
          <div class="tool-result-grid">
            <div><span>هامش المساهمة للوحدة</span><strong id="cm-unit">0</strong></div>
            <div><span>إجمالي هامش المساهمة</span><strong id="cm-total">0</strong></div>
            <div><span>نسبة هامش المساهمة</span><strong id="cm-ratio">0٪</strong></div>
          </div>
          <small id="cm-status" class="tool-status">هامش المساهمة = سعر البيع − التكلفة المتغيرة</small>
        </article>

        <!-- 6) النسب المالية: السيولة والربحية والرافعة -->
        <article class="tool-card tool-card-wide" id="tool-ratios">
          <div class="tool-card-head">
            <span class="tool-icon" style="background:linear-gradient(135deg,#0284c7,#38bdf8)"><i class="fas fa-chart-pie"></i></span>
            <div>
              <h3>حاسبة النسب المالية</h3>
              <p>السيولة والربحية والرافعة المالية</p>
            </div>
          </div>
          <div class="tool-fields tool-fields-row">
            <label>الأصول المتداولة
              <input type="number" id="rt-current-assets" placeholder="0" min="0" step="any" />
            </label>
            <label>المخزون
              <input type="number" id="rt-inventory" placeholder="0" min="0" step="any" />
            </label>
            <label>النقدية وما في حكمها
              <input type="number" id="rt-cash" placeholder="0" min="0" step="any" />
            </label>
            <label>الالتزامات المتداولة
              <input type="number" id="rt-current-liab" placeholder="0" min="0" step="any" />
            </label>
            <label>إجمالي الديون
              <input type="number" id="rt-total-debt" placeholder="0" min="0" step="any" />
            </label>
            <label>إجمالي حقوق الملكية
              <input type="number" id="rt-total-equity" placeholder="0" min="0" step="any" />
            </label>
            <label>صافي الربح
              <input type="number" id="rt-net-income" placeholder="0" step="any" />
            </label>
            <label>إجمالي الأصول
              <input type="number" id="rt-total-assets" placeholder="0" min="0" step="any" />
            </label>
          </div>
          <div class="tool-result-grid">
            <div><span>نسبة التداول</span><strong id="rt-current">0</strong></div>
            <div><span>النسبة السريعة</span><strong id="rt-quick">0</strong></div>
            <div><span>نسبة النقدية</span><strong id="rt-cash-ratio">0</strong></div>
            <div><span>الدين إلى حقوق الملكية</span><strong id="rt-debt-equity">0</strong></div>
            <div><span>العائد على الأصول ROA</span><strong id="rt-roa">0٪</strong></div>
            <div><span>العائد على حقوق الملكية ROE</span><strong id="rt-roe">0٪</strong></div>
          </div>
          <small id="rt-status" class="tool-status">السيولة: نسبة التداول، السريعة، النقدية — الربحية: ROA و ROE</small>
        </article>

        <!-- 7) ضريبة المبيعات التعليمية -->
        <article class="tool-card" id="tool-vat">
          <div class="tool-card-head">
            <span class="tool-icon" style="background:linear-gradient(135deg,#be123c,#fb7185)"><i class="fas fa-receipt"></i></span>
            <div>
              <h3>حاسبة ضريبة المبيعات (تعليمية)</h3>
              <p>النسبة يحددها المستخدم يدويًا</p>
            </div>
          </div>
          <div class="tool-fields">
            <label>المبلغ (قيمة السلعة/الخدمة)
              <input type="number" id="vat-amount" placeholder="0" min="0" step="any" />
            </label>
            <label>نسبة الضريبة (٪) — قابلة للتعديل
              <input type="number" id="vat-rate" value="5" min="0" max="100" step="any" />
            </label>
            <label class="tool-radio-group">طريقة الحساب
              <span class="tool-radios">
                <label class="tool-radio"><input type="radio" name="vat-mode" value="exclusive" checked /> المبلغ بدون ضريبة</label>
                <label class="tool-radio"><input type="radio" name="vat-mode" value="inclusive" /> المبلغ شامل الضريبة</label>
              </span>
            </label>
          </div>
          <div class="tool-result-grid">
            <div><span>صافي المبلغ (قبل الضريبة)</span><strong id="vat-net">0</strong></div>
            <div><span>قيمة الضريبة</span><strong id="vat-tax">0</strong></div>
            <div><span>الإجمالي (شامل الضريبة)</span><strong id="vat-gross">0</strong></div>
          </div>
          <div class="tool-source">
            <i class="fas fa-book"></i>
            <span>
              النسبة الافتراضية <b>5%</b> هي النسبة العامة لضريبة المبيعات وفق
              القانون رقم (19) لسنة 2001م بشأن الضريبة العامة على المبيعات (مصلحة الضرائب اليمنية).
              يمكنك تعديل النسبة حسب حالتك. النتيجة <b>تعليمية وليست إقرارًا ضريبيًا رسميًا</b>.
            </span>
          </div>
        </article>

        <!-- 8) كشف رواتب تعليمي -->
        <article class="tool-card tool-card-wide" id="tool-payroll">
          <div class="tool-card-head">
            <span class="tool-icon" style="background:linear-gradient(135deg,#4338ca,#818cf8)"><i class="fas fa-money-check-dollar"></i></span>
            <div>
              <h3>حاسبة كشف الرواتب (تعليمية)</h3>
              <p>الراتب الصافي بعد الاستقطاعات</p>
            </div>
          </div>
          <div class="tool-fields tool-fields-row">
            <label>الراتب الأساسي الشهري
              <input type="number" id="pay-basic" placeholder="0" min="0" step="any" />
            </label>
            <label>إجمالي البدلات
              <input type="number" id="pay-allow" placeholder="0" min="0" step="any" />
            </label>
            <label>استقطاع التأمينات (٪) — اختياري
              <input type="number" id="pay-insurance" placeholder="0" min="0" max="100" step="any" />
            </label>
            <label>نسبة ضريبة المرتبات (٪) — قابلة للتعديل
              <input type="number" id="pay-tax" placeholder="0" min="0" max="100" step="any" />
            </label>
            <label>خصومات أخرى (مبلغ ثابت)
              <input type="number" id="pay-other" placeholder="0" min="0" step="any" />
            </label>
          </div>
          <div class="tool-result-grid">
            <div><span>إجمالي الدخل</span><strong id="pay-gross">0</strong></div>
            <div><span>استقطاع التأمينات</span><strong id="pay-ins-amount">0</strong></div>
            <div><span>الضريبة المستقطعة</span><strong id="pay-tax-amount">0</strong></div>
            <div><span>إجمالي الخصومات</span><strong id="pay-deductions">0</strong></div>
            <div><span>صافي الراتب</span><strong id="pay-net">0</strong></div>
          </div>
          <div class="tool-source">
            <i class="fas fa-book"></i>
            <span>
              للاسترشاد: ينص قانون ضرائب الدخل اليمني رقم (17) لسنة 2010م (المادة 62) على شرائح تصاعدية
              لضريبة المرتبات والأجور (حد إعفاء سنوي 840,000 ريال بنسبة 0٪، ثم 10٪، ثم 15٪، ثم 20٪ على ما زاد عن 1,080,000 ريال سنويًا).
              هذه الأداة تترك النسبة <b>يدوية</b> للمستخدم لمرونة التطبيق، والنتيجة <b>تعليمية فقط وليست إقرارًا قانونيًا</b>؛
              راجع مصلحة الضرائب أو مستشارًا مختصًا.
            </span>
          </div>
        </article>

        <!-- 9) تحويل ميزان مراجعة مبسط إلى قائمة دخل -->
        <article class="tool-card tool-card-wide" id="tool-income-statement">
          <div class="tool-card-head">
            <span class="tool-icon" style="background:linear-gradient(135deg,#059669,#34d399)"><i class="fas fa-file-invoice-dollar"></i></span>
            <div>
              <h3>تحويل ميزان مراجعة إلى قائمة دخل</h3>
              <p>أدخل أرصدة الإيرادات والمصروفات</p>
            </div>
          </div>
          <div class="tool-fields tool-fields-row">
            <label>المبيعات / الإيرادات
              <input type="number" id="is-sales" placeholder="0" min="0" step="any" />
            </label>
            <label>مردودات ومسموحات المبيعات
              <input type="number" id="is-returns" placeholder="0" min="0" step="any" />
            </label>
            <label>تكلفة البضاعة المباعة
              <input type="number" id="is-cogs" placeholder="0" min="0" step="any" />
            </label>
            <label>مصروفات إدارية وعمومية
              <input type="number" id="is-admin" placeholder="0" min="0" step="any" />
            </label>
            <label>مصروفات بيع وتسويق
              <input type="number" id="is-selling" placeholder="0" min="0" step="any" />
            </label>
            <label>إيرادات أخرى
              <input type="number" id="is-other-income" placeholder="0" min="0" step="any" />
            </label>
            <label>مصروفات تمويلية (فوائد)
              <input type="number" id="is-finance" placeholder="0" min="0" step="any" />
            </label>
          </div>
          <div class="income-statement-output" id="is-output">
            <h4 class="income-statement-title"><i class="fas fa-list-ol"></i> قائمة الدخل (مبسّطة)</h4>
            <table class="income-statement-table">
              <tbody>
                <tr><td>صافي المبيعات</td><td id="is-net-sales">0</td></tr>
                <tr><td>(−) تكلفة البضاعة المباعة</td><td id="is-cogs-out">0</td></tr>
                <tr class="is-subtotal"><td>مجمل الربح</td><td id="is-gross-profit">0</td></tr>
                <tr><td>(−) مصروفات تشغيلية</td><td id="is-operating-exp">0</td></tr>
                <tr class="is-subtotal"><td>الربح التشغيلي</td><td id="is-operating-profit">0</td></tr>
                <tr><td>(+) إيرادات أخرى</td><td id="is-other-out">0</td></tr>
                <tr><td>(−) مصروفات تمويلية</td><td id="is-finance-out">0</td></tr>
                <tr class="is-total"><td>صافي الربح (الخسارة)</td><td id="is-net-profit">0</td></tr>
              </tbody>
            </table>
            <small id="is-status" class="tool-status">أدخل الأرصدة لبناء قائمة الدخل لحظيًا</small>
          </div>
        </article>

      </div>
    </section>
  `

  return Layout({
    title: 'الأدوات الحاسبية',
    description: 'آلات حاسبة محاسبية ومالية تفاعلية: المعادلة المحاسبية، الإهلاك، الربحية، نقطة التعادل، هامش المساهمة، النسب المالية، ضريبة المبيعات التعليمية، كشف الرواتب، وتحويل ميزان المراجعة إلى قائمة دخل.',
    activeNav: 'tools',
    children: content,
  })
}
