import React from 'react';
import styled from 'styled-components';

const Loading = () => {
	return (
		<LoadingBlock>
			<div class="loader"></div>
		</LoadingBlock>
	);
};

const LoadingBlock = styled.div`
	position: absolute;
	top: 30%;
	left: 30%;

	.loader {
		border: 16px solid #f3f3f3; /* Light grey */
		border-top: 16px solid #3498db; /* Blue */
		border-radius: 50%;
		width: 120px;
		height: 120px;
		animation: spin 2s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
export default Loading;
