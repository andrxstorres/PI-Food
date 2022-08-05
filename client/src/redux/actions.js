import axios from "axios";

export const GET_HOME_RECIPES = "GET_HOME_RECIPES";
export const GET_HOME_RECIPES_ERROR = "GET_HOME_RECIPES_ERROR";

export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const NO_NAME_MATCHES_FOUND = "NO_NAME_MATCHES_FOUND";

export const GET_DETAIL_BY_ID = "GET_DETAIL_BY_ID";

export const GET_DIETS_FROM_DB = "GET_DIETS_FROM_DB";

export const POST_RECIPE_IN_DB = "POST_RECIPE_IN_DB";
export const POST_ERROR = "POST_ERROR";

export const FILTER_HOME_BY_DIET = "FILTER_HOME_BY_DIET";
export const SORT_HOME_BY_HEALTHSCORE = "SORT_HOME_BY_HEALTHSCORE";
export const SORT_HOME_ALPHABETICALLY = "SORT_HOME_ALPHABETICALLY";

export const getHomeRecipes = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/recipes`)
      .then((response) => {
        console.log({ m: "esto es getHomeRecipes", payload: response.data });
        dispatch({
          type: GET_HOME_RECIPES,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log({ m: "GET_HOME_RECIPES_ERROR", err });
        dispatch({
          type: GET_HOME_RECIPES_ERROR,
          payload: "GET_HOME_RECIPES_ERROR",
        });
      });
  };
};

export const getRecipesByName = (search) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/recipes?name=${search}`)
      .then((response) => {
        const { allNameMatchedRecipes, totalAPIResults, totalDBResults } = response.data;
        console.log({ m: "esto es getRecipesByName", data: response.data });
        dispatch({
          type: GET_RECIPES_BY_NAME,
          payload: allNameMatchedRecipes,
        });
        if (totalAPIResults === 0 && totalDBResults === 0) {
          dispatch({
            type: NO_NAME_MATCHES_FOUND,
            payload: "NO_NAME_MATCHES_FOUND",
          });
        }
      })
      .catch((err) => console.log({ m: "An error ocurred in action creator getRecipesByName", err }));
  };
};

export const getDetailById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/recipes/${id}`);
      console.log("esto es getDetailById", data);
      dispatch({
        type: GET_DETAIL_BY_ID,
        payload: data,
      });
    } catch (err) {
      console.log({ m: "An error occurred while querying by ID to the DB", err });
    }
  };
};

export const getDietsFromDb = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/diets")
      .then(({ data }) => {
        console.log({ m: "this is getDietsFromDb", data });
        dispatch({
          type: GET_DIETS_FROM_DB,
          payload: data,
        });
      })
      .catch((err) => console.log({ m: "An error ocurred while requesting de DB for Diets", err }));
  };
};

export const postRecipeInDb = (formState) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3001/recipes", formState)
      .then((response) => {
        console.log({ m: "This is postRecipeInDb", data: response.data });
        dispatch({
          type: POST_RECIPE_IN_DB,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log({ m: "Something went wrong on postRecipeInDb action creator", err });
        dispatch({
          type: POST_ERROR,
          payload: err.response.data.err.name,
        });
      });
  };
};

export const filterHomeByDiet = (recipesFilteredByDiet) => {
  return (dispatch) => {
    console.log({ m: "this is filterHomeByDiet", recipesFilteredByDiet });
    dispatch({
      type: FILTER_HOME_BY_DIET,
      payload: recipesFilteredByDiet,
    });
  };
};

export const sortHomeByHealthScore = (homeSortedRecipes) => {
  return (dispatch) => {
    console.log({ m: "this is sortHomeByHealtScore", homeSortedRecipes });
    dispatch({
      type: SORT_HOME_BY_HEALTHSCORE,
      payload: homeSortedRecipes,
    });
  };
};

export const sortHomeAlphabetically = (homeSortedRecipes) => {
  return (dispatch) => {
    console.log({ m: "this is sortHomeAlphabetically", homeSortedRecipes });
    dispatch({
      type: "SORT_HOME_ALPHABETICALLY",
      payload: homeSortedRecipes,
    });
  };
};
