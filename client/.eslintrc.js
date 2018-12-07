module.exports = {
    root: true,
    env: {
        node: true,
        jest: true
    },
    extends: ['plugin:vue/essential', '@vue/prettier'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "indent": ["error", 4],
        // "quotes": ["error", "single"],
        // "semi": ["error", "always"]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
