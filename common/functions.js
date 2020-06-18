module.exports.handleAllDocuments = (res, error, items) => {
    if (error) {
        throw error;
    }
    res.json(items);
};