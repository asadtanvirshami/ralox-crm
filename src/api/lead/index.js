import axios from "axios";

const leadGetRequest = async () => {
  const request = await axios
    .get(process.env.NEXT_PUBLIC_GET_LEAD)
    .then((response) => {
      return response.data;
    });
  return request;
};

const leadCreateRequest = async (data) => {
  const request = await axios
    .post(process.env.NEXT_PUBLIC_CREATE_LEAD, data)
    .then((response) => {
      return response.data;
    });
  return request;
};

const leadUpdateRequest = async (data) => {
  const request = await axios
    .post(process.env.NEXT_PUBLIC_UPDATE_LEAD, data)
    .then((response) => {
      return response.data;
    });
  return request;
};

const leadDeletedRequest = async () => {
  const request = await axios
    .get(process.env.NEXT_PUBLIC_GET_UNIT)
    .then((response) => {
      return response.data;
    });
  return request;
};

export {
  leadGetRequest,
  leadCreateRequest,
  leadUpdateRequest,
  leadDeletedRequest,
};
