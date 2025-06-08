function togglePassword(fieldId) {
  const passwordField = document.getElementById(fieldId);
  const eyeIcon = document.getElementById(fieldId + "-eye");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    passwordField.type = "password";
    eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

module.exports = {
  togglePassword,
};
