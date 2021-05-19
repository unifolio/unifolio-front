import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';
import Responsive from '../common/Responsive.js';

import palette from '../../lib/styles/palette.js';

const ProfileHeaderPosition = styled(Responsive)`
	position: relative;
	height: 4rem;
	box-shadow: 1px 2px 5px grey;
`;

const ProfileHeaderLayout = styled.div`
	height: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: center;
	justify-items: center;

	.profileheader-item {
		color: grey;
		height: 100%;
		width: 80%;
		font-size: 1.3rem;
		display: inherit;
		place-items: center;
	}
	.active {
		box-shadow: 0 4px 2px -2px ${palette.blue[0]};
		color: ${palette.blue[0]};
	}
`;

const ProfileHeader = (props) => {
	const { history, current, status, submitChangeHeaderStatus } = props;

	useEffect(() => {
		console.log('ProfileHeader rendered', current);
		document.querySelector('.active').className = 'profileheader-item';
		if (current === undefined) {
			document.querySelector('.profileheader-item').className += ' active';
		} else {
			document.querySelectorAll(`.profileheader-item[data-location=${current}]`)[0].className += ' active';
		}
	});
	const onClickHeaderItem = (value) => {
		// history.push(`/my?mode=${e.target.dataset.location}`);
		submitChangeHeaderStatus(value);
	};
	return (
		<ProfileHeaderPosition className="ProfileHeader">
			<ProfileHeaderLayout>
				<div
					onClick={() => {
						onClickHeaderItem('profile');
					}}
					className="profileheader-item active"
				>
					프로필
				</div>
				<div
					onClick={() => {
						onClickHeaderItem('create-association');
					}}
					className="profileheader-item"
				>
					신규 투자조합 만들기
				</div>
			</ProfileHeaderLayout>
		</ProfileHeaderPosition>
	);
};

export default withRouter(ProfileHeader);
