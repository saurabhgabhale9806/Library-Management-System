let currentPage = 1;
const defaultRowsPerPage = 5;
let allRows = [];

document.addEventListener("DOMContentLoaded", () => {
  allRows = Array.from(document.querySelectorAll(".student-row"));
  const totalPages = Math.ceil(allRows.length / defaultRowsPerPage);

  function renderPage(page) {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const rowsPerPage = isMobile ? allRows.length : defaultRowsPerPage;
    const calculatedTotalPages = Math.ceil(allRows.length / rowsPerPage);

    if (isMobile) {
      // Mobile view: Show all rows, hide pagination
      allRows.forEach((row) => {
        row.style.display = "block";
      });
      document.querySelector(".pagination").style.display = "none";
    } else {
      // Desktop view: Paginate rows
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      allRows.forEach((row, index) => {
        row.style.display = index >= start && index < end ? "table-row" : "none";
      });

      document.querySelector(".pagination").style.display = "flex";
      const pageInfo = document.getElementById("pageInfo");
      if (pageInfo) {
        pageInfo.textContent = `Page ${currentPage} of ${calculatedTotalPages || 1}`;
      }

      document.getElementById("prevPage").disabled = currentPage === 1;
      document.getElementById("nextPage").disabled = currentPage === calculatedTotalPages;
    }
  }

  window.changePage = function (direction) {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return; // No pagination in mobile view

    const rowsPerPage = defaultRowsPerPage;
    const maxPage = Math.ceil(allRows.length / rowsPerPage);
    const newPage = currentPage + direction;

    if (newPage >= 1 && newPage <= maxPage) {
      currentPage = newPage;
      renderPage(currentPage);
    }
  };

  // Re-render on window resize to handle display changes
  window.addEventListener("resize", () => {
    const wasMobile = window.matchMedia("(max-width: 768px)").matches;
    renderPage(currentPage);
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Reset to page 1 when switching between mobile and desktop
    if (wasMobile !== isMobile) {
      currentPage = 1;
      renderPage(currentPage);
    }
  });

  // Expose pagination utilities for external use (e.g., search functionality)
  window.pagination = {
    renderPage,
    rows: allRows,
    rowsPerPage: defaultRowsPerPage,
    setTotalPages: (newTotal) => {
      totalPages = newTotal;
    }
  };

  renderPage(currentPage);
});