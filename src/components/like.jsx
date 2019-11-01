import React from 'react';

class Like extends React.Component {
	render() {
		let icon = !this.props.liked ? 'fa fa-heart-o' : 'fa fa-heart';
		return <i onClick={this.props.handleLike} className={icon} style={{ cursor: 'pointer' }} />;
	}
}

export default Like;
