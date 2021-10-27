import PersonalUnionCreate01 from 'composition/UnionCreate/PersonalUnionCreate01';
import PersonalUnionCreate02 from 'composition/UnionCreate/PersonalUnionCreate02';
import PersonalUnionCreate03 from 'composition/UnionCreate/PersonalUnionCreate03';
import PersonalUnionCreate04 from 'composition/UnionCreate/PersonalUnionCreate04';
import PersonalUnionCreate05 from 'composition/UnionCreate/PersonalUnionCreate05';

export const Personal = {
  _01: PersonalUnionCreate01,
  _02: PersonalUnionCreate02,
  _03: PersonalUnionCreate03,
  _04: PersonalUnionCreate04,
  _05: PersonalUnionCreate05,
}

export const Corporation = {
  _01: PersonalUnionCreate01,
  _02: PersonalUnionCreate02,
  _03: PersonalUnionCreate03,
  _04: PersonalUnionCreate04,
  _05: PersonalUnionCreate05,
}

// export {
//   PersonalUnionCreate01 as _01,
//   PersonalUnionCreate02 as _02,
//   PersonalUnionCreate03 as _03,
//   PersonalUnionCreate04 as _04,
//   PersonalUnionCreate05 as _05
// }