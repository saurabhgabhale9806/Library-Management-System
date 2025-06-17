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
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(step);
  }

  function paginateBooks() {
    const visibleCount = currentStartIndex === 0 ? 2 : 1;

    cards.forEach((card, index) => {
      if (index >= currentStartIndex && index < currentStartIndex + visibleCount) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    const pageInfo = document.getElementById('pageInfo');
    if (pageInfo) {
      pageInfo.textContent = `Showing ${currentStartIndex + 1}${visibleCount > 1 ? ' - ' + (currentStartIndex + visibleCount) : ''} of ${cards.length}`;
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
      setTimeout(() => {
        smoothScrollTo(topOffset, 1200); // Duration in ms (slower = higher)
      }, 100);
    }
  }

  window.changePage = function (direction) {
    const visibleCount = currentStartIndex === 0 ? 2 : 1;
    if (direction === 1 && currentStartIndex + visibleCount < cards.length) {
      currentStartIndex += visibleCount;
    } else if (direction === -1) {
      currentStartIndex = currentStartIndex === 2 ? 0 : currentStartIndex - 1;
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
    