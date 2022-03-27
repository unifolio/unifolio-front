import { END_POINT } from 'lib/api';
import qs from 'qs';

export const generateApiLinkPeople = (amountRange, careersId) => {
  let min_maximum_investable_amount;
  let max_maximum_investable_amount;
  const careerIdArray = careersId.map((carrers) => carrers.id);
  let careers_id =
    !!careerIdArray.length !== 0
      ? qs.stringify({ careers_id: careerIdArray }, { arrayFormat: 'comma' })
      : null;

  if (amountRange === 1) {
    max_maximum_investable_amount = 500;
  }
  if (amountRange === 2) {
    min_maximum_investable_amount = 500;
    max_maximum_investable_amount = 1000;
  }
  if (amountRange === 3) {
    min_maximum_investable_amount = 1000;
  }

  return `${END_POINT}/users/general/?${
    min_maximum_investable_amount
      ? `min_maximum_investable_amount=${min_maximum_investable_amount}&`
      : ''
  }${
    max_maximum_investable_amount
      ? `max_maximum_investable_amount=${max_maximum_investable_amount}&`
      : ''
  }${careers_id ? `${careers_id}` : ''}`;
};

export const generateApiLinkUnion = (
  endDate,
  collectAmountRange,
  amountRange,
  categoriesId,
) => {
  let min_collected_amount;
  let max_collected_amount;
  let min_min_of_amount;
  let max_min_of_amount;
  if (collectAmountRange === 1) {
    max_collected_amount = 20000;
  }
  if (collectAmountRange === 2) {
    min_collected_amount = 20000;
    max_collected_amount = 40000;
  }
  if (collectAmountRange === 3) {
    min_collected_amount = 40000;
  }

  if (amountRange === 1) {
    max_min_of_amount = 500;
  }
  if (amountRange === 2) {
    min_min_of_amount = 500;
    max_min_of_amount = 1000;
  }
  if (amountRange === 3) {
    min_min_of_amount = 1000;
  }
  const categoriesIdArray = categoriesId.map((category) => category.id);

  let categories_Id =
    !!categoriesIdArray.length !== 0
      ? qs.stringify(
          { invest_categories_id: categoriesIdArray },
          { arrayFormat: 'comma' },
        )
      : null;
  return `${END_POINT}/unions/waiting/?${
    endDate ? `recruitment_end_date=${endDate.replace(/"/g, '')}&` : ''
  }${
    min_collected_amount ? `min_collected_amount=${min_collected_amount}&` : ''
  }${
    max_collected_amount ? `max_collected_amount=${max_collected_amount}&` : ''
  }${min_min_of_amount ? `min_min_of_amount=${min_min_of_amount}&` : ''}${
    max_min_of_amount ? `max_min_of_amount=${max_min_of_amount}&` : ''
  }${categories_Id ? `${categories_Id}` : ''}`;
};
