import React from 'react';
import './App.css';
import { getMovies } from './services/fakeMovieService';
import Like from './components/like';

class App extends React.Component {
	state = {
		movies: getMovies()
	};

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleLike = (movie) => {
		const movies = [ ...this.state.movies ];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	render() {
		const { length: count } = this.state.movies;

		if (count === 0) return <p className="p-4">There are no movies in the database</p>;

		return (
			<main className="container py-4">
				<p>{count === 1 ? `Showing 1 movie in the database` : `Showing ${count} movies in the database`}</p>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Title</th>
							<th scope="col">Genre</th>
							<th scope="col">Stock</th>
							<th scope="col">Rate</th>
							<th scope="col" />
							<th scope="col" />
						</tr>
					</thead>

					{this.state.movies.map((movie) => {
						return (
							<tbody key={movie._id}>
								<tr>
									<td>{movie.title}</td>
									<td>{movie.genre.name}</td>
									<td>{movie.numberInStock}</td>
									<td>{movie.dailyRentalRate}</td>
									<td>
										<Like liked={movie.liked} handleLike={() => this.handleLike(movie)} />
									</td>
									<td>
										<button
											onClick={() => this.handleDelete(movie)}
											className="btn btn-danger btn-sm"
										>
											Delete
										</button>
									</td>
								</tr>
							</tbody>
						);
					})}
				</table>
			</main>
		);
	}
}

export default App;
