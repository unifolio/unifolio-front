import React, { useEffect } from 'react';
import styled from 'styled-components';

const DefaultInfo = (props) => {
	const { user } = props;
	useEffect(() => {
		console.log(user);
	});

	const onToggleInfo = (e) => {
		window.t = e.target;
		Array.from(e.target.parentNode.parentNode.children).forEach((each) => {
			if (each.style.display == 'none') {
				each.style.display = 'block';
			} else {
				each.style.display = 'none';
			}
		});
	};

	return (
		<DefaultInfoLayout>
			<h1> 회원 정보 </h1>
			<HeadlineBottomBorder />
			<div className="row">
				<div className="left-column"> 개인회원 </div>
				<div className="right-column"> {user?.name} 님 </div>
			</div>
			<div className="row">
				<div className="left-column">이메일</div>
				<div className="right-column">
					<div style={{ display: 'block' }}>
						{user?.email} <button onClick={onToggleInfo}> 수정하기 </button>
					</div>
					<div style={{ display: 'none' }}>
						<input type="text" placeholder={user?.email} /> <button onClick={onToggleInfo}> 입력 완료 </button>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="left-column">연락처</div>
				<div className="right-column">
					<div style={{ display: 'block' }}>
						{user?.phone_number} <button onClick={onToggleInfo}> 수정하기 </button>
					</div>
					<div style={{ display: 'none' }}>
						<input type="text" placeholder={user?.phone_number} /> <button onClick={onToggleInfo}> 입력 완료 </button>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="left-column">우편번호</div>
				<div className="right-column">{user?.address_postcode}</div>
			</div>
			<div className="row">
				<div className="left-column">등록주소</div>
				<div className="right-column">
					<div style={{ display: 'block' }}>
						{user?.address} {user?.address_detail} <button onClick={onToggleInfo}> 수정하기 </button>
					</div>
					<div style={{ display: 'none' }}>
						<input type="text" placeholder={`${user?.address} ${user?.address_detail}`} /> <button onClick={onToggleInfo}> 입력 완료 </button>
					</div>
				</div>
			</div>
		</DefaultInfoLayout>
	);
};

const DefaultInfoLayout = styled.section`
	display: flex;
	flex-direction: column;
	.row {
		display: flex;
		.left-column {
			color: grey;
			flex: 1 1 0;
		}
		.right-column {
			flex: 3 1 0;
		}
	}
	& + section {
		margin-top: 5rem;
	}
`;

const HeadlineBottomBorder = styled.div`
	border-bottom: 2px solid;
	margin-bottom: 2rem;
`;
const DefaultInfoColumn = styled.section`
	display: flex;
`;

export default DefaultInfo;
