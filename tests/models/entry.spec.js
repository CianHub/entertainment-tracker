const mongoose = require('mongoose');
const Entry = require('../../models/entry');
const entryData = {
    item: {
        name: "testItem",
        itemCategory: {
            name: "testItemCategory",
            points: 3,
        },
        imgLink: null
    },
    date: Date.now(),
    year: new Date().getFullYear(),
    user: {
        userId: "testId",
    },
    rating: 8
}

describe('Entry Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save entry successfully', async () => {
        const validEntry = new Entry(entryData);
        const savedEntry = await validEntry.save();

        expect(savedEntry._id).toBeDefined();
        expect(savedEntry.name).toBe(entryData.name);
    });

    it('insert entry successfully, but the field does not defined in schema should be undefined', async () => {
        const entryWithInvalidField = new Entry(
            {
                fakeField: "fakeField",
                item: {
                    name: "testItem",
                    itemCategory: {
                        name: "testItemCategory",
                        points: 3,
                    },
                    imgLink: null
                },
                date: Date.now(),
                year: new Date().getFullYear(),
                user: {
                    userId: "testId",
                },
                rating: 8
            });
        const savedEntryWithInvalidField = await entryWithInvalidField.save();
        expect(savedEntryWithInvalidField._id).toBeDefined();
        expect(savedEntryWithInvalidField.fakeField).toBeUndefined();
    });

    it('create user without required field should failed', async () => {
        const userWithoutRequiredField = new Entry({ year: new Date().getFullYear() });
        let err;
        try {
            await userWithoutRequiredField.save();
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors['item.itemCategory.name']).toBeDefined();
    });


})