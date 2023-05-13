//* Events routes - /api/events

const { Router } = require("express");
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/eventsController");
const { validateToken } = require("../middlewares/validate-token");
const { validateFields } = require('../middlewares/validate-fields');
const { isDate } = require('../helpers/isDate');

const router = Router();

//* All routes use middleware validateToken
router.use( validateToken );

router.get('/', getEvents);

router.post('/', [
        check('title', 'Title is required.').not().isEmpty(),
        check('start', 'Start date is required.').custom( isDate ),
        check('end', 'End date is required.').custom( isDate ),
        validateFields
    ], createEvent);

router.put('/:id', [
        check('title', 'Title is required.').not().isEmpty(),
        check('start', 'Start date is required.').custom( isDate ),
        check('end', 'End date is required.').custom( isDate ),
        validateFields
    ], updateEvent);
    
router.delete('/:id', deleteEvent);

module.exports = router;

