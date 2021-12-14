import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    console.log(numPages);
    // // 1) Page 1 - Only 1 page
    // if (curPage === 1 && numPages === 1) {
    //   return 'Only 1 page';
    // }

    // 2) Page 1 - There are other pages
    if (curPage === 1 && numPages > 1) {
      return `<button class="btn--inline pagination__btn--next">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
        <span>Page 2</span>
      </button>`;
    }
    // 3) Last page
    if (curPage === numPages && numPages > 1) {
      return `<button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${numPages - 1}</span>
    </button>`;
    }
    // 4) Other page

    if (curPage < numPages && curPage > 1) {
      return `<button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    <button class="btn--inline pagination__btn--next">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
      <span>Page ${curPage + 1}</span>
    </button>
    `;
    }
  }
}

export default new PaginationView();
