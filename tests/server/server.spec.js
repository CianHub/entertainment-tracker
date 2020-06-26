
let startApp = require('../../server')
const mongoose = require('mongoose')
const app = require('../../app')

describe('test server', async () => {
    it('should connect to the db', async () => {
        let mongooseSpy = jest.spyOn(mongoose, 'connect')
        startApp
            .then(() => expect(mongooseSpy).toHaveBeenCalled())
            .catch(err => console.log(err))
    })

    it('should call listen', async () => {
        let listenSpy = jest.spyOn(app, 'listen')
        startApp
            .then(() => expect(listenSpy).toHaveBeenCalled())
            .catch(err => console.log(err))
    })

})