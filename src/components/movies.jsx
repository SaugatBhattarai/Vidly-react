import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import paginate from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getGenres } from "../services/genreService";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();

    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies: movies, genres: genres });
  }

  deleteHandler = async (movie) => {
    const originalMovies = this.state.movies;

    const movies = originalMovies.filter((m) => m._id !== movie._id); 
    this.setState({ movies: movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This Movie has already been deleted.");

        this.setState({ movies: originalMovies });
      }
    }
  };

  handleLike = (movie) => {
    // console.log('like clicked ',movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (path) => {
    this.setState({ sortColumn: path });
    // this.setState( { sortColumn: { path:path, order: 'asc'} });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery,
      movies: allMovies,
    } = this.state;

    // const filtered =
    //   selectedGenre && selectedGenre._id
    //     ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
    //     : allMovies;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>Current there is no movies</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="container">
        <div className="row m-5">
          <div className="col-3">
            <ListGroup
              onItemSelect={this.handleGenreSelect}
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
            />
          </div>

          <div className="col-9">
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movies
            </Link>
            <p>Currently Showing {totalCount} Movies in the Database</p>

            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.deleteHandler}
              onSort={this.handleSort}
            />

            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
