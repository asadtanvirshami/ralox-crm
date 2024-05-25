import axios from "axios";

const ticketCreateRequest = (data) => {
    console.log("Working now Ticket")
    const request = axios
      .post(process.env.NEXT_PUBLIC_POST_TICKET, data)
      .then((response) => {
        console.log(response);
        return response.data;
      });
  
    return request;
  };

  const ticketUpdateRequest = (data) => {
    const request = axios
      .post(process.env.NEXT_PUBLIC_UPDATE_TICKET, data)
      .then((response) => {
        console.log(response);
        return response.data;
      });
  
    return request;
  };

  export {
    ticketCreateRequest,
    ticketUpdateRequest
  };