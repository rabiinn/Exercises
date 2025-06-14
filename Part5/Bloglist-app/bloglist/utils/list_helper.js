const afunc = (arg) => {
    return 4*arg
}

const dummy = (blogs) => {
    return 1
}

const totalLikes  = (blogs) => {
    let nooflikes = 0
    blogs.forEach(element => {
        nooflikes = nooflikes + element.likes
    });
    return nooflikes
}

const favouriteBlogs = (blogs) => {

    const favourite = blogs.reduce( (max, blog) => {
        return blog.likes > max.likes ? blog: max
    })
    return favourite

}

const mostBlogs = (blogs) => {
    const authorCount = {}

    for(const blog of blogs){
        const author = blog.author;
        authorCount[author] = (authorCount[author] || 0) + 1
    }

    let maxAuthor = null
    let maxBlogs  = 0

    for(const author in authorCount){
        if(authorCount[author] > maxBlogs){
            maxAuthor = author;
            maxBlogs = authorCount[author]
        }
    }

    return maxAuthor ? { author: maxAuthor, blogs: maxBlogs} : null
}

export default {afunc, dummy, totalLikes, favouriteBlogs, mostBlogs}