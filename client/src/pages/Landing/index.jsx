import { Link } from "react-router-dom";
import landingDishAndTableImage from "../../media/images/photo-1414235077428-338989a2e8c0.png";

export default function Landing() {
  return (
    <div>
      <h1>PI: Food</h1>
      <Link to="/home">Go to home.</Link>
      <img src={landingDishAndTableImage} alt="" />
    </div>
  );
}
