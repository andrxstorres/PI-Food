import { Link } from "react-router-dom";
import substituteImage from "../../media/images/empty_plate_square.jpg";

export default function HomeCard({ recipe }) {
  const { id, title, image, dishTypes, diets } = recipe;

  return (
    <Link to={`/details/${id}`}>
      <article>
        {image ? <img src={`${image}`} alt={`Served ${title}`} width="400px" /> : <img src={`${substituteImage}`} alt={`Served ${title}`} width="400px" />}
        <p>{title}.</p>

        {diets !== [] && (
          <ul>
            {diets.map((dietName) => (
              <li key={dietName}>{dietName}.</li>
            ))}
          </ul>
        )}

        {dishTypes && dishTypes !== [] && (
          <>
            <p>Dish recommended as:</p>
            <ul>
              {dishTypes.map((dishName) => (
                <li key={dishName}>{dishName}.</li>
              ))}
            </ul>
          </>
        )}
      </article>
    </Link>
  );
}
