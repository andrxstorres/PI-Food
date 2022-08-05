import { useState } from "react";
import { useDispatch } from "react-redux";
import { sortHomeByHealthScore } from "../../redux/actions";

export default function HomeHealthscoreFilter({ allHomeRecipes }) {
  const dispatch = useDispatch();

  const [sortOption, setSortOption] = useState(null);

  const onChangeHandler = (e) => {
    setSortOption(e.target.value);
    console.log(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // downwards sort dispatch
    sortOption === "downwards" && dispatch(sortHomeByHealthScore(allHomeRecipes.sort((a, b) => b.healthScore - a.healthScore)));
    // upwards sort dispatch
    sortOption === "upwards" && dispatch(sortHomeByHealthScore(allHomeRecipes.sort((a, b) => a.healthScore - b.healthScore)));
  };

  return (
    <div>
      <form id="sortByHS" onSubmit={onSubmitHandler}>
        <select from="sortByHS" onChange={onChangeHandler}>
          <option id="defaultOption" disabled selected>
            Order by health score.
          </option>
          <option value="downwards" id="downwards">
            Downwards.
          </option>
          <option value="upwards" id="upwards">
            Upwards.
          </option>
        </select>
        {sortOption ? (
          <button type="submit">Sort by health score.</button>
        ) : (
          <button type="submit" disabled>
            Sort.
          </button>
        )}
      </form>
    </div>
  );
}
