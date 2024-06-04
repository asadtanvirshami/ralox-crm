import axios from "axios";

const saleGetRequest = async (
  page,
  pageSize,
  id,
  userId,
  unitId,
  month,
  payment,
  serial
) => {
  const request = await axios
    .get(
      `${process.env.NEXT_PUBLIC_GET_SALE}?page=${page}&pageSize=${pageSize}&serial=${serial}&unit_id=${unitId}&user_id=${userId}&id=${id}&month=${month}&payment=${payment}`
    )
    .then((response) => {
      return response.data;
    });
  return request;
};

const saleCreateRequest = async (data) => {
  const request = await axios
    .post(process.env.NEXT_PUBLIC_CREATE_SALE, data)
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
  saleGetRequest,
  saleCreateRequest,
  leadUpdateRequest,
  leadDeletedRequest,
};
