import React from "react";
import { useParams } from "react-router-dom";

const PageProduct = () => {
  const { id } = useParams();
  console.log(id);

  return <div>PageProduct</div>;
};

export default PageProduct;
