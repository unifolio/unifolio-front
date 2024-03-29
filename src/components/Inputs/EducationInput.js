import React from 'react';
import { Input, Button, Select } from 'antd';
import styled from 'styled-components';

const EducationInput = ({ type, count, value, onEducationChange, onEducationDelete }) => {
	
  const handleEducationChange = (e) => {
    if (!e.target) { // select일 때
      let { value, name } = e;
      onEducationChange({ value, name, count: name.slice(-1) });
      return;
    }
    
		let { value, name } = e.target;
		onEducationChange({ value, name,  count: name.slice(-1) });
	};

	const deleteEducationInput = (count) => {
		onEducationDelete(count);
	};

	switch (type) {
		case 'highschool':
			return (
				<SchoolContent className={`school-${count}`}>
					<div className="column title">고등학교</div>
					<div className="column contents">
						<div className="row">
							<Input className={"row-8"} value={value?.school_name} name={`school-name-${count}`} size="large" placeholder="학교명" onChange={handleEducationChange} />
              <Select name={`school-attend-status-${count}`} size="large" placeholder="졸업 여부" 
                defaultValue={value.attend_status}
                onChange={(value) => {handleEducationChange({
                  name: `school-attend-status-${count}`,
                  value: value,
                })}}
              >
                <Select.Option value="ongoing">재학</Select.Option>
                <Select.Option value="graduate">졸업</Select.Option>
              </Select>
              
							<Button
								onClick={() => {deleteEducationInput(count)}}
								style={{ height: 'auto' }}
							>
								삭제
							</Button>
						</div>
					</div>
				</SchoolContent>
			);
		case 'undergraduate':
			return (
				<SchoolContent className={`school-${count}`}>
					<div className="column title">대학교 (학사)</div>
					<div className="column contents">
						<div className="row">
							<Input name={`school-name-${count}`} value={value.school_name} size="large" placeholder="학교명" onChange={handleEducationChange} />
              <Input name={`school-major-${count}`} value={value.major} size="large" placeholder="전공명" onChange={handleEducationChange} />
              <Select name={`school-attend-status-${count}`} size="large" placeholder="졸업 여부" 
                defaultValue={value.attend_status}
                onChange={(value) => {handleEducationChange({
                  name: `school-attend-status-${count}`,
                  value: value,
                })}}
              >
                <Select.Option value="ongoing">재학</Select.Option>
                <Select.Option value="graduate">졸업</Select.Option>
              </Select>
							<Button
								onClick={() => { deleteEducationInput(count); }}
								style={{ height: 'auto' }}
							>
								삭제
							</Button>
						</div>
					</div>
				</SchoolContent>
			);
		case 'master':
			return (
				<SchoolContent className={`school-${count}`}>
					<div className="column title">대학원 (석사)</div>
					<div className="column contents">
						<div className="row">
							<Input name={`school-name-${count}`} value={value.school_name} size="large" placeholder="학교명" onChange={handleEducationChange} />
              <Input name={`school-major-${count}`} value={value.major} size="large" placeholder="전공명" onChange={handleEducationChange} />
              <Select name={`school-attend-status-${count}`} size="large" placeholder="졸업 여부" 
                defaultValue={value.attend_status}
                onChange={(value) => {handleEducationChange({
                  name: `school-attend-status-${count}`,
                  value: value,
                })}}
              >
                <Select.Option value="ongoing">재학</Select.Option>
                <Select.Option value="graduate">졸업</Select.Option>
              </Select>
							<Button
								onClick={() => { deleteEducationInput(count); }}
								style={{ height: 'auto' }}
							>
								삭제
							</Button>
						</div>
					</div>
				</SchoolContent>
			);
		case 'doctor':
			return (
				<SchoolContent className={`school-${count}`}>
					<div className="column title">대학원 (박사)</div>
					<div className="column contents">
						<div className="row">
							<Input name={`school-name-${count}`} size="large" value={value.school_name}  placeholder="학교명" onChange={handleEducationChange} />
              <Input name={`school-major-${count}`} size="large" value={value.major}  placeholder="전공명" onChange={handleEducationChange} />
              <Select name={`school-attend-status-${count}`} size="large" placeholder="졸업 여부" 
                defaultValue={value.attend_status}
                onChange={(value) => {handleEducationChange({
                  name: `school-attend-status-${count}`,
                  value: value,
                })}}
              >
                <Select.Option value="ongoing">재학</Select.Option>
                <Select.Option value="graduate">졸업</Select.Option>
              </Select>
							<Button
								onClick={() => { deleteEducationInput(count); }}
								style={{ height: 'auto' }}
							>
								삭제
							</Button>
						</div>
					</div>
				</SchoolContent>
			);
		default:
			console.log(type, count);
			return <div> error </div>;
	}
};

const SchoolContent = styled.div`
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

export default React.memo(EducationInput);
