import {
  GET_HOME_RECIPES,
  GET_HOME_RECIPES_ERROR,
  GET_RECIPES_BY_NAME,
  NO_NAME_MATCHES_FOUND,
  GET_DETAIL_BY_ID,
  GET_DIETS_FROM_DB,
  POST_RECIPE_IN_DB,
  POST_ERROR,
  FILTER_HOME_BY_DIET,
  SORT_HOME_BY_HEALTHSCORE,
  SORT_HOME_ALPHABETICALLY,
} from "./actions.js";

const initialState = {
  recipes: [],
  recipesForHome: [],
  alteredHome: false,
  details: {},
  dbDiets: [],
  newRecipe: {},
  getHomeRecipesError: "",
  noNameMatchError: "",
  postError: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
        recipesForHome: [...action.payload],
        alteredHome: false,
        noNameMatchError: "",
      };
    case GET_HOME_RECIPES_ERROR:
      return {
        ...state,
        getHomeRecipesError: action.payload,
      };
    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        recipes: [...action.payload],
        recipesForHome: [...action.payload],
        alteredHome: true,
        noNameMatchError: "",
      };
    case NO_NAME_MATCHES_FOUND:
      return {
        ...state,
        noNameMatchError: "NO_NAME_MATCHES_FOUND",
      };
    case GET_DETAIL_BY_ID:
      return {
        ...state,
        details: { ...action.payload },
      };
    case GET_DIETS_FROM_DB:
      return {
        ...state,
        dbDiets: [...action.payload],
      };
    case POST_RECIPE_IN_DB:
      return {
        ...state,
        newRecipe: { ...action.payload },
      };
    case POST_ERROR:
      return {
        ...state,
        postError: action.payload,
      };
    case FILTER_HOME_BY_DIET:
      return {
        ...state,
        recipesForHome: [...action.payload],
        alteredHome: true,
      };
    case SORT_HOME_BY_HEALTHSCORE:
      return {
        ...state,
        recipesForHome: [...action.payload],
        alteredHome: true,
      };
    case SORT_HOME_ALPHABETICALLY:
      return {
        ...state,
        recipesForHome: [...action.payload],
        alteredHome: true,
      };
    default:
      return state;
  }
};
