import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useDispatch } from 'react-redux';
import * as actionTypes from 'store/actionTypes';

import HttpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import { createAction } from 'shared/util/utility';
import AuthService from 'shared/services/auth.service';
import CustomModal from 'shared/modal/modal';
import { notify } from 'shared/components/notification/notification';
import { dice, staticDice } from 'shared/constants/constant';

import yellowDiceAnimation from 'assets/lotties/whiteDiceAnimation.json';
import winAnimation from 'assets/lotties/winAnimation.json';
import lostAnimation from 'assets/lotties/lostAnimation.json';

import '../style/dashboard.scss';

const Dashboard = () => {
    const dispatch = useDispatch();

    const [diceAnimation, setDiceAnimation] = useState('');
    const [transFormStyle, setTransFormStyle] = useState('');
    const [isPlay, setIsPlay] = useState(false);
    const [logoutPopup, setLogoutPopup] = useState(false);
    const [winPopup, setWinPopup] = useState('');

    const [diceVal, setDiceVal] = useState(0);
    const [guessVal, setGuessVal] = useState(0);
    const [betCount, setBetCount] = useState(10);
    const [walletAmount, setWalletAmount] = useState();
    const [winAmount, setWinAmount] = useState(0);
    const [userId, setUserId] = useState('');

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: yellowDiceAnimation,
    };

    const userData = AuthService.getUserData();
    const { username, password } = userData;

    const getPlayData = () => {
        setIsPlay(true);
        setDiceAnimation('rolling 4s');

        const params = {
            userId,
            predictedNumber: guessVal,
            battedAmount: betCount,
        };
        HttpService.post(API_CONFIG.path.play, params)
            .then((res) => {
                const { actualNumber, isWinner, battedAmount } = res.data;
                setTimeout(() => {
                    setDiceVal(actualNumber);
                    setIsPlay(false);
                    handleWallet();
                    isWinner && setWinAmount(battedAmount * 4);
                    setWinPopup(isWinner ? 'win' : 'loss');
                }, 4550);

                setTimeout(() => {
                    setWinPopup('');
                    setDiceVal(0);
                    setGuessVal(0);
                    setWinAmount(0);
                }, 8000);

                rollDice(actualNumber);
            })
            .catch((err) => {
                console.error(err, 'err');
                setTimeout(() => {
                    setIsPlay(false);
                    notify(
                        'User does not have sufficient balance to roll dice.',
                        'error'
                    );
                }, 4550);

                err.code === 401 && handleLogin();
            });
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

    const handleLogin = () => {
        const params = {
            username: username,
            password: password,
        };
        HttpService.post(API_CONFIG.path.login, params)
            .then((res) => {
                const { data } = res;
                data && AuthService.setAuthData(data);
                dispatch(createAction(actionTypes.AUTH_SUCCESS));
                dispatch(createAction(actionTypes.UPDATE_USER_DATA, data));
                getPlayData();
            })
            .catch((err: Error) => {
                dispatch(createAction(actionTypes.AUTH_FAILED));
                console.error('Error', err);
            });
    };

    const logOut = () => {
        dispatch(createAction(actionTypes.AUTH_LOGOUT));

        notify('Admin successfully logged out.', 'success');
    };

    const handleWallet = () => {
        HttpService.get(`${API_CONFIG.path.walletInfo}/${username}`)
            .then((res) => {
                setUserId(res.data.userId);
                setWalletAmount(res.data.wallet.walletAmount);
                res.data.wallet.walletAmount === 0 &&
                    notify("You don't have sufficient balance", 'error');
            })
            .catch((err) => {
                console.error(err, 'err');
            });
    };

    useEffect(() => {
        handleWallet();
    }, []);

    return (
        <div className='main-container flex'>
            <div className='dashboard-wrapper width--full'>
                <div className='header-wrapper width--full flex justify-content--between'>
                    <div className='animation-wrapper custom-btn border-radius--half overflow--hidden ml--10 mt--10'>
                        <Lottie
                            options={defaultOptions}
                            height={50}
                            width={50}
                        />
                    </div>
                    <div className='curve-wrapper custom-btn flex align-items--center justify-content--center  position--relative overflow--hidden'>
                        <button className='curve-btn text--white border-radius--30 font-size--lg'>
                            {walletAmount}
                        </button>
                    </div>
                    <div className='flex'>
                        <button
                            className='custom-btn setting-btn mr--20 border-radius--half mt--15'
                            onClick={() => setLogoutPopup(true)}>
                            <i className='font-size--30 fa fa-gear text--white' />
                        </button>
                    </div>
                </div>

                <div className='dice-main-container background-overlay border-radius--lg width-full flex'>
                    <div className='dice-container flex align-items--center justify-content--center width--full'>
                        <div className='dice-wrapper border-radius--30'>
                            <div
                                className='dice position--relative'
                                style={{
                                    transform: transFormStyle,
                                    animation: diceAnimation,
                                }}>
                                {dice.map((data) => (
                                    <div
                                        className={`face ${data}`}
                                        key={data}
                                    />
                                ))}
                            </div>
                            <div
                                className={`dice-side-wrapper flex  mt--50  ${
                                    isPlay && 'disabled no-pointer-events'
                                }`}>
                                {staticDice.map((data, index) => (
                                    <div
                                        className={`dice dice--width cursor--pointer  dice--${
                                            index + 1
                                        }`}
                                        key={index}>
                                        <div
                                            className={`face face--small-dice face--background ${data} ${
                                                index + 1 === guessVal &&
                                                'face--active '
                                            } ${
                                                index + 1 === diceVal &&
                                                'face--win'
                                            } `}
                                            onClick={() =>
                                                setGuessVal(index + 1)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='btn-container background-overlay border-radius--lg width--full flex align-items--center'>
                    <div className='bet-wrapper width--40 text--center'>
                        <p className='btn-title font-size--xxl mb--10'>BET</p>
                        <div className='flex justify-content--end'>
                            <button
                                className={`minus custom-btn flex justify-content--center align-items--center mr--10 ${
                                    isPlay && 'disabled no-pointer-events'
                                }`}
                                onClick={() =>
                                    setBetCount(
                                        betCount > 10 ? betCount - 10 : betCount
                                    )
                                }>
                                -
                            </button>
                            <p className='bet-amount custom-btn flex justify-content--center align-items--center font-size--lg font--semi-bold'>
                                {betCount}
                            </p>
                            <button
                                className={`minus custom-btn flex justify-content--center align-items--center ml--10 ${
                                    isPlay && 'disabled no-pointer-events'
                                }`}
                                onClick={() => setBetCount(betCount + 10)}>
                                +
                            </button>
                        </div>
                    </div>

                    <div
                        className={`${
                            guessVal <= 0 && 'no-pointer-events'
                        } play-wrapper width--20 flex justify-content--center align-items--center`}>
                        <button
                            className='play-btn border-radius--half custom-btn cursor--pointer font-size--25 text--white position--relative overflow--hidden'
                            disabled={guessVal <= 0}
                            onClick={() => {
                                walletAmount !== 0 && getPlayData();
                            }}>
                            <i
                                className={`fa fa-${
                                    isPlay ? 'square' : 'play'
                                } flex justify-content--center align-items--center`}
                            />
                        </button>
                    </div>
                    <div className='bet-wrapper width--40 text--start'>
                        <p className='win-btn-title font-size--xxl mb--10'>
                            WIN
                        </p>
                        <div className='flex justify-content--start'>
                            <p className='bet-amount  custom-btn flex justify-content--center align-items--center font-size--lg font--semi-bold '>
                                {winAmount > 0 ? winAmount : 'Good Luck !'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {logoutPopup && (
                <CustomModal
                    show={true}
                    handleClose={() => setLogoutPopup(false)}
                    className='logout-modal'>
                    <div>
                        <p className='text--black font-size--xxl text--center mb--30 '>
                            Are you sure you want to logout?
                        </p>
                        <div className='button-wrapper flex justify-content--center '>
                            <button
                                className='submit-button ok-btn mr--10 text--white'
                                onClick={logOut}>
                                yes
                            </button>
                            <button
                                className='submit-button cancel-btn'
                                onClick={() => setLogoutPopup(false)}>
                                No
                            </button>
                        </div>
                    </div>
                </CustomModal>
            )}
            {winPopup && winPopup.length > 0 && (
                <CustomModal
                    show={true}
                    handleClose={function (): void | undefined {
                        throw new Error('Function not implemented.');
                    }}
                    className='win-model'>
                    <div>
                        <div className='dice-animation no--margin'>
                            <Lottie
                                options={{
                                    animationData:
                                        winPopup === 'win'
                                            ? winAnimation
                                            : lostAnimation,
                                    loop: false,
                                    autoplay: false,
                                }}
                                height={winPopup === 'win' ? 200 : 300}
                                width={winPopup === 'win' ? 200 : 300}
                            />
                        </div>
                    </div>
                </CustomModal>
            )}
        </div>
    );
};

export default Dashboard;
