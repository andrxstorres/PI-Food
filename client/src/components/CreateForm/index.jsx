import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postRecipeInDb } from "../../redux/actions";

export default function CreateForm({ diets }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formState, setFormState] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    steps: "",
    diets: [],
  });

  const { name, summary, steps, healthScore } = formState;

  const lastCreatedRecipe = useSelector((state) => state.newRecipe);
  const postError = useSelector((state) => state.postError);

  const onChangeHandler = (e) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onDietSelectHandler = (e) => {
    if (formState.diets.includes(e.target.name)) {
      setFormState((prevState) => {
        return {
          ...prevState,
          diets: prevState.diets.filter((diet) => diet !== e.target.name),
        };
      });
    } else {
      setFormState((prevState) => {
        return {
          ...prevState,
          diets: [...prevState.diets, e.target.name],
        };
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (name && name.length < 140 && healthScore <= 100 && healthScore >= 0) dispatch(postRecipeInDb(formState));
  };

  if (lastCreatedRecipe.name === name && lastCreatedRecipe.summary === summary && lastCreatedRecipe.steps === steps) history.push(`/details/${lastCreatedRecipe.id}`);

  return (
    <section>
      <Link to="/home">Back.</Link>
      <header>Creation tab.</header>
      <br />
      <form id="create" onSubmit={submitHandler}>
        <label htmlFor="name">Recipe title:</label>
        <br />
        <input type="text" id="name" name="name" required onChange={onChangeHandler} />
        {name.length > 140 && <p>The title length shouldn't exceed 140 characters.</p>}
        <br />

        <label htmlFor="healthScore">Health score:</label>
        <br />
        <input type="number" id="healthScore" name="healthScore" min="1" max="100" onChange={onChangeHandler} />
        {healthScore > 100 && <p>The health score must be an integer number between 0 and 100</p>}
        {healthScore <= 0 && <p>The health score must be an integer number between 1 and 100</p>}
        <br />

        <label htmlFor="diets">Select wich diets this recipe is suitable for:</label>
        <fieldset id="diets" name="diets">
          {diets !== [] &&
            diets.map(({ name }) => {
              return (
                <div key={name}>
                  <label htmlFor={name}>{name}</label>
                  <input type="checkbox" name={name} onChange={onDietSelectHandler} />
                  <br />
                </div>
              );
            })}
        </fieldset>
        <br />

        <label htmlFor="summary">Add a summary of the recipe's final result:</label>
        <br />
        <textarea
          id="summary"
          name="summary"
          form="create"
          placeholder="You can start by explaining it's principal ingredients or characteristics..."
          required
          onChange={onChangeHandler}
        />
        <br />

        <label htmlFor="steps">Write down the recipe step by step:</label>
        <br />
        <textarea id="steps" name="steps" placeholder="What should you do to get ready for this dish? You can start there..." required onChange={onChangeHandler} />
        <br />

        {name === "" || name.length > 140 || summary === "" || healthScore === null || healthScore < 0 || healthScore > 100 || steps === "" ? (
          <button type="submit" disabled>
            Finish.
          </button>
        ) : (
          <button type="submit">Finish.</button>
        )}
        {postError === "SequelizeUniqueConstraintError" && <span> You summary its exactly like one from another recipe! Try to make it more personal.</span>}
      </form>
    </section>
  );
}
