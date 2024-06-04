import axios from "axios";

const serviceGetRequest = async (
  page,
  pageSize,
) => {
  const request = await axios
    .get(
      `${process.env.NEXT_PUBLIC_GET_SERVICE}?page=${page}&pageSize=${pageSize}`
    )
    .then((response) => {
      return response.data;
    });
  return request;
};



export {
    serviceGetRequest,
};
