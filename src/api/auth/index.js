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

export { userSigninRequest };
