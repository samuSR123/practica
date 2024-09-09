exports.findAll = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('select idHorario, Fecha, Hora_Inicio, Hora_Termino from horario inner join fecha on idFecha = Fecha_idFecha inner join hora on idHora = Hora_idHora order by Fecha asc, Hora_Inicio asc;', (err, hours) => {
      if(err) {
        res.json(err);
      }
      res.render('hours/hours', { hours });
    });
  });
};

exports.find = (req, res) => {
  let adr = new URL(req.connection.encrypted ? 'https' : 'http' + '://' + req.headers.host + req.url)
  Fecha_ = adr.searchParams.get('fecha').replace(/['"`;=]/g,'')
  req.getConnection((err, conn) => {
    conn.query('select idHorario, Fecha, Hora_Inicio, Hora_Termino from horario inner join fecha on idFecha = Fecha_idFecha inner join hora on idHora = Hora_idHora where Fecha = (?) order by Fecha asc, Hora_Inicio asc;',[Fecha_], (err, hours) => {
      if(err) {
        res.json(err);
      }
      res.render('hours/hours', { hours, Fecha_ });
    });
  });
}

exports.create = (req, res) => {
  fecha = req.body.fecha
  hora_inicio = req.body.hora_inicio
  hora_termino = req.body.hora_termino
  req.getConnection((err, conn) => {
    conn.query('insert into fecha (Fecha) values (?);',[fecha],(err,fechaRows) =>{
      if(err){
        res.json(err);
      }
      conn.query('insert into hora (Hora_Inicio,Hora_Termino) values (?,?);',[hora_inicio,hora_termino],(err, horaRows) =>{
        if(err){
          res.json(err);
        }
        conn.query('insert into horario (`Fecha_idFecha`,`Hora_idHora`) VALUES (?,?);',[fechaRows.insertId, horaRows.insertId],(err,result) =>{
          if(err){
            res.json(err);
          }
          res.redirect('/horas');
        });
      });
    });
  });
};

exports.delete = (req, res) => {
  id = req.params.id
  req.getConnection ((err,conn) => {
    conn.query('delete from horario where idHorario = (?);',[id],(err, req) => {
      if (err){
        res.json(err);
      }
      res.redirect('/horas')
    })
  })
};

exports.edit = (req, res) => {
  id = req.params.id
  req.getConnection((err, conn) => {
    conn.query('select idHorario,Fecha, Hora_Inicio, Hora_Termino from horario inner join fecha on idFecha = Fecha_idFecha inner join hora on idHora = Hora_idHora where idHorario = (?);', [id],(err, hours) => {
        if(err){
          res.json(err);
        }
        res.render('hours/update', {hours});
      })
  })
};

exports.update = (req, res) => {
  id = req.params.id
  fecha = req.body.fecha
  hora_inicio = req.body.hora_inicio
  hora_termino = req.body.hora_termino
  req.getConnection((err, conn) => {
    conn.query('update horario join fecha on fecha.idFecha = horario.Fecha_idFecha join hora on hora.idHora = horario.Hora_idHora set Fecha = (?), Hora_Inicio =  (?), Hora_Termino =  (?) where idHorario = (?);',[fecha,hora_inicio,hora_termino,id],(err,fechaRows) =>{
      if(err){
        res.json(err);
      }
      res.redirect('/horas')
    });
  });
}