const { populateData } = require('./seed/seedFunctions');

module.exports = async () => {
    await populateData();
};
