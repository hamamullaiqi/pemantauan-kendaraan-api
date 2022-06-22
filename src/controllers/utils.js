exports.paging = async (model, page=1, perPage=8, filter={}) => {
    const offset = (page-1) * perPage
    const data = await model.findAll({offset: offset, limit:perPage})
    const {count} = await model.findAndCountAll()

    return{data, total:count}
}

