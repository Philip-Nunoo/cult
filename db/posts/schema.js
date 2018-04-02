import SimplSchema from 'simpl-schema';
import PostTypesEnum from './enums/types';

export default new SimplSchema({
    title: String,
    description: String,
    userId: {
        type: String,
        optional: true
    },
    views: {
        type: SimplSchema.Integer,
        defaultValue: 0,
        min: 0
    },
    type: {
        type: String,
        defaultValue: 'nature',
        allowedValues: _.values(PostTypesEnum)
    },
    createdAt: {
        type: Date,
        optional: true
    }
});
