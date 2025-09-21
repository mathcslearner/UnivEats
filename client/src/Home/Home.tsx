import React from 'react';
import './Home.css';
import Navbar from './Navbar';
import Intro from './Intro';
import Descriptions from './Descriptions';
import Reviews from './Reviews';
import Features from './Features'
import Footer from './Footer';

const Home: React.FC = () => {
  const sampleReviews = [
    {
      id: 1,
      name: 'Alice Johnson',
      title: '3rd Year Arts',
      content: "I discovered so many new flavors I wouldn't find in the cafeteria. It's fun and super convenient!",
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      name: 'Bob Smith',
      title: '1st Year Engineering',
      content: 'The app makes it so easy to order meals on campus. The food is delicious, and I love supporting fellow students.',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 3,
      name: 'Carol Lee',
      title: '2nd Year Computer Science',
      content: "I love being able to share my cooking and actually make some money while at uni. Plus, it's so rewarding to see classmates enjoy my food!",
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: 4,
      name: 'Joe Wang',
      title: '2nd Year Business',
      content: "Listing my meals was super easy, and the feedback helps me improve my recipes. DormDish really brings the campus together.",
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    {
      id: 5,
      name: 'Zoe Williams',
      title: '4th Year Science',
      content: "UniEats is a lifesaver! I love trying homemade meals from other students. It feels like getting a home-cooked dinner away from home.",
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    {
      id: 6,
      name: 'William Brown',
      title: '3rd Year Engineering',
      content: "I never thought my dorm cooking could become so popular! The app makes managing orders simple and fun.",
      avatar: 'https://i.pravatar.cc/150?img=6',
    }
  ];

  return (
<body className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
    <Navbar />
    <Intro />
    <Descriptions />
    <Reviews reviews={sampleReviews}/>
    <Features />
    <Footer />
</body>
  );
};

export default Home;

