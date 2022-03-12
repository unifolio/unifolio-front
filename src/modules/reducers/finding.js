const ADD_FINDING_FILTER_PEOPLE = 'finding/ADD_FINDING_FILTER_PEOPLE';
const ADD_FINDING_FILTER_UNION = 'finding/ADD_FINDING_FILTER_UNION';
const DELETE_FINDING_FILTER_PEOPLE = 'finding/DELETE_FINDING_FILTER_PEOPLE';
const DELETE_FINDING_FILTER_UNION = 'finding/DELETE__FINDING_FILTER_UNION';

const initialState = {
  waitingPeople: [],
  waitingUnions: [],
};

const finding = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FINDING_FILTER_PEOPLE:
      return (state = {
        ...state,
        waitingPeople: [...state.waitingPeople, action.payload],
      });
    case ADD_FINDING_FILTER_UNION:
      return (state = {
        ...state,
        waitingUnions: [...state.waitingUnions, action.payload],
      });
    case DELETE_FINDING_FILTER_PEOPLE:
      const deletePeopleOption = state.waitingPeople.filter(
        (option) => option !== action.payload,
      );
      return (state = {
        ...state,
        waitingPeople: deletePeopleOption,
      });
    case DELETE_FINDING_FILTER_UNION:
      const deleteUnionOption = state.waitingUnions.filter(
        (option) => option !== action.payload,
      );
      return (state = {
        ...state,
        waitingUnions: deleteUnionOption,
      });
    default:
      return state;
  }
};

export default finding;
