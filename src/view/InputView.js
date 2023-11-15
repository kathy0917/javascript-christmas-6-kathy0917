import { Console } from '@woowacourse/mission-utils';
import InputError from '../domain/InputError.js';
import * as MESSAGE from '../constants/Message.js';

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(MESSAGE.INPUT_VISIT_DATE);
    const result = await InputError.checkVisitDateError(input);

    return result === true ? input : result;
  },
  async readOrderMenu() {
    const input = await Console.readLineAsync(MESSAGE.INPUT_ORDER_MENU);
    const result = await InputError.checkOrderMenuError(input);

    return result === false ? false : input;
  },
};

export default InputView;
