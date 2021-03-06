import React from 'react';
import { useStore } from '../context';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

export default observer(function Header() {
	const { auth } = useStore();

	return (
		<header>
			<h1 className="title"><Link to="/">frogger</Link></h1>
			<nav className="right">
				{auth.isLoggedIn ?
					<span className="userLinks">
						<Link to={"/u/" + auth.loggedInUser.username}>{auth.loggedInUser.username}</Link> | 
						<a onClick={(e) => {
							e.preventDefault();
							auth.doLogout()
						}} href="#">Logout</a>
					</span>
					: <span className="userLinks">
						<Link to="/login">Login</Link> |
						<Link to="/register">Register</Link>
					</span>}
			</nav>
		</header>
	);
});