const util = require('util');
const notifyConfig = require('../configs/notify')

const options = {
    name: { min: 5, max: 10},
    ordering : { min: 0, max: 100},
    status : { value: 'novalue'}
}
module.exports = {
    validator:(body, check) => {
            // Name
            body('name',util.format(notifyConfig.validate_form.NOTIFY_VALIDATE_NAME, options.name.min, options.name.max))
                .isLength({min:options.name.min, max: options.name.max}),

            // Ordering
            body('ordering', util.format(notifyConfig.validate_form.NOTIFY_VALIDATE_ORDERING, options.ordering.min, options.ordering.max))
                .isInt({gt:options.ordering.min, sl:options.ordering.max}),//gt: greater, sl: smaller

            // Status
            check('status', notifyConfig.validate_form.NOTIFY_VALIDATE_STATUS).custom((value) =>{
                return value !== options.status.value
	    })
    }
}