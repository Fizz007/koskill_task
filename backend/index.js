const express = require("express");
const app = express();
const cors = require('cors')
app.use(cors());


//MIDDLEWARE
app.use(express.json())

//Routes
const userRoutes = require('./routes/userRoutes')
const customerRoutes = require('./routes/customerRoutes')
app.use('/user', userRoutes)
app.use('/customer', customerRoutes)

//PAGINATION
const Customers = require('./model/customerModel')

app.get('/paginatedUsers', async(req,res)=> {
    const allUser = await Customers.find({});
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)

  const startIndex = (page - 1) * limit
  const lastIndex = (page) * limit

  const results = {}
  results.totalUser=allUser.length;
  results.pageCount=Math.ceil(allUser.length/limit);

  if (lastIndex < allUser.length) {
    results.next = {
      page: page + 1,
    }
  }
  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
    }
  }
  results.result = allUser.slice(startIndex, lastIndex);
  res.json(results)
})

require('./config/connectDB')
const PORT = 4000
app.listen(PORT , ()=> console.log(`server is running on ${PORT}`))