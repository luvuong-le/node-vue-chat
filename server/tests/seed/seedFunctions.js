require('dotenv').config();
const { mongoose } = require('../../db/mongoose');
const { User } = require('../../models/User');
const { Room } = require('../../models/Room');
const { userSeedData, roomSeedData } = require('./seedData');

const populateData = async () => {
    //   User.remove({}).then(() => {
    //     let userOne = new User(users[0]).save();
    //     let userTwo = new User(users[1]).save();
    //     return Promise.all([userOne, userTwo]).then(() => done());
    //   });

    let userId;

    console.log('[PROCESS:SEED] Seeding User Data');

    await User.deleteMany({}).exec();

    for (let user of userSeedData) {
        const userData = await new User(user).save();
        userId = userData._id;
    }

    console.log('[PROCESS:FIN] Completed Seeding User Data');

    console.log('[PROCESS:SEED] Seeding Room Data');

    await Room.deleteMany({}).exec();

    for (let room of roomSeedData) {
        await new Room({
            name: room.name,
            user: userId,
            password: room.password
        }).save();
    }

    console.log('[PROCESS:FIN] Completed Seeding Room Data');

    await mongoose.connection.close();
};

module.exports = { populateData };
