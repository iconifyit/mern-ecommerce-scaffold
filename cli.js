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
        getLogger,
        ucWords
    } = require('./utils');


const timestamp = new Date().getTime();
const logger = getLogger(`./logs/${timestamp}.log`);

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

if (!validateArgs(args, allLegalArgs, requiredArgs)) {
    usage();
}

const modelName = args.m;
let IS_DRY_RUN = args.d || false;
let IS_INSTALL = args.i || false;
let IS_UNINSTALL = args.u || false;
let IS_STAGING = args.s || (!IS_DRY_RUN && !IS_INSTALL && !IS_UNINSTALL);
let IS_CLEAN = args.c || false;
let IS_FORCE = args.force || false;

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

/*
 * Load the templates list
*/
templates = require('./templates.js')(ucWords(modelName));

/*
 * Test if some artifacts already exist.
*/
const { isPolluted, artifacts } = pollutionTest(templates);
if (!IS_UNINSTALL && isPolluted) {
    if (! IS_FORCE && IS_STAGING) {
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
if ((IS_STAGING && IS_CLEAN)) {
    fs.rmSync(stagingDir, { recursive: true, force: true });
}
mkdirp.sync(stagingDir);

/*
 * Loop through the templates.
*/
logger.log('\n');
logger.log(`MODE : ${IS_DRY_RUN ? 'DRY RUN' : IS_INSTALL ? 'INSTALL' : 'STAGING'}`);
logger.log(`MODEL: ${modelName}\n`);

templates.forEach((template) => {
    try {
        const { src, dest } = template;

        let stagingPath = dest.replace('../', `${stagingDir}/`);
        let livePath = dest;
        let outputPath = IS_INSTALL ? livePath : stagingPath;

        if (IS_UNINSTALL) {
            logger.log(`Uninstalling ${livePath}`);
            let theFolder = path.dirname(livePath);
            let folderName = path.basename(theFolder);
            if (!IS_DRY_RUN) {
                fs.unlinkSync(livePath);
                if (folderName.toLowerCase() === modelName.toLowerCase()) {
                    if (fs.readdirSync(theFolder).length === 0) {
                        logger.log(`DELETING folder ${theFolder}`)
                        // fs.rmdirSync(theFolder);
                    }
                }
            }
        }
        else if (IS_DRY_RUN) {
            logger.log(`${src} -> ${outputPath}`);
        }
        else {
            const content = new HandleParser(src, {
                ModelName: modelName,
                ModelNameUpperCase: modelName.toUpperCase(),
                ModelNameLowerCase: modelName.toLowerCase(),
                ModelNamePlural: Inflector.pluralize(modelName),
                ModelNamePluralUpperCase: Inflector.pluralize(modelName).toUpperCase(),
                ModelNamePluralLowerCase: Inflector.pluralize(modelName).toLowerCase()
            }).toString();

            if (IS_STAGING) {
                logger.log(`Staging ${outputPath}`);
                mkdirp.sync(path.dirname(stagingPath));
                fs.writeFileSync(outputPath, content);
            }
            else if (IS_INSTALL) {
                logger.log(`Installing ${outputPath}`);
                mkdirp.sync(path.dirname(livePath));
                fs.copyFileSync(stagingPath, livePath);
            }
        }
    }
    catch (err) {
        logger.log(`Error: ${err}`);
    }
});
logger.log('\n');
logger.log('\x1b[32m  Finit! \x1b[0m')
logger.log('\n');