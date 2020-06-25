const mongoose = require('mongoose');
const { mockRequest, mockResponse, mockItemCategory, mockItemCategory2 } = require('../mocks')

const controller = require('../../controllers/item-categories-controller');
const ItemCategory = require('../../models/item-category');

describe("Test item-category controller", () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    test('getItemCategories should return 200 and return correct value', async () => {
        ItemCategory.find = jest.fn().mockReturnValue([])

        const res = mockResponse();

        await controller.getItemCategories(res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'success': true, "itemCategories": [] });
    });

    test('getItemCategories should return 400 and return correct value', async () => {
        ItemCategory.find = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const res = mockResponse();

        await controller.getItemCategories(res)

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('getItemCategory should return 200 and return correct value', async () => {
        ItemCategory.findOne = jest.fn().mockReturnValue(mockItemCategory)
        const req = mockRequest();
        const res = mockResponse();

        await controller.getItemCategory(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(mockItemCategory);
    });

    test('getItemCategory should return 400 and return correct value', async () => {
        ItemCategory.findOne = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.getItemCategory(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('postItemCategory should return 200 and return correct value', async () => {
        ItemCategory.create = jest.fn().mockReturnValue(mockItemCategory)

        const req = mockRequest();
        const res = mockResponse();

        await controller.postItemCategory(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'success': true, itemCategory: mockItemCategory });
    });

    test('postItemCategory should return 400 and return correct value', async () => {
        ItemCategory.create = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.postItemCategory(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('putItemCategory should return 200 and return correct value', async () => {
        ItemCategory.findById = jest.fn().mockReturnValue(mockItemCategory)
        ItemCategory.updateOne = jest.fn().mockReturnValue(mockItemCategory2)

        const req = mockRequest();
        const res = mockResponse();

        await controller.putItemCategory(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'success': true, 'updatedItemCategory': mockItemCategory2 });
    });

    test('putItemCategory should return 400 and return correct value on update failure', async () => {
        ItemCategory.findById = jest.fn().mockReturnValue({ 'name': 'test' })

        ItemCategory.updateOne = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.putItemCategory(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('putItemCategory should return 400 and return correct value on get failure', async () => {

        ItemCategory.findById = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.putItemCategory(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('deleteItemCategory should return 200 and return correct value', async () => {
        ItemCategory.deleteOne = jest.fn().mockReturnValue()

        const req = mockRequest();
        const res = mockResponse();

        await controller.deleteItemCategory(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'success': true });
    });

    test('deleteItemCategory should return 400 and return correct value', async () => {
        ItemCategory.deleteOne = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.deleteItemCategory(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })
});