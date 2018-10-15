const { app } = require("../server");
const { userSeedData } = require("./seed/userSeedData");
const supertest = require("supertest");

let token;
let session_id;
let request = supertest(app);

beforeAll(async () => {
  const response = await request
    .post("/api/auth/login")
    .send({ email: userSeedData[0].email, password: userSeedData[0].password });

  token = `bearer ${response.body.token}`;
  session_id = response.body.user.session_id;
});

describe("GET /users", () => {
  it("should return an array of users", async () => {
    const response = await request
      .get("/api/user/users")
      .set("Authorization", token);
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should return 401 if not authorized", async () => {
    const response = await request
      .get("/api/user/users")
      .set("Authorization", "bearer testing");

    expect(response.status).toEqual(401);
  });

  it("should return the user data based on the session_id", async () => {
    const response = await request
      .get(`/api/user/${session_id}`)
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should return an error if invalid username is entered", async () => {
    const response = await request
      .get("/api/user/unknown")
      .set("Authorization", token);

    expect(response.status).toBe(404);
    expect(response.body.error).not.toBeNull();
  });
});
