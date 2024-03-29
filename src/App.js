import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';

class App {
  async run() {
    OutputView.printOpening();
    let date = 0;
    while (true) {
      date = await InputView.readDate();
      if (date) break;
    }
    let menu = '';
    while (true) {
      menu = await InputView.readOrderMenu();
      if (menu) {
        await OutputView.printVisitDate(date, menu);
        break;
      }
    }
    await OutputView.printTotalOrderAmount(date, menu);
  }
}

export default App;
