const supertest = require('supertest')

let routeGuardSpy, getItemSpy, postItemSpy, putItemSpy, deleteItemSpy, request, app;
const { mockItem } = require('../mocks')

describe('Test item routes', () => {
    beforeEach(() => {
        const routeGuard = require('../../middleware/auth-middleware')
        routeGuardSpy = jest.spyOn(routeGuard, 'ensureUserIsAuthenticated')
        const Item = require('../../models/item')
        getItemSpy = jest.spyOn(Item, 'findById')
        postItemSpy = jest.spyOn(Item, 'create')
        putItemSpy = jest.spyOn(Item, 'updateOne')
        deleteItemSpy = jest.spyOn(Item, 'deleteOne')

        Item.find = jest.fn().mockReturnValue([])

        app = require('../../app')
        request = supertest(app)
    })

    afterEach(() => {
        jest.resetModules()
        jest.restoreAllMocks()
    })

    it('should call getItems and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next())

        const response = await request.get('/api/items')

        expect(response.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call getItems and return 403 if not authenticated', async done => {
        const response = await request.get('/api/items')

        expect(response.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call getItem and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        getItemSpy.mockImplementation(() => { return { 'success': true, "item": mockItem } })

        const response = await request.get('/api/items/5eebb5b0834526f4e3e35b52')

        expect(response.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call getItem and return 403 if not authenticated', async done => {
        const response = await request.get('/api/items/1')

        expect(response.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call postItem and return 403 if not authenticated', async done => {
        const response = await request.post('/api/items')

        expect(response.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call postItem and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        postItemSpy.mockImplementation(() => { return { 'success': true, "item": mockItem } })

        const response = await request.post('/api/items')

        expect(response.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call putItem and return 403 if not authenticated', async done => {
        const response = await request.put('/api/items/5eebb5b0834526f4e3e35b52')

        expect(response.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call putItem and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        putItemSpy.mockImplementation(() => { return { 'success': true, "updatedItem": mockItem } })
        getItemSpy.mockImplementation(() => { return { 'success': true, "item": mockItem } })

        const response = await request.put('/api/items/5eebb5b0834526f4e3e35b52')

        expect(response.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call deleteItem and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        deleteItemSpy.mockImplementation(() => { return { success: true } })

        const response = await request.delete('/api/items/5eebb5b0834526f4e3e35b52')

        expect(response.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call deleteItem and return 403 if not authenticated', async done => {
        const response = await request.delete('/api/items/5eebb5b0834526f4e3e35b52')

        expect(response.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })
})