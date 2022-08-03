import HomeCard from "../HomeCard";

export default function HomeCardsContainer({ allHomeRecipes }) {
  return (
    <div>
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
