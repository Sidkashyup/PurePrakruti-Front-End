// src/pages/OurTeam.jsx

import React from 'react';

const OurTeam = () => {
  return (
    <section className="text-gray-600 body-font relative" id="team">
    <img className="absolute top-0 left-0 w-full h-full object-cover z-0" src="/bglogin3.jpg" alt="Background image ;"  />

      <div className="container px-5 py-24 mx-auto relative">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-5xl font-medium title-font mb-4 mt-4 text-white">Our Team</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-xl text-green-50">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.
            Franzen you probably haven't heard of them.
          </p>
        </div>
        <div className="flex flex-wrap -m-2">
          {/* Team member cards */}
          {[
            { name: 'Holden Caulfield', role: 'UI Designer', img: 'https://dummyimage.com/80x80' },
            { name: 'Henry Letham', role: 'CTO', img: 'https://dummyimage.com/84x84' },
            { name: 'Oskar Blinde', role: 'Founder', img: 'https://dummyimage.com/88x88' },
            { name: 'John Doe', role: 'DevOps', img: 'https://dummyimage.com/90x90' },
            { name: 'Martin Eden', role: 'Software Engineer', img: 'https://dummyimage.com/94x94' },
            { name: 'Boris Kitua', role: 'UX Researcher', img: 'https://dummyimage.com/98x98' },
            { name: 'Atticus Finch', role: 'QA Engineer', img: 'https://dummyimage.com/100x90' },
            { name: 'Alper Kamu', role: 'System', img: 'https://dummyimage.com/104x94' },
            { name: 'Rodrigo Monchi', role: 'Product Manager', img: 'https://dummyimage.com/108x98' }
          ].map((member, index) => (
            <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center bg-gradient-to-r from-green-900/70 to-green-950/50 backdrop-blur-md border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={member.img}
                />
                <div className="flex-grow">
                  <h2 className="text-white title-font font-medium text-lg">{member.name}</h2>
                  <p className="text-gray-200">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
