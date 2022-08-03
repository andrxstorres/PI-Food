import HomeDietFilter from "../HomeDietFilter";
import HomeHealthscoreFilter from "../HomeHealthscoreFilter";
import HomeAlphabeticFilter from "../HomeAlphabeticFilter";
import { useSelector } from "react-redux";

export default function HomeFilterBar() {
  const allHomeRecipes = useSelector((state) => state.recipes);
  return (
    <aside>
      <HomeDietFilter allHomeRecipes={allHomeRecipes} />
      <hr />
      <HomeHealthscoreFilter allHomeRecipes={allHomeRecipes} />
      <hr />
      <HomeAlphabeticFilter allHomeRecipes={allHomeRecipes} />
      <hr />
    </aside>
  );
}
