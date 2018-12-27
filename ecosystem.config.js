module.exports = {
    apps: [
        {
            name: 'astro-chat-backend',
            cwd: './server/',
            script: 'server.js',
            watch: true,
            ignore_watch: ['.git', './node_modules/', './logs/*'],
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            },
            error_file: './logs/errors.log',
            out_file: './logs/access.log'
        }
    ]
};
