const express = require('express');
const router = express.Router();
//import express validator
const { body, validationResult } = require('express-validator');

//import database
const connection = require('../config/database');

router.get('/', function (req, res) {
    //query
    connection.query('SELECT * FROM indoor', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                data: rows
            })
        }
    });
});

router.post('/simpan', [

    //validation
  body('id_indoor').notEmpty(),
    body('id_kerja').notEmpty(),
    body('status').notEmpty(),

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //define formData
    let formData = {
        id_indoor: req.body.id_indoor,
        id_kerja: req.body.id_kerja,
        status: req.body.status,
        
    }

    // insert query
    connection.query('INSERT INTO pekerjaan SET ?', formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Successfully',
                data: rows[0]
            })
        }
    })

});

router.get('/getid/:id', function (req, res) {

    const id = req.params.id;

    connection.query(`SELECT * FROM indoor WHERE id_indoor = '${id}'`, function (err, rows) {

        if (err) {
            return res.status(500).json({ 
                status: false,
                message: 'Internal Server Error',
            })
        }

        // if post not found
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Post Not Found!',
            })
        }
        // if post found
        else {
            return res.status(200).json({
                data: rows[0]
            })
        }
    })
})

router.patch('/update/:id',  [

    body('id_indoor').notEmpty(),
    body('id_kerja').notEmpty(),
    body('status').notEmpty(),

], (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const id = req.params.id;

    let formData = {
        id_indoor: req.body.id_indoor,
        id_kerja: req.body.id_kerja,
        status: req.body.status,
        
    }

    connection.query(`UPDATE indoor SET ? WHERE id_kerja = '${id}'`,formData,function (err, rows) {

        if(err){
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully',
                data: rows[0]
            })
        }
    })

    

})

router.delete('/delete/:id', function (req, res) {

    const id = req.params.id;

    connection.query(`DELETE FROM indoor WHERE id_kerja = '${id}'`, function (err, rows) {

        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Delete Data Successfully',
                data: rows[0]
            })
        }
    })
})


module.exports = router;