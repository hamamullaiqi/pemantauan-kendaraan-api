const { paging } = require("../controllers/utils")
const { tb_registrasi } = require("../../models")


exports.getAllRegistrasi = async (req, res) => {
    try {

        const data = await tb_registrasi.findAll()
        res.status(200).send({
            status: "success get All data",
            data: { data }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }


}

exports.getRegistrasi = async (req, res) => {
    try {
        const { page, perPage } = req.query
        const data = await paging(tb_registrasi, page, perPage)
        res.status(200).send({
            status: "success get data",
            data,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
}

exports.addRegistrasi = async (req, res) => {
    try {
        let tgl_registrasi = new Date()
        const newData = {  nama_lengkap, jenis_kelamin, tempat_lahir, tanggal_lahir, agama, alamat, nomer_hp } = req.body
        const data = await tb_registrasi.create({ tgl_registrasi, ...newData})
        res.status(201).send({
            status: "success Add data",
            data,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
}