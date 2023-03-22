import React from 'react';
import Lottie from 'react-lottie';
import LoginForm from '../component/loginForm';
import diceAnimation from 'assets/lotties/diceAnimation.json';

const Login: React.FC = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: diceAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};
	return (
		<div className='flex justify-content--around align-items--center height--full-viewport'>
			<div className='login-wrapper border-radius--lg width--30'>
				<div className=''>
					<p className='auth-title text--center text--white font-size--40'>
						Guess <span className='font-size--30'>&</span> Roll
					</p>
					<div className='no--margin'>
						<Lottie options={defaultOptions} height={110} width={150} />
					</div>
				</div>
				<div className='auth_form width--100 m--0-auto form'>
					<LoginForm />
				</div>
			</div>
		</div>
	);
};

export default Login;
