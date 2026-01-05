import React, { useState, useEffect, useRef } from 'react';
import { useInView } from '../../useInView'; // adjust path if needed

const StatsSection = () => {
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { threshold: 0.3 });

	const stats = [
		{
			value: 27,
			label: 'Global Emissions',
			suffix: '%',
			description: 'from road logistics',
		},
		{
			value: 30,
			label: 'Carbon Reduction',
			suffix: '%',
			description: 'achieved by our clients',
		},
		{
			value: 1000,
			label: 'Tons of CO₂',
			suffix: '+',
			description: 'saved annually',
		},
		{
			value: 150,
			label: 'Business Partners',
			suffix: '+',
			description: 'worldwide',
		},
	];

	return (
		<section
			ref={sectionRef}
			className="py-20 bg-green-800 text-white relative overflow-hidden"
		>
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-10">
				<div
					className="absolute inset-0 bg-repeat"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					}}
				></div>
			</div>

			<div className="container mx-auto relative z-10">
				<div className="text-center mb-16 w-4/5 mx-auto">
					<h2 className="text-4xl md:text-5xl font-bold mb-4">
						<span className='text-green-300'>Our </span>
						<span>Environmental Impact</span>
					</h2>
					<p className="text-green-200 text-lg md:text-2xl w-full mx-auto">
						We're committed to making a real difference in reducing carbon
						emissions. Here's how we're measuring our impact on the environment.
					</p>
				</div>

				<div className="w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{stats.map((stat, index) => (
						<StatCard
							key={index}
							stat={stat}
							isVisible={isInView}
							delay={index * 100}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

const StatCard = ({ stat, isVisible, delay }) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		let interval;

		if (isVisible) {
			const duration = 2000; // 2 seconds
			const totalSteps = 50;
			const stepValue = stat.value / totalSteps;
			let currentStep = 0;

			interval = setInterval(() => {
				currentStep += 1;
				if (currentStep <= totalSteps) {
					setCount(Math.floor(stepValue * currentStep));
				} else {
					setCount(stat.value);
					clearInterval(interval);
				}
			}, duration / totalSteps);
		} else {
			setCount(0);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isVisible, stat.value]);

	return (
		<div
			className={`bg-white/10 backdrop-blur-md shadow-white/30 shadow-lg rounded-lg p-8 text-center transform transition-all duration-300 ease-out hover:cursor-pointer hover:bg-white/10 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-2`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			<div className="flex flex-col items-center">
				<div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-end">
					<span>{count}</span>
					<span className="text-white">{stat.suffix}</span>
				</div>
				<div className="text-xl font-medium text-green-300">{stat.label}</div>
				<p className="text-green-100 text-lg">{stat.description}</p>
			</div>
		</div>
	);
};

export default StatsSection;
