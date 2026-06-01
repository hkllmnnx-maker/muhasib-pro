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
    // ===== دوال مساعدة آمنة =====
    // قراءة رقم من حقل بأمان: ترجع 0 لأي قيمة غير صالحة (NaN/فارغة/لانهائية)
    function num(id) {
      var el = document.getElementById(id);
      if (!el) return 0;
      var v = parseFloat(el.value);
      if (!isFinite(v) || isNaN(v)) return 0;
      return v;
    }
    // قراءة رقم موجب فقط (يمنع السالب)، يستخدم في الحقول التي يجب ألا تكون سالبة
    function posNum(id) {
      var v = num(id);
      return v < 0 ? 0 : v;
    }
    // تنسيق رقم عربي مع منع NaN نهائيًا
    function fmt(value, digits) {
      if (!isFinite(value) || isNaN(value)) value = 0;
      return value.toLocaleString('ar-EG', { maximumFractionDigits: digits == null ? 2 : digits });
    }
    // تنسيق نسبة مئوية بأمان
    function pct(value, digits) {
      if (!isFinite(value) || isNaN(value)) value = 0;
      return value.toFixed(digits == null ? 1 : digits) + '٪';
    }
    // قسمة آمنة: ترجع 0 إذا كان المقام صفرًا أو غير صالح
    function safeDiv(a, b) {
      if (!isFinite(b) || isNaN(b) || b === 0) return 0;
      var r = a / b;
      return isFinite(r) ? r : 0;
    }
    function setStatus(id, msg, isWarn) {
      var el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = msg;
      el.classList.toggle('tool-status-warn', !!isWarn);
    }

    // === أداة المعادلة المحاسبية ===
    var eqForm = document.getElementById('tool-equation');
    if (eqForm) {
      var calcEq = function () {
        var assets = posNum('eq-assets');
        var liabilities = posNum('eq-liabilities');
        var equity = assets - liabilities;
        setText('eq-result', fmt(equity));
        setStatus('eq-status',
          'الأصول (' + fmt(assets) + ') = الالتزامات (' + fmt(liabilities) +
          ') + حقوق الملكية (' + fmt(equity) + ')',
          equity < 0);
      };
      eqForm.addEventListener('input', calcEq);
      calcEq();
    }

    // === أداة الإهلاك (القسط الثابت) ===
    var depForm = document.getElementById('tool-depreciation');
    if (depForm) {
      var calcDep = function () {
        var cost = posNum('dep-cost');
        var salvage = posNum('dep-salvage');
        var life = posNum('dep-life');
        // تحقق من المدخلات
        if (life <= 0) {
          setText('dep-annual', fmt(0));
          setText('dep-monthly', fmt(0));
          setText('dep-rate', pct(0));
          setStatus('dep-status', 'أدخل عمرًا إنتاجيًا أكبر من صفر', true);
          return;
        }
        if (salvage > cost) {
          setText('dep-annual', fmt(0));
          setText('dep-monthly', fmt(0));
          setText('dep-rate', pct(0));
          setStatus('dep-status', 'القيمة التخريدية يجب ألا تتجاوز تكلفة الأصل', true);
          return;
        }
        var base = cost - salvage;
        var annual = safeDiv(base, life);
        var rate = safeDiv(annual, cost) * 100;
        setText('dep-annual', fmt(annual));
        setText('dep-monthly', fmt(annual / 12));
        setText('dep-rate', pct(rate, 2));
        setStatus('dep-status',
          'القيمة القابلة للإهلاك = ' + fmt(base) + ' موزّعة على ' + fmt(life, 0) + ' سنة', false);
      };
      depForm.addEventListener('input', calcDep);
      calcDep();
    }

    // === أداة الربحية ===
    var profitForm = document.getElementById('tool-profit');
    if (profitForm) {
      var calcProfit = function () {
        var revenue = posNum('pr-revenue');
        var cost = posNum('pr-cost');
        var expenses = posNum('pr-expenses');
        var grossProfit = revenue - cost;
        var netProfit = grossProfit - expenses;
        var grossMargin = safeDiv(grossProfit, revenue) * 100;
        var netMargin = safeDiv(netProfit, revenue) * 100;
        setText('pr-gross', fmt(grossProfit));
        setText('pr-net', fmt(netProfit));
        setText('pr-gross-margin', pct(grossMargin));
        setText('pr-net-margin', pct(netMargin));
      };
      profitForm.addEventListener('input', calcProfit);
      calcProfit();
    }

    // === أداة نقطة التعادل ===
    var beForm = document.getElementById('tool-breakeven');
    if (beForm) {
      var calcBE = function () {
        var fixed = posNum('be-fixed');
        var price = posNum('be-price');
        var varCost = posNum('be-variable');
        var contribution = price - varCost;
        setText('be-contribution', fmt(contribution));
        if (contribution <= 0) {
          setText('be-units', fmt(0, 0));
          setText('be-sales', fmt(0));
          setStatus('be-status', 'يجب أن يكون سعر البيع أكبر من التكلفة المتغيرة لتحقيق هامش مساهمة موجب', true);
          return;
        }
        var beUnits = safeDiv(fixed, contribution);
        var beSales = beUnits * price;
        setText('be-units', fmt(Math.ceil(beUnits), 0));
        setText('be-sales', fmt(beSales));
        setStatus('be-status', 'تتعادل المنشأة عند بيع ' + fmt(Math.ceil(beUnits), 0) + ' وحدة', false);
      };
      beForm.addEventListener('input', calcBE);
      calcBE();
    }

    // === أداة هامش المساهمة ===
    var cmForm = document.getElementById('tool-contribution');
    if (cmForm) {
      var calcCM = function () {
        var price = posNum('cm-price');
        var varCost = posNum('cm-variable');
        var units = posNum('cm-units');
        var unitCM = price - varCost;
        var totalCM = unitCM * units;
        var ratio = safeDiv(unitCM, price) * 100;
        setText('cm-unit', fmt(unitCM));
        setText('cm-total', fmt(totalCM));
        setText('cm-ratio', pct(ratio));
        if (unitCM < 0) {
          setStatus('cm-status', 'هامش المساهمة سالب: التكلفة المتغيرة تتجاوز سعر البيع', true);
        } else {
          setStatus('cm-status', 'هامش المساهمة = سعر البيع − التكلفة المتغيرة', false);
        }
      };
      cmForm.addEventListener('input', calcCM);
      calcCM();
    }

    // === أداة النسب المالية (السيولة + الربحية + الرافعة) ===
    var ratioForm = document.getElementById('tool-ratios');
    if (ratioForm) {
      var calcRatios = function () {
        var currentAssets = posNum('rt-current-assets');
        var inventory = posNum('rt-inventory');
        var cash = posNum('rt-cash');
        var currentLiab = posNum('rt-current-liab');
        var totalDebt = posNum('rt-total-debt');
        var totalEquity = posNum('rt-total-equity');
        var netIncome = num('rt-net-income'); // قد يكون سالبًا (خسارة)
        var totalAssets = posNum('rt-total-assets');

        var currentRatio = safeDiv(currentAssets, currentLiab);
        var quickRatio = safeDiv(currentAssets - inventory, currentLiab);
        var cashRatio = safeDiv(cash, currentLiab);
        var debtToEquity = safeDiv(totalDebt, totalEquity);
        var roa = safeDiv(netIncome, totalAssets) * 100;
        var roe = safeDiv(netIncome, totalEquity) * 100;

        setText('rt-current', fmt(currentRatio, 2));
        setText('rt-quick', fmt(quickRatio, 2));
        setText('rt-cash-ratio', fmt(cashRatio, 2));
        setText('rt-debt-equity', fmt(debtToEquity, 2));
        setText('rt-roa', pct(roa));
        setText('rt-roe', pct(roe));

        // ملاحظة إرشادية مبسطة عن السيولة
        var note;
        if (currentLiab === 0) {
          note = 'أدخل الالتزامات المتداولة لحساب نسب السيولة';
        } else if (currentRatio >= 2) {
          note = 'نسبة تداول جيدة (≥ 2): سيولة مريحة لتغطية الالتزامات قصيرة الأجل';
        } else if (currentRatio >= 1) {
          note = 'نسبة تداول مقبولة (1–2): تغطية كافية مع متابعة السيولة';
        } else {
          note = 'تنبيه: نسبة التداول أقل من 1 — قد تواجه المنشأة ضغطًا في السيولة';
        }
        setStatus('rt-status', note, currentLiab !== 0 && currentRatio < 1);
      };
      ratioForm.addEventListener('input', calcRatios);
      calcRatios();
    }

    // === أداة ضريبة المبيعات التعليمية ===
    var vatForm = document.getElementById('tool-vat');
    if (vatForm) {
      var calcVAT = function () {
        var amount = posNum('vat-amount');
        var rateInput = posNum('vat-rate');
        // حصر النسبة بين 0 و 100 لمنع نتائج غير منطقية
        var rate = Math.min(Math.max(rateInput, 0), 100);
        var modeEl = vatForm.querySelector('input[name="vat-mode"]:checked');
        var mode = modeEl ? modeEl.value : 'exclusive';

        var net = 0, tax = 0, gross = 0;
        if (mode === 'inclusive') {
          // المبلغ شامل الضريبة: نفصل الضريبة منه
          gross = amount;
          net = safeDiv(amount, (1 + rate / 100));
          tax = gross - net;
        } else {
          // المبلغ بدون ضريبة: نضيف الضريبة
          net = amount;
          tax = net * (rate / 100);
          gross = net + tax;
        }
        setText('vat-net', fmt(net));
        setText('vat-tax', fmt(tax));
        setText('vat-gross', fmt(gross));
      };
      vatForm.addEventListener('input', calcVAT);
      calcVAT();
    }

    // === أداة كشف الرواتب التعليمية ===
    var payForm = document.getElementById('tool-payroll');
    if (payForm) {
      var calcPay = function () {
        var basic = posNum('pay-basic');
        var allow = posNum('pay-allow');
        var insRate = Math.min(Math.max(posNum('pay-insurance'), 0), 100);
        var taxRate = Math.min(Math.max(posNum('pay-tax'), 0), 100);
        var other = posNum('pay-other');

        var gross = basic + allow;
        // التأمينات تُحسب عادة على الراتب الأساسي (نموذج تعليمي مبسّط)
        var insAmount = basic * (insRate / 100);
        // وعاء الضريبة (تعليمي مبسّط): الإجمالي بعد خصم التأمينات
        var taxBase = gross - insAmount;
        if (taxBase < 0) taxBase = 0;
        var taxAmount = taxBase * (taxRate / 100);
        var totalDeductions = insAmount + taxAmount + other;
        var net = gross - totalDeductions;
        if (!isFinite(net) || isNaN(net)) net = 0;

        setText('pay-gross', fmt(gross));
        setText('pay-ins-amount', fmt(insAmount));
        setText('pay-tax-amount', fmt(taxAmount));
        setText('pay-deductions', fmt(totalDeductions));
        setText('pay-net', fmt(net < 0 ? 0 : net));
      };
      payForm.addEventListener('input', calcPay);
      calcPay();
    }

    // === أداة تحويل ميزان المراجعة إلى قائمة دخل ===
    var isForm = document.getElementById('tool-income-statement');
    if (isForm) {
      var calcIS = function () {
        var sales = posNum('is-sales');
        var returns = posNum('is-returns');
        var cogs = posNum('is-cogs');
        var admin = posNum('is-admin');
        var selling = posNum('is-selling');
        var otherIncome = posNum('is-other-income');
        var finance = posNum('is-finance');

        var netSales = sales - returns;
        var grossProfit = netSales - cogs;
        var operatingExp = admin + selling;
        var operatingProfit = grossProfit - operatingExp;
        var netProfit = operatingProfit + otherIncome - finance;

        setText('is-net-sales', fmt(netSales));
        setText('is-cogs-out', fmt(cogs));
        setText('is-gross-profit', fmt(grossProfit));
        setText('is-operating-exp', fmt(operatingExp));
        setText('is-operating-profit', fmt(operatingProfit));
        setText('is-other-out', fmt(otherIncome));
        setText('is-finance-out', fmt(finance));
        setText('is-net-profit', fmt(netProfit));

        // تلوين صف صافي الربح حسب النتيجة
        var netRow = document.getElementById('is-net-profit');
        if (netRow) {
          netRow.style.color = netProfit < 0 ? 'var(--color-danger, #dc2626)' : 'var(--color-success, #16a34a)';
        }
        var msg = netProfit < 0
          ? 'النتيجة: خسارة صافية بمقدار ' + fmt(Math.abs(netProfit))
          : 'النتيجة: صافي ربح بمقدار ' + fmt(netProfit);
        setStatus('is-status', msg, netProfit < 0);
      };
      isForm.addEventListener('input', calcIS);
      calcIS();
    }
  }
  function setText(id, value) {
    var el = document.getElementById(id);
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

  console.log('%c محاسب برو 📊 ', 'background:#1e3a8a;color:#fbbf24;font-size:16px;padding:6px 12px;border-radius:6px;font-weight:bold;');
})();
