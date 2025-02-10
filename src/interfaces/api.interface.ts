
export enum APIType {
  REST,
  SOAP
}

// Configuration for making an API call.
export interface APIConfig {
  apiType: APIType; // Type of API (e.g., REST, SOAP).
  methodType: string; // HTTP method (GET, POST, etc.).
  baseURL: string; // Base URL of the API.
  endpointName: string; // Name of the API method. concated to Base URL.
  timeout: string; // Request timeout duration.
  requestFormat: string; // Request format (application/json etc.). TODO: use type or enum
  responseFormat: string; // Expected response format. TODO: use type or enum
  headerParams?: any; // future use
  requestParams?: any; // future use
  responseParams?: any; // future use
}

// Strategy for making an API call.
export interface ApiCallStrategy {
  apiType: APIType;
  generateRequestHeaders(config: APIConfig): Record<string, any>;
  generateRequestBody(config: APIConfig): Promise<any>;
  execute(
    config: APIConfig,
    headers: Record<string, any>,
    body: unknown
  ): Promise<any>;
  processApiResponse(
    response: any,
    responseParams: any,
    responseFormat: string
  ): any;
}
