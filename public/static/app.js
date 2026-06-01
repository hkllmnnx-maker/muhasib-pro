/* ==========================================================================
   منصة محاسب برو - السكربت الأمامي التفاعلي (Frontend JS)
   ========================================================================== */

(function () {
  'use strict';

  // ---------- 1. إدارة الوضع الليلي/النهاري ----------
  const themeToggle = document.getElementById('theme-toggle');
  function updateThemeIcon() {
    const theme = document.documentElement.getAttribute('data-theme');
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
  updateThemeIcon();
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon();
    });
  }

  // ---------- 2. القائمة الجوال ----------
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
  }
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      if (mobileOverlay) mobileOverlay.classList.toggle('open');
    });
  }
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  // ---------- 3. زر العودة للأعلى ----------
  const scrollTopBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', function () {
    if (scrollTopBtn) {
      scrollTopBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
    }
  });
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- 4. تأثير ظهور العناصر عند التمرير (Reveal) ----------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---------- 5. عدّاد الأرقام المتحركة ----------
  const counters = document.querySelectorAll('[data-counter]');
  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (c) {
      counterObserver.observe(c);
    });
  }
  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = formatNumber(value, target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = formatNumber(target, target) + suffix;
    }
    requestAnimationFrame(step);
  }
  function formatNumber(value, target) {
    if (target % 1 !== 0) return value.toFixed(1);
    return Math.round(value).toLocaleString('ar-EG');
  }

  // ---------- 6. الأكورديون (FAQ) ----------
  document.querySelectorAll('.accordion-header').forEach(function (header) {
    header.addEventListener('click', function () {
      const item = header.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');
      // إغلاق الكل في نفس المجموعة
      const group = item.closest('.accordion-group');
      if (group) {
        group.querySelectorAll('.accordion-item').forEach(function (i) {
          i.classList.remove('open');
        });
      }
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ---------- 7. فلترة الدورات ----------
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const filter = tab.getAttribute('data-filter');
      filterTabs.forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      document.querySelectorAll('[data-course-card]').forEach(function (card) {
        const level = card.getAttribute('data-level');
        if (filter === 'all' || level === filter) {
          card.style.display = '';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ---------- 8. القائمة الجانبية للدروس (طي/فتح الوحدات) ----------
  document.querySelectorAll('.sidebar-module-title').forEach(function (title) {
    title.addEventListener('click', function () {
      const lessons = title.nextElementSibling;
      const icon = title.querySelector('.module-toggle-icon');
      if (lessons) {
        const isHidden = lessons.style.display === 'none';
        lessons.style.display = isHidden ? 'block' : 'none';
        if (icon) icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(-90deg)';
      }
    });
  });

  // ---------- 9. نظام تتبّع تقدّم الدروس (LocalStorage) ----------
  window.MuhasibProgress = {
    getCompleted: function () {
      try {
        return JSON.parse(localStorage.getItem('completedLessons') || '[]');
      } catch (e) {
        return [];
      }
    },
    markComplete: function (lessonId) {
      const list = this.getCompleted();
      if (list.indexOf(lessonId) === -1) {
        list.push(lessonId);
        localStorage.setItem('completedLessons', JSON.stringify(list));
      }
    },
    unmarkComplete: function (lessonId) {
      let list = this.getCompleted();
      list = list.filter(function (id) {
        return id !== lessonId;
      });
      localStorage.setItem('completedLessons', JSON.stringify(list));
    },
    isComplete: function (lessonId) {
      return this.getCompleted().indexOf(lessonId) !== -1;
    },
    getCourseProgress: function (lessonIds) {
      const completed = this.getCompleted();
      const done = lessonIds.filter(function (id) {
        return completed.indexOf(id) !== -1;
      }).length;
      return lessonIds.length ? Math.round((done / lessonIds.length) * 100) : 0;
    },
  };

  // زر إكمال الدرس
  const completeBtn = document.getElementById('complete-lesson-btn');
  if (completeBtn) {
    const lessonId = completeBtn.getAttribute('data-lesson-id');
    function refreshCompleteBtn() {
      if (window.MuhasibProgress.isComplete(lessonId)) {
        completeBtn.innerHTML = '<i class="fas fa-check-circle"></i> تم إكمال الدرس';
        completeBtn.classList.remove('btn-primary');
        completeBtn.classList.add('btn-ghost');
      } else {
        completeBtn.innerHTML = '<i class="far fa-circle"></i> وضع علامة كمكتمل';
        completeBtn.classList.add('btn-primary');
        completeBtn.classList.remove('btn-ghost');
      }
    }
    refreshCompleteBtn();
    completeBtn.addEventListener('click', function () {
      if (window.MuhasibProgress.isComplete(lessonId)) {
        window.MuhasibProgress.unmarkComplete(lessonId);
      } else {
        window.MuhasibProgress.markComplete(lessonId);
        showToast('أحسنت! تم تسجيل إكمال الدرس 🎉');
      }
      refreshCompleteBtn();
      // تحديث علامات القائمة الجانبية
      document.querySelectorAll('.sidebar-lesson').forEach(function (el) {
        const id = el.getAttribute('data-lesson-id');
        if (window.MuhasibProgress.isComplete(id)) el.classList.add('completed');
        else el.classList.remove('completed');
      });
    });
  }

  // تحديث علامات الإكمال في القائمة الجانبية عند التحميل
  document.querySelectorAll('.sidebar-lesson').forEach(function (el) {
    const id = el.getAttribute('data-lesson-id');
    if (window.MuhasibProgress && window.MuhasibProgress.isComplete(id)) {
      el.classList.add('completed');
    }
  });

  // تحديث أشرطة تقدم الدورات في صفحة الدورات
  document.querySelectorAll('[data-progress-lessons]').forEach(function (el) {
    try {
      const ids = JSON.parse(el.getAttribute('data-progress-lessons'));
      const pct = window.MuhasibProgress.getCourseProgress(ids);
      const fill = el.querySelector('.progress-fill');
      const text = el.querySelector('.progress-text');
      if (fill) fill.style.width = pct + '%';
      if (text) text.textContent = 'أكملت ' + pct + '٪ من الدورة';
    } catch (e) {}
  });

  // ---------- 10. نظام الإشعارات (Toast) ----------
  window.showToast = function (message, type) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText =
        'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    const bg = type === 'error' ? '#dc2626' : type === 'warning' ? '#ea580c' : '#16a34a';
    toast.style.cssText =
      'background:' + bg +
      ';color:#fff;padding:14px 22px;border-radius:10px;box-shadow:0 10px 25px rgba(0,0,0,0.2);font-weight:700;font-family:Tajawal,sans-serif;opacity:0;transform:translateY(20px);transition:all .3s;max-width:340px;';
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(function () {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(function () {
        toast.remove();
      }, 300);
    }, 3200);
  };

  // ---------- 11. بحث القاموس ----------
  const glossarySearch = document.getElementById('glossary-search-input');
  if (glossarySearch) {
    glossarySearch.addEventListener('input', function () {
      const query = glossarySearch.value.trim().toLowerCase();
      let visibleCount = 0;
      document.querySelectorAll('[data-glossary-term]').forEach(function (term) {
        const text = term.getAttribute('data-search').toLowerCase();
        if (text.indexOf(query) !== -1) {
          term.style.display = '';
          visibleCount++;
        } else {
          term.style.display = 'none';
        }
      });
      const noResults = document.getElementById('glossary-no-results');
      if (noResults) noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      // إخفاء العناوين الفارغة
      document.querySelectorAll('[data-glossary-category]').forEach(function (cat) {
        const terms = cat.querySelectorAll('[data-glossary-term]');
        let anyVisible = false;
        terms.forEach(function (t) {
          if (t.style.display !== 'none') anyVisible = true;
        });
        const heading = cat.querySelector('.glossary-category-title');
        if (heading) heading.style.display = anyVisible ? '' : 'none';
      });
    });
  }

  // ---------- 12. الاختبارات التفاعلية ----------
  if (window.QUIZ_DATA) {
    initQuiz(window.QUIZ_DATA);
  }

  function initQuiz(quiz) {
    const root = document.getElementById('quiz-root');
    if (!root) return;
    let currentQ = 0;
    const answers = new Array(quiz.questions.length).fill(null);

    function render() {
      if (currentQ >= quiz.questions.length) {
        renderResult();
        return;
      }
      const q = quiz.questions[currentQ];
      const progress = Math.round((currentQ / quiz.questions.length) * 100);
      let optionsHtml = '';
      q.options.forEach(function (opt, i) {
        const letters = ['أ', 'ب', 'ج', 'د', 'هـ'];
        const selected = answers[currentQ] === i ? 'selected' : '';
        optionsHtml +=
          '<div class="answer-option ' + selected + '" data-option="' + i + '">' +
          '<span class="answer-marker">' + letters[i] + '</span>' +
          '<span>' + opt + '</span></div>';
      });
      root.innerHTML =
        '<div class="quiz-progress-header">' +
        '<span class="badge badge-primary">السؤال ' + (currentQ + 1) + ' من ' + quiz.questions.length + '</span>' +
        '<span class="text-muted">' + progress + '٪</span></div>' +
        '<div class="progress-bar mb-3"><div class="progress-fill" style="width:' + progress + '%"></div></div>' +
        '<div class="question-card">' +
        '<div class="question-text">' + q.question + '</div>' +
        '<div id="options-list">' + optionsHtml + '</div>' +
        '<div id="explanation-box" style="display:none" class="callout callout-info mt-3"></div>' +
        '</div>' +
        '<div class="flex-between">' +
        '<button class="btn btn-ghost" id="prev-q" ' + (currentQ === 0 ? 'disabled style="opacity:.4"' : '') + '>' +
        '<i class="fas fa-arrow-right"></i> السابق</button>' +
        '<button class="btn btn-primary" id="next-q">' +
        (currentQ === quiz.questions.length - 1 ? 'إنهاء الاختبار <i class="fas fa-flag-checkered"></i>' : 'التالي <i class="fas fa-arrow-left"></i>') +
        '</button></div>';

      root.querySelectorAll('.answer-option').forEach(function (opt) {
        opt.addEventListener('click', function () {
          if (answers[currentQ] !== null) return; // تم الإجابة
          const idx = parseInt(opt.getAttribute('data-option'));
          answers[currentQ] = idx;
          const correct = q.correctIndex;
          root.querySelectorAll('.answer-option').forEach(function (o, oi) {
            o.style.pointerEvents = 'none';
            if (oi === correct) o.classList.add('correct');
            else if (oi === idx) o.classList.add('incorrect');
          });
          const expBox = document.getElementById('explanation-box');
          if (expBox) {
            expBox.style.display = 'flex';
            const isRight = idx === correct;
            expBox.className = 'callout mt-3 ' + (isRight ? 'callout-tip' : 'callout-warning');
            expBox.innerHTML =
              '<span class="callout-icon"><i class="fas ' + (isRight ? 'fa-check-circle' : 'fa-times-circle') + '"></i></span>' +
              '<div class="callout-content"><strong>' + (isRight ? 'إجابة صحيحة!' : 'إجابة خاطئة') + '</strong><p>' + q.explanation + '</p></div>';
          }
        });
      });

      const nextBtn = document.getElementById('next-q');
      if (nextBtn) nextBtn.addEventListener('click', function () {
        if (answers[currentQ] === null) {
          showToast('الرجاء اختيار إجابة أولاً', 'warning');
          return;
        }
        currentQ++;
        render();
      });
      const prevBtn = document.getElementById('prev-q');
      if (prevBtn) prevBtn.addEventListener('click', function () {
        if (currentQ > 0) { currentQ--; render(); }
      });
    }

    function renderResult() {
      let correctCount = 0;
      answers.forEach(function (a, i) {
        if (a === quiz.questions[i].correctIndex) correctCount++;
      });
      const total = quiz.questions.length;
      const pct = Math.round((correctCount / total) * 100);
      let color, msg, icon;
      if (pct >= 80) { color = '#16a34a'; msg = 'ممتاز! أداء رائع'; icon = 'fa-trophy'; }
      else if (pct >= 60) { color = '#0284c7'; msg = 'جيد جداً، واصل'; icon = 'fa-thumbs-up'; }
      else if (pct >= 50) { color = '#ea580c'; msg = 'جيد، لكن راجع الدروس'; icon = 'fa-book-open'; }
      else { color = '#dc2626'; msg = 'تحتاج لمراجعة الدروس'; icon = 'fa-redo'; }

      root.innerHTML =
        '<div class="quiz-result card"><div class="card-body">' +
        '<div class="result-circle" style="background:conic-gradient(' + color + ' ' + pct + '%, var(--bg-surface-2) 0);">' +
        '<div style="width:130px;height:130px;border-radius:50%;background:var(--bg-surface);display:flex;align-items:center;justify-content:center;flex-direction:column;">' +
        '<span style="color:' + color + '">' + pct + '٪</span></div></div>' +
        '<h2 style="color:' + color + '"><i class="fas ' + icon + '"></i> ' + msg + '</h2>' +
        '<p class="text-muted mt-2">أجبت بشكل صحيح على <strong>' + correctCount + '</strong> من <strong>' + total + '</strong> سؤال</p>' +
        '<div class="flex-center gap-2 mt-4" style="flex-wrap:wrap">' +
        '<button class="btn btn-primary" id="retry-quiz"><i class="fas fa-redo"></i> إعادة الاختبار</button>' +
        '<a href="/courses" class="btn btn-outline"><i class="fas fa-graduation-cap"></i> العودة للدورات</a>' +
        '</div></div></div>';
      const retry = document.getElementById('retry-quiz');
      if (retry) retry.addEventListener('click', function () {
        currentQ = 0;
        for (let i = 0; i < answers.length; i++) answers[i] = null;
        render();
      });
    }

    render();
  }

  // ---------- 13. الأدوات الحاسبية ----------
  initCalculators();
  function initCalculators() {
    // أداة المعادلة المحاسبية
    const eqForm = document.getElementById('tool-equation');
    if (eqForm) {
      eqForm.addEventListener('input', function () {
        const assets = parseFloat(document.getElementById('eq-assets').value) || 0;
        const liabilities = parseFloat(document.getElementById('eq-liabilities').value) || 0;
        const equity = assets - liabilities;
        const out = document.getElementById('eq-result');
        if (out) out.textContent = equity.toLocaleString('ar-EG');
        const status = document.getElementById('eq-status');
        if (status) {
          status.innerHTML = 'الأصول (' + assets.toLocaleString('ar-EG') + ') = الالتزامات (' +
            liabilities.toLocaleString('ar-EG') + ') + حقوق الملكية (' + equity.toLocaleString('ar-EG') + ')';
        }
      });
    }

    // أداة الإهلاك (القسط الثابت)
    const depForm = document.getElementById('tool-depreciation');
    if (depForm) {
      depForm.addEventListener('input', function () {
        const cost = parseFloat(document.getElementById('dep-cost').value) || 0;
        const salvage = parseFloat(document.getElementById('dep-salvage').value) || 0;
        const life = parseFloat(document.getElementById('dep-life').value) || 1;
        const annual = (cost - salvage) / life;
        const rate = cost ? ((annual / cost) * 100) : 0;
        setText('dep-annual', annual.toLocaleString('ar-EG', { maximumFractionDigits: 2 }));
        setText('dep-monthly', (annual / 12).toLocaleString('ar-EG', { maximumFractionDigits: 2 }));
        setText('dep-rate', rate.toFixed(2) + '٪');
      });
    }

    // أداة هامش الربح
    const profitForm = document.getElementById('tool-profit');
    if (profitForm) {
      profitForm.addEventListener('input', function () {
        const revenue = parseFloat(document.getElementById('pr-revenue').value) || 0;
        const cost = parseFloat(document.getElementById('pr-cost').value) || 0;
        const expenses = parseFloat(document.getElementById('pr-expenses').value) || 0;
        const grossProfit = revenue - cost;
        const netProfit = grossProfit - expenses;
        const grossMargin = revenue ? (grossProfit / revenue) * 100 : 0;
        const netMargin = revenue ? (netProfit / revenue) * 100 : 0;
        setText('pr-gross', grossProfit.toLocaleString('ar-EG', { maximumFractionDigits: 2 }));
        setText('pr-net', netProfit.toLocaleString('ar-EG', { maximumFractionDigits: 2 }));
        setText('pr-gross-margin', grossMargin.toFixed(1) + '٪');
        setText('pr-net-margin', netMargin.toFixed(1) + '٪');
      });
    }

    // أداة نقطة التعادل
    const beForm = document.getElementById('tool-breakeven');
    if (beForm) {
      beForm.addEventListener('input', function () {
        const fixed = parseFloat(document.getElementById('be-fixed').value) || 0;
        const price = parseFloat(document.getElementById('be-price').value) || 0;
        const varCost = parseFloat(document.getElementById('be-variable').value) || 0;
        const contribution = price - varCost;
        const beUnits = contribution > 0 ? fixed / contribution : 0;
        const beSales = beUnits * price;
        setText('be-contribution', contribution.toLocaleString('ar-EG', { maximumFractionDigits: 2 }));
        setText('be-units', Math.ceil(beUnits).toLocaleString('ar-EG'));
        setText('be-sales', beSales.toLocaleString('ar-EG', { maximumFractionDigits: 2 }));
      });
    }

    // أداة النسب المالية
    const ratioForm = document.getElementById('tool-ratios');
    if (ratioForm) {
      ratioForm.addEventListener('input', function () {
        const currentAssets = parseFloat(document.getElementById('rt-current-assets').value) || 0;
        const inventory = parseFloat(document.getElementById('rt-inventory').value) || 0;
        const currentLiab = parseFloat(document.getElementById('rt-current-liab').value) || 0;
        const totalDebt = parseFloat(document.getElementById('rt-total-debt').value) || 0;
        const totalEquity = parseFloat(document.getElementById('rt-total-equity').value) || 0;
        const currentRatio = currentLiab ? currentAssets / currentLiab : 0;
        const quickRatio = currentLiab ? (currentAssets - inventory) / currentLiab : 0;
        const debtToEquity = totalEquity ? totalDebt / totalEquity : 0;
        setText('rt-current', currentRatio.toFixed(2));
        setText('rt-quick', quickRatio.toFixed(2));
        setText('rt-debt-equity', debtToEquity.toFixed(2));
      });
    }
  }
  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  // ==========================================================================
  //  14. تحسينات الصفحات الداخلية (المرحلة 2) — البنية المنظّمة الجديدة
  // ==========================================================================

  // ---------- 14.1 أكورديون منهج الدورة (.module-block / .accordion-trigger) ----------
  document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const block = trigger.closest('.accordion-group, .module-block');
      if (block) block.classList.toggle('open');
    });
  });

  // ---------- 14.2 فلترة الدورات (.filter-chip / .course-card[data-level]) ----------
  var chips = document.querySelectorAll('.filter-chip');
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var filter = chip.getAttribute('data-filter');
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        document.querySelectorAll('.course-card[data-level]').forEach(function (card) {
          var level = card.getAttribute('data-level');
          card.style.display = (filter === 'all' || level === filter) ? '' : 'none';
        });
      });
    });
  }

  // ---------- 14.3 تحديث علامات الدروس المكتملة في القوائم ----------
  function refreshLessonChecks() {
    if (!window.MuhasibProgress) return;
    document.querySelectorAll('[data-lesson-check]').forEach(function (el) {
      var id = el.getAttribute('data-lesson-check');
      var icon = el.querySelector('i');
      if (window.MuhasibProgress.isComplete(id)) {
        el.classList.add('done');
        if (icon) icon.className = 'fas fa-circle-check';
      } else {
        el.classList.remove('done');
        if (icon) icon.className = 'fas fa-circle';
      }
    });
    // شارة حالة الدرس الحالي
    document.querySelectorAll('[data-lesson-status]').forEach(function (el) {
      var id = el.getAttribute('data-lesson-status');
      if (window.MuhasibProgress.isComplete(id)) {
        el.classList.add('done');
        el.innerHTML = '<i class="fas fa-circle-check"></i> مكتمل';
      } else {
        el.classList.remove('done');
        el.innerHTML = '<i class="fas fa-circle"></i> غير مكتمل';
      }
    });
  }

  // ---------- 14.4 تحديث أشرطة/حبّات تقدّم الدورة ----------
  function refreshCourseProgress() {
    if (!window.MuhasibProgress) return;
    document.querySelectorAll('[data-course-progress]').forEach(function (el) {
      var total = parseInt(el.getAttribute('data-total'), 10) || 0;
      // اجمع معرفات دروس هذه الدورة الظاهرة في الصفحة
      var ids = [];
      document.querySelectorAll('[data-lesson-check]').forEach(function (c) {
        ids.push(c.getAttribute('data-lesson-check'));
      });
      var pct;
      if (ids.length) {
        pct = window.MuhasibProgress.getCourseProgress(ids);
      } else {
        // صفحة الدورة بدون دروس ظاهرة: احسب من الإجمالي والمكتمل عمومًا غير ممكن بدقة
        pct = 0;
      }
      // شريط التقدّم في الشريط الجانبي
      var bar = el.querySelector('.lsp-bar span');
      if (bar) bar.style.width = pct + '%';
      var b = el.querySelector('b');
      if (b) b.textContent = pct + '%';
    });
  }

  // إعادة تعريف زر الإكمال ليُحدّث كل المؤشرات الجديدة أيضًا
  var newCompleteBtn = document.getElementById('complete-lesson-btn');
  if (newCompleteBtn && window.MuhasibProgress) {
    var lid = newCompleteBtn.getAttribute('data-lesson-id');
    function syncCompleteBtn() {
      var done = window.MuhasibProgress.isComplete(lid);
      var span = newCompleteBtn.querySelector('span');
      if (done) {
        newCompleteBtn.classList.add('completed');
        if (span) span.textContent = 'تم إكمال الدرس ✓';
      } else {
        newCompleteBtn.classList.remove('completed');
        if (span) span.textContent = 'إكمال الدرس';
      }
      refreshLessonChecks();
      refreshCourseProgress();
    }
    // استبدل المستمع القديم بإضافة مزامنة بعده
    newCompleteBtn.addEventListener('click', function () {
      // التأخير لضمان تنفيذ منطق التخزين أولًا
      setTimeout(syncCompleteBtn, 0);
    });
    syncCompleteBtn();
  }

  // تشغيل أولي للمؤشرات
  refreshLessonChecks();
  refreshCourseProgress();

  // ---------- 14.5 تبديل الشريط الجانبي للدرس في الجوال ----------
  var sidebarToggle = document.getElementById('lesson-sidebar-toggle');
  var lessonSidebar = document.getElementById('lesson-sidebar');
  if (sidebarToggle && lessonSidebar) {
    sidebarToggle.addEventListener('click', function () {
      lessonSidebar.classList.toggle('open');
    });
    // إغلاق عند النقر على رابط درس
    lessonSidebar.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        lessonSidebar.classList.remove('open');
      });
    });
  }

  // ==========================================================================
