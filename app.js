const expres = require('express');
const app = expres();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const koneksi = require('./connection');


// Middleware
app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended:false}))

// ROUTES
app.get('/', (req, res)=>{
    res.send('HOME')
})

// get all films
app.get('/api/films', (req, res)=>{
    const query = 'SELECT * FROM newfilm'    
    koneksi.query(query, (err, rows, fields)=>{
        if(err) res.json(err)
        res.json(rows)
    })
}) 
app.get('/api/film/:id', (req, res)=>{
    const id = req.params.id;
    const query = 'SELECT * FROM newfilm WHERE id = ?'
    koneksi.query(query,[id], (err, rows, fields)=>{
        if(err) res.json(err)
        res.json(rows);
    })
})

app.post('/api/film/post', (req,res)=>{
    const data = {
        title:req.body.title,
        image:req.body.image,
        director:req.body.director,
        country:req.body.country,
        release_date:req.body.release_date,
        genre:req.body.genre,
        sinopsis:req.body.sinopsis
    }
    const query = "INSERT INTO newfilm  SET ?";
    koneksi.query(query,data, (err,result, fields)=>{
        if(err) res.json(err)
        res.json(result)
    })
})



app.listen(9000, ()=>{
    console.log("Server is Running...")
})