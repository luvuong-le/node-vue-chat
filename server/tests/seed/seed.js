require("dotenv").config();
const { mongoose } = require("../../db/mongoose");
const { User } = require("../../models/User");
const { userSeedData } = require("./userSeedData");

const createUsers = async () => {
  //   User.remove({}).then(() => {
  //     let userOne = new User(users[0]).save();
  //     let userTwo = new User(users[1]).save();
  //     return Promise.all([userOne, userTwo]).then(() => done());
  //   });

  console.log("[PROCESS:SEED] Seeding User Data");

  await User.deleteMany({}).exec();

  for (let user of userSeedData) {
    await new User(user).save();
  }

  console.log("[PROCESS:FIN] Completed Seeding User Data");

  await mongoose.connection.close();
};

createUsers();
