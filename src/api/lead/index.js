import axios from "axios";

const leadGetRequest = async (
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
      `${process.env.NEXT_PUBLIC_GET_LEAD}?page=${page}&pageSize=${pageSize}&serial=${serial}&unit_id=${unitId}&user_id=${userId}&id=${id}&type=${type}&status=${status}&month=${month}&potential=${potential}`
    )
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

const leadDeletedRequest = async (id) => {
  const request = await axios
    .delete(`${process.env.NEXT_PUBLIC_DELETE_LEAD}/${id}/delete`)
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
