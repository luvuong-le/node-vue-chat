const { app } = require("../server");
const { userSeedData } = require("./seed/userSeedData");
const request = require("supertest");

let token;

beforeAll(async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({ email: userSeedData[0].email, password: userSeedData[0].password });

  token = `bearer ${response.body.token}`;
});

describe("GET /users", () => {
  it("should return an array of users", async () => {
    const response = await request(app)
      .get("/api/user/users")
      .set("Authorization", token);
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should return 401 if not authorized", async () => {
    const response = await request(app)
      .get("/api/user/users")
      .set("Authorization", "bearer testing");

    expect(response.status).toEqual(401);
  });
});
