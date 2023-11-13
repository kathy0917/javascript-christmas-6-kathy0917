import { Console } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';

class App {
  async run() {
    OutputView.printOpening();
    InputView.readDate();
  }
}

export default App;
