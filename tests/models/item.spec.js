const mongoose = require('mongoose');
const Item = require('../../models/item');
const itemData = {
    name: "testItem",
    itemCategory: {
        name: "testItemCategory",
        points: 3,
    },
    imgLink: null
}

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
        const validItem = new Item(itemData);
        const savedItem = await validItem.save();

        expect(savedItem._id).toBeDefined();
        expect(savedItem.name).toBe(itemData.name);
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
        const savedUserWithInvalidField = await itemWithInvalidField.save();
        expect(savedUserWithInvalidField._id).toBeDefined();
        expect(savedUserWithInvalidField.fakeField).toBeUndefined();
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