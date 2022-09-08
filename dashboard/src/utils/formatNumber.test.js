import {
  fCurrency,
  fPercent,
  fNumber,
  fShortenNumber,
  fData,
} from "./formatNumber";

describe("formatting number to human readable", () => {
  it("should return a number prefix with a dollar sign", () => {
    expect(fCurrency(100)).toBe("$100");
  });

  it("should return the given number postfix with a percent sign and precision", () => {
    expect(fPercent(15)).toBe("15.0%");
  });

  it("should provide a formatted str from num", () => {
    expect(fNumber(10)).toBe("10");
  });

  it("should return 1m", () => {
    expect(fShortenNumber(1000000)).toBe("1m");
  });

  it("should provide formatted data with prefix(kb, mb, gb)", () => {
    expect(fData(200000)).toBe("200.0 KB");
  });
});
