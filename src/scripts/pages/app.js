import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";
import { transitionHelper } from "../utils";
import { getActivePathname } from "../routes/url-parser";

class App {
  #content = null;
  #currentPath;

  constructor({ content }) {
    this.#content = content;
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];

    // cek trasnition bisa digunakan atau tidak
    const transition = transitionHelper({
      /**
       * Render the page and set the content of #content to the rendered
       * HTML and call the afterRender method of the page.
       *
       * @param {string} url - The URL of the page to render.
       * @returns {Promise<void>}
       */
      updateDOM: async () => {
        this.#content.innerHTML = await page.render();
        await page.afterRender();
      },
    });
    // transisition sudah terupdate berhasil
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: "instant" });
      //akses method private
      // this.#setupNavigationList();
    });

    transition.finished.then(() => {
      // Clear the temporary view-transition-name
      // if (targetThumbNail) {
      //   targetThumbNail.style.viewTransitionName = "";
      // }

      // lanjutkan logic

      // update current path
      this.#currentPath = getActivePathname();
    });
  }
}

export default App;
