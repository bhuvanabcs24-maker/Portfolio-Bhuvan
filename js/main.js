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
});
