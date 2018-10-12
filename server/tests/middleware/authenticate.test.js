const { createErrorObject } = require("../../middleware/authenticate");

describe("Authenticate Middleware", () => {
  it("should create a valid error object", () => {
    const errorArray = [
      {
        param: "username",
        msg: "Username is not valid!"
      }
    ];

    const errorObject = createErrorObject(errorArray);

    expect(typeof errorObject).toBe("object");
    expect(errorObject).not.toBeNull();
  });
});
