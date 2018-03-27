import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    text: String,
    userId: { type: String, optional: true },
    postId: String,
    createdAt: { type: Date, optional: true }
});
