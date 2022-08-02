import React from "react";
import { connect } from "react-redux";
import { getRecipesByName } from "../../redux/actions";

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      emptySearch: false,
    };
  }

  onChangeHandler = (e) => {
    this.setState((state) => {
      return { inputText: e.target.value };
    });
  };

  onSearchHandler = (e) => {
    // console.log(this.state.inputText);
    e.preventDefault();
    // console.log
    if (this.state.inputText === "") {
      this.setState((state) => {
        return { emptySearch: true };
      });
    } else {
      this.setState((state) => {
        return { emptySearch: false };
      });
      this.props.getRecipesByName(this.state.inputText);
    }
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <label htmlFor="searchbar">{this.state.emptySearch && "Try searching your favourite food!"}</label>
        <form onSubmit={this.onSearchHandler}>
          <input name="searchbar" type="search" placeholder="Search..." onChange={this.onChangeHandler} />
          <button type="submit">🔎</button>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getRecipesByName: (search) => dispatch(getRecipesByName(search)),
  };
}

export default connect(null, mapDispatchToProps)(SearchBar);
