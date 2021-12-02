import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import styled from 'styled-components';
import {IoMdArrowRoundForward} from 'react-icons/io';
import Axios from 'axios';
import one from "../images/maps/PowellCatLocation-1.jpg";
import two from "../images/maps/PowellCatLocation-2.jpg";
import three from "../images/maps/PowellCatLocation-03.jpg";
import four from "../images/maps/PowellCatLocation-04.jpg";
import five from "../images/maps/PowellCatLocation-05.jpg";
import six from "../images/maps/PowellCatLocation-06.jpg";
import seven from "../images/maps/PowellCatLocation-07.jpg";
import eight from "../images/maps/PowellCatLocation-08.jpg";
import nine from "../images/maps/PowellCatLocation-09.jpg";
import ten from "../images/maps/PowellCatLocation-10.jpg";
import eleven from "../images/maps/PowellCatLocation-11.jpg";
import twelve from "../images/maps/PowellCatLocation-12.jpg";
import thirteen from "../images/maps/PowellCatLocation-13.jpg";
import fourteen from "../images/maps/PowellCatLocation-14.jpg";
import fifteen from "../images/maps/PowellCatLocation-15.jpg";
import sixteen from "../images/maps/PowellCatLocation-16.jpg";
import seventeen from "../images/maps/PowellCatLocation-17.jpg";
import eighteen from "../images/maps/PowellCatLocation-18.jpg";

const MapData = [
    {
        location: "Kaufman Hall",
        image: one,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'22.8%22N+118%C2%B026'40.3%22W/@34.073003,-118.4467127,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.073003!4d-118.444524"
    },
    {
        location: "Kaufman Hall",
        image: two,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'22.8%22N+118%C2%B026'37.0%22W/@34.072992,-118.4458027,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.072992!4d-118.443614",
    },
    {
        location: "Kaufman Hall",
        image: three,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'21.1%22N+118%C2%B026'40.4%22W/@34.072533,-118.4467297,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.072533!4d-118.444541",
    },
    {
        location: "Kaufman Hall",
        image: four,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'21.0%22N+118%C2%B026'37.1%22W/@34.072493,-118.4458147,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.072493!4d-118.443626",
    },
    {
        location: "Wallis Annenburg",
        image: five,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'19.9%22N+118%C2%B026'41.2%22W/@34.072182,-118.4469607,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.072182!4d-118.444772",
    },
    {
        location: "Wilson Plaza",
        image: six,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'19.9%22N+118%C2%B026'38.8%22W/@34.072202,-118.4462957,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.072202!4d-118.444107",
    },
    {
        location: "Student Activities Center",
        image: seven,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'18.2%22N+118%C2%B026'40.3%22W/@34.071724,-118.4467247,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.071724!4d-118.444536",
    },
    {
        location: "Student Activities Center",
        image: eight,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'17.9%22N+118%C2%B026'37.1%22W/@34.071633,-118.4458347,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.071633!4d-118.443646",
    },
    {
        location: "Janss Steps",
        image: nine,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'20.0%22N+118%C2%B026'34.9%22W/@34.072211,-118.4452097,530m/data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d34.072211!4d-118.443021",
    },
    {
        location: "Janss Steps",
        image: ten,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'17.8%22N+118%C2%B026'35.7%22W/@34.071611,-118.4443443,265m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d34.0716111!4d-118.4432499",
    },
    {
        location: "Royce Hall",
        image: eleven,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'23.7%22N+118%C2%B026'32.9%22W/@34.073249,-118.4430262,132m/data=!3m2!1e3!4b1!4m14!1m7!3m6!1s0x0:0x0!2zMzTCsDA0JzIwLjAiTiAxMTjCsDI2JzM0LjkiVw!3b1!8m2!3d34.072211!4d-118.443021!3m5!1s0x0:0x0!7e2!8m2!3d34.0732494!4d-118.4424789",
    },
    {
        location: "Royce Hall",
        image: twelve,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'23.9%22N+118%C2%B026'29.9%22W/@34.073318,-118.4421972,132m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d34.0733179!4d-118.4416502",
    },
    {
        location: "Royce Hall",
        image: thirteen,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'21.5%22N+118%C2%B026'33.9%22W/@34.072631,-118.4432942,132m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d34.0726315!4d-118.442747",
    },
    {
        location: "Royce Hall",
        image: fourteen,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'21.2%22N+118%C2%B026'30.0%22W/@34.072542,-118.4422002,132m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d34.0725421!4d-118.4416527",
    },
    {
        location: "Powell Library",
        image: fifteen,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'18.9%22N+118%C2%B026'33.3%22W/@34.071915,-118.4431392,132m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d34.0719155!4d-118.4425918",
    },
    {
        location: "Powell Library",
        image: sixteen,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'18.9%22N+118%C2%B026'29.9%22W/@34.071906,-118.4421812,132m/data=!3m2!1e3!4b1!4m15!1m8!3m7!1s0x0:0x0!2zMzTCsDA0JzE4LjkiTiAxMTjCsDI2JzMzLjMiVw!3b1!7e2!8m2!3d34.0719155!4d-118.4425918!3m5!1s0x0:0x0!7e2!8m2!3d34.0719056!4d-118.4416338",
    },
    {
        location: "Powell Library",
        image: seventeen,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'15.8%22N+118%C2%B026'33.4%22W/@34.071048,-118.4431572,132m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d34.0710476!4d-118.4426103",
    },
    {
        location: "Powell Library",
        image: eighteen,
        mapsUrl: "https://www.google.com/maps/place/34%C2%B004'16.4%22N+118%C2%B026'30.4%22W/@34.071208,-118.4423262,132m/data=!3m2!1e3!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d34.071208!4d-118.4417785",
    },
];

const HomeSection = styled.section`
    height: 100vh;
    max-height: 1100px;
    position: relative;
    overflow: hidden;
`;

const HomeWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;

`;

const HomeSlide = styled.div`
    z-index: 1;
    width: 100%;
    height: 100%;
`;

const HomeSlider = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        content: '';
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100vh;
        left: 0;
        bottom: 0vh;
        overflow: hidden;
        opacity: 0.4;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.6) 100%)
    }
`;

const HomeImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
`;

const HomeContent = styled.div`
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    max-width: 1600px;
    width: calc(100% - 100px);
    color: #fff;

    h1 {
        font-size: clamp(1rem, 8vw, 3rem); 
        font-weight: 400;
        text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
        text-align: left;
        margin-bottom: 0.8rem;
    }

    p {
        display: flex;
        @media screen and (max-width: 768px) {
            display: block;
        }
    }
`;

const Arrow = styled(IoMdArrowRoundForward)``;

const Home = () => {
    const [image, setImage]= useState(1);
  
    useEffect(() => {
    Axios.get("https://bruin-pawprint.herokuapp.com/building").then((response) => {
        setImage(response.data.number);
        console.log(image);
    });
    }, []);

    return (
        <HomeSection>
            <HomeWrapper>
                <HomeSlide>
                    <HomeSlider>
                        <HomeImage src={MapData[image - 1].image} />
                        <HomeContent>
                            <h1>Powell Cat was last seen at {MapData[image - 1].location}</h1>
                            <p>
                            <Button
                                href ={MapData[image - 1].mapsUrl}
                                target="_blank"
                                primary='true'
                            >
                                Take me there
                                <Arrow />
                            </Button>
                            <Button
                                href ="/update"
                                primary='true'
                            >
                                Update location
                            </Button>
                            </p>
                        </HomeContent>
                    </HomeSlider>
                </HomeSlide>
            </HomeWrapper> 
        </HomeSection>
    );
};

export default Home;
