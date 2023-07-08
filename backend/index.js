const express = require("express");
const app = express();
const cors = require('cors')

app.use(cors());
const userRoutes = require('./routes/userRoutes')
const customerRoutes = require('./routes/customerRoutes')
app.use(express.json())
app.use('/user', userRoutes)
app.use('/customer', customerRoutes)

require('./config/connectDB')
const PORT = 4000
app.listen(PORT , ()=> console.log(`server is running on ${PORT}`))