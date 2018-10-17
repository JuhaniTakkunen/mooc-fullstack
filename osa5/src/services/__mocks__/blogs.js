let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "HTML on helppoa",
    author: "Kirjalijija Pirjalilija",
    url: "",
    likes: 42,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451e21e0b8b04a45638211",
    title: "Selain pystyy suorittamaan vain javascriptiä",
    author: "Kirjalilija2",
    likes: 666,
    url: "",

    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    id: "5a451e30b5ffd44a58fa79ab",
    title: "HTTP-protokollan tärkeimmät metodit ovat GET ja POST",
    author: "Kirjailija3",
    likes: 0,
    url: "",

    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, blogs, setToken }