const Intro = () => {
    return(
        <div id="intro-container" className="max-w-3xl p-8 bg-white rounded-2xl shadow-lg text-center space-y-6 transition-transform transform hover:scale-105 duration-300 w-full mt-8 mx-auto mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            UniEats: The Marketplace for Homemade Dishes
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-700 font-medium">
            From one student's kitchen to another student's plate, because dining halls don't have everything.
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            We believe great food brings people together. 
            Our platform connects university students who love to cook with fellow students looking for affordable, homemade meals. 
            Instead of relying only on dining halls or expensive takeout, students can enjoy fresh, authentic dishes made by their peers right on campus. 
            This not only makes eating more personal and budget-friendly, but also builds a stronger sense of community where students share culture, creativity, and comfort through food. 
            By empowering student cooks to earn a little extra while helping classmates eat better, we’re creating a win-win solution that turns every dorm, kitchen, and apartment into part of a shared campus marketplace.
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full shadow-md hover:from-green-500 hover:to-blue-600 transition-colors duration-300">
            SIGN UP NOW!
        </button>
    </div>
    )
}

export default Intro