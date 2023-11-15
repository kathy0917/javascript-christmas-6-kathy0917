import Menu from './constants/Menu.js';
import { StarDate } from './constants/StarDate.js';

class Calculator {
  #name;
  #count;
  #totalOrderAmount;
  #dDayDiscountAmount;

  constructor(name, count, totalOrderAmount, dDayDiscountAmount) {
    this.#name = name;
    this.#count = count;
    this.#totalOrderAmount = totalOrderAmount;
    this.#dDayDiscountAmount = dDayDiscountAmount;
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
    let result = 0;
    if (totalOrderAmount > 120000) result = 25000;

    return result;
  }

  async calculateDDayDiscount(date, priceSum) {
    this.#dDayDiscountAmount = 1000 + (date - 1) * 100;
    if (date > 25 || priceSum < 10000) this.#dDayDiscountAmount = 0;
    return this.#dDayDiscountAmount;
  }

  async calculateWeekDayDiscount(date, orderMenu, priceSum) {
    this.splitMenu(orderMenu);
    let result = 0;
    const day = new Date(`2023-12-${date}`).getDay();
    for (let ele of [...Menu.dessert]) {
      if (ele.name === this.#name && day <= 4 && priceSum >= 10000) result = Number(this.#count);
    }
    return result;
  }

  async calculateWeekendDiscount(date, orderMenu, priceSum) {
    this.splitMenu(orderMenu);
    let result = 0;
    const day = new Date(`2023-12-${date}`).getDay();
    for (let ele of [...Menu.main]) {
      if (ele.name === this.#name && day > 4 && priceSum >= 10000) result = Number(this.#count);
    }
    return result;
  }

  async calculateSpecialDiscount(date, priceSum) {
    let result = 0;
    if (StarDate.includes(Number(date)) && priceSum >= 10000) result = 1000;
    return result;
  }
}

export default Calculator;
