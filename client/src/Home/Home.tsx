import React from 'react';
import './Home.css';
import Navbar from './Navbar';
import Intro from './Intro';
import Descriptions from './Descriptions';
import Reviews from './Reviews';

const Home: React.FC = () => {
  return (
<body className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
    <Navbar />
    <Intro />
    <Descriptions />
    <Reviews />
</body>
  );
};

export default Home;

