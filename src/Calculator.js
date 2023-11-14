import { Console } from '@woowacourse/mission-utils';
import * as error from './constants/Error.js';
import InputView from './view/InputView.js';
import Menu from './Constants/Menu.js';

class Calculator {
  #orderMenu;
  #name;
  #count;
  #totalOrderAmount;

  constructor(orderMenu, name, count, totalOrderAmount) {
    this.#orderMenu = orderMenu;
    this.#name = name;
    this.#count = count;
    this.#totalOrderAmount = totalOrderAmount;
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

  async calcuateGivewayMenu(totalOrderAmount) {
    if (totalOrderAmount > 120000) return true;
  }
}

export default Calculator;
