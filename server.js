const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')


// koneksi database 
const dbCon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "api_rumahsakit"
})
dbCon.connect((err) => {
    if (err) {
        console.log('Error Conection')
    }
    console.log('success connection')
})

// config bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// route pasien
app.get('/pasien', (req, res) => {
    dbCon.query('SELECT * FROM pasien', (err, result, field) => {
        if (err) throw err
        return res.status(201).send({
            status: 1,
            data: result
        })
    })
})

app.post('/pasien', (req, res) => {
    dbCon.query('INSERT INTO pasien SET ? ', {
        no_rm: req.body.no_rm,
        nama_pasien: req.body.nama_pasien,
        alamat_pasien: req.body.alamat_pasien,
        ttl_pasien: req.body.ttl_pasien,
        jk_pasien: req.body.jk_pasien,
        tanggal_pasien: req.body.tanggal_pasien,
        nohp_pasien: req.body.nohp_pasien,
        ket_pasien: req.body.ket_pasien,
        foto_pasien: req.body.foto_pasien,
    }, (err, result, field) => {
        if (err) throw err
        return res.status(201).send({
            status: 1,
            data: "Success Input Data"
        })
    })
})

app.put('/pasien', (req, res) => {
    const no_rm = req.body.no_rm
    const nama_pasien = req.body.nama_pasien
    const alamat_pasien = req.body.alamat_pasien
    const ttl_pasien = req.body.ttl_pasien
    const jk_pasien = req.body.jk_pasien
    const tanggal_pasien = req.body.tanggal_pasien
    const nohp_pasien = req.body.nohp_pasien
    const ket_pasien = req.body.ket_pasien
    const foto_pasien = req.body.foto_pasien
    const id_pasien = req.body.id_pasien

    if (!id_pasien) {
        return res.status(404).send({
            status: 404,
            data: "Id Nof Found"
        })
    }

    dbCon.query("UPDATE pasien SET no_rm = ? , nama_pasien = ? , alamat_pasien = ? , ttl_pasien = ? , jk_pasien = ? , tanggal_pasien = ? , nohp_pasien = ? , ket_pasien = ? , foto_pasien = ? WHERE id_pasien = ? ", [
        no_rm,
        nama_pasien,
        alamat_pasien,
        ttl_pasien,
        jk_pasien,
        tanggal_pasien,
        nohp_pasien,
        ket_pasien,
        foto_pasien,
        id_pasien
    ], (err, result, field) => {
        if (err) throw err
        if (result.affectedRows > 0) {
            return res.status(200).send({
                status: 1,
                data: 'Update success'
            })
        } else {
            return res.status(404).send({
                status: 0,
                data: "id not found"
            })
        }
    })
})

app.delete('/pasien', (req, res) => {
    const id_pasien = req.body.id_pasien

    if (!id_pasien) {
        return res.status(404).send({
            status: 404,
            data: "id not found"
        })
    }

    dbCon.query("DELETE FROM pasien WHERE id_pasien = ? ", [
        id_pasien
    ], (err, result, field) => {
        if (err) throw err
        if (result.affectedRows > 0) {
            return res.status(200).send({
                status: 1,
                data: "Success Hapus Data"
            })
        } else {
            return res.status(404).send({
                status: 0,
                data: "id not found"
            })
        }

    })

})


// route about
app.get('/about', (req, res) => {
    dbCon.query("SELECT * FROM about WHERE id_about = 1 ", (err, result, field) => {
        if (err) throw err
        return res.status(200).send({
            status: 1,
            data: result
        })
    })
})

app.put('/about', (req, res) => {
    const id_about = req.body.id_about
    const nama_rs = req.body.nama_rs
    const alamat_rs = req.body.alamat_rs
    const no_rs = req.body.no_rs
    const syarat = req.body.syarat

    if (!id_about) {
        return res.status(404).send({
            status: 0,
            data: "id not found"
        })
    }

    dbCon.query("UPDATE about SET nama_rs = ? , alamat_rs = ? , no_rs = ? , syarat = ? WHERE id_about = ?", [
        nama_rs,
        alamat_rs,
        no_rs,
        syarat,
        id_about
    ], (err, result, field) => {
        if (err) throw err
        if (result.affectedRows > 0) {
            return res.status(201).send({
                status: 1,
                data: "Success Update data"
            })
        } else {
            return res.status(404).send({
                status: 0,
                data: "id not found"
            })
        }
    })
})

// route poli 
app.get('/poli',(req,res) => {
    dbCon.query("SELECT * FROM poli",(err,result,field) => {
        if (err) throw err 
        return res.status(200).send({
            status: 1,
            data: result
        })
    })
})

