import React from "react";

const Page = async () => {
  console.log("Where am I:", new Error().stack);
  return <>TEST</>;
};

export default Page;
