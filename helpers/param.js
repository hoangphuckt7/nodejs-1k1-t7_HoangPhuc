let getParam = (params, property, defaulltValue) =>{
    if(params.hasOwnProperty(property) && params[property] !== undefined){
        return params[property]
    }

    return defaulltValue
}

module.exports = {
    getParam
}