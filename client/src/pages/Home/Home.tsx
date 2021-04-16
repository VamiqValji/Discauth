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
            <div className="appContainer" style={{
                marginTop: "0rem"
            }}>
                <Features />
                <FAQs />
            </div>
            <Footer />
        </>
    );
}

export default Home;