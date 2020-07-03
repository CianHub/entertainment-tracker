const mongoose = require('mongoose');

const { mockRequest, mockResponse, mockEntry, mockEntry2 } = require('../mocks')
const controller = require('../../controllers/entries-controller');
const Entry = require('../../models/entry');
const User = require('../../models/user');


describe("Test entries controller", () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    test('getEntries should return 200 and return correct value', async () => {
        Entry.find = jest.fn().mockReturnValue([mockEntry])
        const req = mockRequest();
        req.user._id = 'test'

        const res = mockResponse();

        await controller.getEntries(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'success': true, "entries": [mockEntry] });
    });

    test('getEntries should return 400 and return correct value', async () => {
        Entry.find = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        req.user._id = 'test'

        const res = mockResponse();

        await controller.getEntries(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('getEntry should return 200 and return correct value', async () => {
        Entry.findOne = jest.fn().mockReturnValue({ 'name': 'test' })
        const req = mockRequest();
        const res = mockResponse();

        await controller.getEntry(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'name': 'test' });
    });

    test('getEntry should return 400 and return correct value', async () => {
        Entry.findOne = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.getEntry(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('postEntry should return 200 and return correct value', async () => {
        Entry.create = jest.fn().mockReturnValue(mockEntry)
        User.updateOne = jest.fn().mockReturnValue({ '_id': 'test' })

        const req = mockRequest();
        const res = mockResponse();

        await controller.postEntry(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'success': true, "entry": mockEntry });
    });

    test('postEntry should return 400 and return correct value', async () => {
        Entry.create = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })
        User.updateOne = jest.fn().mockReturnValue({ '_id': 'test' })

        const req = mockRequest();
        const res = mockResponse();

        await controller.postEntry(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('putEntry should return 200 and return correct value', async () => {
        Entry.findById = jest.fn().mockReturnValue(mockEntry)
        Entry.updateOne = jest.fn().mockReturnValue(mockEntry2)

        const req = mockRequest();
        const res = mockResponse();

        await controller.putEntry(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'success': true, "updatedEntry": mockEntry2 });
    });


    test('putEntry should return 400 and return correct value on update failure', async () => {
        Entry.findById = jest.fn().mockReturnValue({ 'name': 'test' })

        Entry.updateOne = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.postEntry(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('putEntry should return 400 and return correct value on get failure', async () => {

        Entry.findById = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.postEntry(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('deleteEntry should return 200 and return correct value', async () => {
        Entry.deleteOne = jest.fn().mockReturnValue()

        const req = mockRequest();
        const res = mockResponse();

        await controller.deleteEntry(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'success': true });
    });

    test('deleteEntry should return 400 and return correct value', async () => {
        Entry.deleteOne = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.deleteEntry(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })
});