import axios from 'axios'

const unitGetRequest = async () => {
    const request = await axios
      .get(
        process.env.NEXT_PUBLIC_GET_UNIT
      )
      .then((response) => {
        return response.data;
      });
    return request;
  };
  
  export {unitGetRequest}