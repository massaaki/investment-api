import { isOpened } from "./stock-market-time";

describe("## StockMarketTime ApplicaitonHelper", () => {

  it("should return true if market is opened", () => {
    jest.useFakeTimers('modern').setSystemTime(new Date(2022, 2, 20, 10, 30));

    const sut = isOpened('8:00', '20:00');

    expect(sut).toBeTruthy();
  });

  it("should return false if currentTime is before openHour", () => {
    jest.useFakeTimers('modern').setSystemTime(new Date(2022, 2, 20, 7, 30));

    const sut = isOpened('8:00', '20:00');
    expect(sut).toBeFalsy();
  })

  it("should return false if currentTime is after closesHour", () => {
    jest.useFakeTimers('modern').setSystemTime(new Date(2022, 2, 20, 20, 30));

    const sut = isOpened('8:00', '20:00');
    expect(sut).toBeFalsy();
  })
});