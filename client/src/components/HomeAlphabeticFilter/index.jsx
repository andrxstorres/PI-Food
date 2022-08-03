import { useState } from "react";
import { useDispatch } from "react-redux";
import { sortHomeAlphabetically } from "../../redux/actions";

export default function HomeAlphabeticFilter({ allHomeRecipes }) {
  const dispatch = useDispatch();

  const [sortOption, setSortOption] = useState(null);

  const onChangeHandler = (e) => {
    setSortOption(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(sortOption);

    sortOption === "upwards" &&
      dispatch(
        sortHomeAlphabetically(
          allHomeRecipes.sort((a, b) => {
            let strComparation = a.title.localeCompare(b.title);
            return strComparation;
          })
        )
      );
    sortOption === "downwards" &&
      dispatch(
        sortHomeAlphabetically(
          allHomeRecipes.sort((a, b) => {
            let strComparation = a.title.localeCompare(b.title);
            if (strComparation > 0) return -1;
            if (strComparation < 0) return 1;
            return 0;
          })
        )
      );
  };

  return (
    <div>
      <form id="sortByHS" onSubmit={onSubmitHandler}>
        <select from="sortByHS" onChange={onChangeHandler}>
          <option id="defaultOption" disabled selected>
            Choose an order.
          </option>
          <option value="upwards" id="upwards">
            A - Z
          </option>
          <option value="downwards" id="downwards">
            Z - A
          </option>
        </select>
        {sortOption ? (
          <button type="submit">Sort alphabetically.</button>
        ) : (
          <button type="submit" disabled>
            Sort alphabetically.
          </button>
        )}
      </form>
    </div>
  );
}
