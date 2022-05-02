const getTemplates = (modelName) => {
    return [
        // Schema
        {
            "src": './templates/schema.handlebars',
            "dest": `../server/models/${modelName.toLowerCase()}.js`
        },
    
        // API Routes
        {
            "src": './templates/api.handlebars',
            "dest": `../server/routes/api/${modelName.toLowerCase()}.js`
        },
    
        // Container
        {
            "src": './templates/containers/actions.handlebars',
            "dest": `../client/app/containers/${modelName}/actions.js`
        },
        {
            "src": './templates/containers/Add.handlebars',
            "dest": `../client/app/containers/${modelName}/Add.js`
        },
        {
            "src": './templates/containers/Edit.handlebars',
            "dest": `../client/app/containers/${modelName}/Edit.js`
        },
        {
            "src": './templates/containers/constants.handlebars',
            "dest": `../client/app/containers/${modelName}/constants.js`
        },
        {
            "src": './templates/containers/index.handlebars',
            "dest": `../client/app/containers/${modelName}/index.js`
        },
        {
            "src": './templates/containers/List.handlebars',
            "dest": `../client/app/containers/${modelName}/List.js`
        },
        {
            "src": './templates/containers/reducer.handlebars',
            "dest": `../client/app/containers/${modelName}/reducer.js`
        },
    
        // Managers
        {
            "src": './templates/components/Manager/Add@modelName@/index.handlebars',
            "dest": `../client/app/components/Manager/Add${modelName}/index.js`
        },
        {
            "src": './templates/components/Manager/Edit@modelName@/index.handlebars',
            "dest": `../client/app/components/Manager/Edit${modelName}/index.js`
        },
        {
            "src": './templates/components/Manager/@modelName@List/index.handlebars',
            "dest": `../client/app/components/Manager/${modelName}List/index.js`
        }
    ]
}

module.exports = getTemplates;