const { app } = require("../server");
const supertest = require("supertest");

describe("POST /auth", () => {
  let request = supertest(app);

  it("should register a user and return a token", async () => {
    const response = await request.post("/api/auth/register").send({
      email: "test100@hotmail.com",
      username: "tester100",
      password: "testing100"
    });

    expect(response.status).toEqual(200);
    expect(response.body.session_id).not.toBeNull();
    expect(response.body.token).not.toBeNull();
    expect(response.body.auth).not.toBeNull();
  });

  it("shouldnt register with invalid detials", async () => {
    const response = await request.post("/api/auth/register").send({
      email: "test100@hotmail.com",
      username: "test",
      password: "testing100"
    });
    expect(response.status).toEqual(200);
    expect(typeof response.body).toBe("object");
    expect(response.body).not.toBeNull();
  });

  it("should login a user and return a token", async () => {
    const response = await request
      .post("/api/auth/login")
      .send({ email: "test1@hotmail.com", password: "testing123" });

    expect(response.status).toEqual(200);
    expect(response.body.token).not.toBeNull();
    expect(response.body.user.session_id).not.toBeNull();
    expect(response.body.auth).not.toBeNull();
  });

  it("should return an object given the wrong login details", async () => {
    const response = await request
      .post("/api/auth/login")
      .send({ email: "testwrongemail@hotmail.com", password: "testing123" });

    expect(response.status).toEqual(200);
    expect(typeof response.body).toBe("object");
  });
});
