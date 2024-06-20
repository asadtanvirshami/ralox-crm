import axios from "axios";

const ticketCreateRequest = (data) => {
  const request = axios
    .post(process.env.NEXT_PUBLIC_POST_TICKET, data)
    .then((response) => {
      return response.data;
    });

  return request;
};

const ticketUpdateRequest = (data) => {
  const request = axios
    .post(process.env.NEXT_PUBLIC_UPDATE_TICKET, data)
    .then((response) => {
      return response.data;
    });

  return request;
};

const ticketGetRequest = (page,pageSize,approved) => {
  const request = axios
    .get(`${process.env.NEXT_PUBLIC_GET_TICKET}?page=${page}&pageSize=${pageSize}&approved=${approved}`)
    .then((response) => {
      return response.data;
    });

  return request;
};

const ticketDeleteRequest = (id) => {
  const request = axios
    .delete(`${process.env.NEXT_PUBLIC_DELETE_TICKET}/?id=${id}`)
    .then((response) => {
      return response.data;
    });

  return request;
};

export {
  ticketCreateRequest,
  ticketUpdateRequest,
  ticketGetRequest,
  ticketDeleteRequest,
};
