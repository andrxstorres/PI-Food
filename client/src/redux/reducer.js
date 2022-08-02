import { GET_HOME_RECIPES, GET_RECIPES_BY_NAME, NO_NAME_MATCHES_FOUND, GET_DETAIL_BY_ID, GET_DIETS_FROM_DB, POST_RECIPE_IN_DB } from "./actions.js";

const initialState = {
  recipes: [],
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
        noNameMatchError: "",
      };
    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        recipes: [...action.payload],
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
    default:
      return state;
  }
};
