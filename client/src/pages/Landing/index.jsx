import { Link } from "react-router-dom";
import landingDishAndTableImage from "../../media/images/photo-1414235077428-338989a2e8c0.png";
// import "./style.module.css";

export default function Landing() {
  return (
    <div style={landingDiv}>
      <h1 style={text}>PI: Food</h1>
      <Link style={toHome} to="/home">
        Go to home.
      </Link>
      {/* <img src={landingDishAndTableImage} alt="Landing background" /> */}
    </div>
  );
}

const landingDiv = {
  display: "flex",
  flex: 1,
  width: "100vw",
  height: "100vh",
  backgroundColor: "black",
  backgroundSize: "cover",
  backgroundImage: `url(${landingDishAndTableImage})`,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const text = {
  fontSize: 80,
  color: "#2b2d42",
  border: "5px solid #F1F1F1",
  padding: "10px 40px",
  marginTop: "-15px",
};

const toHome = {
  backgroundColor: "black",
  color: "white",
  fontSize: 22,
  textDecoration: "none",
  padding: "5px 10px",
  textAlign: "center ",
  cursor: "pointer",
  marginTop: "-40px",
};
