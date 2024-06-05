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
      `${process.env.NEXT_PUBLIC_GET_PROJECT}?page=${page}&pageSize=${pageSize}&serial=${serial}&unit_id=${unitId}&user_id=${userId}&id=${id}&type=${type}&status=${status}&month=${month}&potential=${potential}`
    )
    .then((response) => {
      return response.data;
    });
  return request;
};



export {
    projectGetRequest
};
