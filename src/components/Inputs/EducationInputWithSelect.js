import React from 'react';
import styled from 'styled-components';

import { Input, Button, Select } from 'antd';

const EducationInputWithSelect = ({ type, count, value, onEducationChange, onEducationDelete, disabled }) => {
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

  const render = () => {
    switch (type) {
      case 'highschool':
        return (
          <>
            <Input className={"row-8"} name={`school-name-${count}`} size="large" placeholder="학교명" 
              value={value?.school_name}  onChange={handleEducationChange} disabled={disabled ? true : false}
            />
            <Select name={`school-attend-status-${count}`} size="large" placeholder="졸업 여부" 
              disabled={disabled ? true : false}
              defaultValue={value.attend_status}
              onChange={(value) => {handleEducationChange({
                name: `school-attend-status-${count}`,
                value: value,
              })}}
            >
              <Select.Option value="재학">재학</Select.Option>
              <Select.Option value="졸업">졸업</Select.Option>
            </Select>
          </>
        );
      case 'undergraduate':
        return (
          <>
            <Input name={`school-name-${count}`} value={value.school_name} size="large" placeholder="학교명" onChange={handleEducationChange} disabled={disabled ? true : false}/>
            <Input name={`school-major-${count}`} value={value.major} size="large" placeholder="전공명" onChange={handleEducationChange} disabled={disabled ? true : false}/>
            <Select name={`school-attend-status-${count}`} size="large" placeholder="졸업 여부" 
              disabled={disabled ? true : false}
              defaultValue={value.attend_status}
              onChange={(value) => {handleEducationChange({
                name: `school-attend-status-${count}`,
                value: value,
              })}}
            >
              <Select.Option value="재학">재학</Select.Option>
              <Select.Option value="졸업">졸업</Select.Option>
            </Select>
          </>
        );
      case 'master':
        return (
          <>
            <Input name={`school-name-${count}`} value={value.school_name} size="large" placeholder="학교명" onChange={handleEducationChange} disabled={disabled ? true : false}/>
            <Input name={`school-major-${count}`} value={value.major} size="large" placeholder="전공명" onChange={handleEducationChange} disabled={disabled ? true : false}/>
            <Select name={`school-attend-status-${count}`} size="large" placeholder="졸업 여부" 
              disabled={disabled ? true : false}
              defaultValue={value.attend_status}
              onChange={(value) => {handleEducationChange({
                name: `school-attend-status-${count}`,
                value: value,
              })}}
            >
              <Select.Option value="재학">재학</Select.Option>
              <Select.Option value="졸업">졸업</Select.Option>
            </Select>
          </>
        );
      case 'doctor':
        return (
          <>
            <Input name={`school-name-${count}`} size="large" value={value.school_name}  placeholder="학교명" onChange={handleEducationChange} disabled={disabled ? true : false}/>
            <Input name={`school-major-${count}`} size="large" value={value.major}  placeholder="전공명" onChange={handleEducationChange} disabled={disabled ? true : false}/>
            <Select name={`school-attend-status-${count}`} size="large" placeholder="졸업 여부" 
              disabled={disabled ? true : false}
              defaultValue={value.attend_status}
              onChange={(value) => {handleEducationChange({
                name: `school-attend-status-${count}`,
                value: value,
              })}}
            >
              <Select.Option value="재학">재학</Select.Option>
              <Select.Option value="졸업">졸업</Select.Option>
            </Select>
          </>
        );
      default:
        console.error(type, count);
        return <div> error </div>;
    }
  }

	return (
    <SchoolContent className={`school-${count}`}>
      <div className="column contents">
        <div className="row">
          {render()}
          {!disabled && (
            <Button onClick={() => {deleteEducationInput(count)}} style={{ height: 'auto' }}>
              삭제
            </Button>
          )}
        </div>
      </div>
    </SchoolContent>
  )
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

export default EducationInputWithSelect
