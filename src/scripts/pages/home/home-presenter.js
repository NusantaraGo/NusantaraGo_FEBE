class HomePresenter {
  constructor() {
    // Configuration object
    this.config = {
      selectors: {
        navbar: "nav.navbar",
        exploreButton: "#explore-button"
      },
    };

    // Bind context for event handlers
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  async afterRender() {
    this.handleNavbarOpacity();
    this.setupExploreButton();
  }

  handleNavbarOpacity() {
    const { navbar } = this.config.selectors;
    const navbarElement = document.querySelector(navbar);
    
    if (navbarElement) {
      navbarElement.style.opacity = "1";
      navbarElement.style.transition = "opacity 0.3s ease-in-out";
    }
  }

  setupExploreButton() {
    const { exploreButton } = this.config.selectors;
    const buttonElement = document.querySelector(exploreButton);

    if (!buttonElement) {
      console.warn('Explore button element not found');
      return;
    }

    buttonElement.addEventListener("click", this.handleNavigation);
  }

  handleNavigation() {
    window.location.hash = this.config.routes.search;
  }

  cleanup() {
    const { exploreButton } = this.config.selectors;
    const buttonElement = document.querySelector(exploreButton);
    
    if (buttonElement) {
      buttonElement.removeEventListener("click", this.handleNavigation);
    }
  }
}

export default HomePresenter;