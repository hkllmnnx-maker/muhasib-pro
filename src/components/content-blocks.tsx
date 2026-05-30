import { html, raw } from 'hono/html'
import type { ContentBlock } from '../data/types'

// ==========================================================================
//  مكوّن عرض كتل المحتوى (Content Blocks Renderer)
// ==========================================================================

const calloutMeta: Record<string, { icon: string; cls: string; label: string }> = {
  info: { icon: 'fa-circle-info', cls: 'callout-info', label: 'معلومة' },
  tip: { icon: 'fa-lightbulb', cls: 'callout-tip', label: 'نصيحة' },
  warning: { icon: 'fa-triangle-exclamation', cls: 'callout-warning', label: 'تنبيه' },
  example: { icon: 'fa-flask', cls: 'callout-example', label: 'مثال' },
}

function renderBlock(block: ContentBlock) {
  switch (block.type) {
    case 'heading':
      return html`<h2>${raw(block.text || '')}</h2>`
    case 'subheading':
      return html`<h3>${raw(block.text || '')}</h3>`
    case 'paragraph':
      return html`<p>${raw(block.text || '')}</p>`
    case 'list':
      return html`<ul>
        ${(block.items || []).map((item) => html`<li>${raw(item)}</li>`)}
      </ul>`
    case 'ordered':
      return html`<ol>
        ${(block.items || []).map((item) => html`<li>${raw(item)}</li>`)}
      </ol>`
    case 'table':
      return html`<div style="overflow-x:auto">
        <table>
          <thead>
            <tr>
              ${(block.headers || []).map((h) => html`<th>${raw(h)}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${(block.rows || []).map(
              (row) => html`<tr>
                ${row.map((cell) => html`<td>${raw(cell)}</td>`)}
              </tr>`
            )}
          </tbody>
        </table>
      </div>`
    case 'callout': {
      const meta = calloutMeta[block.variant || 'info']
      return html`<div class="callout ${meta.cls}">
        <span class="callout-icon"><i class="fas ${meta.icon}"></i></span>
        <div class="callout-content">
          <strong>${block.title || meta.label}</strong>
          <p>${raw(block.text || '')}</p>
        </div>
      </div>`
    }
    case 'formula':
      return html`<div style="text-align:center;background:var(--gradient-primary);color:#fff;padding:24px;border-radius:var(--radius-lg);margin:24px 0;font-size:1.35rem;font-weight:800;font-family:var(--font-heading);box-shadow:var(--shadow-md);">
        <i class="fas fa-square-root-variable" style="opacity:.6;margin-left:10px"></i>
        ${raw(block.text || '')}
      </div>`
    case 'journal': {
      const totalDebit = (block.entries || []).reduce((s, e) => s + (e.debit || 0), 0)
      const totalCredit = (block.entries || []).reduce((s, e) => s + (e.credit || 0), 0)
      return html`<div class="journal-entry">
        ${block.caption ? html`<div style="font-weight:800;margin-bottom:12px;color:var(--color-primary-light)"><i class="fas fa-pen-to-square"></i> ${block.caption}</div>` : ''}
        <table>
          <thead>
            <tr><th>الحساب / البيان</th><th style="width:120px">مدين</th><th style="width:120px">دائن</th></tr>
          </thead>
          <tbody>
            ${(block.entries || []).map(
              (e) => html`<tr>
                <td style="${e.credit ? 'padding-right:32px' : ''}">${raw(e.account)}</td>
                <td>${e.debit ? e.debit.toLocaleString('ar-EG') : ''}</td>
                <td>${e.credit ? e.credit.toLocaleString('ar-EG') : ''}</td>
              </tr>`
            )}
            <tr style="font-weight:800;background:var(--bg-surface-3)">
              <td>الإجمالي</td>
              <td>${totalDebit.toLocaleString('ar-EG')}</td>
              <td>${totalCredit.toLocaleString('ar-EG')}</td>
            </tr>
          </tbody>
        </table>
      </div>`
    }
    case 'example':
      return html`<div class="callout callout-example">
        <span class="callout-icon"><i class="fas fa-flask"></i></span>
        <div class="callout-content">
          <strong>${block.title || 'مثال'}</strong>
          <p>${raw(block.text || '')}</p>
        </div>
      </div>`
    default:
      return html``
  }
}

export const ContentBlocks = ({ blocks }: { blocks: ContentBlock[] }) =>
  html`${blocks.map((b) => renderBlock(b))}`
