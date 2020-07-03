const mongoose = require('mongoose');
const { mockRequest, mockResponse, mockUser, mockUser2 } = require('../mocks')

const controller = require('../../controllers/user-controller');
const User = require('../../models/user');

describe("Test users controller", () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    test('getUsers should return 200 and return correct value', async () => {
        User.find = jest.fn().mockReturnValue([])

        const res = mockResponse();

        await controller.getUsers(res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'success': true, "users": [] });
    });

    test('getUsers should return 400 and return correct value', async () => {
        User.find = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const res = mockResponse();

        await controller.getUsers(res)

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('getUser should return 200 and return correct value', async () => {
        User.findOne = jest.fn().mockReturnValue(mockUser)
        const req = mockRequest();
        const res = mockResponse();

        await controller.getUser(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'success': true, user: { "name": "testName", "points": 0, } });
    });

    test('getUser should return 400 and return correct value', async () => {
        User.findOne = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.getUser(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('postUser should return 200 and return correct value', async () => {
        User.create = jest.fn().mockReturnValue(mockUser)

        const req = mockRequest();
        const res = mockResponse();

        req.body = { body: { "password": "test" } }
        await controller.postUser(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'success': true, user: { "name": "testName", "points": 0, } });
    });

    test('postUser should return 400 and return correct value', async () => {
        User.create = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();
        req.body = { body: { "password": "test" } }


        await controller.postUser(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('putUser should return 200 and return correct value', async () => {
        User.findById = jest.fn().mockReturnValue(mockUser)
        User.updateOne = jest.fn().mockReturnValue(mockUser2)

        const req = mockRequest();
        const res = mockResponse();

        await controller.putUser(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'success': true, 'updatedUser': mockUser2 });
    });

    test('putItem should return 400 and return correct value on update failure', async () => {
        User.findById = jest.fn().mockReturnValue(mockUser)

        User.updateOne = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.putUser(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('putUser should return 400 and return correct value on get failure', async () => {

        User.findById = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.putUser(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('deleteUser should return 200 and return correct value', async () => {
        User.deleteOne = jest.fn().mockReturnValue()

        const req = mockRequest();
        const res = mockResponse();

        await controller.deleteUser(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith({ 'success': true });
    });

    test('deleteUser should return 400 and return correct value', async () => {
        User.deleteOne = jest.fn().mockImplementation(() => {
            throw new Error('error');
        })

        const req = mockRequest();
        const res = mockResponse();

        await controller.deleteUser(req, res);

        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json).toHaveBeenCalledWith(
            { 'success': false, "message": 'Request failed' }
        );
    })

    test('hash should create a hash of string', () => {
        expect(controller.hash('test')).toBe('n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=')
        expect(controller.hash('')).toBe('47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=')
    })

    test('hash should create a salt hash of a string and compare it to another string', () => {
        expect(controller.checkLocalUserPasswordIsValid('', 'test', 'n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=')).toBeTruthy()

        expect(controller.checkLocalUserPasswordIsValid('test', 'test', 'n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=')).toBeFalsy()
    })
});