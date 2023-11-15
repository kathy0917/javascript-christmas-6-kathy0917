import { Console } from '@woowacourse/mission-utils';
import Calculator from '../Calculator.js';
import Badge from '../constants/Badge.js';
import WeekBenefits from '../domain/WeekBenefit.js';
import * as MESSAGE from '../constants/Message.js';

const OutputView = {
  printOpening() {
    Console.print(MESSAGE.OUTPUT_OPENING);
  },

  async printVisitDate(visitDate, orderMenu) {
    Console.print(`12월 ${visitDate}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!'`);
    await this.printMenu(orderMenu);
  },

  async printMenu(orderMenu) {
    Console.print(MESSAGE.OUTPUT_ORDER_MENU);
    orderMenu.split(',').map((menu) => {
      Console.print(`${menu.split('-')[0]} ${menu.split('-')[1]}개`);
    });
  },

  async printTotalOrderAmount(date, orderMenu) {
    Console.print(MESSAGE.OUTPUT_ORDER_AMOUNT);
    let priceSum = 0;
    const menuList = orderMenu.split(',');
    for (let menu of menuList) {
      const calculatorObject = new Calculator();
      await calculatorObject.splitMenu(menu);
      priceSum += await calculatorObject.calculateTotalOrderAmount();
    }
    Console.print(`${priceSum.toLocaleString('ko-KR')}원`);
    if (priceSum < 10000) Console.print(MESSAGE.ORDER_AMOUNT_CAUTION);
    await this.printGivewayMenu(date, priceSum, orderMenu);
  },

  async printGivewayMenu(date, priceSum, orderMenu) {
    Console.print(MESSAGE.OUTPUT_GIVEWAY_MENU);
    const calculatorObject = new Calculator();
    (await calculatorObject.calculateGivewayMenu(priceSum)) > 0 ? Console.print('샴페인 1개') : Console.print(MESSAGE.OUTPUT_NOTHING);
    await this.printBenefitDetails(date, priceSum, orderMenu);
  },

  async printBenefitDetails(date, priceSum, orderMenu) {
    Console.print(MESSAGE.OUTPUT_BENEFIT_DETAILS);
    const calculatorObject = new Calculator();
    const dDayDiscount = await calculatorObject.calculateDDayDiscount(date, priceSum);
    if (dDayDiscount !== 0) Console.print(`크리스마스 디데이 할인: -${dDayDiscount.toLocaleString('ko-KR')}원`);
    const givewayDiscount = await calculatorObject.calculateGivewayMenu(priceSum);
    if (givewayDiscount) Console.print(`증정 이벤트: -${givewayDiscount.toLocaleString('ko-KR')}원`);

    let weekDayDiscount = await WeekBenefits.calculateWeekDayBenefitSum(calculatorObject, orderMenu, date, priceSum);
    let weekendDiscount = await WeekBenefits.calculateWeekendBenefitSum(calculatorObject, orderMenu, date, priceSum);
    if (weekDayDiscount !== 0) Console.print(`평일 할인: -${weekDayDiscount.toLocaleString('ko-KR')}원`);
    if (weekendDiscount !== 0) Console.print(`주말 할인: -${weekendDiscount.toLocaleString('ko-KR')}원`);

    const specialDiscount = await calculatorObject.calculateSpecialDiscount(date, priceSum);
    if (specialDiscount !== 0) Console.print(`특별 할인: -${specialDiscount.toLocaleString('ko-KR')}원`);
    if ((dDayDiscount === 0 && givewayDiscount === 0 && weekDayDiscount === 0 && weekendDiscount === 0 && specialDiscount === 0) || priceSum < 10000) Console.print(MESSAGE.OUTPUT_NOTHING);
    await this.printTotalBenefitAmount(priceSum, dDayDiscount, givewayDiscount, weekDayDiscount, weekendDiscount, specialDiscount);
  },
  async printTotalBenefitAmount(priceSum, dDayDiscount, givewayDiscount, weekDayDiscount, weekendDiscount, specialDiscount) {
    Console.print(MESSAGE.OUTPUT_BENEFIT_AMOUNT);
    const totalBenefitAmount = dDayDiscount + weekDayDiscount + weekendDiscount + specialDiscount;
    totalBenefitAmount + givewayDiscount === 0 ? Console.print('0원') : Console.print(`-${(totalBenefitAmount + givewayDiscount).toLocaleString('ko-KR')}원`);
    await this.printTotalAmountAfterDiscount(priceSum, totalBenefitAmount, givewayDiscount);
  },

  async printTotalAmountAfterDiscount(priceSum, totalBenefitAmount, givewayDiscount) {
    Console.print(MESSAGE.OUTPUT_AMOUNT_AFTER_DISCOUNT);
    Console.print(`${(priceSum - totalBenefitAmount).toLocaleString('ko-KR')}원`);
    this.printEventBadge(totalBenefitAmount, givewayDiscount);
  },

  printEventBadge(totalBenefitAmount, givewayDiscount) {
    Console.print(MESSAGE.OUTPUT_EVENT_BADGE);
    let badge = '';
    [...Badge].map((ele) => {
      if (totalBenefitAmount + givewayDiscount >= ele.price) badge = ele.name;
    });
    Console.print(`${badge === '' ? MESSAGE.OUTPUT_NOTHING : badge}`);
  },
};

export default OutputView;
