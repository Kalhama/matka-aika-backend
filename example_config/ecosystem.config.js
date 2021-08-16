module.exports = {
    apps: [
        {
            name: 'metropaccess-visualiser-api',
            script: 'build/api.js',
            min_uptime: 1000,
            instances: 1,
            autorestart: true,
            watch: false,
            env_production: {
                NODE_ENV: 'production',
                PORT: 3001
            }
        },
        {
            name: 'metropaccess-visualiser-cron',
            script: 'build/cron.js',
            min_uptime: 1000,
            instances: 1,
            watch: false,
            autorestart: false,
            exec_mode: 'fork',
            env_production: {
                NODE_ENV: 'production',
                LOGGING: true
            }
        }
    ]
}
