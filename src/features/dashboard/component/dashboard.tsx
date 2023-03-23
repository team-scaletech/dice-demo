import { useState } from 'react';
import Lottie from 'react-lottie';
import * as yellowDiceAnimation from '../../../assets/lottiles/yellowDiceAnimation.json';
import '../style/dashboard.scss';

const Dashboard = () => {
    const [diceAnimation, setDiceAnimation] = useState('');
    const [transFormStyle, setTransFormStyle] = useState('');
    const [diceVal, setDiceVal] = useState(0);
    const [isPlay, setIsPlay] = useState(false);
    const [guessVal, setGuessVal] = useState<number>(0);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: yellowDiceAnimation,
    };

    const handleDiceClick = () => {
        setIsPlay(true);
        const random = Math.floor(Math.random() * 7);

        if (random >= 1 && random <= 6) {
            setDiceAnimation('rolling 4s');

            setTimeout(() => {
                setDiceVal(random);
            }, 4550);
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
            setDiceAnimation('none');
            setIsPlay(false);
            setTransFormStyle(transFormStyle);
        }, 4050);
    };

    return (
        <div className='main-container flex'>
            <div className='dashboard-wrapper width--full'>
                <div className=' header-wrapper flex justify-content--between align-items--center'>
                    <div className='mt--30'>
                        <Lottie
                            options={defaultOptions}
                            height={100}
                            width={100}
                        />
                    </div>

                    <div className='curve-wrapper'>
                        <button className='curve-btn'>2500</button>
                    </div>
                    <div className='flex '>
                        <button className='setting-btn mr--20'>
                            <i className=' setting-icon fa fa-gear'></i>
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
                                    animation: diceAnimation,
                                }}>
                                {dice.map((data) => (
                                    <div
                                        className={`face ${data} `}
                                        key={data}
                                    />
                                ))}
                            </div>

                            <div className='dice-side-wrapper flex  mt--50 '>
                                {staticDice.map((data, index: number) => (
                                    <div
                                        className={`dice dice--${index + 1}`}
                                        key={index}>
                                        <div
                                            className={`face face--small-dice face--background ${data} ${
                                                index + 1 === guessVal &&
                                                'face--active '
                                            } ${
                                                index + 1 === diceVal &&
                                                'face--win'
                                            }`}
                                            onClick={() =>
                                                setGuessVal(index + 1)
                                            }></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='btn-container width--full flex align-items--center '>
                    <div className='bet-wrapper text--center'>
                        <p className='btn-title font-size--xxl mb--10'>BET</p>
                        <div className='flex justify-content--end'>
                            <button className='minus flex justify-content--center align-items--center mr--10'>
                                -
                            </button>
                            <p className='bet-amount flex flex justify-content--center align-items--center font-size--lg font--semi-bold'>
                                500.00
                            </p>
                            <button className='minus flex justify-content--center align-items--center ml--10'>
                                +
                            </button>
                        </div>
                    </div>

                    <div
                        className={`${
                            guessVal <= 0 && ' no-pointer-events  '
                        } play-wrapper flex justify-content--center align-items--center `}>
                        <button
                            className='play-btn'
                            disabled={guessVal <= 0}
                            onClick={handleDiceClick}>
                            {!isPlay && (
                                <i
                                    className='fa fa-play play flex justify-content--center align-items--center '
                                    id='play'></i>
                            )}
                            {isPlay && (
                                <i
                                    className='fa fa-square pause flex justify-content--center align-items--center'
                                    id='pause'></i>
                            )}
                        </button>
                    </div>
                    <div className='bet-wrapper text--start'>
                        <p className='win-btn-title font-size--xxl mb--10'>
                            WIN
                        </p>
                        <div className='flex justify-content--start'>
                            <p className='bet-amount flex justify-content--center align-items--center font-size--lg font--semi-bold '>
                                600.00
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const dice = ['front', 'back', 'top', 'bottom', 'right', 'left'];
const staticDice = ['front', 'top', 'left', 'right', 'bottom', 'back'];

export default Dashboard;
