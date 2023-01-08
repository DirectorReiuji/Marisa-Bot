const chalk = require('chalk');

module.exports = {
    name: "disconnected",
    execute() {
        console.log(chalk.redBright(`[MONGO] Disconnected from database.`));
    },
};