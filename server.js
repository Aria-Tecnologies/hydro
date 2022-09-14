const express = require("express");
const userRoutes = require('./routes/user')
const cropRoutes = require('./routes/crop')

const PORT = process.env.PORT || "3000";

const app = express();

/**
 * Middleware
 */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Routes
 */

app.use("/user", userRoutes);
app.use("/crop", cropRoutes);
app.get("/", (req, res) =>{
     res.status(200).json({status: true, message: 'All works!!'})
})

/**
 * Start listeninig
 */

app.listen(PORT, () =>{
     console.log(`Server liestening on port ${PORT}`)
})
