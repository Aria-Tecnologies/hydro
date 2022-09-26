const jwt = require('jsonwebtoken')
const fs = require('fs')
const db = require('../database/database')
const UserModel = db.User

const verifyToken = async (req, res, next) => {

    try {
        const privateKey = fs.readFileSync("private.pem");
        const token = req.headers['x-access-token']
    
        console.log(token)
        if(!token) return res.status(403).json({ message: 'unauthorized' })
    
        const decoded = jwt.verify(token, privateKey)
    
        const userFound = await UserModel.findAll({
            where: {
                id: decoded.id
            }
        })
    
        if ( userFound.length == 0 ) return res.status(404).json( { message: 'User not found' } )
    
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'unauthorized' })
    }
};

module.exports = verifyToken

