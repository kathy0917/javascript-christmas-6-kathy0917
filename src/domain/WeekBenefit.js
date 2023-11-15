import { Console } from '@woowacourse/mission-utils';
import * as error from '../constants/Error.js';
import InputView from '../view/InputView.js';
import orderMenu from '../orderMenu.js';

const WeekBenefits = {
  async calculateWeekDayBenefitSum(calculatorObject, orderMenu, date) {
    let weekDayDiscount = 0;

    for (let menu of [...orderMenu.split(',')]) {
      weekDayDiscount += await calculatorObject.calculateWeekDayDiscount(date, menu);
    }
    weekDayDiscount = weekDayDiscount * 2023;
    return weekDayDiscount;
  },
  async calculateWeekendBenefitSum(calculatorObject, orderMenu, date) {
    let weekendDiscount = 0;

    for (let menu of [...orderMenu.split(',')]) {
      weekendDiscount += await calculatorObject.calculateWeekendDiscount(date, menu);
    }
    weekendDiscount = weekendDiscount * 2023;
    return weekendDiscount;
  },
};

export default WeekBenefits;
