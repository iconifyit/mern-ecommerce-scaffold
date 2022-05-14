#!/usr/bin/env node

/*
After running install, you will need to do the following:
- Add credits actions import to client/app/actions.js
- Add credits reducer to client/app/reducers.js
- Add credits routes to server/routes/api/index.js
- Add link to client/containers/Dashboard/links.json
- Add Credit import to client/app/components/Manager/Dashboard/Admin.js
*/

const {
        usage,
        validateArgs,
        ucWords,
        getCompiledTemplate
    } = require('./utils'),
    customModules = require('./customModules.json'),
    logger = require('./logger')

// ==========================================================================================

/*
 * Capture CLI arguments.
 */
const args = require('minimist')(process.argv.slice(2));

// Everything beyond this point is implementation-specific.

const legalArgs = ['m', 't', 'force'];
const requiredArgs = ['m'];

/*
 * Check for required & illegal arguments.
 */
const allLegalArgs = [].concat(legalArgs, ['_', 'h']);

if (! validateArgs(args, allLegalArgs, requiredArgs)) {
    usage();
}

// ==========================================================================================

const modelName = args.m;
let templateName = args.t;

// ==========================================================================================

let config = require(`./configs/default.config.js`, 'utf8');
try {
    config = require(`./configs/${modelName.toLowerCase()}.config.js`, 'utf8');
} catch (e) {}

// ==========================================================================================

/*
 * Load the templates list
 */
templates = require('./templates.js')(ucWords(modelName));

logger.log(`\nTEMPLATE : ${templateName}\n`);
logger.log(`MODEL: ${modelName}\n`);

customModules.modules = customModules.modules.filter(module => {
    return module.name === modelName.toLowerCase()
});

// ==========================================================================================

const template = templates.find(t => t.name === templateName);

logger.log(
    getCompiledTemplate(template.src, modelName, config, customModules)
);

