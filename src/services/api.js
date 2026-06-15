import axios from "axios";

export const apiProcessor = async ({ url, method, payload }) => {
  try {
    const response = await axios({
      url,
      method,
      data: payload,
      //   headers,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
