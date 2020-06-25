const { ensureUserIsAuthenticated, ensureUserIsNotAuthenticated } = require('../../middleware/auth-middleware');

describe("Test auth middleware", () => {
    it('Ensure user is authenticated should call next if user is logged in', async () => {
        const req = {}
        req.isAuthenticated = jest.fn().mockReturnValue(true)

        const res = {}
        res.status = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)

        const next = jest.fn().mockReturnValue("called")

        ensureUserIsAuthenticated(req, res, next)
        expect(next).toHaveBeenCalled();
    })

    it('Ensure user is authenticated should redirect the user if they are not logged in', async () => {
        const req = {}
        req.isAuthenticated = jest.fn().mockReturnValue(false)

        const res = {}
        res.status = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)

        const next = jest.fn().mockReturnValue("called")

        ensureUserIsAuthenticated(req, res, next)
        expect(res.json).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "You must be logged in to access this path." });
    })

    it('Ensure user is not authenticated should call next if user is not logged', async () => {
        const req = {}
        req.isAuthenticated = jest.fn().mockReturnValue(true)

        const res = {}
        res.status = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)

        const next = jest.fn().mockReturnValue("called")

        ensureUserIsNotAuthenticated(req, res, next)
        expect(res.json).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledTimes(1)
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "You are already logged in." });
    })

    it('Ensure user is not authenticated should redirect the user if they are logged in', async () => {
        const req = {}
        req.isAuthenticated = jest.fn().mockReturnValue(false)

        const res = {}
        res.status = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)

        const next = jest.fn().mockReturnValue("called")

        ensureUserIsNotAuthenticated(req, res, next)
        expect(next).toHaveBeenCalled();
    })
});