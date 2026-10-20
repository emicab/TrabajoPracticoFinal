export const getHeaders = (extraHeaders = {}) => {
  const headers = {
    accept: "application/json",
    Authorization: `Bearer plantco`,
    ...extraHeaders,
  };

  return headers;
};
