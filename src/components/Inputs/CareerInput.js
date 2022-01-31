import React from "react";
import styled from "styled-components";

import { Input, Button, Select } from "antd";

import useFetchCategories from "hooks/useFetchCategories";

const CareerInput = ({
  type,
  count,
  value,
  onCareerChange,
  onCareerDelete,
}) => {
  const { categories } = useFetchCategories();
  const jobs = [
    "인사/총무/노무",
    "마케팅/MD",
    "홍보/CSR",
    "영업/영업관리",
    "회계/재무/금융",
    "해외/기술영업",
    "유통/무역/구매",
    "전략/기획",
    "IT개발",
    "서비스 기획/UI, UX등",
    "디자인/예술",
    "미디어",
    "서비스",
    "연구/설계",
    "전문/특수",
    "교육/상담/컨설팅",
    "공무원/공공/비영리",
    "생산/품질/제조",
    "기타사무",
  ];
  const jobsObjects = [
    { HR: "인사/총무/노무" },
    { MARKETING: "마케팅/MD" },
    { CSR: "홍보/CSR" },
    { SALES: "영업/영업관리" },
    { FINANCE: "회계/재무/금융" },
    { OVERSEAS: "해외/기술영업" },
    { TRADE: "유통/무역/구매" },
    { PLAN: "전략/기획" },
    { DEV: "IT개발" },
    { SERVICE_PLAN: "서비스 기획/UI, UX등" },
    { DESIGN: "디자인/예술" },
    { MEDIA: "미디어" },
    { SERVICE: "서비스" },
    { RESEARCH: "연구/설계" },
    { PROF: "전문/특수" },
    { CONSULTING: "교육/상담/컨설팅" },
    { PUBLIC: "공무원/공공/비영리" },
    { MANUFACTURE: "생산/품질/제조" },
    { ETC: "기타사무" },
  ];
  const findJob = (value) => {
    for (const jobObject of jobsObjects) {
      if (Object.values(jobObject)[0] === value) {
        return Object.keys(jobObject)[0];
      }
    }
  };

  const handleCareerChange = (e) => {
    if (!e.target) {
      // select일 때
      let { value, name } = e;
      if (name.includes("category")) {
        onCareerChange({
          count: name.slice(-1),
          name,
          value,
          // value: categories.filter((category) => category.id === value)[0]
        });
      } else {
        onCareerChange({
          count: name.slice(-1),
          value,
          name,
        });
      }
      return;
    }

    let { value, name } = e.target;
    onCareerChange({ value, name, count: name.slice(-1) });
  };

  /* legacy */
  const deleteCareerInput = (count) => {
    // let target = document.querySelector(`.career-${count}`);
    // target.parentNode.removeChild(target);
    onCareerDelete(count);
  };

  if (categories.length === 0) return <></>;

  switch (type) {
    case "general":
      return (
        <CareerContent className={`career-${count}`} style={{ width: "100%" }}>
          <div className="column contents">
            <div className="row">
              <Select
                name={`career-category-${count}`}
                size="large"
                placeholder="회사분야"
                defaultValue={value?.category?.category}
                onChange={(value) => {
                  handleCareerChange({
                    name: `career-category-${count}`,
                    value: value,
                  });
                }}
              >
                {categories.map((categoryData, i) => {
                  // return (
                  //   <Select.Option key={`career-category-${i}`} value={categoryData.category}>
                  //     {categoryData.category}
                  //   </Select.Option>
                  // ); //임시 0131
                  return (
                    <Select.Option
                      key={`career-category-${i}`}
                      value={categoryData.id}
                    >
                      {categoryData.category}
                    </Select.Option>
                  );
                })}
              </Select>
              <Input
                className={"career company"}
                value={value?.company}
                placeholder="회사명"
                size="large"
                name={`career-company-${count}`}
                onChange={handleCareerChange}
              />
              <Select
                className={"career job"}
                placeholder="직무"
                defaultValue={value?.job}
                size="large"
                name={`career-job-${count}`}
                onChange={(value) => {
                  handleCareerChange({
                    name: `career-job-${count}`,
                    value: value,
                  });
                }}
              >
                {jobs.map((job, idx) => (
                  <Select.Option
                    key={`career-${job}-${idx}`}
                    value={findJob(job)}
                  >
                    {job}
                  </Select.Option>
                ))}
              </Select>
              <Select
                name={`career-status-${count}`}
                size="large"
                placeholder="재직 상태"
                defaultValue={value?.status}
                onChange={(value) => {
                  handleCareerChange({
                    name: `career-tend-status-${count}`,
                    value: value,
                  });
                }}
              >
                <Select.Option value="True">재직 중</Select.Option>
                <Select.Option value="False">퇴사</Select.Option>
              </Select>
              <Input
                className={"career start-date"}
                placeholder="입사년도"
                value={value ? value.start_date : ""}
                size="large"
                name={`career-start-date-${count}`}
                onChange={handleCareerChange}
              />
              <span style={{ marginRight: "10px" }}>~</span>
              <Input
                className={"career end-date"}
                placeholder="퇴사년도"
                value={value ? value.end_date : ""}
                size="large"
                name={`career-end-date-${count}`}
                onChange={handleCareerChange}
              />
              <Button
                onClick={() => {
                  deleteCareerInput(count);
                }}
                style={{ height: "auto" }}
              >
                {" "}
                삭제{" "}
              </Button>
            </div>
          </div>
        </CareerContent>
      );
    case "financial":
      return (
        <CareerContent className={`career-${count}`}>
          <div className="column contents">
            <div className="row">
              <Select
                name={`career-category-${count}`}
                size="large"
                placeholder="회사분야"
                defaultValue={value?.category?.category}
                onChange={(value) => {
                  handleCareerChange({
                    name: `career-category-${count}`,
                    value: value,
                  });
                }}
              >
                {categories.map((categoryData, i) => {
                  // return (
                  //   <Select.Option
                  //     key={`career-financial-category-${i}`}
                  //     value={categoryData.category}
                  //   >
                  //     {categoryData.category}
                  //   </Select.Option>
                  // ); //임시 0131
                  return (
                    <Select.Option
                      key={`career-financial-category-${i}`}
                      value={categoryData.id}
                    >
                      {categoryData.category}
                    </Select.Option>
                  );
                })}
              </Select>
              <Input
                className={"career company"}
                placeholder="회사명"
                value={value?.company}
                size="large"
                name={`career-company-${count}`}
                onChange={handleCareerChange}
              />
              <Select
                className={"career job"}
                placeholder="직무/예시:투자심사역"
                defaultValue={value?.job}
                size="large"
                name={`career-job-${count}`}
                onChange={(value) => {
                  handleCareerChange({
                    name: `career-job-${count}`,
                    value: value,
                  });
                }}
              >
                {jobs.map((job, idx) => (
                  <Select.Option
                    key={`career-financial-${job}-${idx}`}
                    value={findJob(job)}
                  >
                    {job}
                  </Select.Option>
                ))}
              </Select>
              <Select
                name={`career-status-${count}`}
                size="large"
                placeholder="재직 상태"
                defaultValue={value?.status}
                onChange={(value) => {
                  handleCareerChange({
                    name: `career-status-${count}`,
                    value: value,
                  });
                }}
              >
                <Select.Option value="True">재직 중</Select.Option>
                <Select.Option value="False">퇴사</Select.Option>
              </Select>
              <Input
                className={"career start-date"}
                placeholder="입사년도"
                value={value ? value.start_date : ""}
                size="large"
                name={`career-start-date-${count}`}
                onChange={handleCareerChange}
              />
              <span style={{ marginRight: "10px" }}>~</span>
              <Input
                className={"career end-date"}
                placeholder="퇴사년도"
                value={value ? value.end_date : ""}
                size="large"
                name={`career-end-date-${count}`}
                onChange={handleCareerChange}
              />
              <Button
                onClick={() => {
                  deleteCareerInput(count);
                }}
                style={{ height: "auto" }}
              >
                {" "}
                삭제{" "}
              </Button>
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

  .column.title {
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

      .career.company {
        width: 25%;
        display: flex;
        flex-grow: 2;
      }
      .career.job {
        width: 37.5%;
        display: flex;
        flex-grow: 3;
      }
      .career.status {
        width: 12.5%;
        display: flex;
        flex-grow: 1;
      }
      .career.start-date {
        width: 12.5%;
        display: flex;
        flex-grow: 1;
      }
      .career.end-date {
        width: 12.5%;
        display: flex;
        flex-grow: 1;
      }
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
