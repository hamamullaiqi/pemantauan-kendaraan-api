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
    };
    const data = await model.findAndCountAll(pages);

    return { perPage, page, ...data };
};
