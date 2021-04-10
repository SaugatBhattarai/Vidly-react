import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveMovie } from "../services/fakeMovieService";

class NewMovies extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", rate: "" },
    errors: {},
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),

    genre: Joi.string()
      .required()
      .label("Genre"),

    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),

    rate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Rate"),
  };

  doSubmit = () => {
    //Call the Server
    const { history } = this.props;
    saveMovie(this.state.data)
    history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("genre", "Genre")}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}
export default NewMovies;
