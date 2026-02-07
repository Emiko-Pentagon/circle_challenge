module.exports = {
    apps: [{
        name: "etherfantasy-api",
        script: "./app.js",
        env: {
            NODE_ENV: "production",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}