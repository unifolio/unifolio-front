import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { Input, Button, Select } from 'antd';

const CareerInput = (props) => {
	const { type, count, onCareerChange1, onCareerDelete } = props;
	const [careerFirm, setCareerFirm] = useState(null);
	const [careerPosition, setCareerPosition] = useState(null);
	const [careerStatus, setCareerStatus] = useState(null);
	const [careerPeriod, setCareerPeriod] = useState(null);

  const handleCareerChange1 = (e) => {
    if (!e.target) { // select일 때
      let { value, name } = e;
      onCareerChange1({ value, name, idx: name.slice(-1) });
      return;
    }

    let { value, name } = e.target;
    onCareerChange1({ value, name, idx: name.slice(-1) });
  }
  
	// const handleCareerChange = useCallback((e) => {
	// 	let value = e.target.value;
	// 	let name = e.target.name;
	// 	// console.log('handleCareerChange ', name, value);
	// 	switch (name) {
	// 		case 'career-firm':
	// 			setCareerFirm({ value });
	// 			break;
	// 		case 'career-position':
	// 			setCareerPosition({ value });
	// 			break;
	// 		case 'career-status':
	// 			setCareerStatus({ value });
	// 			break;
	// 		case 'career-period':
	// 			setCareerPeriod({ value });
	// 			break;
  //     default:
  //       break;
	// 	}
	// 	onCareerChange({ count, careerFirm, careerPosition, careerStatus, careerPeriod });
	// });

	const deleteCareerInput = (count) => {
		let target = document.querySelector(`.career-${count}`);
		target.parentNode.removeChild(target);
		onCareerDelete(count);
	};
	switch (type) {
		case 'general':
			return (
				<CareerContent className={`career-${count}`} style={{ width: '100%' }}>
          {/* <div className="column title">
            <h2>일반 경력사항 </h2>
          </div> */}
          <div className="column contents">
						<div className="row">
              <Input className={"career firm"} placeholder="회사명" size="large" name={`career-firm-${count}`} onChange={handleCareerChange1} />
              <Input className={"career position"} placeholder="직책" size="large" name={`career-position-${count}`} onChange={handleCareerChange1} />
              <Select name={`career-attend-status-${count}`} size="large" placeholder="재직 상태"
                onChange={(value) => {handleCareerChange1({
                  name: `career-attend-status-${count}`,
                  value: value,
                })}}
              >
                <Select.Option value="in_office">재직 중</Select.Option>
                <Select.Option value="resignation">퇴사</Select.Option>
              </Select>
              <Input className={"career period-start"} placeholder="입사년도"  size="large" name={`career-period-start-${count}`} onChange={handleCareerChange1} /> 
              <span style={{marginRight:'10px'}}>~</span>
              <Input className={"career period-end"} placeholder="퇴사년도"  size="large" name={`career-period-end-${count}`} onChange={handleCareerChange1} />
              <Button onClick={() => { deleteCareerInput(count); }} style={{ height: 'auto' }}> 삭제 </Button>
            </div>
          </div>
				</CareerContent>
			);
		case 'financial':
			return (
				<CareerContent className={`career-${count}`}>
          {/* <div className="column title">
            <h2>관련 경력사항(투자 및 컨설팅 분야)</h2>
          </div> */}
          <div className="column contents">
						<div className="row">
              <Input className={"career firm"} placeholder="회사명"  size="large" name={`career-firm-${count}`} onChange={handleCareerChange1} />
              <Input className={"career position"} placeholder="직책/예시:투자심사역"  size="large" name={`career-position-${count}`} onChange={handleCareerChange1} />
              <Select name={`career-attend-status-${count}`} size="large" placeholder="재직 상태"
                onChange={(value) => {handleCareerChange1({
                  name: `career-attend-status-${count}`,
                  value: value,
                })}}
              >
                <Select.Option value="in_office">재직 중</Select.Option>
                <Select.Option value="resignation">퇴사</Select.Option>
              </Select>
              <Input className={"career period-start"} placeholder="입사년도"  size="large" name={`career-period-start-${count}`} onChange={handleCareerChange1} />
              <span style={{marginRight:'10px'}}>~</span>
              <Input className={"career period-end"} placeholder="퇴사년도"  size="large" name={`career-period-end-${count}`} onChange={handleCareerChange1} />
              <Button onClick={() => { deleteCareerInput(count); }} style={{ height: 'auto' }} > 삭제 </Button>
            </div>
          </div>
				</CareerContent>
			);
		default:
			return <div> error </div>;
	}
};

const CareerContent = styled.div`
	margin-bottom: 10px;

	display: flex;
	flex-direction: column;

  .column.title{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

	.column.contents {
		display: flex;
		flex-direction: column;
		
    .row {
			display: flex;
			flex-direction: row;

      .career.firm { width: 25%; display: flex; flex-grow: 2 }
      .career.position { width: 37.5%; display: flex; flex-grow: 3 }
      .career.status { width: 12.5%; display: flex; flex-grow: 1 }
      .career.period-start { width: 12.5%; display: flex; flex-grow: 1 }
      .career.period-end { width: 12.5%; display: flex; flex-grow: 1 }
      .ant-input {
        margin-right: 10px;
      }
      .ant-select {
        margin-right: 10px;
      }
      /* .ant-input + .ant-input {
        margin-left:10px;
      } */
		}
	}
`;

export default CareerInput;
