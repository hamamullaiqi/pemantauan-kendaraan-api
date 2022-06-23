const {Op} = require("sequelize")

exports.paging = async (model, page = 1, perPage = 8, search = "") => {
    console.log(search);
    const offset = (page - 1) * perPage
    const data = await model.findAll({
        where: {
            nama_lengkap: {
                [Op.like]: `%${search}%`
            },
        },
        offset: parseInt(offset), limit: parseInt(perPage) 
    })
const { count } = await model.findAndCountAll()

return { data, total: count }
}

