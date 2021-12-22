import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime';
import searchView from './views/searchView.js';

// if (module.hot) {
//   module.hot.accept();
// }

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

//////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 0) UPDATE RESULTS VIEW TO MARK SELECTED SEARCH RESULT
    resultsView.update(model.getSearchResultPage());

    // 1) LOADING RECIPE
    await model.loadRecipe(id);

    // 2) RENDERING RECIPE
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) GET SEARCH RESULTS
    const query = searchView.getQuery();
    if (!query) return;

    // 2) LOAD SEARCH RESULTS
    await model.loadSearchResults(query);

    // 3) RENDER RESULTS
    resultsView.render(model.getSearchResultPage());

    // 4) RENDER INITIAL PAGE ELEMENTS
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (gotoPage) {
  // 1) RENDER NEW RESULTS
  resultsView.render(model.getSearchResultPage(gotoPage));

  // 4) RENDER NEW PAGE ELEMENTS
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update recipe
  model.updateServings(newServings);
  //Update new servings
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
