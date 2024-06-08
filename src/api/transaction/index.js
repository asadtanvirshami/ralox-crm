import axios from "axios";

const transactionCreateRequest = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (key === "img") {
      formData.append("img", data.img[0]);
    } else {
      formData.append(key, data[key]);
    }
  }
  return axios
    .post(process.env.NEXT_PUBLIC_POST_TRANSACTION, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export { transactionCreateRequest };
