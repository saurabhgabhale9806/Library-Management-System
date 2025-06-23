let currentPage = 1;
const rowsPerPage = 5;

document.addEventListener("DOMContentLoaded", () => {
  const rows = Array.from(document.querySelectorAll(".category-row"));
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  function renderPage(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    rows.forEach((row, index) => {
      row.style.display =
        index >= start && index < end
          ? isMobile
            ? "block"
            : "table-row"
          : "none";
    });

    const pageInfo = document.getElementById("pageInfo");
    if (pageInfo) {
      pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
    }

    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;
  }

  window.changePage = function (direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
      currentPage = newPage;
      renderPage(currentPage);
    }
  };

  // Re-render on window resize to handle display changes
  window.addEventListener("resize", () => {
    renderPage(currentPage);
  });

  // Expose renderPage and rows for search functionality
  window.pagination = {
    renderPage,
    rows,
    rowsPerPage,
    setTotalPages: (newTotal) => {
      totalPages = newTotal;
    }
  };

  renderPage(currentPage);
});