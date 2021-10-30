import { useState } from "react";
import ProfileInvestmentHistoryInput from 'composition/Profile/ProfileInvestmentHistoryInput';

const useInvestHistoryInputs = ({ counts, user }) => {
  const [investHistoryInputs, setInvestHistoryInputs] = useState(
    user.invest_history.length !== 0 
    ? user.invest_history.map((investHistoryInput, i) => {
      return {
        count: i+1,
        info: {
          category: investHistoryInput.category,
          company: investHistoryInput.company,
          description: investHistoryInput.description,
        }
      }})
    : [{ count: 1,
        info: { category: null, company: null, description: null }
      }]
  );
  
  const handleInvestHistoryInputCreate = () => {
    let data = {
      count: counts.current.investHistory + 1, // count,
      info: { category: null, company: null, description: null }
    }

    counts.current.investHistory += 1;
    setInvestHistoryInputs([...investHistoryInputs, data]);
  }


  const handleInvestHistoryInputUpdate = ({ count, name, value }) => {
    const changedInvestHistoryInputs = investHistoryInputs.map((investHistoryInput) => {
        if (investHistoryInput.count === Number(count)) {
          if (name.includes("category")) investHistoryInput.info["category"] = value;
          else if (name.includes("company")) investHistoryInput.info["company"] = value;
          else if (name.includes("description")) investHistoryInput.info["description"] = value;
        }
        return investHistoryInput;
      })
      setInvestHistoryInputs(changedInvestHistoryInputs)
	};

  const handleInvestHistoryInputDelete = (count) => {
    const filteredInvestHistoryInputs = investHistoryInputs.filter((investHistoryInput) => {
      return investHistoryInput.count !== count;
    });
    setInvestHistoryInputs(filteredInvestHistoryInputs)
  }

  // const handleChangeEducationInputType = (payload) => {
  //   const changedEducationInputs = educationInputs.map((inputData) => {
  //     if (inputData.count === payload.count) {
  //       return {
  //         count: payload.count,
  //         type: payload.type,
  //         info: { attend_status: null, education_type: payload.type, major: "", school_name: ""}
  //       }
  //     }
  //     return inputData;
  //   });
  //   setEducationInputs(changedEducationInputs);
  // }

  return {
    investHistoryInputs,
    handleInvestHistoryInput: {
      create: handleInvestHistoryInputCreate,
      update: handleInvestHistoryInputUpdate,
      delete: handleInvestHistoryInputDelete,
      // changeType: handleChangeEducationInputType,
    },
    ProfileInvestHistoryInput: ProfileInvestmentHistoryInput
  }
};

export default useInvestHistoryInputs;