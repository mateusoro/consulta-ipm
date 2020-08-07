var express = require('express');
var app = express();
var cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
 
    var resposta = "";
    db.all("select tabela from consultas", [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        resposta += row.tabela;
        console.log(row.tabela);
    });
    res.set('Content-Type', 'text/html');
    res.send("<span style='white-space: break-spaces;'>"+resposta+"</span>");
    });
  
});

app.post('/consultas', function(request, response){
   console.log(request.body.tabela);
   db.run(`INSERT INTO consultas(id, tabela) VALUES(?,?)`, [request.body.codigo, request.body.tabela], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
   response.send(request.body.tabela);    // echo the result back
});

let db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
  db.run('CREATE TABLE if not exists consultas ( '+
	'id INTEGER PRIMARY KEY,'+	
	'tabela TEXT(10000000000)) '
    );
});

app.listen(3000, () => {
  console.log(`Servidor rodando na porta ${3000}`)
});




