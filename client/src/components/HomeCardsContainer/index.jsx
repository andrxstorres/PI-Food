import HomeCard from "../HomeCard";

export default function HomeCardsContainer({ allHomeRecipes }) {
  return (
    <div>
      {allHomeRecipes ? (
        allHomeRecipes.map((recipe) => {
          return <HomeCard key={recipe.id} recipe={recipe} />;
        })
      ) : (
        <p>Could not load allHomeRecipes</p>
      )}
    </div>
  );
}
