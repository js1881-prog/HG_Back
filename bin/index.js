#!/usr/bin/env node
const createApp = require('../src/app.js');
const logger = require('../src/util/logger/logger.js');

const main = async () => {
    const appRunner = await createApp();
    
    //catching an unresolved promise
    process.on('unhandledRejection', (error) => {
        // catch an unhandled promise rejection
        logger.error(`unhandledRejection: ${error}`);
    });
    //An application catches errors that were not anticipated
    process.on("uncaughtException", (error) => {
        logger.error(`uncaughtException: ${error}`);
    });
    appRunner.start();
}

main();
