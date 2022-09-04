const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../../indexTest");
const { AdminAndManager } = require("../../../models/user/adminAndManager");
const { ADMIN_TOKEN, CON_TOKEN, MANAGER_TOKEN } = require("../../testUtils");

beforeAll(async () => {
  await AdminAndManager.deleteMany({});
});

afterAll(async () => {
  await AdminAndManager.deleteMany({});
});

const userId = new mongoose.Types.ObjectId().toString();

const USER = {
  _id: userId,
  type: "manager",
  managerialPosition: "",
  name: "fahima",
  email: "fahima@gmail.com",
  password: "123456",
  contactNo: "01876309929",
  photoUrl: "https//:abc.com",
  dateOfBirth: "1/2/2022",
};

describe("admin and manager route", () => {
  describe("register manager", () => {
    it("should return account creation successful", async () => {
      const { body, statusCode } = await request(app)
        .post("/am/register")
        .set({ "x-auth-token": ADMIN_TOKEN })
        .send(USER);

      expect(statusCode).toBe(201);
      expect(body).toHaveProperty("text");
    });

    it("should return access denied with status code 403", async () => {
      const { body, statusCode } = await request(app)
        .post("/am/register")
        .set({ "x-auth-token": CON_TOKEN })
        .send(USER);

      expect(body.message).toContain("access denied");
      expect(statusCode).toBe(403);
    });
  });

  describe("login manager", () => {
    it("should return token string with status code 200", async () => {
      const { body, statusCode } = await request(app)
        .post("/am/login")
        .send({ email: USER.email, password: USER.password });

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("text");
    });
  });

  describe("change password", () => {
    it("should return password changed successfully", async () => {
      const { body, statusCode } = await request(app)
        .patch("/am/changePass")
        .set({ "x-auth-token": MANAGER_TOKEN })
        .send({
          _id: userId,
          oldPassword: USER.password,
          newPassword: "123abc",
        });

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("text");
    });
  });

  describe("getting user by id", () => {
    it("should return the user data", async () => {
      const { body, statusCode } = await request(app)
        .get(`/am/${userId}`)
        .set({ "x-auth-token": MANAGER_TOKEN });

      expect(body).toHaveProperty("object");
      expect(statusCode).toBe(200);
    });
  });

  describe("getting all users", () => {
    it("should return the  users data", async () => {
      const { body, statusCode } = await request(app)
        .get(`/am?pageNumber=1&pageSize=5`)
        .set({ "x-auth-token": ADMIN_TOKEN });

      expect(body).toHaveProperty("array");
      expect(statusCode).toBe(200);
    });
  });
});
