import Cookies from "js-cookie";
import React from 'react'
import { NavLink } from "../components/Navbar/NavbarElements";

const Logout = ({props}: any) => {
	const handleLogout = () => {
		Cookies.remove('Token', { path: '/' });
		props(() => false);
	}

	return <NavLink to='/' onClick={handleLogout}>Logout</NavLink>;
}

export default Logout;