//  15. لوحة تقدّم المتعلّم + مسار المحاسب اليمني (صفحة /roadmap)
// ==========================================================================

  function safeParse(str, fallback) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return fallback;
    }
  }

  function countDone(ids) {
    if (!window.MuhasibProgress || !ids || !ids.length) return 0;
    var completed = window.MuhasibProgress.getCompleted();
    return ids.filter(function (id) {
      return completed.indexOf(id) !== -1;
    }).length;
  }

  function pctOf(done, total) {
    return total ? Math.round((done / total) * 100) : 0;
  }

  // ---------- 15.1 لوحة التقدّم العامة ----------
  function refreshProgressDashboard() {
    var dash = document.querySelector('[data-progress-dashboard]');
    if (!dash || !window.MuhasibProgress) return;

    var allIds = safeParse(dash.getAttribute('data-all-lessons'), []);
    var total = parseInt(dash.getAttribute('data-total'), 10) || allIds.length;
    var done = countDone(allIds);
    var pct = pctOf(done, total);

    // الحلقة الدائرية
    var percentEl = dash.querySelector('[data-pd-percent]');
    if (percentEl) percentEl.textContent = pct + '%';
    var ringFill = dash.querySelector('[data-pd-ring-fill]');
    if (ringFill) {
      var r = 52;
      var circ = 2 * Math.PI * r;
      ringFill.style.strokeDasharray = circ;
      ringFill.style.strokeDashoffset = circ * (1 - pct / 100);
    }

    var completedEl = dash.querySelector('[data-pd-completed]');
    if (completedEl) completedEl.textContent = done.toLocaleString('ar-EG');

    // دورات بدأتها / دورات مكتملة — تُحسب من خطوات الطريق العامة
    var roadmapSteps = document.querySelectorAll('[data-roadmap-step]');
    var started = 0;
    var coursesDone = 0;
    roadmapSteps.forEach(function (step) {
      var ids = safeParse(step.getAttribute('data-course-lessons'), []);
      var d = countDone(ids);
      if (d > 0) started++;
      if (ids.length && d === ids.length) coursesDone++;
    });
    var startedEl = dash.querySelector('[data-pd-courses-started]');
    if (startedEl) startedEl.textContent = started.toLocaleString('ar-EG');
    var doneEl = dash.querySelector('[data-pd-courses-done]');
    if (doneEl) doneEl.textContent = coursesDone.toLocaleString('ar-EG');

    // اقتراح الدرس التالي
    suggestNextLesson(dash, allIds);
  }

  // ---------- 15.2 اقتراح الدرس التالي ----------
  function suggestNextLesson(dash, allIds) {
    var nextBox = dash.querySelector('[data-pd-next]');
    var emptyBox = dash.querySelector('[data-pd-next-empty]');
    var map = window.MUHASIB_LESSON_MAP || [];
    var completed = window.MuhasibProgress.getCompleted();

    // إن لم يُكمل أي درس: أظهر صندوق "ابدأ الآن"
    if (!completed.length) {
      if (nextBox) nextBox.style.display = 'none';
      if (emptyBox) emptyBox.style.display = '';
      return;
    }

    // أوجد أول درس غير مكتمل بالترتيب
    var next = null;
    for (var i = 0; i < map.length; i++) {
      if (completed.indexOf(map[i].id) === -1) {
        next = map[i];
        break;
      }
    }

    if (!next) {
      // أكمل كل الدروس
      if (nextBox) {
        nextBox.style.display = '';
        var title = nextBox.querySelector('[data-pd-next-title]');
        var course = nextBox.querySelector('[data-pd-next-course]');
        var link = nextBox.querySelector('[data-pd-next-link]');
        var badge = nextBox.querySelector('.pd-next-badge');
        if (title) title.textContent = '🎉 أكملت جميع دروس المنصة!';
        if (course) course.textContent = 'أحسنت — يمكنك مراجعة أي دورة أو استلام شهاداتك.';
        if (badge) badge.innerHTML = '<i class="fas fa-trophy"></i> اكتمل!';
        if (link) {
          link.href = '/courses';
          link.innerHTML = 'استعرض الدورات <i class="fas fa-arrow-left"></i>';
        }
      }
      if (emptyBox) emptyBox.style.display = 'none';
      return;
    }

    if (nextBox) {
      nextBox.style.display = '';
      var t = nextBox.querySelector('[data-pd-next-title]');
      var c = nextBox.querySelector('[data-pd-next-course]');
      var l = nextBox.querySelector('[data-pd-next-link]');
      if (t) t.textContent = next.title;
      if (c) c.textContent = next.courseTitle;
      if (l) l.href = next.url;
    }
    if (emptyBox) emptyBox.style.display = 'none';
  }

  // ---------- 15.3 خطوات الطريق العام (أشرطة تقدّم لكل دورة) ----------
  function refreshRoadmapSteps() {
    if (!window.MuhasibProgress) return;
    document.querySelectorAll('[data-roadmap-step]').forEach(function (step) {
      var ids = safeParse(step.getAttribute('data-course-lessons'), []);
      var done = countDone(ids);
      var pct = pctOf(done, ids.length);
      var bar = step.querySelector('[data-roadmap-bar]');
      if (bar) bar.style.width = pct + '%';
      var pctEl = step.querySelector('[data-roadmap-pct]');
      if (pctEl) {
        if (pct === 100) pctEl.textContent = '✓ مكتملة';
        else if (pct > 0) pctEl.textContent = pct + '% مكتمل';
        else pctEl.textContent = 'لم تبدأ بعد';
      }
      if (pct === 100) step.classList.add('done');
      else step.classList.remove('done');
    });
  }

  // ---------- 15.4 مسار المحاسب اليمني ----------
  function refreshYemeniPath() {
    var path = document.querySelector('[data-yemeni-path]');
    if (!path || !window.MuhasibProgress) return;

    var pathIds = safeParse(path.getAttribute('data-path-lessons'), []);
    var total = parseInt(path.getAttribute('data-path-total'), 10) || pathIds.length;
    var done = countDone(pathIds);
    var pct = pctOf(done, total);

    var percentEl = path.querySelector('[data-ypath-percent]');
    if (percentEl) percentEl.textContent = pct + '%';
    var bar = path.querySelector('[data-ypath-bar]');
    if (bar) bar.style.width = pct + '%';
    var completedEl = path.querySelector('[data-ypath-completed]');
    if (completedEl) completedEl.textContent = done.toLocaleString('ar-EG');

    // خطوات المسار
    path.querySelectorAll('[data-ypath-step]').forEach(function (step) {
      var ids = safeParse(step.getAttribute('data-step-lessons'), []);
      var sDone = countDone(ids);
      var sPct = pctOf(sDone, ids.length);
      var sBar = step.querySelector('[data-step-bar]');
      if (sBar) sBar.style.width = sPct + '%';
      var sPctEl = step.querySelector('[data-step-pct]');
      if (sPctEl) sPctEl.textContent = sPct + '%';
      if (sPct === 100) step.classList.add('completed');
      else step.classList.remove('completed');
    });

    // شهادة المسار
    var certLocked = path.querySelector('[data-ypath-cert-locked]');
    var certBtn = path.querySelector('[data-ypath-cert-btn]');
    if (pct === 100 && total > 0) {
      if (certLocked) certLocked.style.display = 'none';
      if (certBtn) certBtn.style.display = '';
    } else {
      if (certLocked) certLocked.style.display = '';
      if (certBtn) certBtn.style.display = 'none';
    }
  }

  // تشغيل لوحة التقدّم عند توفّر العناصر
  if (document.querySelector('[data-progress-dashboard]') ||
      document.querySelector('[data-yemeni-path]') ||
      document.querySelector('[data-roadmap-step]')) {
    refreshRoadmapSteps();
    refreshProgressDashboard();
    refreshYemeniPath();
  }

  // ==========================================================================
