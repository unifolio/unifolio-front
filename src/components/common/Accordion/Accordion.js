import React from 'react';
import AccordionItem from './AccordionItem';


const Accordion = (props) => {
    return(
        <ul>
            <AccordionItem title="개인투자조합이란 무엇인가요?" contents="몰라요 시벌탱"/>
            <AccordionItem title="뭘 질문하라는 거지?? 지훈아?" contents="뭘 대답하라는 거야??? 지훈아?"/>
            <AccordionItem title="뭘 질문하라는 거지?? 지훈아?" contents="뭘 대답하라는 거야??? 지훈아?"/>
        </ul>
    )
}

export default Accordion;