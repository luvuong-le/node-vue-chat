const { server } = require("../server");
const { users, createUsers } = require("./seed/seed");
const request = require("supertest");

let token;

beforeAll(async () => {
  await createUsers();

  const response = await request(server)
    .post("/api/auth/login")
    .send({
      email: users[0].email,
      password: users[0].password
    });

  token = `bearer ${response.body.token}`;
});

afterEach(done => {
  server.close();
  done();
});

describe("GET /users", () => {
  it("should return an array of users", async () => {
    const response = await request(server)
      .get("/api/user/users")
      .set("Authorization", token);

    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should return 401 if not authorized", async () => {
    const response = await request(server)
      .get("/api/user/users")
      .set("Authorization", "bearer testing");

    expect(response.status).toEqual(401);
  });
});
