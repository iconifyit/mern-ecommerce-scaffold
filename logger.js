const fs = require('fs'),
    path = require('path'),
    tracer = require('tracer'),
    mkdirp = require('mkdirp')

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

const kTIMESTAMP = new Date()
    .toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric' 
    })
    .split('/')
    .reverse()
    .join('-');
const logger = getLogger(`./logs/${kTIMESTAMP}.log`);

module.exports = logger;