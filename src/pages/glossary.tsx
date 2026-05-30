import { html } from 'hono/html'
import { Layout } from '../components/layout'
import { glossary, getCategories } from '../data/glossary'

// ==========================================================================
//  صفحة القاموس المحاسبي (Glossary Page)
// ==========================================================================

export const GlossaryPage = () => {
  const categories = getCategories()

  const content = html`
    <section class="page-hero">
      <div class="container">
        <span class="page-hero-badge"><i class="fas fa-book"></i> القاموس المحاسبي</span>
        <h1 class="page-hero-title">معجم المصطلحات المحاسبية</h1>
        <p class="page-hero-desc">
          أكثر من ${glossary.length} مصطلحًا محاسبيًا ومماليًا بالعربية والإنجليزية مع تعريف واضح لكل منها.
          استخدم البحث للوصول السريع لأي مصطلح.
        </p>
        <div class="glossary-search">
          <i class="fas fa-magnifying-glass"></i>
          <input type="text" id="glossary-search-input" placeholder="ابحث عن مصطلح بالعربية أو الإنجليزية..." />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div id="glossary-no-results" class="glossary-no-results" style="display:none">
          <i class="fas fa-circle-question"></i>
          <p>لا توجد مصطلحات تطابق بحثك. جرّب كلمة أخرى.</p>
        </div>

        ${categories.map(
          (cat) => html`
            <div class="glossary-category" data-glossary-category>
              <h2 class="glossary-category-title"><i class="fas fa-folder-open"></i> ${cat}</h2>
              <div class="glossary-grid">
                ${glossary
                  .filter((t) => t.category === cat)
                  .map(
                    (t) => html`
                      <div class="glossary-term" data-glossary-term data-search="${t.term} ${t.termEn} ${t.definition}">
                        <div class="glossary-term-head">
                          <h3>${t.term}</h3>
                          <span class="glossary-term-en">${t.termEn}</span>
                        </div>
                        <p>${t.definition}</p>
                      </div>
                    `
                  )}
              </div>
            </div>
          `
        )}
      </div>
    </section>
  `

  return Layout({
    title: 'القاموس المحاسبي',
    description: 'معجم شامل للمصطلحات المحاسبية والمالية بالعربية والإنجليزية.',
    activeNav: 'glossary',
    children: content,
  })
}
