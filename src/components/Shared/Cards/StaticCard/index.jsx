import React from "react";

const StaticCard = ({ title, amount, className,icon }) => {
  return (
    <div className="w-full p-2 lg:w-1/3">
      <div
        className={`rounded-lg ${className} shadow-lg flex justify-between p-3 h-32 `}
      >
        <div className="">
          <div className="flex items-center">
            {/* <User
              className="w-6 h-6 text-gray-500 hover:text-gray-900 transition duration-75"
              fill={"pink"}
            /> */}
            {/* <Image path={`mock_faces_${imgId}`} className="w-10 h-10" /> */}
            <div className="ml-2">
              <div className="flex items-center">
                <div className="mr-2 font-bold text-2xl text-white">
                  {amount}
                </div>
                {/* <Icon path="res-react-dash-tick" /> */}
              </div>
            </div>
          </div>

          <div className="mt-2 text-white font-bold text-2xl">{title}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-sm ">{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(StaticCard);
