const mongoose = require('mongoose');
const ItemCategory = require('../../models/item-category');
const itemCategoryData = {
    name: "testItemCategory",
    points: 3,
}

describe('ItemCategory Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save itemCategory successfully', async () => {
        const validItemCategory = new ItemCategory(itemCategoryData);
        const savedItemCategory = await validItemCategory.save();

        expect(savedItemCategory._id).toBeDefined();
        expect(savedItemCategory.name).toBe(itemCategoryData.name);
    });

    it('insert itemCategory successfully, but the field does not defined in schema should be undefined', async () => {
        const itemCategoryWithInvalidField = new ItemCategory(
            {
                name: "testItemCategory",
                fakeField: "fakeField",
                points: 3,
            });
        const savedItemCategoryWithInvalidField = await itemCategoryWithInvalidField.save();
        expect(savedItemCategoryWithInvalidField._id).toBeDefined();
        expect(savedItemCategoryWithInvalidField.fakeField).toBeUndefined();
    });

    it('create user without required field should failed', async () => {
        const userWithoutRequiredField = new ItemCategory({ name: 'testName' });
        let err;
        try {
            await userWithoutRequiredField.save();
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.points).toBeDefined()
    });


})