const handle = require('./app/server')
require('dotenv').config()
const port = process.env.PORT || 3000

handle.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})