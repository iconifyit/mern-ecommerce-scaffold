# Scaffold Utility for MERN E-commerce

## Description

Scaffold is a utility for scaffolding MERN E-commerce modules. The scaffold will create the DB Schema, the API routes, the Manager module, and the container module. Some manual installation is required but most of the repetitive tasks are fully-automated.

The scaffolded module is first staged in `./scaffold/stage/{moduleName}`. You can inspect the module or make edits as needed. The scaffolded module is not a production-ready module. It is a starting point for your own module. Some basic fields are added to the various pieces of the module but it is up to you to build out the specifics for your needs.

Scaffold uses a two-step approach so that you are in complete control and no changes or overwrites are made to your existing code. You must first stage the module, then install it. If there is an existing module with the name you use, you cannot create the module. You must first manually remove the existing module (if it was not created with Scaffold), then you can use Scaffold.

**CAUTION** Scaffold does include a `force` feature but only to over-ride modules it created. If there is no module with the same name in Staging, it will not overwrite an exist module created by other means. It will however, overwrite whatever staged module you created & installed with the same name previously. Previously scaffolded modules, that have not been installed to the live code, can be overwritten by simply running Scaffold with the same name again.

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