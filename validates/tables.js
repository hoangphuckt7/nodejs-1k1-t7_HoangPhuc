module.exports = {
    validator:(body) => {
            body('name','name không phù hợp').isLength({min:5}),
            body('ordering','lơn hơn 0').isInt({gt:0, sl:100}),//gt: greater, sl: smaller
            body('status','không được rỗng').custom((value) =>{
                return value !== 'novalue'
	    })
    }
}