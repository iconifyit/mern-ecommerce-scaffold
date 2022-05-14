#!/usr/bin/env node

/*
After running install, you will need to do the following:
- Add credits actions import to client/app/actions.js
- Add credits reducer to client/app/reducers.js
- Add credits routes to server/routes/api/index.js
- Add link to client/containers/Dashboard/links.json
- Add Credit import to client/app/components/Manager/Dashboard/Admin.js
*/

const fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    HandleParser = require('./HandleParser'),
    { exit } = require('process'),
    Inflector = require('inflected'),
    {
        usage,
        validateArgs,
        pollutionTest,
        ucWords,
        validateCustomModule,
        getCustomModule,
        doStageModuleFile,
        doLiveModuleFile,
        validatePath,
        doUninstallModuleFile,
        getCompiledTemplate
    } = require('./utils'),
    customModules = require('./customModules.json'),
    logger = require('./logger')

const navLinks = require('./templates/client/app/containers/Dashboard/links.json');

// ==========================================================================================

/*
 * Capture CLI arguments.
 */
const args = require('minimist')(process.argv.slice(2));

// Everything beyond this point is implementation-specific.

const legalArgs = ['m', 'd', 'i', 'u', 'c', 's', 'force'];
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
let IS_DRY_RUN = args.d || false;
let IS_INSTALL = args.i || false;
let IS_UNINSTALL = args.u || false;
let IS_STAGING = args.s || (!IS_DRY_RUN && !IS_INSTALL && !IS_UNINSTALL);
let IS_CLEAN = args.c || false;
let IS_FORCE = args.force || false;

let config = require(`./configs/default.config.js`, 'utf8');
try {
    config = require(`./configs/${modelName.toLowerCase()}.config.js`, 'utf8');
} catch (e) {}

if (IS_DRY_RUN) {
    IS_INSTALL = false;
    IS_STAGING = false;
    IS_CLEAN = false;
}

if (IS_INSTALL && IS_UNINSTALL) {
    logger.log('\n\x1b[31m\nCannot install and uninstall at the same time.\x1b[0m');
    usage();
}

if (IS_INSTALL && IS_STAGING) {
    logger.log('\n\x1b[31m\nCannot install and stage at the same time.\x1b[0m');
    usage();
}

if (IS_CLEAN && IS_INSTALL) {
    logger.log('\n\x1b[31m\nCannot clean and install at the same time.\x1b[0m');
    usage();
}

if (IS_FORCE && IS_INSTALL) {
    logger.log('\n\x1b[31m\nForce can only be used with `stage`.\x1b[0m');
    usage();
}

// ==========================================================================================

/*
 * Load the templates list
 */
templates = require('./templates.js')(ucWords(modelName));

/*
 * Test if some artifacts already exist.
 */
const { isPolluted, artifacts } = pollutionTest(templates);

if (!IS_UNINSTALL && isPolluted) {
    if (!IS_FORCE && IS_STAGING) {
        logger.log(
            `Some artifacts for ${modelName} already exist. Please check your files and try again.`
        );
        logger.log(`Artifacts`, artifacts);
        exit(0);
    }
}

/*
 * Set the staging area.
 */
const stagingDir = path.join('./stage/', modelName.toLowerCase());
if ((IS_STAGING && IS_CLEAN && !IS_DRY_RUN)) {
    fs.rmSync(stagingDir, { recursive: true, force: true });
}
if (! IS_DRY_RUN) mkdirp.sync(stagingDir);

/*
 * Loop through the templates.
 */
logger.log(`\nMODE : ${IS_DRY_RUN ? 'DRY RUN' : IS_INSTALL ? 'INSTALL' : 'STAGING'}`);
logger.log(`MODEL: ${modelName}\n`);

// ==========================================================================================

if (IS_STAGING && ! getCustomModule(customModules, modelName)) {
    customModules.modules.push({
        name: modelName.toLowerCase(),
        className: ucWords(modelName),
    });    
    fs.writeFileSync('./customModules.json', JSON.stringify(customModules, null, 2));
}

console.log('customModules', customModules);

// ==========================================================================================

templates.forEach((template) => {
    try {
        const { src, dest } = template;

        let stagingPath = dest.replace('../', `${stagingDir}/`);
        let livePath = dest;
        let outputPath = IS_INSTALL ? livePath : stagingPath;

        if (IS_UNINSTALL) {
            if (! validateCustomModule(customModules, modelName)) {
                logger.log(`\x1b[31m\nModule ${modelName} does not exist.\x1b[0m`);
                exit(0);
            }
            // doUninstallModuleFile(modelName, livePath, IS_DRY_RUN);
            
            if (template.overwrite) {
                doRestoreModuleFile(src, modelName, dest, IS_DRY_RUN);
            }
            else {
                doUninstallModuleFile(modelName, dest, IS_DRY_RUN);
                // doUninstallModuleFile(src, modelName, config, customModules, IS_DRY_RUN);
            }
            
        }
        else if (IS_DRY_RUN) {
            logger.log(`${src} -> \n${outputPath}\n\n`);
        }
        else {
            if (IS_STAGING) {
                logger.log(`Staging ${stagingPath}`);
                doStageModuleFile(
                    stagingPath, 
                    getCompiledTemplate(src, modelName, config, customModules)
                );
            }
            else if (IS_INSTALL) {
                logger.log(`Installing ${outputPath}`);
                if (! fs.existsSync(stagingPath)) {
                    logger.log(`\x1b[31m\nPath ${stagingPath} does not exist.\x1b[0m`);
                    exit(0);
                }
                if (! validateCustomModule(customModules, modelName)) {
                    logger.log(`\x1b[31m\nModule ${modelName} does not exist.\x1b[0m`);
                    exit(0);
                }
                doLiveModuleFile(stagingPath, livePath);
            }
        }
    }
    catch (err) {
        logger.log(`Error: ${err}`);
    }
});
logger.log('\n\x1b[32m  Finit! \x1b[0m\n')

