var express = require('express');
var router = express.Router();
const Items = require('../../configs/models/Items')

/* GET dashboard page. */
router.get('(/:status)?', (req, res, next) => {
  let objWhere = {}
  let currentStatus = req.params.status

  let statusFillter = [
    {name: 'All', value:"all", count: 4, link:"#", class: 'defaullt'},
    {name: 'Active', value:"active", count: 4, link:"#", class: 'defaullt'},
    {name: 'Inactive', value:"inactive", count: 4, link:"#", class: 'defaullt'}
  ]
  statusFillter.forEach((countItem, index)=>{
    let condition = {}
    if(countItem.value !== 'all') condition = {status: countItem.value}
    if(countItem.value === currentStatus) statusFillter[index].class = 'success'
    Items.count(condition).then((data)=>{
      statusFillter[index].count = data
    })
  })

  if (currentStatus !== "all") objWhere = {status: currentStatus}
  Items.find(objWhere)
  .then((items)=>{
      res.render('pages/tables/index', {
         pageTitle: 'Tables',
         items: items,
         statusFillter
        });
    })
  .catch(next)
});


module.exports = router;
