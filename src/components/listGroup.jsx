import React from 'react';

const ListGroup = (props) => {
	const { items, onItemSelect, selectedItem } = props;

	return (
		<ul className="list-group">
			{items.map((item) => {
				return (
					<li
						onClick={() => onItemSelect(item)}
						className={item === selectedItem ? 'list-group-item active' : 'list-group-item'}
						key={item._id}
					>
						{item.name}
					</li>
				);
			})}
		</ul>
	);
};

export default ListGroup;
