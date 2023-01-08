const chalk = require('chalk');

module.exports = {
    name: "connecting",
    async execute() {
        console.log(chalk.yellowBright(`[MONGO] Connecting to database...`));
    },
};