import { visibleNavbarAndFooter } from "../../utils/auth";

export default class HomePage {
  async render() {
    return `
      <section id='homePage' class="container text-center text-lg-start" style='padding-top: 8rem;
    width: 100vw;
    height: 50vw;'>
        <h1>Home Page</h1>
      </section>
    `;
  }

  async afterRender() {
    // tampilkan navbar
    visibleNavbarAndFooter();
  }
}
