const express = require("express");

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

app.get("/", (req, res) =>{
     res.status(200).json({status: true, message: 'All works!!'})
})

/**
 * Start listeninig
 */

app.listen(PORT, () =>{
     console.log(`Server liestening on port ${PORT}`)
})
