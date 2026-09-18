// Vanilla JavaScript Interactions for Bhuvan A B's Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isExpanded = mobileMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Copy Email to Clipboard
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'bhuvanab.cs24@bmsce.ac.in';
      navigator.clipboard.writeText(email).then(() => {
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span style="color: #34d399;">Copied!</span>
        `;
        setTimeout(() => {
          copyBtn.innerHTML = originalHtml;
        }, 2000);
      });
    });
  }

  // Interactive Architecture Tab Switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const parentContainer = btn.closest('.tab-wrapper');
      if (!parentContainer || !targetId) return;

      // Update button active state
      parentContainer.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Update pane active state
      parentContainer.querySelectorAll('.tab-pane').forEach((pane) => {
        if (pane.id === targetId) {
          pane.style.display = 'block';
        } else {
          pane.style.display = 'none';
        }
      });
    });
  });

  // ADR Category Filter Logic
  const adrFilterBtns = document.querySelectorAll('.adr-filter-btn');
  const adrCards = document.querySelectorAll('.adr-card');

  if (adrFilterBtns.length > 0 && adrCards.length > 0) {
    adrFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');

        adrFilterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        adrCards.forEach((card) => {
          const cardCategories = (card.getAttribute('data-category') || '').split(' ');
          if (category === 'all' || cardCategories.includes(category)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Engineering Patterns Category Filter Logic
  const patternFilterBtns = document.querySelectorAll('.pattern-filter-btn');
  const patternCards = document.querySelectorAll('.pattern-card');

  if (patternFilterBtns.length > 0 && patternCards.length > 0) {
    patternFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');

        patternFilterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        patternCards.forEach((card) => {
          const cardCategories = (card.getAttribute('data-category') || '').split(' ');
          if (category === 'all' || cardCategories.includes(category)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});

