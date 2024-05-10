import axios from "axios";

const userSigninRequest = async (data) => {
  const request = await axios
    .post(process.env.NEXT_PUBLIC_AUTH_USER_SIGNIN, {
      email: data.email,
      password: data.password,
    })
    .then((response) => {
      return response.data;
    });

  return request;
};

const userSignupRequest = (data) => {
  const request = axios
    .post(process.env.NEXT_PUBLIC_AUTH_USER_SIGNUP, data)
    .then((response) => {
      console.log(response);
      return response.data;
    });

  return request;
};

const userGetRequest = async (page, pageSize, email, name) => {
  const request = await axios
    .get(
      `${process.env.NEXT_PUBLIC_GET_ALL_USERS}?page=${page}&pageSize=${pageSize}&email=${email}&name=${name}`
    )
    .then((response) => {
      return response.data;
    });
  return request;
};

const userDeleteRequest = async (id) => {
  const request = await axios
    .delete(`${process.env.NEXT_PUBLIC_DELETE_USER}/${id}/delete`)
    .then((response) => {
      return response.data;
    });
  return request;
};

const userUpdateRequest = async (data) => {
  const request = await axios
    .post(process.env.NEXT_PUBLIC_UPDATE_USER, data )
    .then((response) => {
      return response.data;
    });
  return request;
};

export {
  userSigninRequest,
  userSignupRequest,
  userGetRequest,
  userDeleteRequest,
  userUpdateRequest,
};
