import { errorHandling } from "../../utils";

export default class my_profile_page {
  #presenterPage = null;
  async render() {
    return `
    <!--My Profile-->
      <section id='myProfile' class="container text-center text-lg-start" style='padding-top: 8rem;
    width: 100vw;
    height: 50vw;'>
         <div class="card card-custom text-center">
        <div class="profile-header"></div>
        <div class="profile-img">
            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
                alt="Profile" class="w-100 h-100 object-fit-cover">
        </div>
        <div class="card-body pt-5 mt-4">
            <h5 class="card-title fw-bold text-dark mb-1">Fikri</h5>
            <p class="text-primary fw-semibold mb-4">Frontend Developer & UI Designer</p>

            <form id="profileForm" class="text-start">
                <!-- Username Field -->
                <div class="mb-3">
                    <label for="username" class="form-label fw-semibold">
                        <i class="fas fa-user me-2"></i>Username
                    </label>
                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="fas fa-user"></i>
                        </span>
                        <input type="text" class="form-control" id="username" name="username"
                            placeholder="Enter your username" required>
                    </div>
                </div>

                <!-- Email Field (Disabled/Readonly) -->
                <div class="mb-3">
                    <label for="email" class="form-label fw-semibold">
                        <i class="fas fa-envelope me-2"></i>Email
                    </label>
                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <input type="email" class="form-control" id="email" name="email" value="fikri@example.com"
                            readonly disabled>
                    </div>
                    <small class="text-muted">Email cannot be changed</small>
                </div>

                <!-- Password Field -->
                <div class="mb-3">
                    <label for="password" class="form-label fw-semibold">
                        <i class="fas fa-lock me-2"></i>Password
                    </label>
                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="fas fa-lock"></i>
                        </span>
                        <input type="password" class="form-control" id="password" name="password"
                            placeholder="Enter your password" required>
                        <span class="input-group-text password-toggle" onclick="togglePassword('password')">
                            <i class="fas fa-eye" id="password-eye"></i>
                        </span>
                    </div>
                </div>

                <!-- Confirm Password Field -->
                <div class="mb-4">
                    <label for="confirmPassword" class="form-label fw-semibold">
                        <i class="fas fa-lock me-2"></i>Confirm Password
                    </label>
                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="fas fa-lock"></i>
                        </span>
                        <input type="password" class="form-control" id="confirmPassword" name="confirmPassword"
                            placeholder="Confirm your password" required>
                        <span class="input-group-text password-toggle" onclick="togglePassword('confirmPassword')">
                            <i class="fas fa-eye" id="confirmPassword-eye"></i>
                        </span>
                    </div>
                    <div class="invalid-feedback" id="passwordMismatch">
                        Passwords do not match!
                    </div>
                </div>

                <!-- Buttons -->
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="reset" class="btn btn-secondary-custom me-md-2">
                        <i class="fas fa-undo me-2"></i>Reset
                    </button>
                    <button type="submit" class="btn btn-primary-custom">
                        <i class="fas fa-check me-2"></i>Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
    </section>
    `;
  }

  async togglePassword(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const eyeIcon = document.getElementById(fieldId + "-eye");

    if (passwordField.type === "password") {
      passwordField.type = "text";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    } else {
      passwordField.type = "password";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    }
  }

  async afterRender() {
    // Form validation and submission
    document.getElementById("profileForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const username = document.getElementById("username").value;

      // Reset previous validation states
      document.getElementById("confirmPassword").classList.remove("is-invalid");

      // Check if passwords match
      if (password !== confirmPassword) {
        document.getElementById("confirmPassword").classList.add("is-invalid");
        return;
      }

      // If validation passes
      alert(`Profile updated successfully!\nUsername: ${username}`);

      // Here you would typically send the data to a server
      console.log("Form submitted:", {
        username: username,
        password: password,
      });
    });

    // Real-time password matching validation
    document.getElementById("confirmPassword").addEventListener("input", function () {
      const password = document.getElementById("password").value;
      const confirmPassword = this.value;

      if (confirmPassword && password !== confirmPassword) {
        this.classList.add("is-invalid");
      } else {
        this.classList.remove("is-invalid");
      }
    });

    // Reset form handler
    document.getElementById("profileForm").addEventListener("reset", function () {
      document.getElementById("confirmPassword").classList.remove("is-invalid");
      setTimeout(() => {
        // Reset password visibility
        document.getElementById("password").type = "password";
        document.getElementById("confirmPassword").type = "password";
        document.getElementById("password-eye").classList.remove("fa-eye-slash");
        document.getElementById("password-eye").classList.add("fa-eye");
        document.getElementById("confirmPassword-eye").classList.remove("fa-eye-slash");
        document.getElementById("confirmPassword-eye").classList.add("fa-eye");
      }, 10);
    });
  }

  async errorHandlerFetch(error) {
    if (error.code === "ECONNABORTED") {
      errorHandling("Timeout Error!", "Terjadi kesalahan dalam pengiriman data. Mohon coba lagi.");
    } else {
      if (error.status && error.status === 400) {
        errorHandling("Bad Request!", error.message);
      } else {
        errorHandling("Error!", error.message);
      }
    }
  }
}
