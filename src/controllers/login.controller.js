const bcrypt = require("bcryptjs");

exports.auth = (req, res) => {
    const { username, password } = req.body
    const username_ = username.replace(/['"`;=]/g,'')
    req.getConnection((err, conn) => {
        conn.query('select * from sesiones where username = (?)', [username_], async (err, results) => {
            if(err){
                res.json(err)
            }
            if (results.length > 0) {
                if(await bcrypt.compare(password, results[0].password)){
                    req.session.user = username_;
                    req.session.admin = true;
                    res.status(200).json({message: 200});
                }else{
                    const error = new Error('Usuario o contraseña incorrectas');
                    res.status(400).json({message: error.message});
                }
            }else{
                const error = new Error('Usuario o contraseña incorrectas');
                res.status(400).json({message: error.message});
            }
        })
    })
}

exports.register = (req, res) => {
    const { username, password, confirm_password } = req.body
    const username_ = username.replace(/['"`;=]/g,'')
    req.getConnection((err, conn) => {
        conn.query('select username from sesiones where username = (?);', [username_],async (err, results) => {
            if(err){
              res.json(err);
            }
            if (results.length > 0) {
                data = {
                    error: true,
                    message: 'El usuario ya existe',
                    username: username_
                }
                return res.render('login/register', { data, layout:false })
                // return res.json('El usuario ya existe')
            } else if (password != confirm_password) {
                data = {
                    error: true,
                    message: 'Las contraseñas no coinciden',
                    username: username_
                }
                return res.render('login/register', { data, layout:false })
                // return res.json('Las contraseñas no coinciden')
            }
            let hashedPassword = await bcrypt.hash(password, 10);
            conn.query('insert into sesiones (username, password) values (?,?);', [username_, hashedPassword], (err, results) => {
                if(err){
                    res.json(err)
                }
                res.redirect('/')
            })
          })
      })
}
