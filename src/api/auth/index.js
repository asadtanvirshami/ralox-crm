import axios from "axios";

const userSigninRequest = async (data) => {
  const request = await axios
    .post(process.env.NEXT_PUBLIC_AUTH_USER_SIGNIN, {
      serial: data.serial,
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

const userGetRequest = async (page, pageSize, email, name, serial, unitId) => {
  const request = await axios
    .get(
      `${process.env.NEXT_PUBLIC_GET_ALL_USERS}?page=${page}&pageSize=${pageSize}&email=${email}&name=${name}&serial=${serial}&unitId=${unitId}`
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
    .post(process.env.NEXT_PUBLIC_UPDATE_USER, data)
    .then((response) => {
      return response.data;
    });
  return request;
};

const verifyTokenRequest = async (Cookies, req, res) => {
  const cookies = new Cookies(req, res);
  const token = await cookies.get("token");
  const sessionRequest = await axios
    .get(process.env.NEXT_PUBLIC_AUTH_USER_VERIFICATION, {
      headers: { "x-access-token": `${token}` },
    })
    .then((response) =>response.data);
  return sessionRequest;
};

export {
  userSigninRequest,
  userSignupRequest,
  userGetRequest,
  userDeleteRequest,
  userUpdateRequest,
  verifyTokenRequest,
};
