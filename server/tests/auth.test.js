const { server } = require("../server");
const { createUsers } = require("./seed/seed");
const request = require("supertest");

beforeAll(async () => {
  await createUsers();
});

afterAll(async () => {
  await server.close();
});

describe("POST /auth", () => {
  it("should register a user and return a token", async () => {
    const response = await request(server)
      .post("/api/auth/register")
      .send({
        email: "test100@hotmail.com",
        username: "tester100",
        password: "testing100"
      });

    expect(response.status).toEqual(200);
    expect(response.body.token).not.toBeNull();
    expect(response.body.auth).not.toBeNull();
  });

  it("should login a user and return a token", async () => {
    const response = await request(server)
      .post("/api/auth/login")
      .send({ email: "test1@hotmail.com", password: "testing123" });

    expect(response.status).toEqual(200);
    expect(response.body.token).not.toBeNull();
    expect(response.body.auth).not.toBeNull();
  });
});
