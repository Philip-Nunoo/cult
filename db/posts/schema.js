import SimplSchema from 'simpl-schema';

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
        defaultValue: 'Nature',
        allowedValues: [
            'Nature',
            'Psychology',
            'Music',
            'Programming',
            'Project',
            'Other'
        ]
    },
    createdAt: {
        type: Date,
        optional: true
    }
});
