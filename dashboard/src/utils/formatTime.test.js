import {
  fDate,
  fDateTime,
  fTimestamp,
  fDateTimeSuffix,
  fToNow,
} from "./formatTime";

const DEMO_DATE = "2022-09-08T13:17:48.385Z";

describe("formatting time", () => {
  it("should return no date found", () => {
    expect(fDate()).toBe("no date found");
    expect(fDateTime()).toBe("no date found");
    expect(fTimestamp()).toBe("no date found");
    expect(fDateTimeSuffix()).toBe("no date found");
    expect(fToNow()).toBe("no date found");
  });

  it("should return 08 Sep 2022", () => {
    expect(fDate(DEMO_DATE)).toBe("08 Sep 2022");
  });

  it("should return 08 Sep 2022 19:17", () => {
    expect(fDateTime(DEMO_DATE)).toBe("08 Sep 2022 19:17");
  });

  it("should return 1662643068385", () => {
    expect(fTimestamp(DEMO_DATE)).toBe(1662643068385);
  });

  it("should return 08/09/2022 07:17 p.m.", () => {
    expect(fDateTimeSuffix(DEMO_DATE)).toBe("08/09/2022 07:17 p.m.");
  });
});
