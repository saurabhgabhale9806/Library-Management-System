let currentPage = 1;
const rowsPerPage = 5;

document.addEventListener("DOMContentLoaded", () => {
  const allRows = Array.from(document.querySelectorAll(".student-row"));
  const totalPages = Math.ceil(allRows.length / rowsPerPage);

  function renderPage(page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    allRows.forEach((row, index) => {
      row.style.display = index >= start && index < end ? "table-row" : "none";
    });

    document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;
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

  renderPage(currentPage);
});
