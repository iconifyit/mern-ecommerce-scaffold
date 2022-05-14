const fs = require('fs'),
    path = require('path'),
    tracer = require('tracer'),
    mkdirp = require('mkdirp'),
    HandleParser = require('./HandleParser'),
    { exit } = require('process'),
    Inflector = require('inflected'),
    logger = require('./logger')
    ;
    
/**
 * Usage function.
 */
 const usage = () => {
    console.log(`
    Usage:

        Scaffold is a two-step process. First, you stage a module by running:
        
        \x1b[33m $ node ${path.basename(__filename)} -m <modelName> -s\x1b[0m 

        Then install the staged module, after inspecting it by running:
        
        \x1b[33m $ node ${path.basename(__filename)} -i <modelName> \x1b[0m

    Args: 

        \x1b[33m -m <string>\x1b[0m : The name of the module to create.
        \x1b[33m -d <void>\x1b[0m   : Dry run (outputs to console, no files created).
        \x1b[33m -s <void>\x1b[0m   : Stage the scaffold (created in temporary folder).    
        \x1b[33m -i <void>\x1b[0m   : Installs an already staged module.
        \x1b[33m -c <void>\x1b[0m   : Deletes a staged module staged module.
        \x1b[33m -u <void>\x1b[0m   : Un-installs an already installed module.            
        \x1b[33m -h\x1b[0m          : Show this help.
    `);
    process.exit(1);
};

/**
 * Make words mixed case.
 * @param {string} str 
 * @returns 
 */
const ucWords = (str) => {
    return str.replace(/\b[a-z]/g, (letter) => {
        return letter.toUpperCase();
    });
}

/**
 * Tests for illegal arguments.
 * @returns boolean
 */
const validateArgs = (args, allowed, required) => {
    let illegalArgs = Object.keys(args).filter(x => ! allowed.includes(x));
    if (illegalArgs.length > 0) {
        console.log(`\x1b[31m\nIllegal args : ${illegalArgs.join(', ')}\x1b[0m`);
        return false;
    }
    const missingArgs = required.filter(x => ! args[x]);
    if (missingArgs.length > 0) {
        console.log(`\x1b[31m\n\nMissing required argument(s): ${missingArgs.join(', ')}\x1b[0m`);
        return false;
    }
    return true;
};

/*
 * Test if some artifacts already exist.
 */
const pollutionTest = (templates) => {
    let isPolluted = false;
    let artifacts = [];
    templates.forEach((template) => {
        const {
            dest,
            overwrite
        } = template;
        if (fs.existsSync(dest) && ! overwrite) {
            isPolluted = true;
            artifacts.push(dest);
        }
    });
    return {
        isPolluted,
        artifacts
    };
};

// /**
//  * Sets up the logger.
//  * @param {string} logfile 
//  * @returns <object>
//  */
// const getLogger = (logfile) => {
//     mkdirp.sync(path.join(__dirname, 'logs'));
//     return tracer.console({
//         transport: (data) => {
//             console.log(data.output)
//             fs.appendFile(logfile, data.rawoutput + '\n', err => {
//                 if (err) throw err
//             })
//         }
//     });
// };

// const kTIMESTAMP = new Date().getTime();
// const logger = getLogger(`./logs/${kTIMESTAMP}.log`);

/**
 * Validates that a custom module exists.
 * @param {string} name 
 * @returns 
 */
const validateCustomModule = (customModules, name) => {
    const found = getCustomModule(customModules, name);
    return !! found;
}

/**
 * Retrieves the custom module object from the storage JSON.
 * @param {string} name 
 * @returns object
 */
const getCustomModule = (customModules, name) => {
    const found = customModules.modules.find((m) => {
        return m.name.toLowerCase() === name.toLowerCase();
    });
    return found;
}

/**
 * Stages the module file.
 * @param {string} stagingPath 
 * @param {string} content 
 */
const doStageModuleFile = (stagingPath, content) => {
    mkdirp.sync(path.dirname(stagingPath));
    fs.writeFileSync(stagingPath, content);
}

/**
 * Copies staged module file to live install.
 * @param {string} stagingPath 
 * @param {string} livePath 
 */
const doLiveModuleFile = (stagingPath, livePath) => {
    mkdirp.sync(path.dirname(livePath));
    fs.copyFileSync(stagingPath, livePath);
}

/**
 * Validates that a file exists.
 * @param {string} path 
 */
const validatePath = (path) => {
    if (!fs.existsSync(path)) {
        logger.log(`\x1b[31m\n${path} does not exist.\x1b[0m`);
        exit(0);
    }
}

/**
 * Uninstalls a previously-installed module.
 * @param {string} modelName 
 * @param {string} livePath 
 * @param {boolean} isDryRun 
 */
// src, modelName, config, customModules, isDryRun
const doUninstallModuleFile = (modelName, livePath, isDryRun) => {
    logger.log(`Uninstalling ${livePath}`);
    let theFolder = path.dirname(livePath);
    let folderName = path.basename(theFolder);
    if (! isDryRun && fs.existsSync(livePath)) {
        fs.unlinkSync(livePath);
        if (folderName.toLowerCase() === modelName.toLowerCase()) {
            if (fs.readdirSync(theFolder).length === 0) {
                logger.log(`DELETING folder ${theFolder}`)
                // fs.rmdirSync(theFolder);
            }
        }
    }
}

/**
 * Restores an installed custom module file to its previous state.
 * @param {string} src 
 * @param {string} modelName 
 * @param {string} livePath 
 * @param {boolean} isDryRun 
 */
const doRestoreModuleFile = (src, modelName, livePath, isDryRun) => {
    logger.log(`Restoring ${livePath}`);
    if (! isDryRun) {
        if (fs.existsSync(livePath)) {
            fs.unlinkSync(livePath);
        }
        const content = getCompiledTemplate(
            src, 
            modelName, 
            {fields:[], schemaFields:[]}, 
            {modules:[]}
        );
        fs.writeFileSync(livePath, content);
    }
}

/**
 * Compiles the HandleBars template.
 * @param {string} src              The template source path.
 * @param {string} modelName        The model name.
 * @param {object} config           The configuration object.
 * @param {object} customModules    The custom modules object.
 * @returns 
 */
const getCompiledTemplate = (src, modelName, config, customModules) => {
    return new HandleParser(src, {
        ModelName: modelName,
        ModelNameUpperCase: modelName.toUpperCase(),
        ModelNameLowerCase: modelName.toLowerCase(),
        ModelNamePlural: Inflector.pluralize(modelName),
        ModelNamePluralUpperCase: Inflector.pluralize(modelName).toUpperCase(),
        ModelNamePluralLowerCase: Inflector.pluralize(modelName).toLowerCase(),
        fields: config.fields,
        schemaFields: config.schemaFields,
        customModules: customModules.modules
    }).toString();
}

module.exports = {
    ucWords,
    usage,
    validateArgs,
    pollutionTest,
    validateCustomModule,
    getCustomModule,
    doStageModuleFile,
    doLiveModuleFile,
    validatePath,
    doUninstallModuleFile,
    getCompiledTemplate
}