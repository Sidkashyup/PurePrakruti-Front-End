import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { IoReorderThreeOutline } from 'react-icons/io5';
import pure from '../resource/pureprakrti.png';
import { AuthContext } from '../AuthContext';

export const Navbar = () => {
	const authContext = useContext(AuthContext);
	const user = authContext?.user;
	const userName = user?.userName;
	const baseUsername = user?.baseUsername;
	const logout = authContext?.logout;
	const navigate = useNavigate();
	const location = useLocation();
	const currentPath = location.pathname;

	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isModalOpen, setModalOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const toggleModal = () => setModalOpen(!isModalOpen);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 0);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ease-in-out 
      ${scrolled ? 'bg-green-950 text-white ' : 'bg-transparent text-white '}`}
		>
			<div className="flex items-center justify-between max-w-[1240px] mx-auto px-4 py-3">
				{/* Logo */}
				<Link to="/" className="flex items-center space-x-6">
					<img src={pure} alt="Pure Prakrti" className="h-12 lg:h-16 w-auto" />
					<span className="text-3xl font-bold text-white">Pure Prakruti</span>
				</Link>

				{/* Centered Nav Links */}
				<div
					className={`hidden md:flex flex-1 justify-center items-center space-x-8 text-xl font-semibold transition 
          ${scrolled ? 'text-white' : 'text-white'}`}
				>
					<Link
						to="/"
						className={`hover:text-green-500 transition ${
							currentPath === '/'
								? 'text-green-500 underline underline-offset-8'
								: ''
						}`}
					>
						Home
					</Link>
					<Link
						to="/carbonfootprint"
						className={`hover:text-green-500 transition ${
							currentPath === '/carbonfootprint'
								? 'text-green-500 underline underline-offset-8'
								: ''
						}`}
					>
						Carbon Footprints
					</Link>

					{user && (
						<Link
							to="/UserDashBoard"
							className={`hover:text-green-500 transition ${
								currentPath === '/UserDashBoard'
									? 'text-green-500 underline underline-offset-8'
									: ''
							}`}
						>
							Dashboard
						</Link>
					)}

					<Link
						to="/contactUs"
						className={`px-6 py-3 rounded-full text-xl font-semibold transition 
    ${
			currentPath === '/contactUs'
				? 'bg-green-600 text-white '
				: 'bg-green-600 text-white hover:bg-green-700'
		}`}
					>
						Contact Us
					</Link>
				</div>

				{/* Right Side: Login/User */}
				<div
					className={`hidden md:flex items-center gap-4 ${
						scrolled ? 'text-gray-800' : 'text-gray-800'
					}`}
				>
					{user ? (
						<div className="cursor-pointer" onClick={toggleModal}>
							<img
								src="https://www.w3schools.com/w3images/avatar2.png"
								alt="User"
								className="h-16 w-16 rounded-full"
							/>
						</div>
					) : (
						<>
							<button
								className={`px-5 py-2 rounded-lg border font-semibold transition 
                  ${
										scrolled
											? 'bg-green-600 text-white border-green-600 hover:bg-green-700'
											: 'bg-white text-green-600 border-green-600 hover:bg-gray-100'
									}`}
								onClick={() => navigate('/login')}
							>
								Log In
							</button>
							<button
								className={`px-5 py-2 rounded-lg border font-semibold transition
                  ${
										scrolled
											? 'bg-white text-green-600 border-green-600 hover:bg-gray-100'
											: 'bg-green-600 text-white border-green-600 hover:bg-green-700'
									}`}
								onClick={() => navigate('/signup')}
							>
								Sign Up
							</button>
						</>
					)}
				</div>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden text-inherit"
					onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
				>
					<IoReorderThreeOutline size={48} />
				</button>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className="md:hidden bg-green-950 backdrop-blur-lg text-white flex flex-col items-center py-4 space-y-4">
					<Link to="/" onClick={() => setMobileMenuOpen(false)}>
						Home
					</Link>
					<Link to="/carbonfootprint" onClick={() => setMobileMenuOpen(false)}>
						Carbon Footprints
					</Link>
					{user && (
						<Link to="/UserDashBoard" onClick={() => setMobileMenuOpen(false)}>
							Dashboard
						</Link>
					)}
					<Link to="/contactUs" onClick={() => setMobileMenuOpen(false)}>
						Contact Us
					</Link>
					{user ? (
						<div className="cursor-pointer" onClick={toggleModal}>
							<img
								src="https://www.w3schools.com/w3images/avatar2.png"
								alt="User"
								className="h-10 w-10 rounded-full"
							/>
						</div>
					) : (
						<>
							<button
								className="bg-white text-green-600 py-2 font-semibold rounded-lg w-5/6"
								onClick={() => {
									navigate('/login');
									setMobileMenuOpen(false);
								}}
							>
								Log In
							</button>
							<button
								className="bg-green-600 text-white py-2 font-semibold rounded-lg w-5/6"
								onClick={() => {
									navigate('/signup');
									setMobileMenuOpen(false);
								}}
							>
								Sign Up
							</button>
						</>
					)}
				</div>
			)}

			{/* Modal */}
			{isModalOpen && (
				<div className="absolute top-20 right-8 bg-white p-6 rounded-lg shadow-lg w-72 z-50 text-gray-800">
					<div className="flex items-center gap-4">
						<img
							src="https://www.w3schools.com/w3images/avatar2.png"
							alt="User"
							className="h-16 w-16 rounded-full"
						/>
						<div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
							<h3 className="text-xl font-semibold">
								{userName || baseUsername}
							</h3>
						</div>
					</div>
					<div className="mt-4 flex justify-between gap-2">
						<button
							className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-full"
							onClick={() => {
								logout();
								toggleModal();
							}}
						>
							Logout
						</button>
						<button
							className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 w-full"
							onClick={toggleModal}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
