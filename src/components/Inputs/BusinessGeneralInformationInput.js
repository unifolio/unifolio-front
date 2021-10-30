import React from 'react'
import styled from 'styled-components';

import { Input } from 'antd';

const BusinessGeneralInformationInput = ({ user, isReadonly }) => {
  return (
    <BusinessGeneralInformationInputLayout>
      <div className="column contents">
        <div className="row">
          <Input type={"text"} />
        </div>
      </div>
    </BusinessGeneralInformationInputLayout>
  )
}

const BusinessGeneralInformationInputLayout = styled.div`
	width:100%;
  margin-bottom: 10px;

	display: flex;

  .column.title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex-basis: 100px;
  }

	.column.contents {
		
    display: flex;
    flex-grow: 7;
		flex-direction: column;
		
    .row {
			display: flex;
      
      .ant-input {
        margin-right: 10px;
        
        display:flex;
        flex-grow:1;
        
      }
      .ant-select {
        width: 120px;
        margin-right: 10px;

        display:flex;
        flex-shrink: 0;
      }
		}
	}
`;

export default BusinessGeneralInformationInput;
