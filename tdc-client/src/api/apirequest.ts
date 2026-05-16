// api-client.ts (déjà existant, supposé configuré)
import api from "./client";

type HttpMethod = "get" | "post" | "put" | "delete";

/**
 * Generic API request handler.
 * @param url - endpoint (e.g., '/owners')
 * @param method - HTTP method ('get', 'post', 'put', 'delete')
 * @param paramsOrBody - query parameters (for GET) or request body (for POST/PUT)
 * @param defaultData - fallback value when request fails (default: null)
 * @returns Promise<{ success: boolean; data: T }>
 */
export async function apiRequest<T>(
  url: string,
  method: HttpMethod,
  paramsOrBody?: any,
  defaultData: T | undefined = undefined,
): Promise<{ success: boolean; data: T | undefined; error: string }> {
  try {
    let response;
    switch (method) {
      case "get":
        response = await api.get(url, { params: paramsOrBody });
        break;
      case "post":
        response = await api.post(url, paramsOrBody);
        break;
      case "put":
        response = await api.put(url, paramsOrBody);
        break;
      case "delete":
        response = await api.delete(url);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    // Adjust according to your API response structure.
    // Assuming the API returns { success: true, data: T } directly,
    // or just the data itself. Here we try to extract data.
    const responseData = response.data?.data ?? response.data;
    return { success: true, data: responseData as T, error: "Success" };
  } catch (error) {
    console.error(`Catch API call failed: ${method.toUpperCase()} ${url}`, error);
    // If defaultData is provided, use it; otherwise fallback to null.
    const fallback = defaultData !== undefined ? defaultData : (undefined as T);
    return {
      success: false,
      data: fallback as T,
      error: `Catch API call failed: ${method.toUpperCase()} ${url}`,
    };
  }
}
