const { validationResult } = require('express-validator')

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        res.status(403)
        
        res.render('user/error', { layout: false })
    }
}

const auth = (req, res, next) => {
    if (req.session.user && req.session.admin){
        req.getConnection((err, conn) => {
            conn.query('select * from sesiones where username = (?)', [req.session.user], async (err, results) => {
                if(err){
                    res.json(err)
                }
                if (results.length < 0) {
                    return res.redirect('/login');
                }else{
                    return next();
                }
            })
        })
    } else {
        return res.redirect('/login');
    }
};

module.exports = { validateResult, auth }