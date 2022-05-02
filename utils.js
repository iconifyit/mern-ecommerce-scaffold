const fs = require('fs'),
    path = require('path'),
    tracer = require('tracer'),
    mkdirp = require('mkdirp')

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
            dest
        } = template;
        if (fs.existsSync(dest)) {
            isPolluted = true;
            artifacts.push(dest);
        }
    });
    return {
        isPolluted,
        artifacts
    };
};

/**
 * Sets up the logger.
 * @param {string} logfile 
 * @returns <object>
 */
const getLogger = (logfile) => {
    mkdirp.sync(path.join(__dirname, 'logs'));
    return tracer.console({
        transport: (data) => {
            console.log(data.output)
            fs.appendFile(logfile, data.rawoutput + '\n', err => {
                if (err) throw err
            })
        }
    });
};

module.exports = {
    ucWords,
    usage,
    validateArgs,
    pollutionTest,
    getLogger
}