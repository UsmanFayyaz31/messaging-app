import axios, { AxiosResponse } from "axios";

export interface ServerResponse<T> {
  data: T;
  status: number;
  headers: any;
}

const getTokenValue = () => {
  return "Bearer " + localStorage.getItem("t");
};

export const postRequestWithoutToken = <TData, TResponse>(
  URL: string,
  data: TData
): Promise<ServerResponse<TResponse>> => {
  return new Promise<ServerResponse<TResponse>>((resolve, reject) => {
    axios
      .post<TResponse>(URL, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response: AxiosResponse<TResponse>) => {
        return resolve({
          data: response.data,
          status: response.status,
          headers: response.headers,
        });
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};

export const getRequest = <TResponse>(
  URL: string
): Promise<ServerResponse<TResponse>> => {
  return new Promise<ServerResponse<TResponse>>((resolve, reject) => {
    axios
      .get<TResponse>(URL, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: getTokenValue(),
        },
      })
      .then((response: AxiosResponse<TResponse>) => {
        return resolve({
          data: response.data,
          status: response.status,
          headers: response.headers,
        });
      })
      .catch((error) => {
        return reject(error.response);
      });
  });
};
