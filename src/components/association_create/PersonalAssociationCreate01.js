import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import SchoolInput from './SchoolInput';
import CareerInput from './CareerInput';

const PersonalAssociationCreate01 = () => {
  const [schoolInputs, setSchoolInputs] = useState([]);
  const [careerInputs, setCareerInputs] = useState([]);
  const [schoolCount, setSchoolCount ] = useState(2);
  const [careerCount, setCareerCount ] = useState(1);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  
  const addSchoolInput = (count) => {
    let selects = document.querySelector("select#school");
    let selected = selects.options[selects.selectedIndex].value;
    let tmpSchoolInputs = schoolInputs
    tmpSchoolInputs.push( [count, selected] );
    setSchoolInputs(tmpSchoolInputs);
    setSchoolCount(count + 1);
  }

  const addCareerInput = (count) => {
    let selects = document.querySelector("select#career");
    let selected = selects.options[selects.selectedIndex].value;
    let tmpCareerInputs = careerInputs
    tmpCareerInputs.push( [count, selected] );
    setCareerInputs(tmpCareerInputs);
    setCareerCount(count + 1);
  }

  return (
    <div>
      <div className="container w-2/5 mx-auto">
        <div className="my-40">
            <h2> 학력사항 </h2>
            <div className="flex items-center" style={{"display":"flex", "alignItems":"center"}}>
              <FormControl variant="outlined" required style={{"width":"80%"}} className={classes.formControl}>
                <InputLabel htmlFor="school-select">학력 사항</InputLabel>
                <Select native labelId="school-select" label="학력 사항" inputProps={{name: "school", id: "school"}}>
                  <option aria-label="학력 사항" value="" />
                  <option value={"high"}>고등학교(필수)</option>
                  <option value={"univ"}>대학교(필수)</option>
                  <option value={"grad"}>대학원(석사)</option>
                  <option value={"doc"}>대학원(박사)</option>
                </Select>
                <FormHelperText>필수</FormHelperText>
              </FormControl>
              <Button variant="outlined" size="large" style={{"display":"flex"}} onClick={() => {addSchoolInput(schoolCount)}}>+</Button>
            </div> <br />
            <div className="school-inputs">
                { schoolInputs.map((each, index) => 
                  <SchoolInput type={each[1]} count={each[0]} key={index}/>
                )}
            </div>

            <h2> 경력 사항 </h2>
            <div className="flex items-center" style={{"display":"flex", "alignItems":"center"}}>
              <FormControl variant="outlined" required style={{"width":"80%"}} className={classes.formControl}>
                <InputLabel htmlFor="school-select">경력 사항</InputLabel>
                <Select native labelId="school-select" label="경력 사항" inputProps={{name: "career", id: "career"}}>
                  <option aria-label="경력 사항" value="" />
                  <option value={"general"}>일반 경력사항(필수)</option>
                  <option value={"financial"}>관련 경력사항(투자 및 컨설팅 분야)</option>
                </Select>
                <FormHelperText>필수</FormHelperText>
              </FormControl>
              <Button variant="outlined" size="large" style={{"display":"flex"}} onClick={() => {addCareerInput(careerCount)}}>+</Button>
            </div> <br />
            <div className="career-inputs">
                { careerInputs.map((each, index) => 
                  <>
                    <CareerInput type={each[1]} count={each[0]} key={index}/> <br />
                  </>
                )}
            </div>

            <div className="mb-8"></div>
            <br />
            <Link to="/association-create/personal-2">다음 단계 진행하기</Link>
            
        </div>
      </div>
    </div>
  );
}

export default PersonalAssociationCreate01;
