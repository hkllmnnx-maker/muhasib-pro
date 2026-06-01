import { html } from 'hono/html'
import { Layout } from '../components/layout'

// ==========================================================================
//  صفحة الأدوات الحاسبية (Tools / Calculators Page)
// ==========================================================================

export const ToolsPage = () => {
  const content = html`
    <section class="page-hero">
      <div class="container">
        <span class="page-hero-badge"><i class="fas fa-calculator"></i> الأدوات الحاسبية</span>
        <h1 class="page-hero-title">طبّق ما تعلّمته بأدوات تفاعلية فورية</h1>
        <p class="page-hero-desc">
          مجموعة من الآلات الحاسبة المحاسبية والمالية تعمل لحظيًا أثناء الكتابة — لا حاجة لزر حساب.
          أدخل القيم وشاهد النتائج تتحدّث مباشرة.
        </p>
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
              <input type="number" id="eq-assets" placeholder="0" min="0" step="any" inputmode="decimal" />
            </label>
            <label>إجمالي الالتزامات
              <input type="number" id="eq-liabilities" placeholder="0" min="0" step="any" inputmode="decimal" />
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
              <input type="number" id="dep-cost" placeholder="0" min="0" step="any" inputmode="decimal" />
            </label>
            <label>القيمة التخريدية (المتبقية)
              <input type="number" id="dep-salvage" placeholder="0" min="0" step="any" inputmode="decimal" />
            </label>
            <label>العمر الإنتاجي (سنوات)
              <input type="number" id="dep-life" placeholder="1" min="0" step="any" inputmode="decimal" />
            </label>
          </div>
          <div class="tool-result-grid">
            <div><span>الإهلاك السنوي</span><strong id="dep-annual">0</strong></div>
            <div><span>الإهلاك الشهري</span><strong id="dep-monthly">0</strong></div>
            <div><span>معدّل الإهلاك</span><strong id="dep-rate">0٪</strong></div>
          </div>
        </article>

        <!-- 3) هامش الربح -->
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
              <input type="number" id="pr-revenue" placeholder="0" min="0" step="any" inputmode="decimal" />
            </label>
            <label>تكلفة البضاعة المباعة
              <input type="number" id="pr-cost" placeholder="0" min="0" step="any" inputmode="decimal" />
            </label>
            <label>المصروفات التشغيلية
              <input type="number" id="pr-expenses" placeholder="0" min="0" step="any" inputmode="decimal" />
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
              <input type="number" id="be-fixed" placeholder="0" min="0" step="any" inputmode="decimal" />
            </label>
            <label>سعر بيع الوحدة
              <input type="number" id="be-price" placeholder="0" min="0" step="any" inputmode="decimal" />
            </label>
            <label>التكلفة المتغيرة للوحدة
              <input type="number" id="be-variable" placeholder="0" min="0" step="any" inputmode="decimal" />
            </label>
          </div>
          <div class="tool-result-grid">
            <div><span>هامش المساهمة</span><strong id="be-contribution">0</strong></div>
            <div><span>وحدات التعادل</span><strong id="be-units">0</strong></div>
            <div><span>مبيعات التعادل</span><strong id="be-sales">0</strong></div>
          </div>
        </article>

        <!-- 5) النسب المالية -->
        <article class="tool-card tool-card-wide" id="tool-ratios">
          <div class="tool-card-head">
            <span class="tool-icon" style="background:linear-gradient(135deg,#0284c7,#38bdf8)"><i class="fas fa-chart-pie"></i></span>
            <div>
              <h3>حاسبة النسب المالية</h3>
              <p>السيولة والرافعة المالية</p>
            </div>
          </div>
          <div class="tool-fields tool-fields-row">
            <label>الأصول المتداولة
              <input type="number" id="rt-current-assets" placeholder="0" min="0" step="any" inputmode="decimal" />
            </label>
            <label>المخزون
              <input type="number" id="rt-inventory" placeholder="0" min="0" step="any" inputmode="decimal" />
            </label>
            <label>الالتزامات المتداولة
              <input type="number" id="rt-current-liab" placeholder="0" min="0" step="any" inputmode="decimal" />
            </label>
            <label>إجمالي الديون
              <input type="number" id="rt-total-debt" placeholder="0" min="0" step="any" inputmode="decimal" />
            </label>
            <label>إجمالي حقوق الملكية
              <input type="number" id="rt-total-equity" placeholder="0" min="0" step="any" inputmode="decimal" />
            </label>
          </div>
          <div class="tool-result-grid">
            <div><span>نسبة التداول</span><strong id="rt-current">0</strong></div>
            <div><span>النسبة السريعة</span><strong id="rt-quick">0</strong></div>
            <div><span>الدين إلى حقوق الملكية</span><strong id="rt-debt-equity">0</strong></div>
          </div>
        </article>

      </div>
    </section>
  `

  return Layout({
    title: 'الأدوات الحاسبية',
    description: 'آلات حاسبة محاسبية ومالية تفاعلية: المعادلة المحاسبية، الإهلاك، الربحية، نقطة التعادل، النسب المالية.',
    activeNav: 'tools',
    children: content,
  })
}
