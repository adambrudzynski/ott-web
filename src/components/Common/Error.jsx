import React from "react";

const Error = ({ message }) => {
  return (
    <div className="flex w-full">
      <span className="m-auto text-2xl font-bold">
        {message ? message : "Something went wrong"}
      </span>
    </div>
  );
};

export default Error;
