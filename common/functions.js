module.exports.handleAllDocuments = (res, error, items) => {
    if (error) {
        throw error
    }
    res.json(items);
};

module.exports.handleSingleDocument = (res, error, item) => {
    if (error) {
        throw error
    }
    res.send(item);
};