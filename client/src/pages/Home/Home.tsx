import React from 'react';
import "./Home.scss";
import Landing from "./HomeComponents/Landing";
import Features from "./HomeComponents/Features";

interface HomeProps {

}

const Home: React.FC<HomeProps> = (/*{}*/) => {
    return (
        <>
            <Landing />
            <Features />
        </>
    );
}

export default Home;