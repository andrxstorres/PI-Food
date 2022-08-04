import React from "react";
import SearchBar from "../SearchBar";
import { Link } from "react-router-dom";

export class HomeNavBar extends React.Component {
  render() {
    return (
      <div>
        <Link to="/create">Create your own recipe.</Link>
        <SearchBar />
      </div>
    );
  }
}
