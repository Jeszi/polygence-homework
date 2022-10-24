const BASE_URL = "http://localhost:5000";

interface Options {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
}

async function req<T>(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any
): Promise<T> {
  try {
    const options: Options = {
      method,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const result = await fetch(`${BASE_URL + path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    return result.json();
  } catch (e: any) {
    return e;
  }
}

const get = <T>(path: string): Promise<T> => req<T>(path, "GET");
const post = <T>(path: string, data: any): Promise<T> =>
  req<T>(path, "POST", data);

export const request = {
  get,
  post,
};
