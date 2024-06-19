import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import React, { Fragment, useCallback, useState } from "react";

const UploadImg = ({ form, img }) => {
  const [files, setFiles] = useState([]);

  React.useEffect(() => {
    if (form?.getValues("img") !== null) {
      setFiles([
        {
          name: "ScreenShot",
          preview:
            form?.getValues("img") !== null ? form?.getValues("img") : "",
        },
      ]);
      return;
    }
  }, []);

  const thumbs = files.map((file) => (
    <div key={file.name} className="flex justify-center items-center p-2">
      <Image
        src={file.preview}
        alt={file.name}
        width={250}
        height={250}
        className="rounded"
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </div>
  ));

  const onDrop = useCallback(
    (acceptedFiles) => {
      const mappedFiles = acceptedFiles.map((file) => {
        file.preview = URL.createObjectURL(file);

        return file;
      });
      setFiles(mappedFiles);
      form.setValue("img", acceptedFiles);
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Fragment>
      <div>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-4 text-center ${
            isDragActive
              ? "border-blue-400 bg-blue-100"
              : "border-gray-300 bg-gray-50"
          }`}
        >
          <input
            {...getInputProps()}
            type="file"
            enctype="multipart/form-data"
            name="img"
          />
          <UploadCloud className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-600">
            Drag & drop some files here, or click to select files
          </p>
        </div>
        {/* <Image src={form.getValues("img") ? form.getValues("img")  : ""} alt="ss" height={100} width={100} /> */}
        <aside className="flex flex-wrap mt-4">{thumbs}</aside>
      </div>
    </Fragment>
  );
};

export default UploadImg;
