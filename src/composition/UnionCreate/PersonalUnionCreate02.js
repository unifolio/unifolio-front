import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Input, Button, Select } from "antd";

import Numpad from "components/common/Numpad";
import useFetchCategories from "hooks/useFetchCategories";

const PersonalUnionCreate02 = React.memo((props) => {
  const { onClickNext, className } = props;
  const [unionCreate02Inputs, setUnionCreate02Inputs] = useState({
    name: "",
    invest_category_1: "",
    invest_category_2: "",
    invest_category_3: "",
    invest_category: [],

    recruitment_start_date: "",
    recruitment_end_date: "",
    expected_amount: null,

    amount_per_account: null,
    total_account: null,

    amount_operator_ratio: null,
    amount_operator: null,
    num_of_account_by_operator: null,

    amount_lp_ratio: null,
    amount_lp: null,
    num_of_account_by_lp: null,
    min_of_account: null,

    real_period: "",
    extend_year: "",
  });

  // destructured state values
  const {
    name,
    invest_category_1,
    invest_category_2,
    invest_category_3,
    invest_category,
    recruitment_start_date,
    recruitment_end_date,
    expected_amount,
    amount_per_account,
    total_account,
    amount_operator_ratio,
    amount_operator,
    num_of_account_by_operator,
    amount_lp_ratio,
    amount_lp,
    num_of_account_by_lp,
    min_of_account,
    real_period,
    extend_year,
  } = unionCreate02Inputs;

  useEffect(() => {
    calculate();
  }, [
    unionCreate02Inputs.amount_per_account,
    unionCreate02Inputs.expected_amount,
    unionCreate02Inputs.num_of_account_by_operator,
    unionCreate02Inputs.min_of_account,
    // unionCreate02Inputs.amount_lp_ratio, total_account
  ]);

  const { categories } = useFetchCategories();

  const onChange = (e) => {
    if (e.type.includes("calendar")) {
      // 캘린더일 때
      const date = new Date(e.value);
      const yy = date.getFullYear();
      const mm =
        date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
      const dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      if (e.type === "start-calendar") {
        setUnionCreate02Inputs({
          ...unionCreate02Inputs,
          ["recruitment_start_date"]: `${yy}-${mm}-${dd}`,
        });
      } else {
        setUnionCreate02Inputs({
          ...unionCreate02Inputs,
          ["recruitment_end_date"]: `${yy}-${mm}-${dd}`,
        });
      }

      return;
    }

    if (!e.target) {
      // select & numPad
      let { value, name } = e;
      setUnionCreate02Inputs({
        ...unionCreate02Inputs,
        [name]: Number(value.replace(/,/g, "")),
      });
      return;
    }

    if (e?.target.name.includes("invest_category")) {
      const targetRound = e.target.name.split("_").pop();
      let investCategories = unionCreate02Inputs.invest_category;
      investCategories[targetRound - 1] = { category: e.target.value };
      setUnionCreate02Inputs({
        ...unionCreate02Inputs,
        ["invest_category"]: [...investCategories],
        [e.target.name]: e.target.value,
      });
      return;
    }

    // default
    setUnionCreate02Inputs({
      ...unionCreate02Inputs,
      [e.target.name]: e.target.value,
    });
  };

  const isNotNull = (state) => {
    return state !== null;
  };
  const convertToMoney = (nums) => {
    return `${Number(nums)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const calculate = () => {
    const newState = {};
    if (isNotNull(amount_per_account) && isNotNull(expected_amount)) {
      newState["total_account"] = Math.floor(
        expected_amount / amount_per_account
      );
    }
    if (
      isNotNull(num_of_account_by_operator) &&
      isNotNull(expected_amount) &&
      isNotNull(total_account) &&
      isNotNull(amount_per_account)
    ) {
      newState["amount_operator"] =
        amount_per_account * num_of_account_by_operator;
      newState["amount_operator_ratio"] = Math.floor(
        (num_of_account_by_operator / total_account) * 100
      );
    }
    if (
      isNotNull(min_of_account) &&
      isNotNull(amount_operator) &&
      isNotNull(amount_operator_ratio)
    ) {
      newState["num_of_account_by_lp"] =
        total_account - num_of_account_by_operator;
      newState["amount_lp"] = expected_amount - amount_operator;
      newState["amount_lp_ratio"] = Math.floor(100 - amount_operator_ratio);
    }
    setUnionCreate02Inputs({ ...unionCreate02Inputs, ...newState });
  };

  const layoutRef = useRef();
  const $startCalendar = useRef();
  const $endCalendar = useRef();
  const $toggleBack = useRef();

  const handleNext = (e) => {
    const checkList = [
      "expected_amount",
      "amount_per_account",
      "amount_operator",
      "amount_lp",
    ];
    checkList.forEach(
      (key) =>
        (unionCreate02Inputs[key] = Math.floor(
          unionCreate02Inputs[key] / 1000000
        ))
    );

    const invest_category = [
      { category: unionCreate02Inputs.invest_category_1 },
      { category: unionCreate02Inputs.invest_category_2 },
      { category: unionCreate02Inputs.invest_category_3 },
    ];
    unionCreate02Inputs.invest_category = invest_category;
    console.log(unionCreate02Inputs);
    onClickNext(unionCreate02Inputs, 2);
  };

  const toggleCalender = ({ target }) => {
    if (target.className.includes("toggle-back")) {
      [$toggleBack, $startCalendar, $endCalendar].forEach(($elem) => {
        $elem.current.style.display = "none";
      });
    } else {
      $toggleBack.current.style.display = "block";
      if (target.className.includes("start-calendar")) {
        $startCalendar.current.style.display = "block";
      } else if (target.className.includes("end-calendar")) {
        $endCalendar.current.style.display = "block";
      }
    }
  };

  const handleCareerChange = () => {};
  if (categories.length === 0) return <></>;
  return (
    <PersonalUnionCreate02Layout className={className} ref={layoutRef}>
      <ToggleBack
        onClick={toggleCalender}
        ref={$toggleBack}
        className={"toggle-back"}
      />
      <Input name={`hidden`} size="large" disabled type={"hidden"} />{" "}
      {/* 첫번째 disabled input은 스타일을 안먹는 버그가 있음. */}
      <section>
        <div className="row">
          <div className="column">
            <div className="column title">
              <h2> 조합 이름 </h2>
            </div>
            <div className="column contents">
              <NumInput
                name={`name`}
                value={name}
                size="large"
                placeholder="조합 이름"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="column">
            <div className="column title">
              <h2> 투자 종목 </h2>
            </div>
            <div className="column contents">
              <div className="row">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Select
                    name={`invest_category_${i + 1}`}
                    size="large"
                    placeholder={`투자 ${i + 1}종목`}
                    onChange={(value) => {
                      setUnionCreate02Inputs({
                        ...unionCreate02Inputs,
                        [`invest_category_${i + 1}`]: value,
                      });
                    }}
                  >
                    {categories
                      .filter(
                        (category) =>
                          ![
                            unionCreate02Inputs.invest_category_1,
                            unionCreate02Inputs.invest_category_2,
                            unionCreate02Inputs.invest_category_3,
                          ].includes(category.id)
                      )
                      .map((categoryData, i) => {
                        // return (
                        //   <Select.Option key={`category-${categoryData.id}-${categoryData.category}`} value={categoryData.category}>
                        //     {categoryData.category}
                        //   </Select.Option>
                        // ); //임시 0131
                        return (
                          <Select.Option
                            key={`category-${categoryData.id}-${categoryData.category}`}
                            value={categoryData.id}
                          >
                            {categoryData.category}
                          </Select.Option>
                        );
                      })}
                  </Select>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="column title">
          <h2> 모집 기간 </h2>
        </div>
        <div className="column contents">
          <div className="row">
            <div className="row wrapper">
              <Input
                className={"start-calendar"}
                value={recruitment_start_date}
                style={{ width: "30%" }}
                size="large"
                placeholder="모집 시작 날짜"
                onFocus={toggleCalender}
              />
              <div
                ref={$startCalendar}
                style={{
                  position: "absolute",
                  marginTop: "60px",
                  display: "none",
                  zIndex: 2,
                }}
              >
                <Calendar
                  onChange={(value) => {
                    onChange({ type: "start-calendar", value: value });
                  }}
                />
              </div>
            </div>
            <span> ~ </span>
            <div className="row wrapper">
              <Input
                className={"end-calendar"}
                value={recruitment_end_date}
                style={{ width: "30%" }}
                size="large"
                placeholder="모집 마감 날짜"
                onFocus={toggleCalender}
              />
              <div
                ref={$endCalendar}
                style={{
                  position: "absolute",
                  marginTop: "60px",
                  display: "none",
                  zIndex: 2,
                }}
              >
                <Calendar
                  onChange={(value) => {
                    onChange({ type: "end-calendar", value: value });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="column title">
          <h2> 출자 금액 </h2>
        </div>
        <div className="column contents">
          <div className="row">
            <div className="column amount-contents">
              <div className="row">
                <Numpad
                  ActiveComponent={
                    <NumInput
                      name={`expected_amount`}
                      value={unionCreate02Inputs.expected_amount}
                      style={{ width: "30%" }}
                      size="large"
                      placeholder="목표 출자금 (최소 1억원 이상)"
                      onChange={onChange}
                    />
                  }
                  min={100000000}
                  monetaryUnit={100000000}
                />
                <span>원</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="column title">
          <h2> 출자 1좌별 금액 </h2>
        </div>
        <div className="column contents">
          <div className="row">
            <div className="column amount-contents">
              <div className="row">
                <Numpad
                  ActiveComponent={
                    <NumInput
                      name={`amount_per_account`}
                      value={unionCreate02Inputs.amount_per_account}
                      style={{ width: "100%" }}
                      size="large"
                      placeholder="출좌 1좌별 금액 (최소 100만원 이상)"
                      onChange={onChange}
                    />
                  }
                  min={1000000}
                  monetaryUnit={1000000}
                />
                {/* <Input name={`amount_per_account`} type="number" value={unionCreate02Inputs.amount_per_account} style={{ width: '30%' }} size="large" placeholder="목표 출자금 (최소 1억원 이상)" onChange={onChange} />  */}
                <span>원</span>
              </div>
            </div>
            <div className="column amount-contents">
              <div className="row">
                <span>총</span>
                <Input
                  name={`total_account`}
                  value={total_account}
                  size="large"
                  disabled
                />
                <span>구좌</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="column title">
          <h2> 운용사 출자 금액 </h2>
        </div>
        <div className="column contents">
          <div className="row">
            <div className="column amount-contents">
              <div className="row">
                <span>총</span>
                <Numpad
                  ActiveComponent={
                    <NumInput
                      name={`num_of_account_by_operator`}
                      value={num_of_account_by_operator}
                      style={{ width: "100%" }}
                      className={"ant-input-lg"}
                      onChange={onChange}
                    />
                  }
                />
                {/* <Input name={`num_of_account_by_operator`} value={num_of_account_by_operator} style={{ width: '30%' }} className={"ant-input-lg"} onChange={onChange}/>  */}
                <span>구좌</span>
              </div>
            </div>
            <div className="column amount-contents">
              <div className="row">
                <Input
                  name={`amount_operator`}
                  value={convertToMoney(amount_operator)}
                  style={{ width: "30%" }}
                  size="large"
                  disabled
                />
                <span>원</span>
              </div>
            </div>
            <div className="column amount-contents">
              <div className="row">
                <Input
                  name={`amount_operator_ratio`}
                  value={amount_operator_ratio}
                  style={{ width: "30%" }}
                  size="large"
                  placeholder="운용사 출자 예정 비율"
                  disabled
                />
                <span>%</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="colmun amount-contents--label">
              <label>
                * 업무집행조합원의 경우 필수적으로 출자 총액의 5% 이상
                출자해야합니다.
              </label>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="column title">
          <h2>조합원 출자 금액</h2>
        </div>
        <div className="column contents">
          <div className="row">
            <div className="column amount-contents">
              <div className="row">
                <span>총</span>
                <Input
                  name={`num_of_account_by_lp`}
                  value={num_of_account_by_lp}
                  style={{ width: "30%" }}
                  size="large"
                  disabled
                />
                <span>구좌</span>
              </div>
            </div>
            <div className="column amount-contents">
              <div className="row">
                <span>최소</span>
                <Numpad
                  ActiveComponent={
                    <NumInput
                      name={`min_of_account`}
                      value={min_of_account}
                      style={{ width: "100%" }}
                      size="large"
                      placeholder={"최소 구좌 갯수"}
                      onChange={onChange}
                    />
                  }
                  min={1}
                />
                {/* <Input name={`min_of_account`} value={min_of_account} style={{ width: '30%' }} size="large" placeholder={"최소 구좌 갯수"} onChange={onChange}/>  */}
                <span>구좌</span>
              </div>
            </div>
            <div className="column amount-contents">
              <div className="row">
                <Input
                  name={`amount_lp`}
                  value={convertToMoney(amount_lp)}
                  style={{ width: "30%" }}
                  size="large"
                  disabled
                />
                <span>원</span>
              </div>
            </div>
            <div className="column amount-contents">
              <div className="row">
                <Input
                  name={`amount_lp_ratio`}
                  value={amount_lp_ratio}
                  style={{ width: "30%" }}
                  size="large"
                  disabled
                />
                <span>%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="column title">
          <h2> 조합 존속기간 </h2>
        </div>
        <div className="column contents">
          <div className="row">
            <div className="column amount-contents">
              <div className="row">
                <Input
                  name={`real_period`}
                  value={real_period}
                  style={{ width: "90%" }}
                  size="large"
                  placeholder="조합 존속 기간"
                  onChange={onChange}
                />
                <span>년</span>
              </div>
            </div>
            <div className="column amount-contents">
              <div className="row">
                <Input
                  name={`extend_year`}
                  value={extend_year}
                  style={{ width: "90%" }}
                  size="large"
                  placeholder="존속기간 만료시 최대 연장기간"
                  onChange={onChange}
                />
                <span>년</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <NextButton onClick={handleNext}>
          임시 저장 후 다음 단계 진행하기
        </NextButton>
      </section>
    </PersonalUnionCreate02Layout>
  );
});
const NextButton = styled.button`
  height: 3rem;
  border: none;
  padding: 0 1rem;
  flex-grow: 1;
`;

const NumInput = styled.input`
  margin: 0;
  padding: 0;
  border: 1px solid #d9d9d9;
  color: rgba(0, 0, 0, 0.85);
  border-radius: 2px;
  box-sizing: border-box;
  padding: 6.5px 11px;
  font-size: 16px;
`;

const ToggleBack = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1;

  display: none;
  position: absolute;
`;

const PersonalUnionCreate02Layout = styled.div`
  width: 100%;
  margin-bottom: 10px;

  display: flex;
  flex-direction: column;

  section + section {
    margin-top: 50px;
  }

  h2 {
    font-size: 20px !important;
  }

  span {
    margin-left: 10px;
    margin-right: 10px;

    display: flex;
    align-items: center;
    flex-shrink: 0; // == flex-basis: content-size
  }

  .column {
    display: flex;
    flex-direction: column;
    width: 100%;

    &.title {
      display: flex;
      flex-direction: column;
    }

    &.contents {
      display: flex;
      flex-grow: 7;
      flex-direction: column;
    }
  }

  .row > .column + .column {
    margin-left: 15px;
  }
  /* .column.title {
    display: flex;
		flex-direction: column;
    /* flex-basis:100px; */
  // }

  .row {
    width: 100%;
    display: flex;
  }
  .column.contents {
    /* display: flex;
    flex-grow: 7;
		flex-direction: column; */

    .ant-input {
      margin-right: 10px;

      display: flex;
      flex-grow: 1;
    }

    .ant-select {
      width: 120px;
      margin-right: 10px;

      display: flex;
      flex-shrink: 0;
    }

    .amount-contents + .amount-contents {
      margin-left: 15px;
    }
  }
`;

export default PersonalUnionCreate02;
