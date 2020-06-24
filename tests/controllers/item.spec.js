const mongoose = require('mongoose');

const mockRequest = () => {
    const req = {}
    req.body = jest.fn().mockReturnValue(req)
    req.params = jest.fn().mockReturnValue(req)
    return req
};

const mockResponse = () => {
    const res = {}
    res.send = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
};

const controller = require('../../controllers/items-controller');
const Item = require('../../models/item');

describe("Test items controller", () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    test('getItems should return 200 and return correct value', async () => {
        Item.find = jest.fn().mockReturnValue([])

        const res = mockResponse();

        await controller.getItems(res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'success': true, "items": [] });
    });

    test('getItems should return 400 and return correct value', async () => {
        Item.find = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const res = mockResponse();

        await controller.getItems(res)

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('getItem should return 200 and return correct value', async () => {
        Item.findOne = jest.fn().mockReturnValue({ 'name': 'test' })
        const req = mockRequest();
        const res = mockResponse();

        await controller.getItem(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'name': 'test' });
    });

    test('getItem should return 400 and return correct value', async () => {
        Item.findOne = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.getItem(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('postItem should return 200 and return correct value', async () => {
        Item.create = jest.fn().mockReturnValue({ 'name': 'test' })

        const req = mockRequest();
        const res = mockResponse();

        await controller.postItem(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'success': true, item: { 'name': 'test' } });
    });

    test('postItem should return 400 and return correct value', async () => {
        Item.create = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.postItem(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('putItem should return 200 and return correct value', async () => {
        Item.findById = jest.fn().mockReturnValue({ 'name': 'test' })
        Item.updateOne = jest.fn().mockReturnValue({ 'name': 'test2' })

        const req = mockRequest();
        const res = mockResponse();

        await controller.putItem(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'success': true, 'updatedItem': { 'name': 'test2' } });
    });

    test('putItem should return 400 and return correct value on update failure', async () => {
        Item.findById = jest.fn().mockReturnValue({ 'name': 'test' })

        Item.updateOne = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.postItem(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('putItem should return 400 and return correct value on get failure', async () => {

        Item.findById = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.postItem(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('deleteItem should return 200 and return correct value', async () => {
        Item.deleteOne = jest.fn().mockReturnValue()

        const req = mockRequest();
        const res = mockResponse();

        await controller.deleteItem(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'success': true });
    });

    test('deleteItem should return 400 and return correct value', async () => {
        Item.deleteOne = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.deleteItem(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })
});