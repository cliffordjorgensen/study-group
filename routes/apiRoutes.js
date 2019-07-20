const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.js');
// GET all
router.get('/', async(req, res) => {
    try {
        const allContacts = await Contact.find();
        res.send(allContacts);
    } catch (e) {
        console.log(e)
    }

});
// GET one contact
router.get('/:id', getContactById, (req, res) => {
    res.send(res.contact);

});
// creating a new contact
router.post('/', async(req, res) => {

    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    })
    try {
        const newContact = await contact.save();
        res.status(201).json(newContact);

    } catch (e) {
        console.log(e);
    }
});
// deleting a contact
router.delete('/:id', getContactById, async(req, res) => {
    try {
        await res.contact.remove();
        res.json({
            message: "contact gone"
        })
    } catch (e) {
        res.status(505).json({
            message: e.message
        })
    }
});
// update object properties
router.patch('/:id', getContactById, async(req, res) => {
    if (req.body.name != null) {
        res.contact.name = req.body.name
    }
    if (req.body.email != null) {
        res.contact.email = req.body.email
    }
    if (req.body.message != null) {
        res.contact.message = req.body.message
    }
    try {
        const updatedcontact = await res.contact.save();
        res.json(updatedcontact);
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});
// middleware
async function getContactById(req, res, next) {
    let contact;
    try {
        contact = await Contact.findById(req.params.id);
        if (contact == null) {
            return res.status(404).json('contact not found');
        }
    } catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }

    res.contact = contact;
    next();
};



module.exports = router;