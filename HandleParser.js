/*
 * Import dependencies.
 */
const fs = require('fs'),
    path = require('path'),
    handlebars = require('handlebars');

const kUTF8 = 'utf-8';


class HandleParser {
    constructor(tpl, vars) {

        const fs = require('fs'),
            handlebars = require('handlebars'),
            kUTF8 = 'utf-8',
            Inflector = require('inflected');

        this.handlebars = handlebars;
        this.Inflector = Inflector;

        this.addHandlebarsPlugins();

        const template = this.handlebars.compile(fs.readFileSync(tpl, kUTF8));

        return {
            toString: () => {
                return template(vars)
            }
        }
    }

    safeName(str) {
        return this.removeNonAlphaNum(ucWords(str));
    }

    removeNonAlphaNum(str) {
        return str.replace(/[^a-zA-Z0-9]/g, '');
    }

    isAlphaNum(str) {
        return /^[a-zA-Z0-9]+$/.test(str);
    }

    addHandlebarsPlugins() {

        var self = this;

        this.handlebars.registerHelper('ucWords', (str) => {
            try {
                return str.replace(/\b[a-z]/g, function (letter) {
                    return letter.toUpperCase();
                });
            } 
            catch (e) {

            }
        });

        this.handlebars.registerHelper('eq', (a, b) => {
            return a === b;
        });

        this.handlebars.registerHelper('typeof', (value) => {
            return typeof value;
        });

        this.handlebars.registerHelper('bracket', (num, options=num) => {
            const i = Number.isInteger(num) ? num : 1;
            const open = '{'.repeat(i);
            const close = '}'.repeat(i);
            return `${open}${options.fn(this)}${close}`;
        });

        this.handlebars.registerHelper('singularize', (type) => {
            return self.Inflector.singularize(type);
        });

        this.handlebars.registerHelper('ucSingularize', (type) => {
            let str = self.Inflector.singularize(type);
            return str.replace(/\b[a-z]/g, (letter) => {
                return letter.toUpperCase();
            })
        });

        this.handlebars.registerHelper('pluralize', (type) => {
            return self.Inflector.pluralize(type);
        });

        this.handlebars.registerHelper('ucPluralize', (type) => {
            return self.Inflector.pluralize(type).toUpperCase();
        });
    }
}

module.exports = HandleParser;