import { Console } from '@woowacourse/mission-utils';
import Calculator from '../Calculator.js';

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
    await this.printGivewayMenu(date, priceSum);
  },

  async printGivewayMenu(date, priceSum) {
    Console.print('\n<증정 메뉴>');
    const calculatorObject = new Calculator();
    (await calculatorObject.calculateGivewayMenu(priceSum)) === true ? Console.print('샴페인 1개') : Console.print('없음');
    await this.printBenefitDetails(date, priceSum);
  },

  async printBenefitDetails(date, priceSum) {
    Console.print('\n<혜택 내역>');
    const calculatorObject = new Calculator();
    const dDayDiscount = await calculatorObject.calculateDDayDiscount(date);
    if (dDayDiscount != 0) Console.print(`크리스마스 디데이 할인: -${dDayDiscount.toLocaleString('ko-KR')}원`);
  },

  printTotalBenefitAmount() {
    Console.print('\n<총혜택 금액>');
  },
  printTotalAmountAfterDiscount() {
    Console.print('\n<할인 후 예상 결제 금액>');
  },
  printEventBadge() {
    Console.print('\n<12월 이벤트 배지>');
  },
};

export default OutputView;
