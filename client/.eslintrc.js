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
        'indent': 'off',
        'no-console': 'off',
        'vue/script-indent': [ {
            'baseIndent': 1
        }]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
