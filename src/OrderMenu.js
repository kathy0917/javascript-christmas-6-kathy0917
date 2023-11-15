import { Console } from '@woowacourse/mission-utils';
import * as error from './constants/Error.js';
import Menu from './Constants/Menu.js';

class orderMenu {
  #name;
  #count;

  constructor(name, count) {
    this.#name = name;
    this.#count = count;
  }

  splitMenu(menu) {
    const splitMenu = menu.split('-');
    let [beforeName, beforeCount] = splitMenu;

    this.#name = beforeName;
    this.#count = beforeCount;

    return [this.#name, this.#count];
  }

  async validateCntIsNumber() {
    try {
      if (isNaN(Number(this.#count)) || Number(this.#count) < 1) {
        throw new Error(error.MENU_NOT_NUMBER_ERROR);
      }
    } catch (error) {
      Console.print(error.message);
      return false;
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
      return true;
    } catch (error) {
      Console.print(error.message);
      return false;
    }
  }

  async validateMenuForm(menu) {
    try {
      if (!/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]-[0-9]/.test(menu)) throw new Error(error.MENU_NOT_VALID_ERROR);
    } catch (error) {
      Console.print(error.message);
      return false;
    }
  }

  async validateDuplicateMenu(menuList) {
    try {
      const menuSet = new Set();
      const splitMenu = menuList.split(',');
      splitMenu.forEach((ele) => {
        menuSet.add(ele.split('-')[0]);
      });
      if (menuSet.size !== splitMenu.length) throw new Error(error.MENU_NOT_VALID_ERROR);
    } catch (error) {
      Console.print(error.message);
      return false;
    }
  }

  async checkError(splitMenus, menuList) {
    if ((await this.validateDuplicateMenu(menuList)) === false) return false;
    if ((await this.validateMenuForm(splitMenus)) === false) return false;
    if ((await this.validateCntIsNumber()) === false) return false;
    if ((await this.validateExistMenu()) === false) return false;
  }
}

export default orderMenu;
