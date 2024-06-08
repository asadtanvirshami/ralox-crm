import axios from "axios";

const projectGetRequest = async (
  page,
  pageSize,
  id,
  userId,
  unitId,
  status,
  month,
  potential,
  type,
  serial
) => {
  const request = await axios
    .get(
      `${process.env.NEXT_PUBLIC_GET_PROJECT}?page=${page}&pageSize=${pageSize}`
    )
    .then((response) => {
      return response.data;
    });
  return request;
};

const projectCreateRequest = async (data) => {
  const request = await axios
    .post(process.env.NEXT_PUBLIC_GET_PROJECT, data)
    .then((response) => {
      return response.data;
    });
  return request;
};

const projectUpdateRequest = async (data) => {
  const request = await axios
    .put(`${process.env.NEXT_PUBLIC_UPDATE_PROJECT}`, data)
    .then((response) => {
      return response.data;
    });
  return request;
};

const projectDeletedRequest = async (id) => {
  const request = await axios
    .delete(`${process.env.NEXT_PUBLIC_DELETE_PROJECT}?projectId=${id}`)
    .then((response) => {
      return response.data;
    });
  return request;
};

export {
  projectGetRequest,
  projectCreateRequest,
  projectUpdateRequest,
  projectDeletedRequest,
};
