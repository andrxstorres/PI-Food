import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeRecipes } from "../../redux/actions.js";
import HomeCardsContainer from "../../components/HomeCardsContainer/index.jsx";
import { HomeNavBar } from "../../components/HomeNavBar/index.jsx";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(getHomeRecipes()), [dispatch]);

  const allHomeRecipes = useSelector((state) => state.recipes);
  const noNameMatchesFoundError = useSelector((state) => state.noNameMatchError);

  return (
    <div>
      <h1>Recipehub.</h1>
      <br />
      <HomeNavBar />
      <br />
      {noNameMatchesFoundError === "NO_NAME_MATCHES_FOUND" ? (
        <nav>
          <p>No recipes match the search.</p>
        </nav>
      ) : null}
      <HomeCardsContainer allHomeRecipes={allHomeRecipes} />
    </div>
  );
}
