let post: string
try {
    // tslint:disable-next-line
    post = require('./post.html') || ''
}
catch (e) {
    post = ''
}

export {
    post,
}
