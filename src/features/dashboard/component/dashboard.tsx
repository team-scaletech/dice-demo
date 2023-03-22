import { useState } from 'react';
import '../style/dashboard.scss';

const Dashboard = () => {
    const [dice, setDice] = useState('');
    const [transFormStyle, setTransFormStyle] = useState('');
    const [diceVal, setDiceVal] = useState(1);

    const handleDiceClick = () => {
        const random = Math.floor(Math.random() * 7);

        if (random >= 1 && random <= 6) {
            setDice('rolling 4s');
            setDiceVal(random);
            rollDice(random);
        } else {
            handleDiceClick();
        }
    };

    const rollDice = (random: number) => {
        let transFormStyle = '';
        setTimeout(() => {
            switch (random) {
                case 1:
                    transFormStyle = 'rotateX(0deg) rotateY(0deg)';
                    break;
                case 6:
                    transFormStyle = 'rotateX(180deg) rotateY(0deg)';
                    break;

                case 2:
                    transFormStyle = 'rotateX(-90deg) rotateY(0deg)';
                    break;

                case 5:
                    transFormStyle = 'rotateX(90deg) rotateY(0deg)';
                    break;

                case 3:
                    transFormStyle = 'rotateX(0deg) rotateY(90deg)';
                    break;

                case 4:
                    transFormStyle = 'rotateX(0deg) rotateY(-90deg)';
                    break;

                default:
                    break;
            }
            setDice('none');
            setTransFormStyle(transFormStyle);
        }, 4050);
    };

    return (
        <div className='main-container flex'>
            <div className='dashboard-wrapper width--full'>
                <div className='flex justify-content--between'>
                    <p className='text--center'>Welcome to Dice game,Smith</p>
                    <div className='flex'>
                        <button className='logout-btn flex justify-content--center align-items--center border-radius--lg '>
                            Logout
                        </button>
                    </div>
                </div>

                <div className='dice-main-container width-full flex '>
                    <div className='dice-container flex align-items--center justify-content--center width--full'>
                        <div className='dice-wrapper'>
                            <div
                                className='dice'
                                style={{
                                    transform: transFormStyle,
                                    animation: dice,
                                }}>
                                <div className='face front'></div>
                                <div className='face back'></div>
                                <div className='face top'></div>
                                <div className='face bottom'></div>
                                <div className='face right'></div>
                                <div className='face left'></div>
                            </div>

                            <div className='dice-side-wrapper flex  mt--50 '>
                                <div className='dice dice--1'>
                                    <div className='face front'></div>
                                </div>
                                <div className='dice dice--2'>
                                    <div className='face top'></div>
                                </div>
                                <div className='dice dice--3'>
                                    <div className='face left '></div>
                                </div>
                                <div className='dice dice--4'>
                                    <div className='face right'></div>
                                </div>
                                <div className='dice dice--5'>
                                    <div className='face bottom'></div>
                                </div>
                                <div className='dice dice--6'>
                                    <div className='face back'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*<div className=' btn-container width--full'>
                    <div className=' button-wrapper flex justify-content--center mt--50'>
                        <div className='bet-wrapper flex'>
                            <button className='minus'>-</button>
                            <button className='bet-amount'>Bet</button>
                            <button className='plus'>+</button>
                        </div>
                        <div className='play-wrapper'>
                            <button className='play' onClick={handleDiceClick}>
                                play
                            </button>
                        </div>
                        <div className='win-wrapper'>
                            <button className='bet-amount'>win</button>
                        </div>
                    </div>
                </div>*/}

                <div className='btn-container width--full flex align-items--center '>
                    <div className='bet-wrapper flex '>
                        <button className='minus flex justify-content--center align-items--center '>
                            -
                        </button>

                        <div className='bet-amount'>
                            <span className='flex flex--wrap justify-content--center align-items--center font-size--xs  '>
                                BET
                            </span>
                            <p className='flex justify-content--center align-items--center font-size--lg font--semi-bold '>
                                500.00
                            </p>
                        </div>

                        <button className='minus flex justify-content--center align-items--center'>
                            +
                        </button>
                    </div>
                    <div className='play-wrapper flex justify-content--center align-items--center '>
                        <button className='play-btn'>
                            <i
                                className='fa fa-play play'
                                onClick={handleDiceClick}
                                id='play'></i>
                            {/*<i className='fa fa-square pause' id='pause'></i>*/}
                        </button>
                    </div>
                    <div className='bet-wrapper win-wrapper flex justify-content--center align-items--center '>
                        <div className='bet-amount'>
                            <span className='flex flex--wrap justify-content--center align-items--center font-size--xs  '>
                                WIN
                            </span>
                            <p className='flex justify-content--center align-items--center font-size--lg font--semi-bold '>
                                600.00
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
