const supertest = require('supertest')

let routeGuardSpy, getUserSpy, postUserSpy, putUserSpy, deleteUserSpy, request, app;
const { mockUser } = require('../mocks')

describe('Test item-category routes', () => {
    beforeEach(() => {
        const routeGuard = require('../../middleware/auth-middleware')
        routeGuardSpy = jest.spyOn(routeGuard, 'ensureUserIsAuthenticated')
        const User = require('../../models/user')
        getUserSpy = jest.spyOn(User, 'findById')
        postUserSpy = jest.spyOn(User, 'create')
        putUserSpy = jest.spyOn(User, 'updateOne')
        deleteUserSpy = jest.spyOn(User, 'deleteOne')

        User.find = jest.fn().mockReturnValue([])

        app = require('../../app')
        request = supertest(app)
    })

    afterEach(() => {
        jest.resetModules()
        jest.restoreAllMocks()
    })

    it('should call getUsers and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next())

        const res = await request.get('/api/users')

        expect(res.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call getUsers and return 403 if not authenticated', async done => {
        const res = await request.get('/api/users')

        expect(res.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call getUser and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        getUserSpy.mockImplementation(() => { return { 'success': true, "user": mockUser } })

        const res = await request.get('/api/users/5eebb5b0834526f4e3e35b52')

        expect(res.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call getUser and return 403 if not authenticated', async done => {
        const res = await request.get('/api/users/1')

        expect(res.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call postUser and return 200 if authenticated', async done => {
        postUserSpy.mockImplementation(() => { return { 'success': true, "user": mockUser } })

        const res = await request.post('/api/users')

        expect(res.status).toBe(200)
        done()
    })


    it('should call putUser and return 403 if not authenticated', async done => {
        const res = await request.put('/api/users/5eebb5b0834526f4e3e35b52')

        expect(res.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call putUser and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        putUserSpy.mockImplementation(() => { return { 'success': true, "updatedUser": mockUser } })
        getUserSpy.mockImplementation(() => { return { 'success': true, "user": mockUser } })

        const res = await request.put('/api/users/5eebb5b0834526f4e3e35b52')

        expect(res.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call deleteUser and return 200 if authenticated', async done => {
        routeGuardSpy.mockImplementation((req, res, next) => next());
        deleteUserSpy.mockImplementation(() => { })

        const res = await request.delete('/api/users/5eebb5b0834526f4e3e35b52')

        expect(res.status).toBe(200)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })

    it('should call deleteUser and return 403 if not authenticated', async done => {
        const res = await request.delete('/api/users/5eebb5b0834526f4e3e35b52')

        expect(res.status).toBe(403)
        expect(routeGuardSpy).toHaveBeenCalled();
        done()
    })
})