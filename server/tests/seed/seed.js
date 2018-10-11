const { User } = require("../../models/User");

const users = [
  {
    email: "test1@hotmail.com",
    username: "testing1",
    password: "testing123"
  },
  {
    email: "test2@hotmail.com",
    username: "testing2",
    password: "testing1234"
  }
];

const createUsers = async () => {
  //   User.remove({}).then(() => {
  //     let userOne = new User(users[0]).save();
  //     let userTwo = new User(users[1]).save();
  //     return Promise.all([userOne, userTwo]).then(() => done());
  //   });

  await User.deleteMany({});
  await new User(users[0]).save();
  await new User(users[1]).save();
};

module.exports = { users, createUsers };
