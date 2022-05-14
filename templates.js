const getTemplates = (modelName) => {
    return [
        // Schema
        {
            "name": "schema",
            "src": './templates/schema.handlebars',
            "dest": `../server/models/${modelName.toLowerCase()}.js`
        },
    
        // API Routes
        {
            "name": "api-routes",
            "src": './templates/api.handlebars',
            "dest": `../server/routes/api/${modelName.toLowerCase()}.js`
        },
    
        // Container
        {
            "name": "actions",
            "src": './templates/client/app/containers/actions.handlebars',
            "dest": `../client/app/containers/${modelName}/actions.js`
        },
        {
            "name": "add",
            "src": './templates/client/app/containers/Add.handlebars',
            "dest": `../client/app/containers/${modelName}/Add.js`
        },
        {
            "name": "edit",
            "src": './templates/client/app/containers/Edit.handlebars',
            "dest": `../client/app/containers/${modelName}/Edit.js`
        },
        {
            "name": "constants",
            "src": './templates/client/app/containers/constants.handlebars',
            "dest": `../client/app/containers/${modelName}/constants.js`
        },
        {
            "name": "container",
            "src": './templates/client/app/containers/index.handlebars',
            "dest": `../client/app/containers/${modelName}/index.js`
        },
        {
            "name": "list",
            "src": './templates/client/app/containers/List.handlebars',
            "dest": `../client/app/containers/${modelName}/List.js`
        },
        {
            "name": "reducer",
            "src": './templates/client/app/containers/reducer.handlebars',
            "dest": `../client/app/containers/${modelName}/reducer.js`
        },
    
        // Managers
        {
            "name": "add-${modelName}",
            "src": './templates/client/app/components/Manager/Add@modelName@/index.handlebars',
            "dest": `../client/app/components/Manager/Add${modelName}/index.js`
        },
        {
            "name": "edit-${modelName}",
            "src": './templates/client/app/components/Manager/Edit@modelName@/index.handlebars',
            "dest": `../client/app/components/Manager/Edit${modelName}/index.js`
        },
        {
            "name": "list-${modelName}",
            "src": './templates/client/app/components/Manager/@modelName@List/index.handlebars',
            "dest": `../client/app/components/Manager/${modelName}List/index.js`
        },

        // app
        {
            "name": "app-actions",
            "src": './templates/client/app/actions.handlebars',
            "dest": `../client/app/actions.js`,
            "overwrite": true
        },

        {
            "name": "app-reducers",
            "src": './templates/client/app/reducers.handlebars',
            "dest": `../client/app/reducers.js`,
            "overwrite": true
        },

        {
            "name": "api-routes",
            "src": './templates/server/routes/api/index.handlebars',
            "dest": `../server/routes/api/index.js`,
            "overwrite": true
        },

        // Dashboard
        {
            "name": "admin-dashboard",
            "src": './templates/client/app/components/Manager/Dashboard/Admin.handlebars',
            "dest": `../client/app/components/Manager/Dashboard/Admin.js`,
            "overwrite": true
        },
        {
            "name": "customer-dashboard",
            "src": './templates/client/app/components/Manager/Dashboard/Customer.handlebars',
            "dest": `../client/app/components/Manager/Dashboard/Customer.js`,
            "overwrite": true
        },
        {
            "name": "merchant-dashboard",
            "src": './templates/client/app/components/Manager/Dashboard/Merchant.handlebars',
            "dest": `../client/app/components/Manager/Dashboard/Merchant.js`,
            "overwrite": true
        },
        
        // Nav links
        {
            "name": "nav-links",
            "src": './templates/client/app/containers/dashboard/links.handlebars',
            "dest": `../client/app/containers/Dashboard/links.json`,
            "overwrite": true
        },

    ]
}

module.exports = getTemplates;