import { Console } from '@woowacourse/mission-utils';
import * as error from '../constants/Error.js';
import InputView from '../view/InputView.js';
import orderMenu from '../orderMenu.js';

const InputError = {
  async checkVisitDateError(visitDate) {
    try {
      if (isNaN(Number(visitDate)) || Number(visitDate) < 1 || Number(visitDate) > 31) {
        throw new Error(error.DATE_NOT_VALID_NUMBER_ERROR);
      }
    } catch (error) {
      Console.print(error.message);
      await InputView.readDate();
    }
  },
  async checkOrderMenuError(menu) {
    try {
      const splitMenus = menu.split(',').map((ele) => ele);
      const orderMenuList = [];
      const orderMenuObject = new orderMenu();
      splitMenus.forEach((ele) => {
        orderMenuObject.splitMenu(ele);
        orderMenuList.push(orderMenuObject.resultMenu());
      });
      console.log(orderMenuList);
      await orderMenuObject.validateDuplicateMenu(orderMenuList);
    } catch (error) {
      Console.print(error.message);
      await InputView.readDate();
    }
  },
};

export default InputError;
