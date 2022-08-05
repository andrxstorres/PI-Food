import React from "react";
import SearchBar from "../SearchBar";
import { Link } from "react-router-dom";

export class HomeNavBar extends React.Component {
  render() {
    return (
      <div style={navDiv}>
        <Link to="/create" style={createLink}>
          Create your own recipe.
        </Link>
        <SearchBar />
      </div>
    );
  }
}

const navDiv = {
  display: "flex",
  // backgroundColor: "red",
  width: "50%",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const createLink = {
  fontSize: 23,
};
