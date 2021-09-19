import React from 'react';
import styled from 'styled-components';

import Responsive from 'components/common/Responsive';

import DefaultInfoContainer from 'containers/DefaultInfoContainer';
import AdditionalInfoContainer from 'containers/AdditionalInfoContainer';

// import ManageAssociation from '../components/ManageAssociation';
import useFetchUserToken from "modules/hooks/useFetchUserToken";

const ProfilePage = () => {
	
  const { user } = useFetchUserToken();

  if (!user) return <></>;
	return (
    <ProfilePageLayout className="ProfilePage">
      <DefaultInfoContainer user={user}/>
      <AdditionalInfoContainer user={user}/>
    </ProfilePageLayout>
	);
};

const ProfilePageLayout = styled(Responsive)`
	height: calc(100vh - 8rem); /* 레거시 */
	max-width: 1280px;
  margin: auto;

	display: flex;
	flex-direction: column;
`;

const ProfilePageMainSection = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 10rem;
	padding-right: 1rem;

	display: flex;
	flex-direction: column;
	section {
		margin-bottom: 3rem;
	}

	.column {
		display: flex;
		flex-direction: row;

		.row {
			display: flex;
			flex-direction: column;
		}
	}

	.row {
		display: flex;
		flex-direction: column;

		.column {
			display: flex;
			flex-direction: row;
		}
	}
`;


export default ProfilePage;
