import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const AddRow = ({ rows, setRows, onRowsChange }) => {
  const handleServiceChange = (event, index) => {
    const newRows = [...rows];
    newRows[index].type = event.target.value;
    setRows(newRows);
    onRowsChange(newRows);
  };

  const handlePriceChange = (event, index) => {
    const newRows = [...rows];
    newRows[index].amount = event.target.value;
    setRows(newRows);
    onRowsChange(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { amount: "", type: "" }]);
  };

  const handleRemoveRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="">
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-1/4 md:w-1/3">Type</th>
              <th className="w-1/2 md:w-1/3">Amount</th>
              <th className="w-1/4 md:w-1/3">Action</th>
            </tr>
          </thead>
          <tbody className="min-h-[200px] md:min-h-0 overflow-y-auto w-full">
            {rows.map((ele, index) => (
              <tr key={index}>
                <td className="m-2">
                  <select
                    placeholder="Service"
                    className="p-2 mt-2 border h-10 w-full md:w-full border-[0.5]px rounded-md text-sm focus:outline-none focus:border-blue-500"
                    value={rows.amount}
                    onChange={(e) => handleServiceChange(e, index)}
                  >
                    {/* {options.map((x) => {
                      return (
                        <>
                          <option className="hidden">Select Type</option>
                          <option>{x}</option>
                        </>
                      );
                    })} */}
                  </select>
                </td>
                <td className="m-2">
                  <input
                    type="number"
                    placeholder="Price"
                    className="p-2 mx-2 mt-2 border h-10 w-full md:w-full border-[0.5]px rounded-md text-sm focus:outline-none focus:border-blue-500"
                    value={rows.price}
                    onChange={(e) => handlePriceChange(e, index)}
                  />
                </td>
                <td className="text-center">
                  {index !== 0 && (
                    <Button
                      className="bg-sky-500 text-white py-2 px-1 mx-1 rounded-md hover:bg-sky-600 focus:outline-none focus:ring focus:ring-red-300 w-full md:w-auto"
                      onClick={() => handleRemoveRow(index)}
                    >
                      Remove
                    </Button>
                  )}
                  {index >= 0 && (
                    <Button
                      className="bg-sky-500 text-white py-2 px-1 rounded-md hover:bg-sky-600 focus:outline-none focus:ring focus:ring-red-300 w-full md:w-auto"
                      onClick={handleAddRow}
                    >
                      Add Row
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddRow;
