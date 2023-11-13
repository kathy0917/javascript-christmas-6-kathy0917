import { Console } from '@woowacourse/mission-utils';
import * as error from '../constants/Error.js';
import InputView from '../view/InputView.js';

const InputError = {
  async checkVisitDateError(visitDate) {
    try {
      if (isNaN(Number(visitDate)) || Number(visitDate) < 1 || Number(visitDate) > 31) {
        throw new Error(error.DATE_NOT_VALID_NUMBER_ERROR);
      }
    } catch (error) {
      Console.print(error.message);
      InputView.readDate();
    }
  },
};

export default InputError;
