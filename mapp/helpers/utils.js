const Items = require('../app/models/tables/Items')

const createFillerStatus = (currentStatus) => {

    let statusFilter = [
        {name: 'All', value:"all", count: 4, link:"#", class: 'defaullt'},
        {name: 'Active', value:"active", count: 4, link:"#", class: 'defaullt'},
        {name: 'Inactive', value:"inactive", count: 4, link:"#", class: 'defaullt'}
    ]
    statusFilter.forEach((countItem, index) => {
    let condition = {}
    if(countItem.value !== 'all') condition = {status: countItem.value}
    if(countItem.value === currentStatus) statusFilter[index].class = 'success'
    
    Items.count(condition).then((data)=>{
        statusFilter[index].count = data
    })
  })
  return statusFilter
}

module.exports = {
    createFillerStatus: createFillerStatus
}