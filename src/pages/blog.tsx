import { html, raw } from 'hono/html'
import { Layout } from '../components/layout'
import { articles } from '../data/articles'
import { Article } from '../data/types'
import { ContentBlocks } from '../components/content-blocks'

// ==========================================================================
//  صفحة المدونة (قائمة المقالات + المقال المفرد)
// ==========================================================================

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return iso
  }
}

// قائمة المقالات
export const BlogPage = () => {
  const [featured, ...rest] = articles

  const content = html`
    <section class="page-hero">
      <div class="container">
        <span class="page-hero-badge"><i class="fas fa-newspaper"></i> المدونة</span>
        <h1 class="page-hero-title">مقالات تعليمية في المحاسبة والمال</h1>
        <p class="page-hero-desc">
          مقالات متعمّقة تبسّط المفاهيم المحاسبية والمالية وتربطها بالواقع العملي وريادة الأعمال.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        ${featured
          ? html`<a href="/blog/${featured.slug}" class="blog-featured reveal">
              <div class="blog-featured-icon"><i class="fas ${featured.icon}"></i></div>
              <div class="blog-featured-body">
                <span class="blog-tag">${featured.category}</span>
                <h2>${featured.title}</h2>
                <p>${featured.excerpt}</p>
                <div class="blog-meta">
                  <span><i class="fas fa-calendar"></i> ${formatDate(featured.date)}</span>
                  <span><i class="fas fa-clock"></i> ${featured.readTime} دقائق قراءة</span>
                  <span class="blog-read-more">اقرأ المقال <i class="fas fa-arrow-left"></i></span>
                </div>
              </div>
            </a>`
          : ''}

        <div class="blog-grid">
          ${rest.map(
            (a, idx) => html`
              <a href="/blog/${a.slug}" class="blog-card reveal" style="--delay:${idx * 0.07}s">
                <div class="blog-card-icon"><i class="fas ${a.icon}"></i></div>
                <span class="blog-tag">${a.category}</span>
                <h3>${a.title}</h3>
                <p>${a.excerpt}</p>
                <div class="blog-meta">
                  <span><i class="fas fa-calendar"></i> ${formatDate(a.date)}</span>
                  <span><i class="fas fa-clock"></i> ${a.readTime} د</span>
                </div>
              </a>
            `
          )}
        </div>
      </div>
    </section>
  `

  return Layout({
    title: 'المدونة',
    description: 'مقالات تعليمية متعمّقة في المحاسبة المالية والإدارة المالية.',
    activeNav: 'blog',
    children: content,
  })
}

// المقال المفرد
export const ArticlePage = (article: Article) => {
  const related = articles.filter((a) => a.id !== article.id).slice(0, 3)

  const content = html`
    <article class="article-page">
      <div class="container article-container">
        <nav class="breadcrumb">
          <a href="/">الرئيسية</a> <i class="fas fa-angle-left"></i>
          <a href="/blog">المدونة</a> <i class="fas fa-angle-left"></i>
          <span>${article.category}</span>
        </nav>

        <header class="article-header">
          <span class="blog-tag">${article.category}</span>
          <h1>${article.title}</h1>
          <p class="article-excerpt">${article.excerpt}</p>
          <div class="article-meta">
            <span><i class="fas fa-calendar"></i> ${formatDate(article.date)}</span>
            <span><i class="fas fa-clock"></i> ${article.readTime} دقائق قراءة</span>
          </div>
        </header>

        <div class="article-body prose">
          ${ContentBlocks({ blocks: article.content })}
        </div>

        <div class="article-share">
          <span>شارك المقال:</span>
          <a href="#" class="social-link" aria-label="تويتر"><i class="fab fa-x-twitter"></i></a>
          <a href="#" class="social-link" aria-label="لينكدإن"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" class="social-link" aria-label="واتساب"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>

      ${related.length
        ? html`<section class="section article-related">
            <div class="container">
              <h2 class="section-title">مقالات ذات صلة</h2>
              <div class="blog-grid">
                ${related.map(
                  (a) => html`
                    <a href="/blog/${a.slug}" class="blog-card">
                      <div class="blog-card-icon"><i class="fas ${a.icon}"></i></div>
                      <span class="blog-tag">${a.category}</span>
                      <h3>${a.title}</h3>
                      <p>${a.excerpt}</p>
                    </a>
                  `
                )}
              </div>
            </div>
          </section>`
        : ''}
    </article>
  `

  return Layout({
    title: article.title,
    description: article.excerpt,
    activeNav: 'blog',
    children: content,
  })
}