app.post('/poli',(req,res) => {
    dbCon.query("INSERT INTO poli SET ?",{
        id_dokter : req.body.id_dokter,
        nama_poli : req.body.nama_poli,
        jadwal : req.body.jadwal,
    },(err,result,field) => {
        if (err) throw err 
        return res.status(201).send({
            status: 1,
            data: "Success Insert Data"
        })
    })
})

app.put('/poli',(req,res) => {
    const id_dokter = req.body.id_dokter
    const nama_poli = req.body.nama_poli
    const jadwal = req.body.jadwal
    const id_poli = req.body.id_poli

    if (!id_poli) {
        return res.status(404).send({
            status: 0,
            data: "id not found"
        })
    }

    dbCon.query("UPDATE  poli SET id_dokter = ? , nama_poli = ? , jadwal = ? WHERE id_poli = ?  ",[
        id_dokter,
        nama_poli,
        jadwal,
        id_poli
    ],(err,result,field) => {
        if (err) throw err 
        if (result.affectedRows > 0){
            return res.status(200).send({
                status: 1,
                data: "Success Update Data"
            })
        } else {
            return res.status(404).send({
                status: 0,
                data: "Failed Update Data"
            })
        }
    })
})

app.delete("/poli",(req,res) => {
    const id_poli = req.body.id_poli

    if (!id_poli) {
        return res.status(404).send({
            status: 0,
            data: "id not found"
        })
    }

    dbCon.query("DELETE FROM poli WHERE id_poli = ? ",[
        id_poli
    ],(err,result,field) => {
        if (result.affectedRows > 0){
            return res.status(200).send({
                status: 1,
                data: "Success Remove Data"
            })
        } else {
            return res.status(404).send({
                status: 0,
                data: "Failed Remove Data"
            })
        }
    })
})

//route kamar
app.get('/kamar',(req,res) => {
    dbCon.query("SELECT * FROM kamar",(err,result,field) => {
        if (err) throw err 
        return res.status(200).send({
            status: 1,
            data: result
        })
    })
})

app.post('/kamar',(req,res) => {
    dbCon.query("INSERT INTO kamar SET ?",{
        nama_kamar : req.body.nama_kamar,
        total_kamar : req.body.total_kamar,
        tersedia : req.body.tersedia,
        update_at : req.body.update_at,
    },(err,result,field) => {
        if (err) throw err 
        return res.status(201).send({
            status: 1,
            data: "Success Insert Data"
        })
    })
})

app.put('/kamar',(req,res) => {
    const nama_kamar = req.body.nama_kamar
    const total_kamar = req.body.total_kamar
    const tersedia = req.body.tersedia
    const update_at = req.body.update_at
    const id_kamar = req.body.id_kamar

    if (!id_kamar) {
        return res.status(404).send({
            status: 0,
            data: "Id kamar Uknow"
        })
    }

    dbCon.query("UPDATE kamar SET nama_kamar = ? , total_kamar = ? , tersedia = ? , update_at = ? WHERE id_kamar = ? ",[
        nama_kamar,
        total_kamar,
        tersedia,
        update_at,
        id_kamar
    ],(err,result,field) => {
        if (result.affectedRows > 0){
            return res.status(200).send({
                status: 1,
                data: "Success Update Data"
            })
        } else {
            return res.status(404).send({
                status: 0,
                data: "Failed Update Data"
            })
        }
    })
})

app.delete("/kamar",(req,res) => {
    const id_kamar = req.body.id_kamar

    if (!id_kamar) {
        return res.status(404).send({
            status: 0,
            data: "id not found"
        })
    }

    dbCon.query("DELETE FROM kamar WHERE id_kamar = ? ",[
        id_kamar
    ],(err,result,field) => {
        if (result.affectedRows > 0){
            return res.status(200).send({
                status: 1,
                data: "Success Remove Data"
            })
        } else {
            return res.status(404).send({
                status: 0,
                data: "Failed Remove Data"
            })
        }
    })
})

// route dokter 

app.get('/dokter',(req,res) => {
    dbCon.query("SELECT * FROM dokter",(err,result,field) => {
        if(err) throw err 
        return res.status(200).send({
            status: 1,
            data: result
        })
    })
})

app.post('/dokter',(req,res) => {
    dbCon.query("INSERT INTO dokter SET ?",{
        nama_dokter : req.body.nama_dokter,
        alamat_dokter : req.body.alamat_dokter,
        jk_dokter : req.body.jk_dokter,
        nohp_dokter : req.body.nohp_dokter,
        tanggal_dokter : req.body.tanggal_dokter,
        foto_dokter : req.body.foto_dokter,
    },(err,result,field) => {
        if (err) throw err 
        return res.status(201).send({
            status: 1,
            data: "Success Insert Data"
        })
    })
})

