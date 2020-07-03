const supertest = require('supertest')

let routeGuardSpy, getEntrySpy, postEntrySpy, putEntrySpy, deleteEntrySpy, putUserSpy, request, app;
const { mockEntry, mockUser } = require('../mocks')

describe('Test entries routes', () => {
    beforeEach(() => {
        const routeGuard = require('../../middleware/auth-middleware')
        routeGuardSpy = jest.spyOn(routeGuard, 'ensureUserIsAuthenticated')
        const Entry = require('../../models/entry')
        const User = require('../../models/user')
        getEntrySpy = jest.spyOn(Entry, 'findById')
        postEntrySpy = jest.spyOn(Entry, 'create')
        putEntrySpy = jest.spyOn(Entry, 'updateOne')
        deleteEntrySpy = jest.spyOn(Entry, 'deleteOne')
        putUserSpy = jest.spyOn(User, 'updateOne')

        Entry.find = jest.fn().mockReturnValue([])

        app = require('../../app')
        request = supertest(app)
    })

    afterEach(() => {
        jest.resetModules()
        jest.restoreAllMocks()
    })

    it('should call getEntries and return 403 if not authenticated', async done => {
        const response = await request.get('/api/entries')

        expect(response.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call getEntry and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        getEntrySpy.mockImplementation(() => { return { 'success': true, "entry": mockEntry } })

        const response = await request.get('/api/entries/5eebb5b0834526f4e3e35b52')

        expect(response.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call getEntry and return 403 if not authenticated', async done => {
        const response = await request.get('/api/entries/1')

        expect(response.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call postEntry and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => {
            req.user = { _id: '5ef224801cbe6cd5c5f7b4bb', points: 0 }
            req.body = { ...mockEntry, itemCategory: { name: "test", points: 0 } }
            return next()
        });
        postEntrySpy.mockImplementation(() => { return mockEntry })
        putUserSpy.mockImplementation(() => { return { 'success': true, "entry": mockUser } })

        const response = await request.post('/api/entries')

        expect(response.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call postEntry and return 403 if not authenticated', async done => {
        const response = await request.post('/api/entries')

        expect(response.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call putEntry and return 403 if not authenticated', async done => {
        const response = await request.put('/api/entries/5eebb5b0834526f4e3e35b52')

        expect(response.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call putEntry and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        putEntrySpy.mockImplementation(() => { return { 'success': true, "updatedEntry": mockEntry } })
        getEntrySpy.mockImplementation(() => { return { 'success': true, "entry": mockEntry } })

        const response = await request.put('/api/entries/5eebb5b0834526f4e3e35b52')

        expect(response.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call deleteEntry and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        deleteEntrySpy.mockImplementation(() => { })

        const response = await request.delete('/api/entries/5eebb5b0834526f4e3e35b52')

        expect(response.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call deleteEntry and return 403 if not authenticated', async done => {
        const response = await request.delete('/api/entries/5eebb5b0834526f4e3e35b52')

        expect(response.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })
})