//  16. صفحة شهادة الإتمام التعليمية (صفحة /certificate/:slug)
// ==========================================================================
  (function initCertificate() {
    var page = document.querySelector('[data-certificate-page]');
    if (!page || !window.MuhasibProgress) return;

    var data = window.CERT_DATA || {};
    var lessonIds = data.lessonIds || safeParse(page.getAttribute('data-path-lessons'), []);
    var total = data.total || parseInt(page.getAttribute('data-path-total'), 10) || lessonIds.length;
    var slug = data.slug || page.getAttribute('data-path-slug') || 'path';
    var title = data.title || page.getAttribute('data-path-title') || '';

    var done = countDone(lessonIds);
    var isComplete = total > 0 && done >= total;

    var gate = page.querySelector('[data-cert-gate]');
    var ready = page.querySelector('[data-cert-ready]');

    if (!isComplete) {
      // عرض حالة عدم الإكمال
      if (gate) gate.style.display = '';
      if (ready) ready.style.display = 'none';
      var gateDone = page.querySelector('[data-gate-done]');
      if (gateDone) gateDone.textContent = done.toLocaleString('ar-EG');
      var gateTotal = page.querySelector('[data-gate-total]');
      if (gateTotal) gateTotal.textContent = total.toLocaleString('ar-EG');
      var gateBar = page.querySelector('[data-gate-bar]');
      if (gateBar) gateBar.style.width = pctOf(done, total) + '%';
      return;
    }

    // الإكمال: إظهار الشهادة
    if (gate) gate.style.display = 'none';
    if (ready) ready.style.display = '';

    // التاريخ بالميلادي العربي
    var dateEl = page.querySelector('[data-cert-date]');
    var today = new Date();
    if (dateEl) {
      try {
        dateEl.textContent = today.toLocaleDateString('ar-EG', {
          year: 'numeric', month: 'long', day: 'numeric',
        });
      } catch (e) {
        dateEl.textContent = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
      }
    }

    // رقم شهادة ثابت لكل مستخدم/مسار (يُحفظ في التخزين المحلي)
    var idEl = page.querySelector('[data-cert-id]');
    var idKey = 'certId_' + slug;
    var certId = localStorage.getItem(idKey);
    if (!certId) {
      certId = 'MP-' + slug.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6) +
        '-' + today.getFullYear() +
        '-' + Math.random().toString(36).substring(2, 7).toUpperCase();
      localStorage.setItem(idKey, certId);
    }
    if (idEl) idEl.textContent = certId;

    // اسم المتلقّي — محفوظ ومتزامن مع الإدخال
    var recipientEl = page.querySelector('[data-cert-recipient]');
    var nameInput = document.getElementById('cert-name-input');
    var nameKey = 'certName';
    var savedName = localStorage.getItem(nameKey) || '';

    function applyName(name) {
      var clean = (name || '').trim();
      if (recipientEl) recipientEl.textContent = clean || 'اسم المتعلّم';
    }
    if (nameInput) {
      nameInput.value = savedName;
      applyName(savedName);
      nameInput.addEventListener('input', function () {
        localStorage.setItem(nameKey, nameInput.value);
        applyName(nameInput.value);
      });
    } else {
      applyName(savedName);
    }

    // زر الطباعة
    var printBtn = document.getElementById('cert-print-btn');
    if (printBtn) {
      printBtn.addEventListener('click', function () {
        if (nameInput && !nameInput.value.trim()) {
          showToast('فضلاً اكتب اسمك أولاً قبل الطباعة', 'warning');
          nameInput.focus();
          return;
        }
        window.print();
      });
    }
  })();

  console.log('%c محاسب برو 📊 ', 'background:#1e3a8a;color:#fbbf24;font-size:16px;padding:6px 12px;border-radius:6px;font-weight:bold;');
})();
