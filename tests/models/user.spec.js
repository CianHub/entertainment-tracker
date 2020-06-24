const mongoose = require('mongoose');
const User = require('../../models/user');
const userData = {
    googleId: null,
    facebookId: null,
    password: "testPass",
    name: "testName",
    points: 0,
    profilePicture: null,
    salt: "123",
    accountType: "Local",
    dateCreated: Date.now()
}

describe('User Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save user successfully', async () => {
        const validUser = new User(userData);
        const savedUser = await validUser.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(userData.name);
    });

    it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
        const userWithInvalidField = new User(
            {
                fakeField: 'test',
                googleId: null,
                facebookId: null,
                password: "testPass",
                name: "testName",
                points: 0,
                profilePicture: null,
                salt: "123",
                accountType: "Local",
                dateCreated: Date.now()
            });
        const savedUserWithInvalidField = await userWithInvalidField.save();
        expect(savedUserWithInvalidField._id).toBeDefined();
        expect(savedUserWithInvalidField.fakeField).toBeUndefined();
    });

    it('create user without required field should failed', async () => {
        const userWithoutRequiredField = new User({ name: 'testName', points: 0 });
        let err;
        try {
            await userWithoutRequiredField.save();
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.accountType).toBeDefined();
    });


})