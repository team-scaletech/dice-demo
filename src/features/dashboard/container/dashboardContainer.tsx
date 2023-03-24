import { useState } from 'react';
import Lottie from 'react-lottie';
import * as yellowDiceAnimation from 'assets/lotties/whiteDiceAnimation.json';
import '../style/dashboard.scss';
import HttpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';

const Dashboard = () => {
    const [diceAnimation, setDiceAnimation] = useState('');
    const [transFormStyle, setTransFormStyle] = useState('');
    const [diceVal, setDiceVal] = useState(0);
    const [isPlay, setIsPlay] = useState(false);
    const [guessVal, setGuessVal] = useState(0);
    const [betCount, setBetCount] = useState(10);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: yellowDiceAnimation,
    };

    //const handleDiceClick = () => {
    //    setIsPlay(true);
    //    const random = Math.floor(Math.random() * 7);

    //    if (random >= 1 && random <= 6) {
    //        setDiceAnimation('rolling 4s');
    //        setTimeout(() => {
    //            setDiceVal(random);
    //        }, 4550);

    //        rollDice(random);
    //    } else {
    //        handleDiceClick();
    //    }
    //};

    const decreaseValue = (betCount: number) => {
        betCount - 10;
        setBetCount(betCount);
    };

    const getPlayData = () => {
        console.log('in');
        setDiceAnimation('rolling 4s');

        const params = {
            userId: '0ec769a6-d851-448d-9787-c6add13a61cc',
            predictedNumber: guessVal,
            battedAmount: betCount,
        };

        HttpService.post(API_CONFIG.path.play, params)
            .then((res) => {
                console.log(res, 'res');
            })
            .catch((err: Error) => {
                console.log(err);
            });

        /*		setTimeout(() => {
			setDiceVal(random);
		}, 4550);

		rollDice(random);*/
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
                <div className='header-wrapper flex justify-content--between '>
                    <div className='animation-wrapper'>
                        <Lottie
                            options={defaultOptions}
                            height={50}
                            width={50}
                        />
                    </div>

                    <div className='curve-wrapper flex align-items--center justify-content--center  position--relative overflow--hidden'>
                        <button className='curve-btn border-radius--30'>
                            2500
                        </button>
                    </div>
                    <div className='flex '>
                        <button className='setting-btn mr--20 border-radius--half mt--15 '>
                            <i className=' setting-icon fa fa-gear text--white'></i>
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
                            <button
                                className='minus flex justify-content--center align-items--center mr--10'
                                onClick={() => decreaseValue(10)}>
                                -
                            </button>
                            <p className='bet-amount flex flex justify-content--center align-items--center font-size--lg font--semi-bold'>
                                {betCount}
                            </p>
                            <button
                                className='minus flex justify-content--center align-items--center ml--10'
                                onClick={() => setBetCount(betCount + 10)}>
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
                            onClick={getPlayData}>
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
