import { APIConfig, APIType } from "@interfaces/api.interface";
import { RestApiBuilder } from "@lib/restApiBuilder";

// Mock the HTTP handler
const mockHttpRequest = jest.fn();

describe("RestApiBuilder", () => {
  let apiBuilder: RestApiBuilder;

  beforeEach(() => {
    jest.clearAllMocks();
    apiBuilder = new RestApiBuilder(mockHttpRequest); // Inject mocked httpRequest
  });

  // Generate Request Headers Method
  describe("generateRequestHeaders", () => {
    test("should generate headers with content type", () => {
      const config: APIConfig = {
        apiType: APIType.REST,
        methodType: "GET",
        baseURL: "https://api.test.com",
        endpointName: "/api",
        timeout: "15",
        requestFormat: "application/json",
        responseFormat: "application/json",
      };

      const headers = apiBuilder.generateRequestHeaders(config);
      expect(headers).toEqual({
        "Content-Type": "application/json",
      });
    });

    test("should include custom header parameters", () => {
      const config: APIConfig = {
        apiType: APIType.REST,
        methodType: "GET",
        baseURL: "https://api.test.com",
        endpointName: "/api",
        timeout: "15",
        requestFormat: "application/json",
        responseFormat: "application/json",
        headerParams: {
          "X-Custom-Header": "test",
          Authorization: "Bearer token",
        },
      };

      const headers = apiBuilder.generateRequestHeaders(config);
      expect(headers).toEqual({
        "Content-Type": "application/json",
        "X-Custom-Header": "test",
        Authorization: "Bearer token",
      });
    });
  });

  // Generate Request Body Method
  describe("generateRequestBody", () => {
    test("should return undefined for GET requests", async () => {
      const config: APIConfig = {
        apiType: APIType.REST,
        methodType: "GET",
        baseURL: "https://api.test.com",
        endpointName: "/api",
        timeout: "15",
        requestFormat: "application/json",
        responseFormat: "application/json",
      };

      const body = await apiBuilder.generateRequestBody(config);
      expect(body).toBeUndefined();
    });

    test("should return request params if provided", async () => {
      const config: APIConfig = {
        apiType: APIType.REST,
        methodType: "POST",
        baseURL: "https://api.test.com",
        endpointName: "/api",
        timeout: "15",
        requestFormat: "application/json",
        responseFormat: "application/json",
        requestParams: { key: "value" },
      };

      const body = await apiBuilder.generateRequestBody(config);
      expect(body).toEqual({ key: "value" });
    });
  });

  describe("execute", () => {
    test("should make successful API call", async () => {
      const mockResponse = { data: { result: "success" } };
      mockHttpRequest.mockResolvedValue(mockResponse);

      const config: APIConfig = {
        apiType: APIType.REST,
        methodType: "GET",
        baseURL: "https://api.test.com",
        endpointName: "/api",
        timeout: "15",
        requestFormat: "application/json",
        responseFormat: "application/json",
      };

      const headers = { "Content-Type": "application/json" };
      const result = await apiBuilder.execute(config, headers, undefined);

      expect(result).toEqual({ result: "success" });
      expect(mockHttpRequest).toHaveBeenCalledWith(
        "https://api.test.com",
        "/api",
        "GET",
        headers,
        undefined,
        15
      );
    });

    test("should handle API call failure", async () => {
      mockHttpRequest.mockRejectedValue(new Error("API Error"));

      const config: APIConfig = {
        apiType: APIType.REST,
        methodType: "GET",
        baseURL: "https://api.test.com",
        endpointName: "/api",
        timeout: "15",
        requestFormat: "application/json",
        responseFormat: "application/json",
      };

      const headers = { "Content-Type": "application/json" };

      await expect(
        apiBuilder.execute(config, headers, undefined)
      ).rejects.toThrow("API call failed");
    });
  });

  describe("processApiResponse", () => {
    test("should process JSON response correctly", () => {
      const response = {
        data: { key: "value" },
      };

      const result = apiBuilder.processApiResponse(
        response,
        null,
        "application/json"
      );

      expect(result).toEqual({ key: "value" });
    });

    test("should return raw response for non-JSON format", () => {
      const response = "raw response";

      const result = apiBuilder.processApiResponse(
        response,
        null,
        "text/plain"
      );

      expect(result).toBe("raw response");
    });
  });
});
