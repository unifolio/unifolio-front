import React from 'react';
import styled from 'styled-components';

const UnionCommonModal = ({
  isModalActive = false,
  handleModalVisibility,
  children,
}) => {
  return isModalActive ? (
    <UnionCommonModalLayout onClick={() => handleModalVisibility(false)}>
      <UnionCommonModalCenterLayout onClick={(e) => e.stopPropagation()}>
        {children}
      </UnionCommonModalCenterLayout>
    </UnionCommonModalLayout>
  ) : (
    <></>
  );
};

const UnionCommonModalLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
`;

const UnionCommonModalCenterLayout = styled.div`
  min-width: 600px;
  min-height: 500px;
  background-color: #f3f3f3;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

export default UnionCommonModal;
