module.exports.mockRequest = () => {
    const req = {}
    req.body = jest.fn().mockReturnValue(req)
    req.params = jest.fn().mockReturnValue(req)
    req.user = { _id: 'test' }
    return req
};

module.exports.mockResponse = () => {
    const res = {}
    res.send = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
};

module.exports.mockItem = {
    name: "testItem",
    itemCategory: {
        name: "testItemCategory",
        points: 3,
    },
    imgLink: null
}

module.exports.mockEntry = {
    item: {
        name: "testItem",
        itemCategory: {
            name: "testItemCategory",
            points: 3,
        },
        imgLink: null
    },
    date: Date.now(),
    year: new Date().getFullYear(),
    user: {
        userId: "testId",
    },
    rating: 8
}

module.exports.mockEntry2 = {
    item: {
        name: "testItem",
        itemCategory: {
            name: "testItemCategory",
            points: 3,
        },
        imgLink: null
    },
    date: Date.now(),
    year: new Date().getFullYear(),
    user: {
        userId: "testId",
    },
    rating: 8
}

module.exports.mockUser = {
    googleId: null,
    facebookId: null,
    password: "testPass",
    name: "testName",
    points: 0,
    profilePicture: null,
    salt: "123",
    accountType: "Local",
    dateCreated: Date.now()
}

module.exports.mockUser2 = {
    googleId: null,
    facebookId: null,
    password: "testPass",
    name: "testName2",
    points: 0,
    profilePicture: null,
    salt: "123",
    accountType: "Local",
    dateCreated: Date.now()
}