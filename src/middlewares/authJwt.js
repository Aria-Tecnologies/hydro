const jwt = require('jsonwebtoken')
const fs = require('fs')
const db = require('../database/database')
const UserModel = db.User
const RoleModel = db.Role

const verifyToken = async (req, res, next) => {

    try {
        const privateKey = fs.readFileSync("private.pem");
        const token = req.headers['x-access-token']
    
        if(!token) return res.status(403).json({ message: 'unauthorized' })
    
        const decoded = jwt.verify(token, privateKey)
        req.userId = decoded.id

        const userFound = await UserModel.findAll({
            where: {
                id: req.userId
            }
        })
    
        if ( userFound.length == 0 ) return res.status(404).json( { message: 'User not found' } )
    
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'unauthorized' })
    }
};

const isAdmin = async(req, res, next) => {
    try {
        const user = await UserModel.findAll({
            where: {
                id: req.userId
            }
        })
        
        if(user.length > 0){
            const role = await RoleModel.findAll({
                where: {
                    id: user[0].dataValues.RoleId
                }
            })

            if (role.length > 0) {
                if (role[0].dataValues.name === 'Admin') {
                    next()
                }else{
                    return res.status(401).json({ message: 'insufficient permissions' })
                }
            }
        }else {
            console.log('else')
            return res.status(401).json({ message: 'unauthorized' })
        }
    } catch (error) {
        console.log('catch', error)
        return res.status(401).json({ message: 'unauthorized' })
    }
}

const isGuest = async(req, res, next) => {
    try {
        const user = await UserModel.findAll({
            where: {
                id: req.userId
            }
        })

        if(user.length > 0){
            const role = await RoleModel.findAll({
                where: {
                    id: user[0].dataValues.RoleId
                }
            })

            if (role.length > 0) {
                if (role[0].dataValues.name === 'Guest' || role[0].dataValues.name === 'Admin') {
                    next()
                }else{
                    return res.status(401).json({ message: 'insufficient permissions' })
                }
            }
        }else {
            return res.status(401).json({ message: 'unauthorized' })
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'unauthorized' })
    }
}

module.exports = { verifyToken, isAdmin, isGuest }

