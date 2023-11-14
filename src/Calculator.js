import { Console } from '@woowacourse/mission-utils';
import * as error from './constants/Error.js';
import InputView from './view/InputView.js';
import Menu from './Constants/Menu.js';

class Calculator {
  #orderMenu;
  #name;
  #count;
  #totalOrderAmount;
  #dDayDiscountAmount;
  #giveWayAmount;

  constructor(orderMenu, name, count, totalOrderAmount, dDayDiscountAmount, giveWayAmount) {
    this.#orderMenu = orderMenu;
    this.#name = name;
    this.#count = count;
    this.#totalOrderAmount = totalOrderAmount;
    this.#dDayDiscountAmount = dDayDiscountAmount;
    this.#giveWayAmount = giveWayAmount;
  }

  async splitMenu(menu) {
    const splitMenu = menu.split('-');
    let [beforeName, beforeCount] = splitMenu;

    this.#name = beforeName;
    this.#count = beforeCount;

    return [this.#name, this.#count];
  }

  async calculateTotalOrderAmount() {
    Object.entries(Menu).forEach(([title, detail]) => {
      detail.forEach((ele) => {
        if (ele.name === this.#name) this.#totalOrderAmount = ele.price * this.#count;
      });
    });

    return this.#totalOrderAmount;
  }

  async calculateGivewayMenu(totalOrderAmount) {
    if (totalOrderAmount > 120000) {
      this.#giveWayAmount = 25000;
      return this.#giveWayAmount;
    }
    return false;
  }

  async calculateDDayDiscount(date) {
    this.#dDayDiscountAmount = 1000 + (date - 1) * 100;
    if (date > 25) this.#dDayDiscountAmount = 0;
    return this.#dDayDiscountAmount;
  }

  async calculateWeekDayDiscount(date) {}
}

export default Calculator;
