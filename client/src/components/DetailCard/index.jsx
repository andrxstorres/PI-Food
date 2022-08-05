import sustituteImage from "../../media/images/empty_plate_square.jpg";

export default function DetailCard({ details }) {
  const { id, image, dishTypes, diets, summary, healthScore, steps } = details;

  return (
    <main>
      {image ? <img src={image} alt="Final result of the recipe" width="400px" /> : <img src={sustituteImage} alt="Empty plate" width="400px" />}
      <section>
        {dishTypes && (
          <div>
            <p>This recipe can work as:</p>
            <ul>
              {dishTypes.map((dishTypeName) => {
                return <li key={dishTypeName}>{dishTypeName}</li>;
              })}
            </ul>
          </div>
        )}
        {diets?.length > 0 && diets ? (
          <div>
            <p>Suitable for diets like:</p>
            <ul>
              {diets.map((dietName) => {
                return <li key={dietName}>{dietName}</li>;
              })}
            </ul>
          </div>
        ) : null}
        {healthScore && <p>Health Score: {healthScore}</p>}
      </section>

      {isNaN(id) ? (
        <div>
          {summary && (
            <section>
              <header>Summary:</header>
              <p>{<div dangerouslySetInnerHTML={{ __html: summary }} />}</p>
            </section>
          )}
          {steps && (
            <section>
              <header>Step by step:</header>
              <p>{<div dangerouslySetInnerHTML={{ __html: steps }} />}</p>
            </section>
          )}
        </div>
      ) : (
        <div>
          {summary && (
            <section>
              <header>Summary:</header>
              <p>{<div dangerouslySetInnerHTML={{ __html: summary }} />}</p>
            </section>
          )}
          {steps && (
            <section>
              <header>Step by step:</header>
              <p>{<div dangerouslySetInnerHTML={{ __html: steps }} />}</p>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
