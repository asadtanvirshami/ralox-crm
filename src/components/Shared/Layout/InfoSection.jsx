import React from "react";
import moment from "moment";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  attendanceCheckInRequest,
  attendanceUpdateRequest,
} from "@/api/attendance";

const InfoSection = () => {
  const [user, setUserData] = React.useState(null);
  const [isCheckedIn, setIsCheckedIn] = React.useState(false);

  React.useEffect(() => {
    async function getUserCookie() {
      try {
        const userData = await Cookies.get("user");
        setUserData(JSON.parse(userData));
        setIsCheckedIn(user?.checkedIn);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    getUserCookie();
  }, [isCheckedIn]);

  const [coordinates, setCoordinates] = React.useState({ lng: 0.0, lat: 0.0 });
  // const nextAvailableCheckInTime = user?.lastCheckedIn
  //   ? moment(user?.lastCheckedIn, "HH:mm:ss").add(8, "hours").toDate()
  //   : null;

  // const isCheckInDisabled =
  //   nextAvailableCheckInTime && new Date() < nextAvailableCheckInTime;

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const onSubmit = async () => {
    try {
      const currentDate = new Date();
      const formattedTime = moment(currentDate).format("HH:mm:ss");

      const data = {
        user_id: user.id,
        date: moment(currentDate).format("YYYY-MM-DD"), // Format the date as YYYY-MM-DD
        clock_in: formattedTime,
        clock_out: formattedTime,
        lng: coordinates.lng,
        lat: coordinates.lat,
      };
      // Call the check-in API
      const response = await attendanceCheckInRequest(data);
      setIsCheckedIn(true);
      if (response.success) {
        const userData = {
          ...user,
          lastCheckedIn: formattedTime,
          checkedIn: true,
          attendanceId: response?.data?.data?.id,
        };
        Cookies.set("user", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Error checking in:", error);
    }
  };

  const onUpdate = async () => {
    try {
      const currentDate = new Date();
      const formattedTime = moment(currentDate).format("HH:mm:ss");
      const data = {
        id: user?.attendanceId,
        user_id: user?.id,
        date: moment(currentDate).format("YYYY-MM-DD"), // Format the date as YYYY-MM-DD
        clock_in: user?.lastCheckedIn,
        clock_out: formattedTime,
        lng: coordinates.lng,
        lat: coordinates.lat,
      };
      await attendanceUpdateRequest(data);
      setIsCheckedIn(false);
      const userData = {
        ...user,
        lastCheckedIn: null,
        checkedIn: false,
        attendenceId: null,
      };
      Cookies.set("user", JSON.stringify(userData));

      // Call the check-in API
    } catch (error) {
      console.error("Error checking in:", error);
    }
  };

  return (
    <>
      <div className="w-full sm:flex p-3 mt-3 items-end">
        <div className="sm:flex-grow flex justify-between">
          <div className="w-full items-center ">
            <div className="flex items-center">
              <div className="text-3xl font-bold font-body text-theme-700 ">
                {user?.name}
              </div>
              <span className="flex items-center p-2 bg-card ml-2 rounded-xl">
                {/* <Icon path="res-react-dash-premium-star" /> */}-
                <span className="ml-2 font-bold font-body text-theme-700">
                  {user?.designation}
                </span>
              </span>
            </div>
            <div className="flex items-center mb-2">
              <p className="font-body text-sm text-zinc-400">{user?.email}</p>
            </div>
          </div>
          <div className="flex float-right justify-end  ">
            <Button
              // disabled={isCheckInDisabled}
              // onClick={isCheckInDisabled ? onSubmit : onUpdate}
              onClick={isCheckedIn ? onUpdate : onSubmit}
              className={` ${
                isCheckedIn
                  ? "bg-red-500 opacity-100 rounded-full hover:bg-red-500"
                  : "bg-green-500 opacity-100 rounded-full hover:bg-green-500"
              }`}
            >
              {isCheckedIn ? "Check-Out" : "Check In"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(InfoSection);
