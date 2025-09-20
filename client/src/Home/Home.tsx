import React from 'react';
import './Home.css';

const Home = () => {
    return(
        <div id="container">
            <h1 className="text-4xl">UniEats: The Marketplace for homemade dishes</h1>
            <h2 className="text-2xl">From one student's kitchen to another student's plate, because dining halls don't have everything.</h2>
            <p>
                We believe great food brings people together. 
                Our platform connects university students who love to cook with fellow students looking for affordable, homemade meals. 
                Instead of relying only on dining halls or expensive takeout, students can enjoy fresh, authentic dishes made by their peers—right on campus. 
                This not only makes eating more personal and budget-friendly, but also builds a stronger sense of community where students share culture, creativity, and comfort through food. 
                By empowering student cooks to earn a little extra while helping classmates eat better, we’re creating a win-win solution that turns every dorm, kitchen, and apartment into part of a shared campus marketplace.
            </p>
            <button>SIGN UP NOW!</button>
        </div>
    )
}

export default Home