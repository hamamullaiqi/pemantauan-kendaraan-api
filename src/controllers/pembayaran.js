const { Op } = require("sequelize")
const { tb_pembayaran } = require("../../models")
const { tb_registrasi } = require("../../models")
const { paging } = require("./utils")
const path = require("path")
const fs = require("fs")

exports.addPembayaran = async (req, res) => {
    try {
        const tanggal_pembayaran = new Date()
        const newData = { id_user, id_registrasi, nama_lengkap } = req.body
        const bukti_pembayaran = req.file.filename
        let data = await tb_pembayaran.create({ tanggal_pembayaran, bukti_pembayaran, ...newData, })

        res.send({
            status: "success",
            data: { data },
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
}

exports.getPembayaran = async (req, res) => {
    try {
        const { page, perPage, search } = req.query
        const filter = (search) => {
            let result
            if (search !== undefined) {
                result =
                {
                    include: [{
                        model: tb_registrasi,
                        as: "registrasi",
                        where: { nama_lengkap: { [Op.like]: `%${search}%` } }
                    }]
                }
            } else {
                result = {
                    include: [{
                        model: tb_registrasi,
                        as: "registrasi"
                    }]
                }
            }
            return result
        }
        let data = await paging(tb_pembayaran, page, perPage, filter(search))

        data = JSON.parse(JSON.stringify(data))
        data = data.data.map(item => {
            return {
                ...item,
                bukti_pembayaran: process.env.FILE_PATH + item.bukti_pembayaran
            }
        })
        // data = { ...data[0], bukti_pembayaran: process.env.FILE_PATH + data[0].bukti_pembayaran }


        res.status(200).send({
            status: "success",
            message: "success get All",
            data: { data }
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }

}

exports.updatePembayaran = async (req, res) => {
    try {
        const { id } = req.params
        const tanggal_pembayaran = new Date()
        const updateData = { nama_lengkap } = req.body
        const bukti_pembayaran = req.file.filename

        const data = await tb_pembayaran.update({ tanggal_pembayaran, bukti_pembayaran, ...updateData }, { where: { id } })
        res.send({
            status: "success",
            data: { data },
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
}

exports.acceptPembayaran = async (req, res) => {
    try {
        const { id } = req.params
        const tanggal_pembayaran = new Date()

        const data = await tb_pembayaran.update({ tanggal_pembayaran, status_pembayaran: 1 }, { where: { id } })
        res.send({
            status: "success",
            data: { data },
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
}

exports.deletePembayaran = async (req, res) => {
    try {
        const { id } = req.params
        const findData = await tb_pembayaran.findOne({where:{id}})

        if (findData.bukti_pembayaran !== null) {
            const deleteFIle = (filePath) => {
                //menggabungkan direktori controller , uploads dan nama file Product
                filePath = path.join(__dirname, "../../uploads", filePath)
                fs.unlink(filePath, (err) => console.log(err))
            }
            deleteFIle(findData.bukti_pembayaran)
        }
        const dataPembayaran = await tb_pembayaran.destroy({ where: { id } })
        // const data = await tb_registrasi.destroy({ where: { id } })
        res.send({
            status: "success",
            message: `Success Delete data id: ${id}`
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
}

