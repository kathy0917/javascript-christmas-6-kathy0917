import App from '../src/App.js';
import InputError from '../src/domain/InputError.js';

const app = new App();
app.run();

describe('방문 날짜 입력값 테스트', () => {
  test('1~31이하의 숫자가 아닌 경우', async () => {
    const input = '0';
    const data = await InputError.checkVisitDateError(input);
    expect(data).toEqual(false);
  });
});

describe('주문 메뉴 입력값 테스트', () => {
  test('고객이 메뉴판에 없는 메뉴를 입력하는 경우', async () => {
    const input = '토마토파스타-1';
    const data = await InputError.checkOrderMenuError(input);
    expect(data).toEqual(false);
  });

  test('메뉴 형식이 예시와 다른 경우', async () => {
    const input = '시저샐러드1';
    const data = await InputError.checkOrderMenuError(input);
    expect(data).toEqual(false);
  });

  test('메뉴의 개수가 1이상의 숫자가 아닌 경우', async () => {
    const input = '시저샐러드-0';
    const data = await InputError.checkOrderMenuError(input);
    expect(data).toEqual(false);
  });

  test('중복 메뉴를 입력한 경우', async () => {
    const input = '시저샐러드-1,시저샐러드-1';
    const data = await InputError.checkOrderMenuError(input);
    expect(data).toEqual(false);
  });

  test('음료만 주문했을 경우, 아래 주의 사항 안내', async () => {
    const input = '레드와인-1';
    const data = await InputError.checkOrderMenuError(input);
    expect(data).toEqual(false);
  });

  test('주문 메뉴가 20개 초과인 경우, 아래 주의 사항 안내', async () => {
    const input = '시저샐러드-10,아이스크림-11';
    const data = await InputError.checkOrderMenuError(input);
    expect(data).toEqual(false);
  });
});
