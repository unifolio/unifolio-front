import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Select } from 'antd';

import EducationInputModal from 'composition/Profile/EducationInputModal';
import CareerInputModal from 'composition/Profile/CareerInputModal';

import InvestmentHistoryInput from 'components/InvestmentHistoryInput';

const AdditionalInfo = (props) => {
	const {} = props;

  const mainRef = React.createRef();
	const $modalRef = useRef();

  const [educationInputs, setEducationInputs] = useState([]);
  const educationSelect = useRef();

  const [careerInputs, setCareerInputs] = useState([]);
  const careerSelect = useRef();
  
  const [investmentHistoryInputs, setInvestmentHistoryInputs] = useState([]);
  const counts = useRef({ education: 2, career: 2 });

  // const $educationInputs = useRef();
  // const $careerInputs = useRef();

  const [currentModal, setCurrentModal] = useState(null);
  
  useEffect(() => {
    // 학력사항
    const educationData = [{
      count: 1,
      type: "highschool",
      info: { attend_status: null, highschool: null }
    },
    {
      count: 2,
      type: "university",
      info: { attend_status: null, university:null, university_major:null }
    }];

    setEducationInputs([...educationData]);

    // 경력사항
    const careerData = [{
      count: 1,
      type: "general",
      info: { status: null, company: null, position: null, start_date: null, end_date: null }
    },
    {
      count: 2,
      type: "financial",
      info: { status: null, company: null, position: null, start_date: null, end_date: null }
    }];

    setCareerInputs([...careerData]);

    // 투자이력
    const investmentHistoryData = [{
      count: 1,
      info: {
        category: null, firm: null, description: null
      }
    }]
    setInvestmentHistoryInputs([...investmentHistoryData]);

    // 모달 핸들

    if (currentModal === false || currentModal === null) {
      $modalRef.current.style.display = 'none';
			document.querySelector('body').style.overflow = '';
		} else {
      $modalRef.current.style.display = 'flex';
      document.querySelector('body').style.overflow = 'hidden';
    }

  }, [currentModal])

  const addEducationInput = () => {
    
    if (educationSelect.current === undefined) {
      alert("학력 정보를 선택해주세요.");
      return;
    }

    let data = {
      count: counts.current.education + 1, // count,
      type: educationSelect.current, //selected,
      info: {
        attend_status: null
      }
    }

    data.info[educationSelect.current] = null;
    if (educationSelect.current !== "highschool")
      data.info[`${educationSelect.current}_major`] = null;
    
    counts.current.education += 1;
    setEducationInputs([...educationInputs, data]);
  }

  const addCareerInput = () => {
  
    if (careerSelect.current === undefined) {
      alert("경력 정보를 선택해주세요.");
      return;
    }

    let data = {
      count: counts.current.career + 1, // count,
      type: careerSelect.current, //selected,
      info: {
        status: null
      }
    }

    data.info[careerSelect.current] = null;
    counts.current.career += 1;
    setCareerInputs([...careerInputs, data]);
  }

  const addInvestmentHistoryInput = () => {
    let data = {
      count: investmentHistoryInputs.length,
      info: {
        category: null, firm: null, description: null
      }
    }
    setInvestmentHistoryInputs([...investmentHistoryInputs, data]);
  }

  const onEducationChange = ({ count, name, value }) => {
    
    const changedEducationInputs = educationInputs.map((educationInput) => {
      if (educationInput.count === Number(count)) {
        if (name.includes("attend-status"))
          educationInput.info["attend_status"] = value
        if (name.includes("name"))
          educationInput.info[educationInput.type] = value
        if (name.includes("major"))
          educationInput.info[`${educationInput.type}_major`] = value;
      }
      
      return educationInput;
    });

    setEducationInputs([...changedEducationInputs]);
    console.log(educationInputs)
	};

  const onCareerChange = ({ idx, name, value }) => {

    for (const careerInput of careerInputs) {
      if (careerInput.idx === Number(idx)) {
        if (name.includes("status"))
          careerInput.info["status"] = value;
        if (name.includes("company"))
          careerInput.info["company"] = value;
        if (name.includes("position"))
          careerInput.info["position"] = value;
        if (name.includes("start-date"))
          careerInput.info["start_date"] = value;
        if (name.includes("end-date"))
          careerInput.info["end_date"] = value;
      }
    }
    console.log(careerInputs);
    setCareerInputs([...careerInputs]);
	};

  const onInvestmentHistoryChange = ({ idx, name, value }) => {
    for (const investmentHistoryInput of investmentHistoryInputs) {
      if (investmentHistoryInput.idx === Number(idx)) {
        if (name.includes("category"))
          investmentHistoryInput.info["category"] = value;
        if (name.includes("firm"))
          investmentHistoryInput.info["firm"] = value;
        if (name.includes("description"))
          investmentHistoryInput.info["description"] = value;
      }
    }
    console.log(investmentHistoryInputs);
  }


	const onChangeSelect = ({type, value}) => {
    console.log(type, value)
    switch(type) {
      case "education":
        educationSelect.current = value;
        break;
      case "career":
        careerSelect.current = value;
        break;
      default:
        break;
    }
  }

  const onEducationDelete = (count) => {
    const filteredEducationInputs = educationInputs.filter((education) => {
      return education.count !== count;
    });
    setEducationInputs([...filteredEducationInputs]);
  }

  const onCareerDelete = (count) => {

    // const filteredEducationInputs = educationInputs.filter((education) => {
    //   return education.count !== count;
    // });
    // setEducationInputs([...filteredEducationInputs]);

    let tmpCareerInputs = careerInputs;
		for (const [i, each] of tmpCareerInputs.entries()) {
			if (each[0] == count) tmpCareerInputs.splice(i, 1);
		}
		setCareerInputs(tmpCareerInputs);
  }

  // legacy //
  const onInvestmentHistoryDelete = (idx) => {

  }
  // legacy //

  const toggleModal = (inputs) => {
    console.log("toggleModal", inputs)
    if (inputs === false) {
      setCurrentModal(null);
			return;
		}
    
    setCurrentModal(inputs);
	};

  const onEducationSubmit = () => {
    
  }

	return (
    <>
      <AdditionalInfoLayout ref={mainRef}>
        <h1> 추가 정보 </h1>
        <HeadlineBottomBorder />
        <section>
          <div className="row">
            <div className="title with-select-button">
              <h2> 학력 사항 입력 </h2>
              <div className="column contents">
                <Button onClick={() => {toggleModal("education")}} size="large" style={{ display: 'flex', marginLeft:'10px' }}> 
                  추가
                </Button>
              </div>
              
            </div>
          </div>
          <div className="row">
            <div className="school-inputs" style={{ height:"100px" }}>
              <span> 추가 버튼을 눌러 학력사항을 입력해주세요 </span>
            </div>
          </div>
        </section>
        <section>
          <div className="row">
            <div className="title">
              <h2> 경력 사항 입력 </h2>
              <div className="column contents">
              </div>
            </div>
          </div>
          <div className="row">
            <div className="career-inputs">
              <div className="career-input-general"> 
                <div className="row">
                  <div className="title with-select-button">
                    <h2>일반 경력사항 </h2>
                    <div className="column contents">
                      <Button size="large" style={{ display: 'flex', marginLeft:'10px' }}
                        onClick={() => { toggleModal("general"); onChangeSelect({type:"career", value:"general" }) }} 
                      > 
                        추가
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="career-input-general-contents" style={{height:"100px" }}>
                    <span> 추가 버튼을 눌러 일반 경력사항을 입력해주세요 </span>
                  </div>
                </div>
              </div>
              <div className="career-input-financial column"> 
                <div className="title with-select-button">
                  <h2>관련 경력사항 (투자 및 컨설팅 분야)</h2> 
                  <Button size="large" style={{ display: 'flex', marginLeft:'10px' }}
                    onClick={() => {toggleModal("financial"); onChangeSelect({type:"career", value:"financial" })}}
                  > 
                    추가
                  </Button>
                </div>
                
                <div className="career-input-financial-contents" style={{height:"100px" }}>
                <span> 추가 버튼을 눌러 투자 관련 경력사항을 입력해주세요 </span>
                  {/* {careerInputs.map((input, index) => {
                    return input.type === "financial" && (
                        <CareerInput type={input.type} count={input.idx} key={`career-${index}`} onCareerChange={onCareerChange} onCareerDelete={onCareerDelete} />
                      )
                    })
                  } */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="row">
            <div className="title with-select-button">
              <h2> 투자 이력 입력 </h2>
              <div className="column contents">
                <Button 
                  size="large" style={{ display: 'flex', marginLeft:'10px' }} onClick={addInvestmentHistoryInput}
                > 
                  추가
                </Button>
              </div>
              
            </div>
            <div className="row">
              <div className="investment-history-inputs">  
                {investmentHistoryInputs.map((input, index) => (
                    <InvestmentHistoryInput type={input.type} count={input.idx} key={`investment-history-${index}`} onInvestmentHistoryChange={onInvestmentHistoryChange} onInvestmentHistoryDelete={onInvestmentHistoryDelete} />
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      </AdditionalInfoLayout>
      <AdditionalInfoModalPosition ref={$modalRef} onClick={() => {toggleModal(false);}}>
        <AdditionalInfoModal onClick={(e) => { e.stopPropagation(); }}>
          
          {currentModal === "education" 
            && <EducationInputModal addEducationInput={addEducationInput} onChangeSelect={onChangeSelect} 
              educationInputs={educationInputs} onEducationChange={onEducationChange} onEducationDelete={onEducationDelete}
            />
          }
          
          {currentModal === "general" 
            && <CareerInputModal addCareerInput={addCareerInput}
            careerInputs={careerInputs} onCareerChange={onCareerChange} onCareerDelete={onCareerDelete}
            />
          }
          {currentModal === "financial" 
            && <EducationInputModal addEducationInput={addEducationInput}
              educationInputs={educationInputs} onEducationChange={onEducationChange} onEducationDelete={onEducationDelete}
            />
          }
          {/* 
                <div className="career-input-financial career-inputs-financial-modal"> 
                  <h2>관련 경력사항 (투자 및 컨설팅 분야)</h2> 
                  <div className="career-input-financial-contents">
                    {careerInputs.map((input, index) => {
                      return input.type === "financial" && (
                          <CareerInput type={input.type} count={input.idx} key={`career-${index}`} onCareerChange={onCareerChange} onCareerDelete={onCareerDelete} />
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
           */}
        </AdditionalInfoModal>
      </AdditionalInfoModalPosition>
    </>
	);
};

const AdditionalInfoModalPosition = styled.div`
  width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;

	background-color: rgba(0, 0, 0, 0.4);
	display: none;
	justify-content: center;
	align-items: center;
`;

const AdditionalInfoModal = styled.div`
  width: 70vw;
	height: 35vw;
	background-color: white;
  padding: 15px;
  z-index: 3;

	display: flex;
	flex-flow: column;

  .row {
		display: flex;
    flex-direction: column;
		
    .title, .contents {
      display: flex; 
    }
    .investment-history-inputs {
      width: 100%;
    }
    
    .left-column {
			color: blue;
			flex: 1 1 0;
		}
		.right-column {
			color: blue;
			flex: 3 1 0;
		}
	}
  
  .with-select-button {
    justify-content: space-between;
  }
  section + section {
    margin-top: 50px;
  }
  section > .row + .row {
    margin-top: 25px;
  }
`;

const AdditionalInfoLayout = styled.section`
	display: flex;
	flex-direction: column;

	.row {
		display: flex;
    flex-direction: column;
		
    .title, .contents {
      display: flex; 
    }
    .investment-history-inputs {
      width: 100%;
    }
    
    .left-column {
			color: blue;
			flex: 1 1 0;
		}
		.right-column {
			color: blue;
			flex: 3 1 0;
		}
  }
	
  .school-inputs, .career-input-general-contents, .career-input-financial-contents {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .with-select-button {
    justify-content: space-between;
  }

  section + section {
    margin-top: 50px;
  }

  section > .row + .row, .career-input-general > .row + .row, .career-input-financial > .row + .row {
    margin-top: 25px;
  }

`;

const HeadlineBottomBorder = styled.div`
	border-bottom: 2px solid;
	margin-bottom: 2rem;
`;
const AdditionalInfoColumn = styled.section`
	display: flex;
`;

export default AdditionalInfo;
