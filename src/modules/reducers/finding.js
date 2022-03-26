export const CHANGE_AMOUNT_RANGE_FILTER_PEOPLE =
  'finding/CHANGE_AMOUNT_RANGE_FILTER_PEOPLE';
export const ADD_CAREERSID_FILTER_PEOPLE =
  'finding/ADD_CAREERSID_FILTER_PEOPLE';
export const DELETE_CAREERSID_FILTER_PEOPLE =
  'finding/DELETE_CAREERSID_FILTER_PEOPLE';

export const SET_END_DATE_UNION = 'finding/SET_END_DATE_UNION';
export const DELETE_END_DATE_UNION = 'finding/DELETE_END_DATE_UNION';

export const CHANGE_COLLECT_AMOUNT_RANGE_FILTER_UNION =
  'finding/CHANGE_COLLECT_AMOUNT_RANGE_FILTER_UNION';
export const CHANGE_AMOUNT_RANGE_FILTER_UNION =
  'finding/CHANGE_AMOUNT_RANGE_FILTER_UNION';

export const ADD_CATEGORISID_FILTER_UNION =
  'finding/ADD_CATEGORISID_FILTER_UNION';
export const DELETE_CATEGORISID_FILTER_UNION =
  'finding/DELETE_CATEGORISID_FILTER_UNION';

const initialState = {
  waitingPeople: {
    amountRange: 0,
    careersId: [],
  },
  waitingUnions: {
    collectAmountRange: 0,
    amountRange: 0,
    categoriesId: [],
    endDate: null,
  },
};

const finding = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_AMOUNT_RANGE_FILTER_PEOPLE:
      return (state = {
        ...state,
        waitingPeople: { ...state.waitingPeople, amountRange: action.payload },
      });

    case ADD_CAREERSID_FILTER_PEOPLE:
      return (state = {
        ...state,
        waitingPeople: {
          ...state.waitingPeople,
          careersId: [...state.waitingPeople.careersId, action.payload],
        },
      });
    case DELETE_CAREERSID_FILTER_PEOPLE:
      const deleteCaeersIdOption = state.waitingPeople.careersId.filter(
        (option) => JSON.stringify(option) !== JSON.stringify(action.payload),
      );
      return (state = {
        ...state,
        waitingPeople: {
          ...state.waitingPeople,
          careersId: deleteCaeersIdOption,
        },
      });

    case SET_END_DATE_UNION:
      return (state = {
        ...state,
        waitingUnions: {
          ...state.waitingUnions,
          endDate: JSON.stringify(action.payload),
        },
      });

    case DELETE_END_DATE_UNION:
      return (state = {
        ...state,
        waitingUnions: { ...state.waitingUnions, endDate: null },
      });

    case CHANGE_COLLECT_AMOUNT_RANGE_FILTER_UNION:
      return (state = {
        ...state,
        waitingUnions: {
          ...state.waitingUnions,
          collectAmountRange: action.payload,
        },
      });
    case CHANGE_AMOUNT_RANGE_FILTER_UNION:
      return (state = {
        ...state,
        waitingUnions: { ...state.waitingUnions, amountRange: action.payload },
      });

    case ADD_CATEGORISID_FILTER_UNION:
      return (state = {
        ...state,
        waitingUnions: {
          ...state.waitingUnions,
          categoriesId: [...state.waitingUnions.categoriesId, action.payload],
        },
      });
    case DELETE_CATEGORISID_FILTER_UNION:
      const deleteCategoriesIdOption = state.waitingUnions.categoriesId.filter(
        (option) => JSON.stringify(option) !== JSON.stringify(action.payload),
      );
      return (state = {
        ...state,
        waitingUnions: {
          ...state.waitingUnions,
          categoriesId: deleteCategoriesIdOption,
        },
      });

    default:
      return state;
  }
};

export default finding;
