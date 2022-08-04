import { useDispatch, useSelector } from "react-redux";
import { getHomeRecipes } from "../../redux/actions";
// import { Link } from "react-router-dom";
import HomeCard from "../HomeCard";
import HomePaginationButtons from "../HomePaginationButtons"

export default function HomeCardsContainer({ allHomeRecipes }) {

  const dispatch = useDispatch()

  const alteredHome = useSelector(state=> state.alteredHome)

  const onClickHandler = () => {
    dispatch(getHomeRecipes())
  }

    return (
    <div>
      <HomePaginationButtons />
      {alteredHome && <button type="button" onClick={onClickHandler}>Reload home.</button>}
      {allHomeRecipes?.length > 0 ? (
        allHomeRecipes.map((recipe) => {
          return <HomeCard key={recipe.id} recipe={recipe} />;
        })
      ) : (
        <p>No recipes found. Search something else or reload the page.</p>
      )}
    </div>
  );
}
