let currentStartIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.book-item');

  function smoothScrollTo(targetY, duration = 1200) {
    const startY = window.scrollY;
    const difference = targetY - startY;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + difference * easeInOutQuad(progress));
      if (progress < 1) requestAnimationFrame(step);
    }

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(step);
  }

  function paginateBooks() {
    const visibleCount = 3; // Show 3 cards per page

    cards.forEach((card, index) => {
      card.style.display = index >= currentStartIndex && index < currentStartIndex + visibleCount ? "block" : "none";
    });

    const pageInfo = document.getElementById('pageInfo');
    if (pageInfo) {
      const end = Math.min(currentStartIndex + visibleCount, cards.length);
      pageInfo.textContent = `Showing ${currentStartIndex + 1} - ${end} of ${cards.length}`;
    }

    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    if (prevButton && nextButton) {
      prevButton.disabled = currentStartIndex === 0;
      nextButton.disabled = currentStartIndex + visibleCount >= cards.length;
    }

    const scrollTarget = cards[currentStartIndex];
    if (scrollTarget) {
      const topOffset = scrollTarget.getBoundingClientRect().top + window.scrollY - 80;
      setTimeout(() => smoothScrollTo(topOffset, 1200), 100);
    }
  }

  window.changePage = function (direction) {
    const visibleCount = 3;
    const maxIndex = cards.length - (cards.length % visibleCount || visibleCount);
    if (direction === 1 && currentStartIndex + visibleCount < cards.length) {
      currentStartIndex += visibleCount;
    } else if (direction === -1 && currentStartIndex > 0) {
      currentStartIndex -= visibleCount;
    }
    paginateBooks();
  };

  window.searchSBooks = function (query) {
    const lowerQuery = query.toLowerCase();
    cards.forEach(card => {
      const title = card.querySelector(".book-title").innerText.toLowerCase();
      card.style.display = title.includes(lowerQuery) ? "block" : "none";
    });
  };

  paginateBooks();
});
