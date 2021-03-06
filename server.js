require('dotenv').config()
const express = require('express')

const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3003
const groceriesControllers = require('./controllers/groceries.js')


const mongoose = require('mongoose')


const MONGODB_URI = process.env.MONGODB_URI ||'mongodb://localhost:27017/groceries'

//...farther down the page

// Error / Disconnection
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

//...farther down the page

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})



// middleware

//cors stuff:
const whitelist = ['http://localhost:3000', 'https://OURAPPNAME.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors())
// we should add whitelist to cors
app.use(express.json());
app.get('/', (req, res)=> {
  res.send('index')
})

app.use('/groceries', groceriesControllers)


app.listen(PORT, () => {
  console.log("port:" + PORT + "works")
})
