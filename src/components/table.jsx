import React from 'react';
import Like from './like';

class Table extends React.Component {
	render() {
		return (
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

				{this.props.movies.map((movie) => {
					return (
						<tbody key={movie._id}>
							<tr>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<Like />
								</td>
								<td>
									<button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">
										Delete
									</button>
								</td>
							</tr>
						</tbody>
					);
				})}
			</table>
		);
	}
}

export default Table;
