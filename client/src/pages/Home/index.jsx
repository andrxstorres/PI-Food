import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeRecipes } from "../../redux/actions.js";
import HomeCardsContainer from "../../components/HomeCardsContainer/index.jsx";
import { HomeNavBar } from "../../components/HomeNavBar/index.jsx";
import HomeFilterBar from "../../components/HomeFilterBar/index.jsx";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(getHomeRecipes()), [dispatch]);

  const allHomeRecipes = useSelector((state) => state.recipesForHome);
  const noNameMatchesFoundError = useSelector((state) => state.noNameMatchError);

  return (
    <div style={backGround}>
      <header style={headerStyle}>
        <h1 style={homeTitle}>Recipehub.</h1>
        <HomeNavBar />
      </header>

      {noNameMatchesFoundError === "NO_NAME_MATCHES_FOUND" ? (
        <nav>
          <p>No recipes match the search.</p>
        </nav>
      ) : (
        <main>
          <HomeFilterBar />
          <br />
          <HomeCardsContainer allHomeRecipes={allHomeRecipes} />
        </main>
      )}
    </div>
  );
}

const backGround = {
  width: "100vw",
  height: "100vh",
  backgroundColor: "#edede9",
  // top: 0,
  // bottom: 0,
  // left: 0,
  // rigth: 0,
  // position: "absolute",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  // width: "100%",
  padding: "4px 75px",
  borderBottom: "2px solid grey",
  // height: 115,
  alingItems: "center",
  // backgroundColor: "#d5bdaf",
};

const homeTitle = {
  fontSize: 80,
  // backgroundColor: "pink",
  display: "inline-block",
  // overflow: "hidden",
};
