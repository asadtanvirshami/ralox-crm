import axios from "axios";


const reportGetByFilterRequest = async (filter) => {
  const request = await axios
    .get(`${process.env.NEXT_PUBLIC_GET_REPORT_BY_FILTER}?filter=${filter}`)
    .then((response) => {
      return response.data;
    });
  return request;
};

export {

  reportGetByFilterRequest,
};
