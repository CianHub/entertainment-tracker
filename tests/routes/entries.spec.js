const supertest = require('supertest')

let routeGuardSpy, getEntrySpy, postEntrySpy, putEntrySpy, deleteEntrySpy, request, app;
const { mockEntry } = require('../mocks')

describe('Test item-category routes', () => {
    beforeEach(() => {
        const routeGuard = require('../../middleware/auth-middleware')
        routeGuardSpy = jest.spyOn(routeGuard, 'ensureUserIsAuthenticated')
        const Entry = require('../../models/item-category')
        getEntrySpy = jest.spyOn(Entry, 'findById')
        postEntrySpy = jest.spyOn(Entry, 'create')
        putEntrySpy = jest.spyOn(Entry, 'updateOne')
        deleteEntrySpy = jest.spyOn(Entry, 'deleteOne')

        Entry.find = jest.fn().mockReturnValue([])

        app = require('../../app')
        request = supertest(app)
    })

    afterEach(() => {
        jest.resetModules()
        jest.restoreAllMocks()
    })

    it('should call getEntries and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next())

        const res = await request.get('/api/item-categories')

        expect(res.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call getEntries and return 403 if not authenticated', async done => {
        const res = await request.get('/api/item-categories')

        expect(res.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call getEntry and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        getEntrySpy.mockImplementation(() => { return { 'success': true, "entry": mockEntry } })

        const res = await request.get('/api/item-categories/5eebb5b0834526f4e3e35b52')

        expect(res.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call getEntry and return 403 if not authenticated', async done => {
        const res = await request.get('/api/item-categories/1')

        expect(res.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call postEntry and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        postEntrySpy.mockImplementation(() => { return { 'success': true, "entry": mockEntry } })

        const res = await request.post('/api/item-categories')

        expect(res.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call postEntry and return 403 if not authenticated', async done => {
        const res = await request.post('/api/item-categories')

        expect(res.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call putEntry and return 403 if not authenticated', async done => {
        const res = await request.put('/api/item-categories/5eebb5b0834526f4e3e35b52')

        expect(res.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call putEntry and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        putEntrySpy.mockImplementation(() => { return { 'success': true, "updatedEntry": mockEntry } })
        getEntrySpy.mockImplementation(() => { return { 'success': true, "entry": mockEntry } })

        const res = await request.put('/api/item-categories/5eebb5b0834526f4e3e35b52')

        expect(res.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call deleteEntry and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        deleteEntrySpy.mockImplementation(() => { })

        const res = await request.delete('/api/item-categories/5eebb5b0834526f4e3e35b52')

        expect(res.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call deleteEntry and return 403 if not authenticated', async done => {
        const res = await request.delete('/api/item-categories/5eebb5b0834526f4e3e35b52')

        expect(res.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })
})