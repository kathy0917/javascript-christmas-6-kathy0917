import { Console } from '@woowacourse/mission-utils';
import Calculator from '../Calculator.js';
import Badge from '../constants/Badge.js';

const OutputView = {
  printOpening() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
  },

  async printVisitDate(visitDate, orderMenu) {
    Console.print(`12월 ${visitDate}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!'`);
    await this.printMenu(orderMenu);
  },

  async printMenu(orderMenu) {
    Console.print('\n<주문 메뉴>');
    orderMenu.split(',').map((menu) => {
      Console.print(`${menu.split('-')[0]} ${menu.split('-')[1]}개`);
    });
  },

  async printTotalOrderAmount(date, orderMenu) {
    Console.print('\n<할인 전 총주문 금액>');
    let priceSum = 0;
    const menuList = orderMenu.split(',');
    for (let menu of menuList) {
      const calculatorObject = new Calculator();
      await calculatorObject.splitMenu(menu);
      priceSum += await calculatorObject.calculateTotalOrderAmount();
    }
    Console.print(`${priceSum.toLocaleString('ko-KR')}원`);
    await this.printGivewayMenu(date, priceSum, orderMenu);
  },

  async printGivewayMenu(date, priceSum, orderMenu) {
    Console.print('\n<증정 메뉴>');
    const calculatorObject = new Calculator();
    (await calculatorObject.calculateGivewayMenu(priceSum)) > 0 ? Console.print('샴페인 1개') : Console.print('없음');
    await this.printBenefitDetails(date, priceSum, orderMenu);
  },

  async printBenefitDetails(date, priceSum, orderMenu) {
    Console.print('\n<혜택 내역>');
    const calculatorObject = new Calculator();
    const dDayDiscount = await calculatorObject.calculateDDayDiscount(date);
    if (dDayDiscount !== 0) Console.print(`크리스마스 디데이 할인: -${dDayDiscount.toLocaleString('ko-KR')}원`);
    const givewayDiscount = await calculatorObject.calculateGivewayMenu(priceSum);
    if (givewayDiscount) Console.print(`증정 이벤트: -${givewayDiscount.toLocaleString('ko-KR')}원`);
    let weekDayDiscount = 0;
    let weekendDiscount = 0;
    for (let menu of [...orderMenu.split(',')]) {
      weekDayDiscount += await calculatorObject.calculateWeekDayDiscount(date, menu);
      weekendDiscount += await calculatorObject.calculateWeekendDiscount(date, menu);
    }
    weekDayDiscount = weekDayDiscount * 2023;
    weekendDiscount = weekendDiscount * 2023;
    if (weekDayDiscount !== 0) Console.print(`평일 할인: -${weekDayDiscount.toLocaleString('ko-KR')}원`);
    if (weekendDiscount !== 0) Console.print(`주말 할인: -${weekendDiscount.toLocaleString('ko-KR')}원`);
    const specialDiscount = await calculatorObject.calculateSpecialDiscount(date);
    if (specialDiscount !== 0) Console.print(`특별 할인: -${specialDiscount.toLocaleString('ko-KR')}원`);
    await this.printTotalBenefitAmount(priceSum, dDayDiscount, givewayDiscount, weekDayDiscount, weekendDiscount, specialDiscount);
  },

  async printTotalBenefitAmount(priceSum, dDayDiscount, givewayDiscount, weekDayDiscount, weekendDiscount, specialDiscount) {
    Console.print('\n<총혜택 금액>');
    const totalBenefitAmount = dDayDiscount + weekDayDiscount + weekendDiscount + specialDiscount;
    Console.print(`-${(totalBenefitAmount + givewayDiscount).toLocaleString('ko-KR')}원`);
    await this.printTotalAmountAfterDiscount(priceSum, totalBenefitAmount, givewayDiscount);
  },

  async printTotalAmountAfterDiscount(priceSum, totalBenefitAmount, givewayDiscount) {
    Console.print('\n<할인 후 예상 결제 금액>');
    Console.print(`${(priceSum - totalBenefitAmount).toLocaleString('ko-KR')}원`);
    this.printEventBadge(totalBenefitAmount, givewayDiscount);
  },
  printEventBadge(totalBenefitAmount, givewayDiscount) {
    Console.print('\n<12월 이벤트 배지>');
    let badge = '';
    [...Badge].map((ele) => {
      if (totalBenefitAmount + givewayDiscount >= ele.price) badge = ele.name;
    });
    Console.print(`${badge === '' ? '없음' : badge}`);
  },
};

export default OutputView;
