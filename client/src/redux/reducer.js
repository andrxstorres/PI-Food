import {
  GET_HOME_RECIPES,
  GET_RECIPES_BY_NAME,
  NO_NAME_MATCHES_FOUND,
  GET_DETAIL_BY_ID,
  GET_DIETS_FROM_DB,
  POST_RECIPE_IN_DB,
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
  noNameMatchError: "",
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
