const PostTypesEnum = {
    NATURE: 'nature',
    PSYCHOLOGOY: 'psychology',
    MUSIC: 'music',
    PROGRAMMING: 'programming',
    PROJECT: 'project',
    OTHER: 'other'
};

const PostTypesLabels = {
    [PostTypesEnum.NATURE]: 'Nature',
    [PostTypesEnum.PSYCHOLOGOY]: 'Psychology',
    [PostTypesEnum.MUSIC]: 'Music',
    [PostTypesEnum.PROGRAMMING]: 'Programming',
    [PostTypesEnum.PROJECT]: 'Project',
    [PostTypesEnum.OTHER]: 'Other'
};

export default PostTypesEnum;
export { PostTypesEnum, PostTypesLabels };
