import { Console } from '@woowacourse/mission-utils';

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
      menu.split('-')[0];
      Console.print(`${menu.split('-')[0]} ${menu.split('-')[1]}개`);
    });
  },
  printTotalOrderAmount() {
    Console.print('\n<할인 전 총주문 금액>');
  },
  printGivewayMenu() {
    Console.print('\n<증정 메뉴>');
  },
  printBenefitDetails() {
    Console.print('\n<혜택 내역>');
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
