const GET_API = () => {
  return {
    
  
  };
};

const POST_API = () => {
  return {
    createUserAccount: `/user`,
    createPost: "/post",
    login: "/login"
  };
};

const UPDATE_API = (id) => {
  return {
    updatePost:"/post"
  };
};

const DELETE_API = (id) => {
  return {
  
  };
};

export { GET_API, POST_API, UPDATE_API, DELETE_API };
