import React, { Fragment, useState, useRef } from "react";

// Component Imports
import Link from "next/link";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { HiPencilSquare, HiTrash } from "react-icons/hi2";

const InfoCard = ({
  label,
  title,
  renderModalComponent: Component,
  // data,
  setData,
  url,
  link,
  setOpen,
}) => {
  const [state, setState] = useState({
    showModal: false,
    viewModal: false,
    loading: false,
  });

  const checkbox = useRef();

  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  const [selectedData, setSelectedData] = useState([]);

  const [order, setOrder] = useState("ASC");
  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+9876543210",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+9876543210",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+9876543210",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+9876543210",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+9876543210",
      status: "Inactive",
    },
    // ... add more agents
  ];
  const [filteredData, setFilteredData] = useState([data]);

  // useEffect(() => {
  //   setFilteredData(data);
  // }, [data]);

  function toggleAll() {
    setSelectedData(checked || indeterminate ? [] : data);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  let keys;
  if (data?.length >= 1) {
    keys = Object.keys(...data);
    keys = keys.filter((key) => key === "name");
  }

  const convertToDate = (dateString) => {
    //  Convert a "dd/MM/yyyy" string into a Date object
    let d = dateString.split("/");
    let dat = new Date(d[1] + "/" + d[2] + "/" + d[0]);
    return dat;
  };
  function sortByKey(key, order) {
    return (a, b) => {
      let x = a[key];
      let y = b[key];

      if (order === "ASC") {
        // console.log('asc');

        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      } else {
        // console.log('dsc');
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      }
    };
  }
  const sortString = (name) => {
    if (order === "ASC") {
      const sorted = [...filteredData].sort(sortByKey(name, order));
      setFilteredData(sorted);
      setOrder("DSC");
    } else {
      const sorted = [...filteredData].sort(sortByKey(name, order));
      setFilteredData(sorted);
      setOrder("ASC");
    }
  };
  const sortDate = (name) => {
    if (order === "ASC") {
      const sorted = [...filteredData].sort(
        (a, b) => convertToDate(b[name]) - convertToDate(a[name])
      );
      setFilteredData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...filteredData].sort(
        (a, b) => convertToDate(a[name]) - convertToDate(b[name])
      );
      setFilteredData(sorted);
      setOrder("ASC");
    }
  };

  const sortNumber = (name) => {
    if (order === "ASC") {
      const sorted = [...filteredData].sort((a, b) => b[name] - a[name]);
      setFilteredData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...filteredData].sort((a, b) => a[name] - b[name]);
      setFilteredData(sorted);
      setOrder("ASC");
    }
  };

  return (
    <Fragment>
      <>
        <div className="flex p-4 flex-col h-full rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <div className="text-theme-700 font-bold font-body">{title}</div>
            <div className="text-theme-700 font-bold ">
              <PlusCircledIcon
                onClick={() => setOpen((prev) => !prev)}
                className="w-6 h-6 text-gray-500 cursor-pointer"
              />
            </div>
          </div>
          <div className="font-body">{label}</div>
          <div className="h-100 flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
            <ul></ul>
            <ul className="p-3 w-full">
              {data?.length > 0 && !state.loading ? (
                <Fragment>
                  {keys?.map((keys, i) => (
                    <Fragment key={i}>
                      {data?.map((item, index) => (
                        <div key={item["id"]}>
                          <div className="flex">
                            <li className="w-full p-3 text-[15px]">
                              <strong>{index + 1}. </strong> {item[keys]}
                            </li>
                            {/* <div className="w-full p-3 justify-end flex text-right">
                              <li className="px-5">
                                <HiPencilSquare className="w-5 text-slate-300 hover:text-slate-400 h-5 cursor-pointer" />
                              </li>
                              <li className="">
                                <HiTrash
                                  onClick={() => handleOnClick(item.id)}
                                  className="w-5 text-slate-300 hover:text-slate-400 h-5 cursor-pointer"
                                />
                              </li>
                            </div> */}
                          </div>
                          <hr />
                        </div>
                      ))}
                    </Fragment>
                  ))}
                </Fragment>
              ) : (
                <>
                  {state.loading && data?.length > 0 && <CricleSpinner />}
                  {data?.length == 0 && <> No {modalTitle} to show</>}
                </>
              )}
            </ul>
          </div>
          <div className="flex-grow" />
          {/* <hr /> */}
          <div className="flex justify-center">
            <div className="font-body cursor-pointer pt-0">
              {/* <Link href={link}>
                <p className="pt-2">View More</p>
              </Link> */}
            </div>
          </div>
        </div>
      </>
    </Fragment>
  );
};

export default React.memo(InfoCard);
