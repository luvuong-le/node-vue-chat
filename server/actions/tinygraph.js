const options = [
    'squares',
    'isogrids',
    'spaceinvaders',
    'labs/isogrids/hexa',
    'labs/isogrids/hexa16'
];

const getRandomOption = () => {
    return options[Math.floor(Math.random() * options.length)];
};
module.exports = {
    createAvatar: username => {
        return `http://tinygraphs.com/${getRandomOption(options)}/${username}`;
    }
};
