exports.findAll = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select cliente.idCliente, Numero_Documento, Nombre, Apellido, Telefono, Email, Nacionalidad from extranjero inner join cliente on Extranjero_idCliente = extranjero.idCliente inner join nacionalidad on nacionalidad_idNacionalidad = idNacionalidad;', (err, e) => {
          if(err) {
            res.json(err);
          }
          conn.query('select cliente.idCliente, Run, Nombre, Apellido, Telefono, Email, Nacionalidad from chileno inner join cliente on chileno_idCliente = chileno.idCliente inner join nacionalidad on nacionalidad_idNacionalidad = idNacionalidad;', (err, c) => {
            if(err) {
              res.json(err);
            }
            res.render('clients/clients', { c,e });
          });
        });
      });
}

exports.delete = (req, res) => {
  id = req.params.id
  req.getConnection ((err, conn) => {
    conn.query('delete from cliente where idCliente = (?);', [id], (err, req) => {
      if (err){
        res.json(err);
      }
      res.redirect('/clientes')
    })
  })
};
