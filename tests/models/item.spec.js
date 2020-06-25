const mongoose = require('mongoose');
const Item = require('../../models/item');
const { mockItem } = require('../mocks')

describe('Item Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save item successfully', async () => {
        const validItem = new Item(mockItem);
        const savedItem = await validItem.save();

        expect(savedItem._id).toBeDefined();
        expect(savedItem.name).toBe(mockItem.name);
    });

    it('insert item successfully, but the field does not defined in schema should be undefined', async () => {
        const itemWithInvalidField = new Item(
            {
                name: "testItem",
                fakeField: "fakeField",
                itemCategory: {
                    name: "testItemCategory",
                    points: 3,
                },
                imgLink: null
            });
        const savedItemWithInvalidField = await itemWithInvalidField.save();
        expect(savedItemWithInvalidField._id).toBeDefined();
        expect(savedItemWithInvalidField.fakeField).toBeUndefined();
    });

    it('create user without required field should failed', async () => {
        const userWithoutRequiredField = new Item({ name: 'testName', itemCategory: { points: 3 } });
        let err;
        try {
            await userWithoutRequiredField.save();
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors['itemCategory.name']).toBeDefined();
    });


})