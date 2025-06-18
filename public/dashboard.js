// Toggle sidebar visibility
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

// Handle dropdown toggle in sidebar
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const parent = toggle.parentElement;
    parent.classList.toggle('open');
    toggle.innerHTML = toggle.innerHTML.includes('▼')
      ? toggle.innerHTML.replace('▼', '▲')
      : toggle.innerHTML.replace('▲', '▼');
  });
});

// Show selected tab and mark button active
function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });

  const selectedTab = document.getElementById(tabId);
  if (selectedTab) selectedTab.style.display = 'block';

  document.querySelectorAll('.tab-buttons button').forEach(btn => {
    btn.classList.remove('active');
  });

  const activeBtn = Array.from(document.querySelectorAll('.tab-buttons button'))
    .find(btn => btn.textContent.toLowerCase().includes(tabId.toLowerCase()));

  if (activeBtn) activeBtn.classList.add('active');
}

// Load the Add Student form dynamically via AJAX
function loadAddStudent(event) {
  event.preventDefault();

  fetch('/student', {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
    .then(response => response.text())
    .then(html => {
      showTab('students'); // Make sure there's a tab with id="students"
      const studentContainer = document.getElementById('students');
      if (studentContainer) {
        studentContainer.innerHTML = html;
      }
    })
    .catch(error => {
      console.error("Error loading Add Student form:", error);
    });
}
