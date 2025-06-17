
  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
  }

  document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const parent = toggle.parentElement;
      parent.classList.toggle('open');
      toggle.innerHTML = toggle.innerHTML.includes('▼')
        ? toggle.innerHTML.replace('▼', '▲')
        : toggle.innerHTML.replace('▲', '▼');
    });
  });

  function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
    document.querySelectorAll('.tab-buttons button').forEach(btn => btn.classList.remove('active'));
    const activeBtn = Array.from(document.querySelectorAll('.tab-buttons button')).find(btn => btn.textContent.toLowerCase().includes(tabId));
    if (activeBtn) activeBtn.classList.add('active');
  function loadAddStudent(event) {
    event.preventDefault();

    fetch('/student', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(response => response.text())
    .then(html => {
      showTab('students'); // Switch to student tab
      document.getElementById('students').innerHTML = html;
    })
    .catch(error => {
      console.error("Error loading Add Student form:", error);
    });
  }
}