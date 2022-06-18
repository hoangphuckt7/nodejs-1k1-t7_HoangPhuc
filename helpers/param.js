let getParam = (params, property, defaulltValue) =>{
    if(params.hasOwnProperty(property) && params[property] !== undefined && params[property] !== ''){
        return params[property]
    }

    return defaulltValue
}

module.exports = {
    getParam
}