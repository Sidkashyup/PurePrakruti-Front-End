import React, { useState } from 'react';

const cardData = [
	{
		title: 'Carbon Footprint Tracker',
		description:
			'Calculate your daily emissions from transportation, energy use, and lifestyle habits with real-time estimates.',
		moreInfo:
			"Use our tracker daily to monitor how commuting, appliances, and diet contribute to your carbon footprint. It's based on global emissions factors.",
		icon: 'star',
	},
	{
		title: 'Smart Energy Tips',
		description:
			'Get personalized recommendations to reduce home energy usage and transition to greener, cost-saving alternatives.',
		moreInfo:
			'We analyze your energy patterns to suggest LED lighting, smart thermostats, solar adoption, and efficient insulation strategies.',
		icon: 'catalyst',
	},
	{
		title: 'Sustainable Travel',
		description:
			'Explore eco-friendly transportation options, including biking, public transit, and carbon-offset flight strategies.',
		moreInfo:
			'Get route-based emissions data, track public transit use, and explore certified carbon offset providers for flights.',
		icon: 'catalyst',
	},
	{
		title: 'Green Product Finder',
		description:
			'Identify low-impact products and services based on lifecycle analysis, eco-labels, and ethical sourcing.',
		moreInfo:
			'Browse verified eco-friendly brands that prioritize biodegradable packaging, minimal emissions, and ethical labor practices.',
		icon: 'user',
	},
	{
		title: 'Eco Challenges',
		description:
			'Join community challenges like meatless Mondays or zero-waste weeks to build lasting low-carbon habits.',
		moreInfo:
			'Earn badges for consistency and track real-world impact in kg of CO₂ saved through small behavioral changes.',
		icon: 'star',
	},
	{
		title: 'Emission History Insights',
		description:
			'Track your carbon reduction progress over time with easy-to-read graphs, trends, and milestone achievements.',
		moreInfo:
			'Visualize emission trends weekly, monthly, or yearly. Celebrate milestones and stay motivated with progress charts.',
		icon: 'user',
	},
];

const Facts = () => {
	const [expandedIndexes, setExpandedIndexes] = useState([]);

	const toggleMoreInfo = (index) => {
		setExpandedIndexes((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};
	return (
		<div>
			<section className="text-gray-600 body-font relative">
				<img
					className="absolute top-0 left-0 w-full h-full object-cover z-0"
					src="/bglogin3.jpg"
					alt="Background image"
				/>
				<div className="container px-5 py-24 mx-auto relative ">
					<h1 className="sm:text-4xl text-3xl font-medium title-font text-center text-gray-100 mb-4 my-8">
						Take Control of Your Carbon Footprint
					</h1>
					<h2 className="hidden sm:block sm:text-3xl text-2xl text-center text-green-50 mb-10">
						Track, understand, and reduce your environmental impact with smart
						tools and insights.
					</h2>

					<div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-6 md:space-y-4 space-y-6 ">
						{/* Repeatable card */}
						{cardData.map((card, index) => (
							<div className="p-4 md:w-1/3 flex" key={index}>
								<div className="h-full flex bg-gradient-to-r from-green-900/70 to-green-950/50 backdrop-blur-md border-gray-200 border p-4 rounded-lg">
									<div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-green-100 text-green-800 mb-4 flex-shrink-0">
										{/* Dynamic SVG icon based on card.icon */}
										{card.icon === 'star' && (
											<svg
												fill="none"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												className="w-6 h-6"
												viewBox="0 0 24 24"
											>
												<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
											</svg>
										)}
										{card.icon === 'catalyst' && (
											<svg
												fill="none"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												className="w-6 h-6"
												viewBox="0 0 24 24"
											>
												<circle cx="6" cy="6" r="3" />
												<circle cx="6" cy="18" r="3" />
												<path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
											</svg>
										)}
										{card.icon === 'user' && (
											<svg
												fill="none"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												className="w-6 h-6"
												viewBox="0 0 24 24"
											>
												<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
												<circle cx="12" cy="7" r="4" />
											</svg>
										)}
									</div>
									<div className="flex-grow pl-6 ">
										<h2 className="text-gray-100 text-xl title-font font-medium mb-2">
											{card.title}
										</h2>
										<p className="leading-relaxed text-lg text-green-50">
											{card.description}
										</p>
										<a
											onClick={() => toggleMoreInfo(index)}
											className="mt-3 text-green-300 inline-flex items-center cursor-pointer"
										>
											{expandedIndexes.includes(index)
												? 'Show Less'
												: 'Learn More'}
											<svg
												fill="none"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												className="w-4 h-4 ml-2"
												viewBox="0 0 24 24"
											>
												<path d="M5 12h14M12 5l7 7-7 7" />
											</svg>
										</a>

										{/* Expanded section */}
										{expandedIndexes.includes(index) && (
											<p className="text-lg text-gray-200 mt-3">
												{card.moreInfo}
											</p>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Facts;
