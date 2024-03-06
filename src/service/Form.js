import axios from 'axios';

const URL_POST_API = 'http://localhost:8080/api/form/';

export const postForm = async (form) => {
    const response = await axios.post(URL_POST_API, form);
    return response.data;
  };

  export default {
    postForm
  };
  