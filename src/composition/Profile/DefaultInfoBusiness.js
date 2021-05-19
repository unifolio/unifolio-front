import React, { useEffect } from 'react';
import styled from 'styled-components';

const DefaultInfoBusiness = (props) => {
	const { user, handleSubmit } = props;

	useEffect(() => {
		console.log('info', user);
	}, [user]);

	const onClickEditButton = (e) => {
		Array.from(e.target.parentNode.parentNode.children).forEach((each) => {
			if (each.style.display == 'none') {
				each.style.display = 'block';
			} else {
				each.style.display = 'none';
			}
		});
		const phoneNumber = e.target.parentNode.children[0]?.value;
		if (phoneNumber) handleSubmit({ phoneNumber: phoneNumber });
	};

	return (
		<DefaultInfoLayout>
			<h1> 회원 정보 </h1>
			<HeadlineBottomBorder />
			<div className="row">
				<div className="left-column"> 법인회원 </div>
				<div className="right-column"> {user.corporate_name} 님 </div>
			</div>
			<div className="row">
				<div className="left-column">이메일</div>
				<div className="right-column">
					<div style={{ display: 'block' }}>{user.email}</div>
				</div>
			</div>
			<div className="row">
				<div className="left-column">연락처</div>
				<div className="right-column">
					<div style={{ display: 'block' }}>
						{user?.phone_number} <button onClick={onClickEditButton}> 수정하기 </button>
					</div>
					<div style={{ display: 'none' }}>
						<input type="text" placeholder={user.phone_number} /> <button onClick={onClickEditButton}> 입력 완료 </button>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="left-column">우편번호</div>
				<div className="right-column">{user.address_postcode_business}</div>
			</div>
			<div className="row">
				<div className="left-column">등록주소</div>
				<div className="right-column">
					<div style={{ display: 'block' }}>
						{user.address_business} {user.address_detail_business} <button onClick={onClickEditButton}> 수정하기 </button>
					</div>
					<div style={{ display: 'none' }}>
						<input type="text" placeholder={`${user.address} ${user.address_detail_business}`} /> <button onClick={onClickEditButton}> 입력 완료 </button>
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

export default DefaultInfoBusiness;
