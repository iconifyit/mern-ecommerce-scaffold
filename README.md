# Scaffold Utility for MERN E-commerce

## Description

Scaffold is a utility for scaffolding MERN E-commerce modules. The scaffold will create the DB Schema, the API routes, the Manager module, and the container module. Some manual installation is required but most of the repetitive tasks are fully-automated.

The scaffolded module is first staged in `./scaffold/stage/{moduleName}`. You can inspect the module or make edits as needed. The scaffolded module is not a production-ready module. It is a starting point for your own module. Some basic fields are added to the various pieces of the module but it is up to you to build out the specifics for your needs.

Scaffold uses a two-step approach so that you are in complete control and no changes or overwrites are made to your existing code. You must first stage the module, then install it. If there is an existing module with the name you use, you cannot create the module. You must first manually remove the existing module (if it was not created with Scaffold), then you can use Scaffold.

**CAUTION** Scaffold does include a `force` feature but only to over-ride modules it created. If there is no module with the same name in Staging, it will not overwrite an exist module created by other means. It will however, overwrite whatever staged module you created & installed with the same name previously. Previously scaffolded modules, that have not been installed to the live code, can be overwritten by simply running Scaffold with the same name again.

## Installation

**NOTE** I have not written an installer such as npm yet but will very soon. For the time-being, you will need to install Scaffold manually, but I promise, it is very simple. 

- Clone this repo to the root folder of your MERN E-commerce project.
- Copy the `generics` folder to `./server/generics`
- Copy the `BaseManagerForm` module to `./client/app/Components/Manager/BaseManagerForm`

Scaffold includes a layer of abstrction that MERN E-commerce does not, however, this layer can be used right alongside the existing architecture and both will work. The changes are, specifically, an API Router superclass, a Schema superclass, and ManagerForm superclass. These additions are NOT breaking changes to MERN E-commerce and can be easily added or removed without affecting the existing code.

## Usage

Scaffold is a two-step process. First, you stage a module by running:

### Staging the Module:

```
$ node ./cli.js -m <modelName> -s
```

### Installiong a Module:
Then install the staged module, after inspecting it by running:

``` 
$ node ./cli.js -m <modelName> -i
```

### Un-installiong a Module:
Then install the staged module, after inspecting it by running:

```bash 
$ node ./cli.js -m <modelName> -u
```

### Dry Run:

```
$ node ./cli.js -m <modelName> -d
```


### Args: 

```
-m <string> : The name of the module to create.
-d <void>   : Dry run (outputs to console, no files created).
-s <void>   : Stage the scaffold (created in temporary folder).    
-i <void>   : Installs an already staged module.
-c <void>   : Deletes a staged module staged module.
-u <void>   : Un-installs an already installed module.            
-h <void>   : Show this help.
```

## Post-install

After running install, you will need to do the following:

- Add credits actions import to client/app/actions.js
- Add credits reducer to client/app/reducers.js
- Add credits routes to server/routes/api/index.js
- Add link to client/containers/Dashboard/links.json
- Add Credit import to client/app/components/Manager/Dashboard/Admin.js

## Examples

You can view example output from Scaffold in the `stage` directory in this repo. 

## About Scaffold

Scaffold uses the Handlebars templating engine to generate the JavaScript and ReactJS files. The Handlebars templates are stored in the `templates` directory. I chose Handlebars because it is very easy to use and allowed me to write the templates in a way that is easy to read and maintain.

### Usage Supporting my Work

If you find my work helpful, you can thank me by making a donation to the critically-important work of the [Borneo Orangutan Survival](https://bosa.secure.force.com/#!/donation) project

## Credit

Scaffold is based on the wonderful work of [Mohamed Samara](https://github.com/mohamedsamara) and the [MERN E-commerce](https://github.com/mohamedsamara/mern-ecommerce) project.