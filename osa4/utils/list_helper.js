
const dummy = (blogs) => {
  blogs  // removes lint error. dummy fix for dummy function
  return (1)
}

const totalLikes = (blogs) => {
  if (Array.isArray(blogs)) {
    return blogs.reduce(function (prev, cur) {
      return prev + cur.likes
    }, 0)
  } else {
    return blogs.likes
  }
}

const favoriteBlog = (blogs) => {
  if (Array.isArray(blogs)) {
    let maxVal = Math.max.apply(Math, blogs.map(function (o) { return o.likes }))
    return blogs.filter(p => p.likes === maxVal)[0]
  } else {
    return { ...blogs }  // I think copy sounds safer than real reference
  }
}

const mostBlogs = (blogs) => {
  const blogsByName = {}
  const counter = function (o) {
    if (!blogsByName[o.author]) {
      blogsByName[o.author] = 0
    }
    blogsByName[o.author] += 1
  }

  if (Array.isArray(blogs)) {
    blogs.forEach(counter)
    let result = Object.keys(blogsByName).reduce((a, b) => blogsByName[a] > blogsByName[b] ? a : b, undefined)
    if (result) {
      return { 'author': result, 'blogs': blogsByName[result] }
    } else {
      return undefined
    }
  } else {
    return { 'author': blogs.author, blogs: 1 }
  }
}

const mostLikes = (blogs) => {
  const likesByName = {}
  const counter = function (o) {
    if (!likesByName[o.author]) {
      likesByName[o.author] = 0
    }
    likesByName[o.author] += o.likes
  }

  if (Array.isArray(blogs)) {
    blogs.forEach(counter)
    let result = Object.keys(likesByName).reduce((a, b) => likesByName[a] > likesByName[b] ? a : b, undefined)
    if (result) {
      return { 'author': result, 'likes': likesByName[result] }
    } else {
      return undefined
    }
  } else {
    return { 'author': blogs.author, likes: blogs.likes }
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}