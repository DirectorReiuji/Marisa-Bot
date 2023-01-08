const chalk = require('chalk');

module.exports = {
    name: "err",
    execute(err) {
        console.log(chalk.redBright(`[MONGO] ${err}`));
    },
};