import PersonalUnionCreate01 from 'composition/UnionCreate/PersonalUnionCreate01';
import PersonalUnionCreate02 from 'composition/UnionCreate/PersonalUnionCreate02';
import PersonalUnionCreate03 from 'composition/UnionCreate/PersonalUnionCreate03';
import PersonalUnionCreate04 from 'composition/UnionCreate/PersonalUnionCreate04';
import PersonalUnionCreate05 from 'composition/UnionCreate/PersonalUnionCreate05';

import BusinessUnionCreate01 from 'composition/UnionCreate/BusinessUnionCreate01';
import BusinessUnionCreate02 from 'composition/UnionCreate/BusinessUnionCreate02';
import BusinessUnionCreate03 from 'composition/UnionCreate/BusinessUnionCreate03';
import BusinessUnionCreate04 from 'composition/UnionCreate/BusinessUnionCreate04';
import BusinessUnionCreate05 from 'composition/UnionCreate/BusinessUnionCreate05';
import BusinessUnionCreate06 from 'composition/UnionCreate/BusinessUnionCreate06';

export const Personal = {
  _01: PersonalUnionCreate01,
  _02: PersonalUnionCreate02,
  _03: PersonalUnionCreate03,
  _04: PersonalUnionCreate04,
  _05: PersonalUnionCreate05,
}

export const Business = {
  _01: BusinessUnionCreate01,
  _02: BusinessUnionCreate02,
  _03: BusinessUnionCreate03,
  _04: BusinessUnionCreate04,
  _05: BusinessUnionCreate05,
  _06: BusinessUnionCreate06
}