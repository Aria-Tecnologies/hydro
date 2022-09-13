const express = require("express");

const PORT = process.env.PORT || "3000";

const app = express();

/**
 * Middleware
 */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Start listeninig
 */

app.listen(PORT, () =>{
     console.log(`Server liestening on port ${PORT}`)
})
