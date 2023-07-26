export const paging = async (
    model,
    page = 1,
    perPage = 8,
    filter = {},
    opt = {}
) => {
    const offset = (page - 1) * perPage;
    const pages = {
        ...filter,
        ...opt,
        offset: parseInt(offset),
        limit: parseInt(perPage),
        order: [["createdAt", "DESC"]],
    };
    const data = await model.findAndCountAll(pages);

    return { perPage: parseInt(perPage), page: parseInt(page), ...data };
};
