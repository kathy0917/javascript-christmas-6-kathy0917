import { Console } from '@woowacourse/mission-utils';
import * as error from './constants/Error.js';
import InputView from './view/InputView.js';
import Menu from './Constants/Menu.js';

class orderMenu {
  #name;
  #count;

  constructor(name, count) {
    this.#name = name;
    this.#count = count;
  }

  async splitMenu(menu) {
    const splitMenu = menu.split('-');
    let [beforeName, beforeCount] = splitMenu;

    this.#name = beforeName;
    this.#count = beforeCount;
    await this.validateMenuForm(menu);
    await this.validateCntIsNumber();
    await this.validateExistMenu();
  }

  async validateCntIsNumber() {
    try {
      if (isNaN(Number(this.#count)) || Number(this.#count) < 1) {
        throw new Error(error.MENU_NOT_NUMBER_ERROR);
      }
    } catch (error) {
      Console.print(error.message);
      await InputView.readOrderMenu();
    }
  }

  async validateExistMenu() {
    try {
      let flag = false;
      Object.entries(Menu).forEach(([title, detail]) => {
        detail.forEach((ele) => {
          if (ele.name === this.#name) flag = true;
        });
      });
      if (flag === false) throw new Error(error.MENU_NOT_VALID_ERROR);
    } catch (error) {
      Console.print(error.message);
      await InputView.readOrderMenu();
    }
  }

  async validateMenuForm(menu) {
    try {
      if (!/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]-[0-9]/.test(menu)) throw new Error(error.MENU_NOT_VALID_ERROR);
    } catch (error) {
      Console.print(error.message);
      await InputView.readOrderMenu();
    }
  }

  async validateDuplicateMenu(menuList) {
    try {
      menuList.forEach(([prev], prevIdx) => {
        menuList.forEach(([cur], curIdx) => {
          if (prevIdx !== curIdx && prev === cur) throw new Error(error.MENU_NOT_VALID_ERROR);
        });
      });
    } catch (error) {
      Console.print(error.message);
      await InputView.readOrderMenu();
    }
  }
  resultMenu() {
    return [this.#name, this.#count];
  }
}

export default orderMenu;
