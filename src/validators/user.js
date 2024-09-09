const { check } = require('express-validator')
const { validateResult } = require('./helper')

const validateCreate = [
    check('run')
        .exists()
        .notEmpty()
        .custom((value, { req }) => {
            let rutv = value.replace(/[^kK0-9]/g,'');
            let largo = value.length
            
            let dv = rutv.substring(rutv.length -1);
            
            let rutn = rutv.substring(0 , rutv.length -1);
            let numeros = rutn.split('').reverse();
            let total = 0;
            
            let mult = 2;
         
            for(let num of numeros){
                total += parseInt(num) * mult;
        
                if(mult == 7){
                    mult = 2;
                }else{
                    mult++;
                }
            }
            let dvr = 11 - (total % 11);
            if(dvr == 11){
                dvr = '0';
            }else if(dvr == 10){
                dvr = 'k';
            }
            if (dv == dvr){
                if (largo >= 10) {
                    return true
                }        
                }else{
                    return false
                }
        }),
    check('nombre')
        .exists()
        .notEmpty()
        .custom((value, { req }) => {
            e = /^[a-zA-ZÀ-ÿ\s]{1,40}$/
            if(e.test(value)){
                return true
            }else{
                return false
            }
        }),
    check('apellido')
        .exists()
        .notEmpty()
        .custom((value, { req }) => {
            e = /^[a-zA-ZÀ-ÿ\s]{1,40}$/
            if(e.test(value)){
                return true
            }else{
                return false
            }
        }),
    check('telefono')
        .exists()
        .notEmpty()
        .isNumeric()
        .custom((value, { req }) => {
            e = /^\d{7,14}$/
            if(e.test(value)){
                return true
            }else{
                return false
            }
        }),
    check('email')
        .exists()
        .notEmpty()
        .custom((value, { req }) => {
            e = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
            if(e.test(value)){
                return true
            }else{
                return false
            }
        }),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateCreateForeign = [
    check('numero_documento')
        .exists()
        .notEmpty()
        .custom((value, { req }) => {
            e = /^[0-9_.\s-]{4,40}$/;
            largo = value.length
            if(e.test(value) && largo >= 4){
                return true
            }else{
                return false
            }
        }),
        check('nombre')
        .exists()
        .notEmpty()
        .custom((value, { req }) => {
            e = /^[a-zA-ZÀ-ÿ\s]{1,40}$/
            if(e.test(value)){
                return true
            }else{
                return false
            }
        }),
    check('apellido')
        .exists()
        .notEmpty()
        .custom((value, { req }) => {
            e = /^[a-zA-ZÀ-ÿ\s]{1,40}$/
            if(e.test(value)){
                return true
            }else{
                return false
            }
        }),
    check('telefono')
        .exists()
        .notEmpty()
        .isNumeric()
        .custom((value, { req }) => {
            e = /^\d{7,14}$/
            if(e.test(value)){
                return true
            }else{
                return false
            }
        }),
    check('email')
        .exists()
        .notEmpty()
        .custom((value, { req }) => {
            e = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
            if(e.test(value)){
                return true
            }else{
                return false
            }
        }),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate, validateCreateForeign }