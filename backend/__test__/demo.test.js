const request = require("supertest");
const app = require("../indexTest");
const { Demo } = require("../models/boilerplate");

beforeAll(async () => {
  await Demo.deleteMany();
});

describe("demo route", () => {
  describe("get demo product route", () => {
    describe("given product does exits", () => {
      it("should return 200 status and the value", async () => {
        const { statusCode, body } = await request(app).get("/demo/");

        expect(statusCode).toBe(200);
        expect(body).toBeTruthy();
      });
    });
  });
});
