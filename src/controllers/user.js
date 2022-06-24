const { user } = require("../../models")

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const data = await user.findOne({
            where: { id }
        })

        res.status(200).send({
            status: "succes",
            message: "success get data by ID",
            data: { data }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
}