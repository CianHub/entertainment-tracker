module.exports.handleAllDocuments = (res, error, items) => {
    if (error) {
        console.log(error);
        res.sendStatus(500);
    }
    res.json(items);
};