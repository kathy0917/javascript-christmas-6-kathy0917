const WeekBenefits = {
  async calculateWeekDayBenefitSum(calculatorObject, orderMenu, date, priceSum) {
    let weekDayDiscount = 0;

    for (let menu of [...orderMenu.split(',')]) {
      weekDayDiscount += await calculatorObject.calculateWeekDayDiscount(date, menu, priceSum);
    }
    weekDayDiscount = weekDayDiscount * 2023;
    return weekDayDiscount;
  },
  async calculateWeekendBenefitSum(calculatorObject, orderMenu, date, priceSum) {
    let weekendDiscount = 0;

    for (let menu of [...orderMenu.split(',')]) {
      weekendDiscount += await calculatorObject.calculateWeekendDiscount(date, menu, priceSum);
    }
    weekendDiscount = weekendDiscount * 2023;
    return weekendDiscount;
  },
};

export default WeekBenefits;
