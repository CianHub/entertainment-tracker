const supertest = require('supertest')

let routeGuardSpy, getItemCategorySpy, postItemCategorySpy, putItemCategorySpy, deleteItemCategorySpy, request, app;
const { mockItemCategory } = require('../mocks')

describe('Test item-category routes', () => {
    beforeEach(() => {
        const routeGuard = require('../../middleware/auth-middleware')
        routeGuardSpy = jest.spyOn(routeGuard, 'ensureUserIsAuthenticated')
        const ItemCategory = require('../../models/item-category')
        getItemCategorySpy = jest.spyOn(ItemCategory, 'findById')
        postItemCategorySpy = jest.spyOn(ItemCategory, 'create')
        putItemCategorySpy = jest.spyOn(ItemCategory, 'updateOne')
        deleteItemCategorySpy = jest.spyOn(ItemCategory, 'deleteOne')

        ItemCategory.find = jest.fn().mockReturnValue([])

        app = require('../../app')
        request = supertest(app)
    })

    afterEach(() => {
        jest.resetModules()
        jest.restoreAllMocks()
    })

    it('should call getItemCategories and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next())

        const response = await request.get('/api/item-categories')

        expect(response.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call getItemCategories and return 403 if not authenticated', async done => {
        const response = await request.get('/api/item-categories')

        expect(response.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call getItemCategory and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        getItemCategorySpy.mockImplementation(() => { return { 'success': true, "itemCategory": mockItemCategory } })

        const response = await request.get('/api/item-categories/5eebb5b0834526f4e3e35b52')

        expect(response.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call getItemCategory and return 403 if not authenticated', async done => {
        const response = await request.get('/api/item-categories/1')

        expect(response.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call postItemCategory and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        postItemCategorySpy.mockImplementation(() => mockItemCategory
        )

        const response = await request.post('/api/item-categories')

        expect(response.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call postItemCategory and return 403 if not authenticated', async done => {
        const response = await request.post('/api/item-categories')

        expect(response.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call putItemCategory and return 403 if not authenticated', async done => {
        const response = await request.put('/api/item-categories/5eebb5b0834526f4e3e35b52')

        expect(response.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call putItemCategory and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        putItemCategorySpy.mockImplementation(() => { return { 'success': true, "updatedItemCategory": mockItemCategory } })
        getItemCategorySpy.mockImplementation(() => { return { 'success': true, "itemCategory": mockItemCategory } })

        const response = await request.put('/api/item-categories/5eebb5b0834526f4e3e35b52')

        expect(response.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call deleteItemCategory and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        deleteItemCategorySpy.mockImplementation(() => { })

        const response = await request.delete('/api/item-categories/5eebb5b0834526f4e3e35b52')

        expect(response.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call deleteItemCategory and return 403 if not authenticated', async done => {
        const response = await request.delete('/api/item-categories/5eebb5b0834526f4e3e35b52')

        expect(response.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })
})