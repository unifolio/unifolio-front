import React from 'react';
import AccordionItem from './AccordionItem';
import Conditional from '../../common/Conditional';
import SignupAccordionItem from './SignupAccordionItem';

const Accordion = (props) => {
  return (
    <ul>
      <Conditional condition={props.type === 'signup'}>
        <SignupAccordionItem
          title='개인정보 수집 및 이용에 관한 동의 (필수)'
          contents='내용 미정'
          checkBox={props.checkBox1}
        />
        <SignupAccordionItem
          title='홍보 및 마케팅에 관한 동의 (선택)'
          contents='내용 미정'
          checkBox={props.checkBox2}
        />
      </Conditional>
      <Conditional condition={props.type !== 'signup'}>
        <AccordionItem
          title='유니폴리오의 이용 방법은 어떻게 되나요?'
          contents='출자자는 개인 회원가입 이후 자신의 경력을 등록할 수 있습니다. 본인의 경력은 운용사가 출자 요청 수락 여부를 판단하기 위해 사용합니다. 운용사는 법인 회원가입 이후 회사의 투자 이력을 등록할 수 있습니다. 회사의 투자 이력은 출자자가 출자 요청 여부를 판단하기 위해 사용합니다. 운용사가 만들 개인투자조합에 출자자가 다 모였다면, 운용사는 자동으로 완성된 서류를 중소벤처기업부에 제출해 조합을 결성할 수 있습니다.'
        />
        <AccordionItem
          title='출자자가 개인투자조합에 출자할 수 있는 조건이 있나요?'
          contents=' 없습니다. 운용사가 만들 개인투자조합의 최소 조건에 부합하면, 그 이후에는 출자자의 이력과 운용사의 투자 이력을 통해 서로 대화를 통해 진행합니다.'
        />
        <AccordionItem
          title='유니폴리오가 개인투자조합 결성 대행을 해주는 것 인가요?'
          contents='아직은 아닙니다. 현재는 개인투자조합 결성 중개 기능과 등록 서류 자동화 기능을 제공하고 있지만, 추후 결성 대행까지 기능을 업데이트할 예정입니다.'
        />
        <AccordionItem
          title='개인이 개인투자조합을 만들 수 있나요?'
          contents='아직은 없습니다. 다만, 추후 개인이 개인투자조합을 만들 수 있는 기능까지 업데이트할 예정입니다.'
        />
        <AccordionItem
          title='법인이 개인투자조합에 출자할 수 있나요?'
          contents='아직은 없습니다. 다만, 추후 법인이 개인투자조합에 출자할 수 있는 기능까지 업데이트할 예정입니다.'
        />
        <AccordionItem
          title='출자금에 대한 회수는 어떻게 할 수 있나요?'
          contents='운용사가 개인투자조합을 만들때 조합 존속기한을 정합니다. 출자자는 개인투자조합에 출자를 요청할 때, 운용사가 제안한 여러 조건들을 참고해 신중하게 진행해야 합니다.'
        />
      </Conditional>
    </ul>
  );
};

export default Accordion;
