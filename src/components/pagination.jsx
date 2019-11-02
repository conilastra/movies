import React from 'react';
import _ from 'lodash';

const Pagination = (props) => {
	const { itemsCount, pageSize, onPageChange, currentPage } = props;

	const pagesCount = Math.ceil(itemsCount / pageSize);
	const pages = _.range(1, pagesCount + 1);

	if (pagesCount === 1) return null;

	return (
		<nav>
			<ul className="pagination">
				{pages.map((page) => (
					<li className={page === currentPage ? 'page-item active' : 'page-item'} key={page}>
						<a onClick={() => onPageChange(page)} className="page-link">
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
