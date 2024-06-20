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

const transactionGetRequest = (
  page,
  pageSize,
  id,
  user_id,
  serial,
  type,
  day,
  month,
  date,
  unit_id
) => {
  return axios
    .get(
      `${process.env.NEXT_PUBLIC_GET_TRANSACTION}?page=${page}&pageSize=${pageSize}&id=${id}&user_id=${user_id}&unit_id=${unit_id}&type=${type}&serial=${serial}&day=${day}&month=${month}&date=${date}`
    )
    .then((response) => response?.data);
};

const transactionDeleteRequest = () => {
  return axios.delete;
};

export { transactionGetRequest, transactionCreateRequest };
