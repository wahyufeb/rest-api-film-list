// load express
const express = require('express');
const app = express()

// load morgan
const morgan = require('morgan')

// load body-parser
const bodyParser = require('body-parser')

// load mysql
const mysql = require('mysql')
const koneksi = require('./connection');

// load cors
const cors = require('cors')

// load jwt(json web token)
const jwt = require('jsonwebtoken')

// Middleware
app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
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

// get film id
app.get('/api/film/:id', (req, res)=>{
    const id = req.params.id;
    const query = 'SELECT * FROM newfilm WHERE id = ?'
    koneksi.query(query,[id], (err, rows, fields)=>{
        if(err) res.json(err)
        if(rows == ''){
            res.json({message:'Maaf, film tidak dapat ditemukan'})
        }else{
            res.json(rows);
        }
    })
})

// post film
app.post('/api/film/post', (req,res)=>{
    let field = req.body
    if(!field.title&!field.image&!field.director&!field.release_date)
    res.json({message:"Field belum diisi"})
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
        if(err) res.json({message:"Maaf terjadi kesalahan, silahkan coba kembali"})
        res.json({
            status:"success",
            data:data
        })
    })
})

// delete film
app.delete('/api/film/delete/:id', (req, res)=>{
    const id = req.params.id
    const query = 'DELETE FROM newfilm WHERE id = ?'
    koneksi.query(query, [id], (err, rows, fields)=>{
        if(err) res.json({message:"Maaf terjadi kesalahan, silahkan coba kembali"})
        if(rows.affectedRows != 0){
            res.json({
                status:"success",
                message:"Data berhasil dihapus"
            })
        }else{
            res.json({message:"Maaf gagal menghapus, silahkan coba lagi nanti"})            
        }
    })
})

// update film
app.put('/api/film/update/:id', (req, res)=>{
    let field = req.body
    const id = req.params.id
    if(!field.title&!field.image&!field.director&!field.country&!field.release_date&!field.genre)
    res.json({message:"Field belum diisi"})    
    const query = 'UPDATE newfilm SET title = ?, image = ?, director = ?, country = ?, release_date = ?, genre = ?, sinopsis = ? WHERE id = ?'
    const data = [field.title, field.image, field.director, field.country, field.release_date, field.genre, field.sinopsis, parseInt(id) ]
    koneksi.query(query, data,(err, rows, result)=>{
        if(err){
            res.json(err)
        }
        res.json({
            status:"success",
            message:"Data berhasil diubah"
        })
    })
})


const PORT = process.env.PORT || 9000
app.listen(PORT, ()=>{
    console.log("Server is Running on " + PORT)
})
