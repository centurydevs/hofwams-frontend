import React from "react";

export const ToastMessage = ({
  title,
  details,
}: {
  title: string;
  details: string;
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{details}</p>
    </div>
  );
};
