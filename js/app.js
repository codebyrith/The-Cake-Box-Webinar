/**
 * Art of Healthy Baking - The Cake Box
 * Interactive Landing Page Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Countdown Timer
  initCountdownTimer();

  // 2. Curriculum Filter & Accordion
  initCurriculum();

  // 3. Equipment & Ingredient Tabs
  initTabs();

  // 4. FAQ Accordion
  initFaqAccordion();

  // 5. Enrollment & Certificate Modals
  initModals();

  // 6. Topic-Wise Module Selection / WhatsApp message generator
  initTopicCalculator();

  // 7. Sticky Bottom Bar Scroll Observer
  initStickyBar();

  // 8. Mobile Menu Toggle
  initMobileMenu();
});

/* ==========================================================================
   1. Live Countdown Timer
   ========================================================================== */
function initCountdownTimer() {
  // Target date: 3 days from now at 10:00 AM
  const now = new Date();
  const targetDate = new Date();
  targetDate.setDate(now.getDate() + 3);
  targetDate.setHours(10, 0, 0, 0);

  function updateTimer() {
    const currentTime = new Date().getTime();
    const distance = targetDate.getTime() - currentTime;

    if (distance < 0) {
      document.querySelectorAll('.timer-display').forEach(el => el.textContent = '00:00:00');
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => (n < 10 ? '0' + n : n);

    const formatted = `${days}d : ${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;
    
    document.querySelectorAll('.countdown-timer-text').forEach(el => {
      el.textContent = formatted;
    });

    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-mins');
    const sEl = document.getElementById('cd-secs');

    if (dEl) dEl.textContent = pad(days);
    if (hEl) hEl.textContent = pad(hours);
    if (mEl) mEl.textContent = pad(minutes);
    if (sEl) sEl.textContent = pad(seconds);
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   2. Curriculum Filter & Accordion
   ========================================================================== */
function initCurriculum() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const moduleCards = document.querySelectorAll('.module-accordion-card');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      moduleCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Accordion Toggle
  moduleCards.forEach(card => {
    const header = card.querySelector('.module-header');
    header.addEventListener('click', () => {
      const isActive = card.classList.contains('active');
      
      // Close other cards for neat accordion or keep multiselect
      moduleCards.forEach(c => {
        if (c !== card) c.classList.remove('active');
      });

      if (!isActive) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  });
}

/* ==========================================================================
   3. Equipment & Ingredient Tabs
   ========================================================================== */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-nav-btn');
  const tabPanels = document.querySelectorAll('.tab-content-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. Modals Management (Enrollment & Certificate Preview)
   ========================================================================== */
function initModals() {
  // Modal Triggers
  const enrollModal = document.getElementById('enrollModal');
  const certModal = document.getElementById('certModal');

  document.querySelectorAll('[data-open-modal="enroll"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.getAttribute('data-plan') || 'full';
      if (enrollModal) {
        const planSelect = document.getElementById('formPlan');
        if (planSelect) planSelect.value = plan;
        enrollModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelectorAll('[data-open-modal="certificate"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (certModal) {
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Modal Closers
  document.querySelectorAll('.modal-close-btn, .modal-overlay').forEach(closer => {
    closer.addEventListener('click', (e) => {
      if (e.target === closer || closer.classList.contains('modal-close-btn')) {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Handle Form Submission with instant WhatsApp Redirect
  const enrollForm = document.getElementById('enrollForm');
  if (enrollForm) {
    enrollForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value;
      const phone = document.getElementById('formPhone').value;
      const city = document.getElementById('formCity').value;
      const format = document.getElementById('formFormat').value;
      const plan = document.getElementById('formPlan').value;
      const remarks = document.getElementById('formRemarks').value || 'None';

      const planTitle = plan === 'full' 
        ? 'Complete Art of Healthy Baking Program (₹9,999)' 
        : 'Topic-Wise / Selected Module Enrollment';

      const whatsappMsg = `*Enquiry for Art of Healthy Baking - The Cake Box*%0A%0A` +
        `👤 *Name:* ${encodeURIComponent(name)}%0A` +
        `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
        `📍 *Location:* ${encodeURIComponent(city)}%0A` +
        `🎓 *Preferred Format:* ${encodeURIComponent(format)}%0A` +
        `📦 *Selected Plan:* ${encodeURIComponent(planTitle)}%0A` +
        `💬 *Message:* ${encodeURIComponent(remarks)}%0A%0A` +
        `_Please guide me on enrolment and next batch schedule._`;

      const whatsappUrl = `https://wa.me/917200823014?text=${whatsappMsg}`;

      // Show temporary confirmation and redirect
      const submitBtn = enrollForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Connecting with The Cake Box...';
      submitBtn.disabled = true;

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        enrollModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }, 600);
    });
  }
}

/* ==========================================================================
   6. Topic-Wise Selection & Dynamic WhatsApp Message
   ========================================================================== */
function initTopicCalculator() {
  const checkboxes = document.querySelectorAll('.topic-check');
  const dynamicBtn = document.getElementById('topicWhatsappBtn');
  const countBadge = document.getElementById('selectedTopicsCount');

  if (!checkboxes.length || !dynamicBtn) return;

  function updateTopicEnquiry() {
    const selected = [];
    checkboxes.forEach(cb => {
      if (cb.checked) {
        selected.push(cb.value);
      }
    });

    if (countBadge) {
      countBadge.textContent = selected.length;
    }

    let msg = `*Topic-Wise Enquiry - Art of Healthy Baking*%0A%0AHello Mentor Manisha & The Cake Box Team,%0AI would like to enrol in the following specific modules:%0A`;
    
    if (selected.length === 0) {
      msg += `(All Modules / Custom Package)%0A`;
    } else {
      selected.forEach((m, idx) => {
        msg += `${idx + 1}. ${encodeURIComponent(m)}%0A`;
      });
    }

    msg += `%0APlease share the individual pricing and upcoming schedule for these modules.`;
    dynamicBtn.href = `https://wa.me/917200823014?text=${msg}`;
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateTopicEnquiry);
  });

  updateTopicEnquiry();
}

/* ==========================================================================
   7. Sticky Bottom Bar
   ========================================================================== */
function initStickyBar() {
  const stickyBar = document.querySelector('.sticky-bottom-bar');
  const heroSection = document.querySelector('.hero-section');

  if (!stickyBar || !heroSection) return;

  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom < 0) {
      stickyBar.style.transform = 'translateY(0)';
    } else {
      stickyBar.style.transform = 'translateY(100%)';
    }
  });
}

/* ==========================================================================
   8. Mobile Navigation Toggle
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navLinks.classList.toggle('active');
    toggleBtn.innerHTML = isActive ? '✕' : '☰';
    toggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });

  // Close mobile nav when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      toggleBtn.innerHTML = '☰';
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
      navLinks.classList.remove('active');
      toggleBtn.innerHTML = '☰';
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// Global helper to open module enquire in modal
window.enquireSingleModule = function(moduleName) {
  const enrollModal = document.getElementById('enrollModal');
  const planSelect = document.getElementById('formPlan');
  const remarks = document.getElementById('formRemarks');

  if (planSelect) planSelect.value = 'topics';
  if (remarks) remarks.value = `Enquiring specifically for: ${moduleName}`;

  if (enrollModal) {
    enrollModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};
