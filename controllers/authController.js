const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../helpers/jwt');

const createUser = async( req, res = response ) => {

    const { email, password } = req.body;
    
    try {

        let user = await User.findOne({ email });
        
        if ( user ){
            return res.status(400).json({
                ok: false,
                msg: 'User already exists with that email.'
            });
        }

        user = new User( req.body );

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        //* Generate JWT
        const token = await generateToken( user.id, user.name );

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please communicate with the administrator.'
        });
    }

}

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if ( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'There is no user with that email.'
            });
        }

        const decryptedPass = bcrypt.compareSync( password, user.password );

        if ( !decryptedPass ){
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password.'
            });
        }

        //* Generate JWT
        const token = await generateToken( user.id, user.name );

        return res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please communicate with the administrator.'
        });
    }

}

const refreshToken = async( req, res = response ) => {

    const { uid, name } = req;

    const token =  await generateToken( uid, name );

    return res.json({
        ok: true,
        uid,
        name,
        token
    });
}

module.exports = {
    createUser,
    login,
    refreshToken
}