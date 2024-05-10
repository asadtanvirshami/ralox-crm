import React, { Fragment, useState } from "react";

// Component Imports
import Link from "next/link";
import { CalendarIcon, TrashIcon } from "@radix-ui/react-icons";
// import { HiPencilSquare } from "react-icons/hi2";

const TableCard = ({
  label,
  title,
  modalTitle,
  renderModalComponent: Component,
  data,
  setData,
  url,
  link,
  editable,
}) => {
  const [state, setState] = useState({
    showModal: false,
    viewModal: false,
    loading: false,
  });

  const sampleData = [
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

  return (
    <Fragment>
      <>
        <div className="flex p-6 flex-col h-full rounded-lg shadow-lg">
          <div className="flex justify-start items-center space-x-3 mb-2 ">
            <div className="text-theme-700 font-bold font-body">Attendance</div>
            <div className="text-theme-700 font-bold">
              <CalendarIcon className="w-5 h-5 text-blue-500 cursor-pointer" />
            </div>
          </div>
          {/* Modern Table Implementation */}
          <div className="h-100 flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start ">
            <table className="w-full rounded-lg shadow-md">
              <thead className="w-full sticky top-0 z-10 bg-gray-100">
                {" "}
                {/* Added sticky and z-index for fixed header */}
                <tr className="text-xs w-full font-medium text-gray-700">
                  <th key="name" className="px-4 py-2">
                    Name
                  </th>
                  <th key="email" className="px-4 py-2">
                    Email
                  </th>
                  <th key="phone" className="px-4 py-2">
                    Phone
                  </th>
                  <th key="status" className="px-4 py-2">
                    Status
                  </th>
                  {editable && (
                    <th key="actions" className="px-4 py-2 text-right">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Sample data for agents */}
                {sampleData?.map((agent, index) => (
                  <tr key={index} className="text-sm border-b border-gray-200">
                    <td className="px-4 py-2">{agent.name}</td>
                    <td className="px-4 py-2">{agent.email}</td>
                    <td className="px-4 py-2">{agent.phone}</td>
                    <td className="px-4 py-2">{agent.status}</td>
                    {editable && (
                      <td className="px-4 py-2 text-right">
                        <div className="flex justify-end space-x-2">
                          <HiPencilSquare
                            className="w-5 h-5 cursor-pointer"
                            // Handle edit functionality here (similar to commented code)
                          />
                          <TrashIcon
                            className="w-5 h-5 cursor-pointer"
                            onClick={() => handleDeleteAgent(agent.id)}
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex-grow" />
          <hr />
          <div className="flex justify-center">
            {/* <div className="font-body cursor-pointer pt-0">
              <Link href={"/"}>
                <p className="pt-2">View More</p>
              </Link>
            </div> */}
          </div>
        </div>
      </>
    </Fragment>
  );
};

export default React.memo(TableCard);
