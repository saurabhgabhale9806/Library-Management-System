window.onload = function () {
    function validatePasswords() {
      const pass = document.getElementById('password').value;
      const confirm = document.getElementById('confirm').value;
      if (pass !== confirm) {
        alert('Passwords do not match!');
        return false;
      }
      return true;
    }

  console.log("Validation script loaded");

  const form = document.getElementById('studentForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const confirmError = document.getElementById('confirmError');

  function validateName() {
    const name = nameInput.value.trim();
    if (name.length < 2 || !/^[a-zA-Z\s]+$/.test(name)) {
      nameError.textContent = 'Enter a valid name (min 2 characters, letters/spaces only).';
      return false;
    } else {
      nameError.textContent = '';
      return true;
    }
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      emailError.textContent = 'Enter a valid email address.';
      return false;
    } else {
      emailError.textContent = '';
      return true;
    }
  }

  function validatePassword() {
    const password = passwordInput.value;
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
      passwordError.textContent = 'Password must be 6+ characters with at least one letter and one number.';
      return false;
    } else {
      passwordError.textContent = '';
      return true;
    }
  }

  function validateConfirmPassword() {
    if (confirmPasswordInput.value !== passwordInput.value) {
      confirmError.textContent = 'Passwords do not match.';
      return false;
    } else {
      confirmError.textContent = '';
      return true;
    }
  }

  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);
  confirmPasswordInput.addEventListener('input', validateConfirmPassword);

  form.addEventListener('submit', function (event) {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();

    if (!(isNameValid && isEmailValid && isPasswordValid && isConfirmValid)) {
      event.preventDefault();
    }
  });
};
