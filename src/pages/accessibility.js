import axios from "axios";
import ImageKit from "imagekit";
import React, { Fragment, useState } from "react";

const Accessibility = () => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const imagekit = new ImageKit({
    publicKey: "public_JCxCGw8zqXg0IfqdHmyRNCbb2HM=",
    privateKey: "private_BkdC3TtLFKR7bdHuaCgR6T565WQ=",
    urlEndpoint: "https://ik.imagekit.io/epbtkdzri1",
    authenticationEndpoint: "http://localhost:3000/auth",
  });

  function handleFileChange(e) {
    const file = e.target.files[0];

    imagekit.upload(
      {
        file: file,
        fileName: "abc1.jpg",
        folder: "Payments",
        tags: ["tag1"],
      },
      function (err, result) {
        if (err) {
          console.error("Error uploading file:", err);
          setUploadStatus("Error uploading file");
          return;
        }

        console.log("Upload successful. File URL:", result.url);
        setUploadStatus("File uploaded successfully");
        setFileUrl(result.url);
        console.log(
        );
      }
    );
  }

  return (
    <Fragment>
      <div>
        <input type="file" onChange={handleFileChange} />
        <p>{uploadStatus}</p>
        {fileUrl && (
          <div>
            <p>File URL:</p>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              {fileUrl}
            </a>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Accessibility;
