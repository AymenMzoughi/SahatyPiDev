import React from 'react';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ButtonGroup, Image } from 'react-bootstrap';
import logo from '../assets/logo.png';
import AccountCollapse from './AccountCollapse';
import { MainButton } from './StyledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // change the imported icon
import { useNavigate, useLocation, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavBar() {
	const [pages, setPages] = useState([]);
	const isConnected = useSelector((state) => state.auth.isLoggedIn);
	const role = useSelector((state) => state.auth.role);
	const user = JSON.parse(localStorage.getItem('user'));
	const userId = user ? user._id : null;
	const navigate = useNavigate();
	const activeRoute = useLocation();

	// Logic for setting the pages array
	let newPages = [
		{ name: 'Home', path: '/home' },
		{ name: 'Doctors', path: '/doctors' },
		{ name: 'Services', path: '/services' },
		{ name: 'Appointment', path: '/appointment' },
	];
	if (isConnected) {
		if (role === 'Patient') {
			newPages = [
				...newPages,
				{ name: 'Medical Record', path: `/medicalRecordPatient/${userId}` },
			];
		} else if (role === 'Docteur') {
			newPages = [
				...newPages,
				{ name: 'Medical RecordD', path: `/medicalRecordDocteur/${userId}` },
				{ name: 'List Patient', path: `/patientlist/${userId}` },
			];
		} else if (role === 'Pharmacist') {
			newPages = [...newPages, { name: 'Pharmacy', path: `/pharmacy` }];
		}
	} else {
		newPages = [
			...newPages,
			{ name: 'Contact', path: '/contact' },
			{ name: 'Pharmacy', path: `/pharmacy` },
		];
	}

	useEffect(() => {
		setPages(newPages);
	}, [isConnected, role, userId]);

	return (
		<Navbar bg='light' expand='lg'>
			<Container>
				<Navbar.Brand href='#'>
					<Image height='64' src={logo} alt='' />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='navbarScroll' />
				<Navbar.Collapse id='navbarScroll'>
					<Nav
						className='me-auto my-2 my-lg-0'
						style={{ maxHeight: '100px' }}
						navbarScroll
					>
						{pages.map((page) => (
							<Nav.Link
								active={activeRoute.pathname === page.path} // fix the condition for active route
								key={page.path} // use path instead of page for the key
								href={page.path} // use path instead of page for the href
							>
								{page.name}
							</Nav.Link>
						))}
					</Nav>
					<Form className='d-flex'>
						<Form.Control
							type='search'
							placeholder='Room d'
							className='me-2'
							aria-label='Search'
						/>
						<MainButton href='/room/'>Join meet</MainButton>
						{!isConnected ? (
							<ButtonGroup>
								<MainButton
									onClick={() => {
										navigate('/register');
									}}
									style={{ backgroundColor: 'darkblue' }}
								>
									Register
								</MainButton>
								<MainButton
									onClick={() => {
										navigate('/login');
									}}
								>
									Login
								</MainButton>
							</ButtonGroup>
						) : (
							<AccountCollapse />
						)}
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;
