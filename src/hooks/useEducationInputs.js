import { useState } from "react";

import ProfileEducationInput from 'composition/Profile/ProfileEducationInput';
import EducationInputContainer from 'containers/EducationInputContainer';

const useEducationInputs = ({counts, user = null, at, isModifiable}) => {
  const [educationInputs, setEducationInputs] = useState(
    (!!user && user.education.length !== 0)
    ? user.education?.map((educationInput, i) => {
      return {
        count: i+1,
        type: educationInput.education_type,
        info: {
          school_name: educationInput.school_name,
          major: educationInput.major,
          education_type: educationInput.education_type,
          attend_status: educationInput.attend_status,
        }
      }})
    : [{
        count: 1,
        type: "highschool",
        info: { school_name: "", major: "", education_type: "highschool", attend_status: null  }
      },
      {
        count: 2,
        type: "undergraduate",
        info: { school_name: "", major: "", education_type: "undergraduate", attend_status: null  }
      }]
  );

  const handleEducationInputCreate = (selectedEducationType = "highschool") => {
    console.log("selectedEducationType", selectedEducationType)
    let data = {
      count: counts.current.education + 1, // count,
      type: selectedEducationType, //selected,
      info: { school_name: "", major: "", education_type: selectedEducationType, attend_status: null }
    }

    counts.current.education += 1;
    setEducationInputs([...educationInputs, data]);
  }

  const handleEducationInputBulkCreate = (educationInformations) => {
    setEducationInputs([...educationInputs, ...educationInformations]);
  }

  const handleEducationInputUpdate = ({ count, name, value }) => {
    
    const changedEducationInputs = educationInputs.map((educationInput) => {
      if (educationInput.count === Number(count)) {
        if (name.includes("attend-status")) educationInput.info["attend_status"] = value
        else if (name.includes("school-name")) educationInput.info["school_name"] = value
        else if (name.includes("major")) educationInput.info["major"] = value;
        else if (name.includes("education_type")) educationInput.info["education_type"] = value;
      }
      return educationInput;
    });
    setEducationInputs(changedEducationInputs);
	};

  const handleEducationInputDelete = (count) => {
    const filteredEducationInputs = educationInputs.filter((education) => {
      return education.count !== count;
    });
    setEducationInputs(filteredEducationInputs);
  }

  const handleChangeEducationInputType = (payload) => {
    const changedEducationInputs = educationInputs.map((inputData) => {
      if (inputData.count === payload.count) {
        return {
          count: payload.count,
          type: payload.type,
          info: { attend_status: null, education_type: payload.type, major: "", school_name: ""}
        }
      }
      return inputData;
    });
    setEducationInputs(changedEducationInputs);
  }

  const selectEducationType = (educationType) => {
    switch(educationType){
      case "highschool":
        return "고등학교";
      case "undergraduate":
        return "대학교";
      case "master":
        return "대학원 (석사)";
      case "doctor":
        return "대학원 (박사)";
      default:
        return "에러입니다. 관리자에게 문의하세요."
    }
  }

  const inputSelector = () => {
    if (at.includes("/profile") || isModifiable) {
      return ProfileEducationInput;
    } else if (at.includes("/union-create/business")) {
      return EducationInputContainer;
    } 
  }

  return {
    educationInputs,
    handleEducationInput: {
      create: handleEducationInputCreate,
      bulkcreate: handleEducationInputBulkCreate,
      update: handleEducationInputUpdate,
      delete: handleEducationInputDelete,
      changeType: handleChangeEducationInputType,
    },
    selectEducationType,
    EducationInput: inputSelector()
  }
};

export default useEducationInputs;