import React from 'react';
import './App.css';
import { getMovies } from './services/fakeMovieService';
import { getGenres } from './services/fakeGenreService';

import Pagination from './components/pagination';
import { paginate } from './utils/paginate';
import ListGroup from './components/listGroup';
import MovieTable from './components/movieTable';
import _ from 'lodash';

class App extends React.Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		selectedGenre: '',
		sortColumn: { path: 'title', order: 'asc' }
	};

	componentDidMount() {
		const genres = [ { _id: 0, name: 'All Genres' }, ...getGenres() ];
		this.setState({ movies: getMovies(), genres });
	}
	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLike = (movie) => {
		const movies = [ ...this.state.movies ];
		const index = movies.indexOf(movie);
		movies[index] = { ...movie };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	handleSort = (path) => {
		const sortColumn = { ...this.state.sortColumn };
		if (sortColumn.path === path) sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
		else {
			sortColumn.path = path;
			sortColumn.order = 'asc';
		}
		this.setState({ sortColumn });
	};

	renderSortIcon = (column) => {
		const sortColumn = { ...this.state.sortColumn };
		if (column.path !== sortColumn.path) return null;
		if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc" />;
		return <i className="fa fa-sort-desc" />;
	};

	render() {
		const { length: count } = this.state.movies;
		const { currentPage, pageSize, selectedGenre, movies: allMovies, sortColumn } = this.state;

		const filtered =
			selectedGenre && selectedGenre._id ? allMovies.filter((m) => m.genre._id === selectedGenre._id) : allMovies;

		const sorted = _.orderBy(filtered, [ sortColumn.path ], [ sortColumn.order ]);

		const movies = paginate(sorted, currentPage, pageSize);

		if (count === 0) return <p className="p-4">There are no movies in the database</p>;

		return (
			<div className="row p-4">
				<aside className="col-3">
					<ListGroup
						items={this.state.genres}
						selectedItem={this.state.selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</aside>
				<main className="col">
					<p>
						{count === 1 ? (
							`Showing 1 movie in the database`
						) : (
							`Showing ${filtered.length} movies in the database`
						)}
					</p>
					<MovieTable
						movies={movies}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
						renderSortIcon={this.renderSortIcon}
					/>
					<Pagination
						itemsCount={filtered.length}
						pageSize={pageSize}
						onPageChange={this.handlePageChange}
						currentPage={currentPage}
					/>
				</main>
			</div>
		);
	}
}

export default App;
