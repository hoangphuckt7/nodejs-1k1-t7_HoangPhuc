const FooterModule = require("../../models/footer/Footer");
const recentPostModule = require("../../models/footer/Rencent_post");

class HomeController {

    
    //[GET] /
    show(req, res, next) {
        FooterModule.find()
            .then((item)=>{
                res.render('pages/home/index', { 
                    pageTitle: 'Shop' ,
                    item,
                    layout:frontend + "/index"
                });
            })
            .catch(next)
    }
}

module.exports = new HomeController()