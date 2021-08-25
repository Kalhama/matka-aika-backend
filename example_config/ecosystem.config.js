module.exports = {
    apps: [
        {
            name: 'metropaccess-visualiser-backend',
            script: 'build/app.js',
            min_uptime: 1000,
            instances: 1,
            autorestart: true,
            watch: false,
            env_production: {
                NODE_ENV: 'production',
                PORT: 3003
            }
        }
    ]
}
