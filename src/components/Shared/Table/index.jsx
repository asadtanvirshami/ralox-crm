import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Edit, Map as MapI, Trash } from "lucide-react";
import { useSetAtom } from "jotai";
import { formAtom } from "@/jotai/atoms/formAtom";
import Map from "../Map";

const TableCom = (props) => {
  const [value, setValue] = useState({
    title: "",
    value: [],
    coords:{}
  });
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [map, setMap] = useState(false);

  const setState = useSetAtom(formAtom);

  let keys;
  if (props.data?.length >= 1) {
    keys = Object.keys(...props.data);
    keys = keys.filter(
      (key) =>
        // key !== "id" &&
        key !== "type" &&
        key !== "img" &&
        key !== "_id" &&
        key !== "ClientId" &&
        key !== "DoctorId" &&
        key !== "createdAt" &&
        key !== "lat" &&
        key !== "lng" &&
        key !== "updatedAt"
    );
  }

  return (
    <>
      {props.data.length > 0 && !props.isLoading ? (
        <div className="">
          <Table bordered>
            <TableHeader>
              <TableRow>
                {keys.map((ele, index) => {
                  return <TableHead key={index}>{ele.toUpperCase()}</TableHead>;
                })}
                {props.editable && <TableHead>Edit</TableHead>}
                {props.editable && <TableHead>Trash</TableHead>}
                {props.map && <TableHead>Map</TableHead>}
              </TableRow>
            </TableHeader>

            <TableBody>
              {props.data.map((ele, i) => {
                return (
                  <TableRow key={i}>
                    {keys.map((key, index) => {
                      return (
                        <>
                          {ele[key] === null && (
                            <TableCell key={`${index}-null`}>
                              <>No {key}</>
                            </TableCell>
                          )}
                          {typeof ele[key] === "string" && (
                            <TableCell key={`${index}-string`}>
                              {ele[key]}
                            </TableCell>
                          )}
                          {typeof ele[key] === "boolean" && (
                            <TableCell key={`${index}-bool`}>
                              {ele[key] ? "true" : "false"}
                            </TableCell>
                          )}
                          {typeof ele[key] === "object" &&
                            ele[key] != null &&
                            ele[key] != undefined && (
                              <TableCell key={`${index}-object`}>
                                <Button
                                  size="sm"
                                  className="bg-sky-300 hover:bg-sky-500"
                                  onClick={() => {
                                    setOpen(true);
                                    setValue({
                                      title: key,
                                      value: ele[key],
                                    });
                                  }}
                                >
                                  View
                                </Button>
                              </TableCell>
                            )}
                        </>
                      );
                    })}
                    {props.map && (
                      <TableCell>
                        <MapI
                          onClick={() => {
                            setMap(true);
                            setValue({coords: { lng: ele.lng, lat: ele.lat } });
                          }}
                          size={20}
                          className="cursor-pointer"
                        />
                      </TableCell>
                    )}
                    {props.editable && (
                      <TableCell>
                        <Edit
                          onClick={() => {
                            setEdit(true);
                            setState({ edit: true, value: ele });
                          }}
                          size={20}
                          className="cursor-pointer"
                        />
                      </TableCell>
                    )}
                    {props.editable && (
                      <TableCell>
                        <Trash
                          onClick={() => {
                            props.onDelete(ele.id);
                          }}
                          size={20}
                          className="cursor-pointer"
                        />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
              <tr></tr>
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="table-spinner m-5">
          {props.isLoading ? (
            <MoonLoader
              className="justify-center mx-auto"
              color="skyblue"
              size={30}
            />
          ) : (
            <p></p>
          )}
        </div>
      )}
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{value.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {" "}
              {Object.keys(value?.value || {}).map((key) => (
                <div
                  className="flex text-[15px] space-x-6 justify-between text-justify"
                  key={key}
                >
                  <strong className="text-md text-sky-600">{key}</strong>
                  <div className=" justify-end flex">
                    {value?.value[key] === null
                      ? "No Value"
                      : typeof value?.value[key] === "boolean"
                      ? value?.value[key]
                        ? "true"
                        : "false"
                      : value?.value[key]}
                  </div>
                </div>
              ))}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setOpen(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={edit}>
        <AlertDialogContent>
          {props.children}
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setEdit(false);
                setState({ edit: false, value: null });
              }}
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={map}>
        <AlertDialogContent className="w-fit">
          <Map location={value.coords}/>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setMap(false);
                setState({ edit: false, value: null });
              }}
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default React.memo(TableCom);
