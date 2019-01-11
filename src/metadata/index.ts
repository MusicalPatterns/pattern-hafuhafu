// tslint:disable-next-line
const post: string = process.env.NODE_ENV === 'test' ? '' : require('./post.html')

export {
    post,
}
