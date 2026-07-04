import { postNewBookAPI } from "./bookAPI";

export const postNewBookAction = async (payload) => {
  const book = await postNewBookAPI(payload);
  console.log(book);
};
