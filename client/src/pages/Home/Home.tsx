import React from 'react';
import "./Home.scss";
import Landing from "./HomeComponents/Landing";
import Features from "./HomeComponents/Features";
import FAQs from './HomeComponents/FAQs/FAQs';
import Footer from './HomeComponents/Footer';

interface HomeProps {

}

const Home: React.FC<HomeProps> = (/*{}*/) => {
    return (
        <>
            <Landing />
            <Features />
            <FAQs />
            <Footer />
        </>
    );
}

export default Home;