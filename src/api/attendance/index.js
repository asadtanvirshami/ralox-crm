import axios from "axios";

const attendanceCheckInRequest = async (data) => {
  const request = await axios
    .post(process.env.NEXT_PUBLIC_POST_ATTENDANCE, data)
    .then((response) => {
      return response.data;
    });

  return request;
};

const attendanceGetRequest = async (page, pageSize, date, name, user_id) => {
  const request = await axios
    .get(
      `${
        process.env.NEXT_PUBLIC_GET_ATTENDANCE
      }?page=${page}&pageSize=${pageSize}&date=${date}&user_id=${
        user_id || ""
      }&name=${name}`
    )
    .then((response) => {
      return response.data;
    });

  return request;
};

const attendanceUpdateRequest = async (data) => {
  const request = await axios
    .post(process.env.NEXT_PUBLIC_UPDATE_ATTENDANCE, data)
    .then((response) => {
      return response.data;
    });

  return request;
};

export {
  attendanceCheckInRequest,
  attendanceGetRequest,
  attendanceUpdateRequest,
};
