export default class HomePage {
  async render() {
    return `
      <section class="container">
        <h1>Home Page</h1>
      </section>
    `;
  }

  async afterRender() {
    // tampilkan navbar
    const navbar = document.querySelector("nav.navbar");
    navbar.style.opacity = "1";
  }
}
