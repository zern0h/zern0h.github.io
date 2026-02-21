export function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      items.forEach((item) => {
        const category = item.dataset.category;
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          item.style.display = '';

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          });
        } else {
          item.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';

          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}
