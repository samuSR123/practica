exports.findAll = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('select agenda.id, Run, Numero_Documento, concat_ws(" ",chileno.Nombre,extranjero.Nombre) as Nombre, concat_ws(" ",chileno.Apellido,extranjero.Apellido) as Apellido, concat_ws(" ",chileno.Telefono,extranjero.Telefono) as Telefono, concat_ws(" ",chileno.Email,extranjero.Email) as Email, nacionalidad.Nacionalidad, Fecha, Hora_Inicio, Hora_Termino from agenda inner join horario on Horario_idHorario = idHorario left join cliente on Cliente_idCliente = idCliente inner join hora on idHora = Hora_idHora inner join fecha on idFecha = Fecha_idFecha left join extranjero on Extranjero_idCliente = extranjero.idCliente left join chileno on Chileno_idCliente = chileno.idCliente left join nacionalidad on idNacionalidad = chileno.Nacionalidad_idNacionalidad or idNacionalidad = extranjero.Nacionalidad_idNacionalidad order by Fecha asc, Hora_Inicio asc;',(err, all) => {
      if (err){
        res.json(err);
      }
      res.render('clients/clientSchedule', { all })
    })
  })
}

exports.find = (req, res) => {
  let adr = new URL(req.connection.encrypted ? 'https' : 'http' + '://' + req.headers.host + req.url)
  if (adr.searchParams.has('fecha') == true){
    Fecha_ = adr.searchParams.get('fecha').replace(/['"`;=]/g,'')
    req.getConnection((err, conn) => {
      conn.query('select agenda.id, Run, Numero_Documento, concat_ws(" ",chileno.Nombre,extranjero.Nombre) as Nombre, concat_ws(" ",chileno.Apellido,extranjero.Apellido) as Apellido, concat_ws(" ",chileno.Telefono,extranjero.Telefono) as Telefono, concat_ws(" ",chileno.Email,extranjero.Email) as Email, nacionalidad.Nacionalidad, Fecha, Hora_Inicio, Hora_Termino from agenda inner join horario on Horario_idHorario = idHorario left join cliente on Cliente_idCliente = idCliente inner join hora on idHora = Hora_idHora inner join fecha on idFecha = Fecha_idFecha left join extranjero on Extranjero_idCliente = extranjero.idCliente left join chileno on Chileno_idCliente = chileno.idCliente left join nacionalidad on idNacionalidad = chileno.Nacionalidad_idNacionalidad or idNacionalidad = extranjero.Nacionalidad_idNacionalidad WHERE Fecha = (?) order by Fecha asc, Hora_Inicio asc;',[Fecha_],(err, all) => {
        if(err){
          res.json(err);
        }
        res.render('clients/clientSchedule', { all, Fecha_ })
      })
    })
  }else if(adr.searchParams.has('nombre') == true){
    nombre = adr.searchParams.get('nombre')
    Nombre_ = `%${nombre}%`
    req.getConnection((err, conn) => {
      conn.query('select agenda.id, Run, Numero_Documento, concat_ws(" ",chileno.Nombre,extranjero.Nombre) as Nombre, concat_ws(" ",chileno.Apellido,extranjero.Apellido) as Apellido, concat_ws(" ",chileno.Telefono,extranjero.Telefono) as Telefono, concat_ws(" ",chileno.Email,extranjero.Email) as Email, nacionalidad.Nacionalidad, Fecha, Hora_Inicio, Hora_Termino from agenda inner join horario on Horario_idHorario = idHorario left join cliente on Cliente_idCliente = idCliente inner join hora on idHora = Hora_idHora inner join fecha on idFecha = Fecha_idFecha left join extranjero on Extranjero_idCliente = extranjero.idCliente left join chileno on Chileno_idCliente = chileno.idCliente left join nacionalidad on idNacionalidad = chileno.Nacionalidad_idNacionalidad or idNacionalidad = extranjero.Nacionalidad_idNacionalidad WHERE extranjero.nombre like (?) or chileno.nombre like (?) order by Fecha asc, Hora_Inicio asc;',[Nombre_, Nombre_],(err, all) => {
        if(err){
          res.json(err);
        }
        res.render('clients/clientSchedule', { all, nombre })
      })
    })
  }else{
    Fecha_1 = adr.searchParams.get('fecha_1').replace(/['"`;=]/g,'')
    Fecha_2 = adr.searchParams.get('fecha_2').replace(/['"`;=]/g,'')
    req.getConnection((err, conn) => {
      conn.query('select agenda.id, Run, Numero_Documento, concat_ws(" ",chileno.Nombre,extranjero.Nombre) as Nombre, concat_ws(" ",chileno.Apellido,extranjero.Apellido) as Apellido, concat_ws(" ",chileno.Telefono,extranjero.Telefono) as Telefono, concat_ws(" ",chileno.Email,extranjero.Email) as Email, nacionalidad.Nacionalidad, Fecha, Hora_Inicio, Hora_Termino from agenda inner join horario on Horario_idHorario = idHorario left join cliente on Cliente_idCliente = idCliente inner join hora on idHora = Hora_idHora inner join fecha on idFecha = Fecha_idFecha left join extranjero on Extranjero_idCliente = extranjero.idCliente left join chileno on Chileno_idCliente = chileno.idCliente left join nacionalidad on idNacionalidad = chileno.Nacionalidad_idNacionalidad or idNacionalidad = extranjero.Nacionalidad_idNacionalidad WHERE Fecha between (?) and (?)  order by Fecha asc, Hora_Inicio asc;',[Fecha_1, Fecha_2],(err, all) => {
        if(err){
          res.json(err);
        }
        res.render('clients/clientSchedule', { all, Fecha_1, Fecha_2 })
      })
    })
  }
}

exports.create = (req, res) => {
  //Datos extraidos del Formulario
  run = client.run
  num_doc = client.numero_documento
  nombre_f = client.nombre
  apellido_f = client.apellido
  telefono_f = client.telefono
  email_f = client.email
  //Datos extraidos del HTML
  idHorario = req.params.id
  id = req.body.id
  nombre = req.body.nombre
  apellido = req.body.apellidos
  telefono = req.body.telefono
  email = req.body.email
  nacionalidad = req.body.nacionalidad
  //
  req.getConnection((err, conn) => {
    conn.query('SELECT DISTINCT idHorario FROM horario inner join fecha on idFecha = Fecha_idFecha inner join hora on idHora = Hora_idHora WHERE NOT EXISTS (SELECT * FROM agenda WHERE agenda.Horario_idHorario = horario.idHorario) and timestampdiff(minute, now(), concat_ws(" ",Fecha, Hora_Inicio)) >= 59;', (err, result) => {
      if(err) {
        res.json(err);
      }
      const i = result.some(a => {
        return idHorario == a.idHorario
      });
      if(i == true){
        const promesaId = new Promise((resolve, reject) => {
          if (nacionalidad == 'Chileno'){
            if(run === id && nombre_f === nombre && apellido_f === apellido && telefono === telefono_f && email === email_f){
              req.getConnection((err, conn) => {
                conn.query('insert into chileno (Run, Nombre, Apellido, Telefono, Email, Nacionalidad_idNacionalidad) values (?,?,?,?,?,?);',[id, nombre, apellido, telefono, email, 1],(err, clientRows) =>{
                  if(err){
                    reject.json(err);
                  }
                  conn.query('insert into cliente (Extranjero_idCliente, Chileno_idCliente) values (?,?);',[null, clientRows.insertId],(err, result) =>{
                    if(err){
                      reject.json(err);
                    }
                    resolve(result.insertId)
                  });
                });
              });
            }else{
              const error = new Error('Ah ocurrido un error');
              res.status(400).json({message: error.message});
            }
          }else if(nacionalidad == 'Extranjero'){
            if(num_doc === id && nombre_f === nombre && apellido_f === apellido && telefono === telefono_f && email === email_f){
              req.getConnection((err, conn) => {
                conn.query('insert into extranjero (Numero_Documento, Nombre, Apellido, Telefono, Email, Nacionalidad_idNacionalidad) values (?,?,?,?,?,?);',[id, nombre, apellido, telefono, email, 2],(err,clientRows) =>{
                  if(err){
                    reject.json(err);
                  }
                  conn.query('insert into cliente (Extranjero_idCliente, Chileno_idCliente) values (?,?);',[clientRows.insertId, null],(err, result) =>{
                    if(err){
                      reject.json(err);
                    }
                    resolve(result.insertId)
                  });
                });
              });
            }else{
              const error = new Error('Ah ocurrido un error');
              res.status(400).json({message: error.message});
            }
          }else{
            const error = new Error('Ah ocurrido un error');
            res.status(400).json({message: error.message});
          }
        })
        promesaId.then((id) => {
          req.getConnection((err, conn) => {
            conn.query('insert into agenda (`Horario_idHorario`,`Cliente_idCliente`) VALUES (?,?);',[idHorario, id],(err,result) =>{
              if(err){
                res.json(err);
              }
              res.status(200).json({message: 200})
            });
          })
        }).catch((error)=>{
          console.log(error)
        })
      }else{
        const error = new Error('La hora ya esta agendada o ha expirado');
        res.status(500).json({message: error.message});
      }
    });
  });
};

exports.delete = (req, res) => {
  id = req.params.id
  req.getConnection((err, conn) => {
    conn.query('delete from agenda where id = (?);', [id], (err, result) => {
      if(err){
        res.json(err);
      }
      res.redirect('/horario')
    })
  })
}