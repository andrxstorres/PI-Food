import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDietsFromDb, filterHomeByDiet } from "../../redux/actions";

export default function HomeDietFilter({ allHomeRecipes }) {
  const dispatch = useDispatch();

  const [selectedDiet, setSelectedDiet] = useState(null);

  useEffect(() => {
    dispatch(getDietsFromDb());
  }, [dispatch]);

  const diets = useSelector((state) => state.dbDiets);

  const onChangeHandler = (e) => {
    setSelectedDiet(() => e);
  };

  const dietFilterHandler = (e) => {
    e.preventDefault();
    const recipesFilteredByDiet = allHomeRecipes.filter((recipe) => recipe.diets.includes(selectedDiet));
    dispatch(filterHomeByDiet(recipesFilteredByDiet));
  };

  return (
    <article>
      <p>Home Diet Filter</p>
      <form id="dietfilter" onSubmit={dietFilterHandler}>
        <select name="dietselector" id="dietselector" form="dietfilter" onChange={onChangeHandler}>
          {diets?.length > 0 &&
            diets.map(({ name: dietName }) => {
              return (
                <option key={dietName} id={dietName} name={dietName}>
                  {dietName}
                </option>
              );
            })}
          {/* <option key="none">none</option> */}
        </select>
        {selectedDiet ? (
          <button type="submit">Filter by diet types.</button>
        ) : (
          <button type="submit" disabled>
            Filter by diet types.
          </button>
        )}
      </form>
    </article>
  );
}
