import axios, { AxiosResponse } from "axios";

const httpBase = (
  baseURL: string,
  headers: object,
  timeoutMs?: number,
  httpsAgent?: any
) => {
  const instance = axios.create({
    baseURL: `${baseURL}`,
    headers: headers,
    ...(httpsAgent && { httpsAgent: httpsAgent }),
    responseType: "json",
    timeout: timeoutMs || 120000,
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
};

export const httpRequest = async (
  baseURL: string,
  endpointName: string,
  methodType: string,
  headers: object,
  data: unknown,
  timeout: number = 120,
  httpsAgent?: any
): Promise<AxiosResponse<any>> => {
  const timeoutMs = timeout * 1000; // Convert timeout to milliseconds

  // Handle the HTTP methods
  switch (methodType) {
    case "GET":
      return await httpBase(baseURL, headers, timeoutMs,httpsAgent).get(endpointName);
    case "POST":
      return await httpBase(baseURL, headers, timeoutMs,httpsAgent).post(endpointName, data);
    case "PUT":
      return await httpBase(baseURL, headers, timeoutMs,httpsAgent).put(endpointName, data);
    case "DELETE":
      return await httpBase(baseURL, headers, timeoutMs,httpsAgent).delete(endpointName, { data });
    default:
      throw new Error(`Unsupported HTTP method: ${methodType}`);
  }
};
