export default async function fetchTypedData<T>(
  url: string,
  options: any,
): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new HTTPError(response.status, await response.text());
    }

    try {
      const data: T = await response.json();
      return data;
    } catch (jsonError) {
      if (jsonError instanceof Error) {
        throw new JSONParseError(jsonError);
      } else {
        throw jsonError;
      }
    }
  } catch (networkError) {
    if (networkError instanceof Error) {
      throw new FetchError(networkError, url);
    } else {
      throw networkError;
    }
  }
}

export class FetchError extends Error {
  public original: Error;
  public url: string;

  constructor(original: Error, url: string) {
    super(`Fetch failed. Message: ${original.message}. Url: ${url}`);
    this.original = original;
    this.url = url;
  }
}

export class HTTPError extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(
      `HTTP returned unexpected status code: ${status}. Message: ${message}`,
    );
    this.status = status;
    this.message = message;
  }
}

export class JSONParseError extends Error {
  public original: Error;

  constructor(original: Error) {
    super(`Failed to parse JSON. Message: ${original.message}`);
    this.original = original;
  }
}
