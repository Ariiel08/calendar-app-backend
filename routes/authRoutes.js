//* Auth routes - /api/auth

const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { Router } = require('express');
const { validateToken } = require('../middlewares/validate-token');

const router = Router();

const { createUser, login, refreshToken } = require('../controllers/authController');

router.post('/', [
        check('email', 'Email is required.').isEmail(), 
        check('password', 'Password is required.').not().isEmpty(),
        validateFields
    ], login);

router.post('/new', [ 
        check('name', 'Name is required.').not().isEmpty(), 
        check('email', 'Email is required.').isEmail(), 
        check('password', 'Password should have 6 characters.').isLength({ min: 6 }), 
        validateFields
    ], createUser);

router.get('/refresh', validateToken, refreshToken);

module.exports = router;