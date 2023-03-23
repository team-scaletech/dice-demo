import { ErrorMessage } from 'formik';
import React from 'react';

interface IProps {
	name: string;
	className?: string;
}

const ErrorMessageHandler: React.FC<IProps> = (props) => {
	const { name, className } = props;
	return (
		<div>
			<ErrorMessage name={name}>
				{(msg: string) => <div className={`show--error ${className}`}>{msg}</div>}
			</ErrorMessage>
		</div>
	);
};

export default ErrorMessageHandler;