app.put('/dokter',(req,res) => {
    const nama_dokter = req.body.nama_dokter
    const alamat_dokter = req.body.alamat_dokter
    const jk_dokter = req.body.jk_dokter
    const nohp_dokter = req.body.nohp_dokter
    const tanggal_dokter = req.body.tanggal_dokter
    const foto_dokter = req.body.foto_dokter
    const id_dokter = req.body.id_dokter

    if(!id_dokter){
        return res.status(404).send({
            status: 0,
            data: "id not found"
        })
    }

    dbCon.query("UPDATE dokter SET nama_dokter = ? , alamat_dokter = ? , jk_dokter = ? , nohp_dokter = ? , tanggal_dokter = ? , foto_dokter = ? WHERE id_dokter = ? ",[
        nama_dokter,
        alamat_dokter,
        jk_dokter,
        nohp_dokter,
        tanggal_dokter,
        foto_dokter,
        id_dokter
    ],(err,result,field) => {
        if (err) throw err 
        if (result.affectedRows > 0){
            return res.status(200).send({
                status: 1,
                data: "Success Update data"
            })
        } else {
            return res.status(404).send({
                status: 0,
                data: "id not found"
            })
        }
    })
})

app.delete('/dokter',(req,res) => {
    const id_dokter = req.body.id_dokter

    if(!id_dokter) {
        return res.status(404).send({
            status: 0,
            data: "id not found"
        })
    }

    dbCon.query("DELETE FROM dokter WHERE id_dokter = ? ",[
        id_dokter
    ],(err,result,field) => {
        if (err) throw err 
        if (result.affectedRows > 0){
            return res.status(200).send({
                status: 1,
                data: "Success Remove data"
            })
        } else {
            return res.status(404).send({
                status: 0,
                data: "id not found"
            })
        }
    })
})


// route daftar poli 

app.get('/daftar',(req,res) => {
    dbCon.query("SELECT * FROM daftar" , (err,result,field) => {
        if (err) throw err
        return res.status(200).send({
            status : 1,
            data : result
        })
    })
})

app.post('/daftar',(req,res) => {
    dbCon.query("INSERT INTO daftar SET ? ",{
        no_rm : req.body.no_rm,
        id_dokter : req.body.id_dokter,
        tanggal : req.body.tanggal,
        keterangan : req.body.keterangan,
        no_antrian : req.body.no_antrian,
    },(err,result,field) => {
        if (err) throw err
        return res.status(201).send({
            status : 1,
            data : "Success Insert Data"
        })
    })
})

app.put('/daftar',(req,res) => {
    const no_rm = req.body.no_rm
    const id_dokter = req.body.id_dokter
    const tanggal = req.body.tanggal
    const keterangan = req.body.keterangan
    const no_antrian = req.body.no_antrian
    const id_pendaftaran = req.body.id_pendaftaran

    if (!id_pendaftaran) {
        return res.status(400).send({
            status : 0,
            data : "id not found"
        })
    }

    dbCon.query("UPDATE daftar SET no_rm = ? , id_dokter = ? , tanggal = ? , keterangan = ? , no_antrian = ? WHERE id_pendaftaran = ? ",[
        no_rm,
        id_dokter,
        tanggal,
        keterangan,
        no_antrian,
        id_pendaftaran
    ],(err,result,field) => {
        if (err) throw err 
        if (result.affectedRows > 0){
            return res.status(201).send({
                status : 1,
                data : "Success update Data"
            })
        } else {
            return res.status(404).send({
                status : 0,
                data : "Id Not found"
            })
        }
    })
})

app.delete('/daftar',(req,res) => {
    const id_pendaftaran = req.body.id_pendaftaran
    if (!id_pendaftaran) {
        return res.status(400).send({
            status : 0,
            data : "Id Not found"
        })
    }

    dbCon.query("DELETE FROM daftar WHERE id_pendaftaran = ? ",[
        id_pendaftaran
    ],(err,result,field) => {
        if (result.affectedRows > 0){
            return res.status(200).send({
                status : 1,
                data : "Success delete Data"
            })
        } else {
            return res.status(400).send({
                status : 0,
                data : "Id Not found"
            })
        }
    })

})

// file upload 

app.get('/file',(req,res) => {
    req.files
})

// server
const listen = 3000
app.listen(listen, () => {
    console.log(`server runnig in port ${listen}`)
})