import { parseActivePathname } from '../../routes/url-parser'; 
import DetailPresenter from './detail-presenter';

class DetailPage {
  constructor() {
    this._presenter = null;
  }

  async render() {
    const pathSegments = parseActivePathname(); 
    const placeId = pathSegments.id;
    // Instantiate the Presenter, passing the placeId.
    // The presenter doesn't need a direct reference to this view instance
    // if its only job is to return HTML for this render() method.
    this._presenter = new DetailPresenter({ placeId });

    const htmlContent = await this._presenter.buildHtmlForPage();
    return htmlContent; // This HTML will be used by app.js to set innerHTML
  }

  async afterRender() {
    // This method is called by your app.js after the HTML from render()
    // has been injected into the main content area.
    // You can add any event listeners or DOM manipulations here if needed.
    // For a static detail display, this might be empty or used for logging.
    console.log('DetailPage: afterRender complete.');

    // Example: if you had interactive elements injected by the template
    // const someButton = document.querySelector('#myDetailButton');
    // if (someButton) {
    //   someButton.addEventListener('click', () => {
    //     // Handle click, possibly by calling a method on this._presenter
    //     // this._presenter.handleSomeAction();
    //   });
    // }
  }
}

export default DetailPage;