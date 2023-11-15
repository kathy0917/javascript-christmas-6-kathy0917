import { Console } from '@woowacourse/mission-utils';
import * as error from '../constants/Error.js';
import OrderMenu from '../OrderMenu.js';

const InputError = {
  async checkVisitDateError(visitDate) {
    try {
      if (isNaN(Number(visitDate)) || Number(visitDate) < 1 || Number(visitDate) > 31) {
        throw new Error(error.DATE_NOT_VALID_NUMBER_ERROR);
      }
      return true;
    } catch (error) {
      Console.print(error.message);
      return false;
    }
  },
  async checkOrderMenuError(menu) {
    const splitMenus = menu.split(',').map((ele) => ele);
    const orderMenuList = [];
    const orderMenuObject = new OrderMenu();
    let result = true;

    for (let ele of splitMenus) {
      const [name, cnt] = orderMenuObject.splitMenu(ele);
      orderMenuList.push([name, cnt]);
      result = await orderMenuObject.checkError(ele, menu);
      if (result === false) break;
    }

    return result;
  },
};

export default InputError;
