const GET_API = ({ page, cat, type, id }) => {
  return {
    userById: `/user/${id}`,

    getPost: `/posts?page=${page}&category=${cat}&type=${type}`,
    getNews: `/posts?page=${page}&category=${cat}`,
  };
};

const POST_API = () => {
  return {
    createUserAccount: `/user`,
    createPost: "/post",
    login: "/login",
  };
};

const UPDATE_API = (id) => {
  return {
    updatePost: `post/${id}`,
  };
};

const DELETE_API = (id) => {
  return {
    deletePost: `post/${id}`,
  };
};

export { GET_API, POST_API, UPDATE_API, DELETE_API };
