const express = require("express");
const morgan = require('morgan')
const { conn } = require('./src/database/database.js')
const cropRoutes = require('./src/routes/crop')
const authRoutes = require('./src/routes/auth')

var bodyParser = require('body-parser');
const { connect } = require("./src/routes/crop");


const PORT = process.env.PORT || "3000";

const app = express();

//db.test();
/**
 * Middleware
 */
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


/**
 * Routes
 */

app.use("/auth", authRoutes);
app.use("/crop", cropRoutes);
app.get("/", (req, res) =>{
     res.status(200).json({status: true, message: 'All works!!'})
})

/**
 * Start listeninig
 */

 conn.sync({ force: true }).then(async () => {
     app.listen(PORT, () =>{
          console.log(`Server liestening on port ${PORT}`)
     })
})