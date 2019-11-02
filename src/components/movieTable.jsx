import React from 'react';
import Like from './like';

const MovieTable = (props) => {
	const { movies, onLike, onDelete, onSort, renderSortIcon } = props;
	const columns = [
		{ path: 'title', label: 'Title' },
		{ path: 'genre.name', label: 'Genre' },
		{ path: 'numberInStock', label: 'Stock' },
		{ path: 'dailyRentalRate', label: 'Rate' },
		{ key: 'like' },
		{ key: 'delete' }
	];

	return (
		<table className="table">
			<thead>
				<tr>
					{columns.map((column) => (
						<th scope="col" key={column.path || column.key} onClick={() => onSort(column.path)}>
							{column.label} {renderSortIcon(column)}
						</th>
					))}
				</tr>
			</thead>

			{movies.map((movie) => {
				return (
					<tbody key={movie._id}>
						<tr>
							<td>{movie.title}</td>
							<td>{movie.genre.name}</td>
							<td>{movie.numberInStock}</td>
							<td>{movie.dailyRentalRate}</td>
							<td>
								<Like liked={movie.liked} handleLike={() => onLike(movie)} />
							</td>
							<td>
								<button onClick={() => onDelete(movie)} className="btn btn-danger btn-sm">
									Delete
								</button>
							</td>
						</tr>
					</tbody>
				);
			})}
		</table>
	);
};

export default MovieTable;
