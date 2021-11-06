import { useState } from "react";

import ProfileCareerInputFinancial from 'composition/Profile/ProfileCareerInputFinancial';

const useCareerInputs = ({counts, user = null, at, isModifiable}) => {
  const [careerInputs, setCareerInputs] = useState([{
    count: 1,
    type: "financial",
    info: { status: null, company: null, job: null, start_date: null, end_date: null }
  },
  {
    count: 2,
    type: "financial",
    info: { status: null, company: null, job: null, start_date: null, end_date: null }
  }]);

  const handleCareerInputCreate = (selectedCareerInfo = "financial") => {
    let data = {
      count: counts.current.career + 1, // count,
      type: selectedCareerInfo, //selected,
      info: { status: null, company: null, job: null, start_date: null, end_date: null }
    }
    counts.current.career += 1;
    setCareerInputs([...careerInputs, data]);
  }

  const handleCareerInputUpdate = ({ count, name, value }) => {
    const changedCareerInputs = careerInputs.map((careerInput) => {
      if (careerInput.count === Number(count)) {
        if (name.includes("status")) careerInput.info["status"] = value;
        else if (name.includes("category")) careerInput.info["category"] = {category: value};
        else if (name.includes("company")) careerInput.info["company"] = value;
        else if (name.includes("job")) careerInput.info["job"] = value;
        else if (name.includes("start-date")) careerInput.info["start_date"] = value;
        else if (name.includes("end-date")) careerInput.info["end_date"] = value;
        careerInput.info["option_type"] = careerInput.type;
      }
      return careerInput;
    });
    setCareerInputs(changedCareerInputs);
	};

  const handleCareerInputDelete = (count) => {
    const filteredCareerInputs = careerInputs.filter((career) => {
      return career.count !== count;
    });
    setCareerInputs(filteredCareerInputs);
  }

  const inputSelector = () => {
    if (at.includes("/profile") || isModifiable) {
      return ProfileCareerInputFinancial;
    } else if (at.includes("/union-create/business")) {
      return ProfileCareerInputFinancial;
    } 
  }

  return {
    careerInputs, 
    handleCareerInput: {
      create: handleCareerInputCreate,
      update: handleCareerInputUpdate,
      delete: handleCareerInputDelete,      
    },
    CareerInput: inputSelector()
  }
};

export default useCareerInputs;