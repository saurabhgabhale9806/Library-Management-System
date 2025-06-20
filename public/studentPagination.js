let currentPage = 1;
let rowsPerPage;
let allRows = [];

function getRowsPerPage() {
  return window.innerWidth <= 768 ? allRows.length : 5;
}

document.addEventListener("DOMContentLoaded", () => {
  allRows = Array.from(document.querySelectorAll(".student-row"));
  rowsPerPage = getRowsPerPage();
  let totalPages = Math.ceil(allRows.length / rowsPerPage);

  function renderPage(page) {
    rowsPerPage = getRowsPerPage();
    totalPages = Math.ceil(allRows.length / rowsPerPage);

    if (window.innerWidth <= 768) {
      // Mobile view: Show all rows, no pagination
      allRows.forEach((row) => {
        row.style.display = "block";
      });
      document.querySelector(".pagination").style.display = "none";
    } else {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      allRows.forEach((row, index) => {
        row.style.display = index >= start && index < end ? "table-row" : "none";
      });

      document.querySelector(".pagination").style.display = "flex";
      document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;
      document.getElementById("prevPage").disabled = currentPage === 1;
      document.getElementById("nextPage").disabled = currentPage === totalPages;
    }
  }

  window.changePage = function (direction) {
    const newPage = currentPage + direction;
    const maxPage = Math.ceil(allRows.length / rowsPerPage);
    if (newPage >= 1 && newPage <= maxPage) {
      currentPage = newPage;
      renderPage(currentPage);
    }
  };

  window.addEventListener("resize", () => {
    const previousRowsPerPage = rowsPerPage;
    rowsPerPage = getRowsPerPage();

    // Reset page to 1 only if mode changed (mobile <-> desktop)
    const wasMobile = previousRowsPerPage === allRows.length;
    const isMobile = rowsPerPage === allRows.length;

    if (wasMobile !== isMobile) {
      currentPage = 1;
    }

    renderPage(currentPage);
  });

  renderPage(currentPage);
});
  