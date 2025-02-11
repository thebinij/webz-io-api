import { APIConfig, APIType, ApiCallStrategy } from "@interfaces/api.interface";
import { httpRequest } from "@utils/httpHandler";

export class RestApiBuilder implements ApiCallStrategy {
  apiType = APIType.REST;
  private httpClient: typeof httpRequest; // Injected HTTP client

  constructor(httpClient: typeof httpRequest) {
    this.httpClient = httpClient;
  }

  // Generate request headers
  public generateRequestHeaders(config: APIConfig): Record<string, any> {
    return {
      "Content-Type": config.requestFormat,
      ...config.headerParams,
    };
  }

  // Generate request body (if needed, based on APIConfig)
  public async generateRequestBody(config: APIConfig): Promise<any> {
    if (config.methodType === "GET") return undefined;
    return config.requestParams || {};
  }

  // Make the API call using the httpRequest utility
  public async execute(
    config: APIConfig,
    headers: Record<string, any>,
    body: unknown
  ): Promise<any> {
    const { baseURL, methodType, endpointName, timeout } = config;

    try {
      const response = await this.httpClient(
        baseURL,
        endpointName,
        methodType,
        headers,
        body,
        parseInt(timeout, 10)
      );

      return this.processApiResponse(
        response,
        config.responseParams,
        config.responseFormat
      );
    } catch (error) {
      console.error(error);
      throw Error("API call failed");
    }
  }

  // Process API response (can be customized based on response format)
  public processApiResponse(
    response: any,
    responseParams: any,
    responseFormat: string
  ): any {
    // TODO: Handle other response formats (e.g., XML) and implement necessary parsing.
    // if (responseFormat === 'xml') { ... }

    if (responseFormat === "application/json") {
      return response.data; // Just return JSON data here
    }
    // Handle other formats (e.g., XML, etc.) as necessary
    return response;
  }
}
