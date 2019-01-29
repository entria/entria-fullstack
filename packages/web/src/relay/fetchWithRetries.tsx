import ExecutionEnvironment from './ExecuteEnvironment';

export type InitWithRetries = {
  body?: unknown,
  cache?: string | null,
  credentials?: string | null,
  fetchTimeout?: number | null,
  headers?: unknown,
  method?: string | null,
  mode?: string | null,
  retryDelays?: Array<number> | null,
};

const DEFAULT_TIMEOUT = 15000;
const DEFAULT_RETRIES = [1000, 3000];

/**
 * Makes a POST request to the server with the given data as the payload.
 * Automatic retries are done based on the values in `retryDelays`.
 */
function fetchWithRetries(uri: string, initWithRetries?: InitWithRetries | null): Promise<any> {
  const { fetchTimeout, retryDelays, ...init } = initWithRetries || {};
  const _fetchTimeout = fetchTimeout != null ? fetchTimeout : DEFAULT_TIMEOUT;
  const _retryDelays = retryDelays != null ? retryDelays : DEFAULT_RETRIES;

  let requestsAttempted = 0;
  let requestStartTime = 0;
  return new Promise((resolve, reject) => {
    /**
     * Sends a request to the server that will timeout after `fetchTimeout`.
     * If the request fails or times out a new request might be scheduled.
     */
    function sendTimedRequest(): void {
      requestsAttempted++;
      requestStartTime = Date.now();
      let isRequestAlive = true;
      const request = fetch(uri, init);
      const requestTimeout = setTimeout(() => {
        isRequestAlive = false;
        if (shouldRetry(requestsAttempted)) {
          // eslint-disable-next-line
          console.log(false, 'fetchWithRetries: HTTP timeout, retrying.');
          retryRequest();
        } else {
          reject(
            new Error(`fetchWithRetries(): Failed to get response from server, tried ${requestsAttempted} times.`),
          );
        }
      }, _fetchTimeout);

      request
        .then(response => {
          clearTimeout(requestTimeout);
          if (isRequestAlive) {
            // We got a response, we can clear the timeout.
            if (response.status >= 200 && response.status < 300) {
              // Got a response code that indicates success, resolve the promise.
              resolve(response);
            } else if (response.status === 401) {
              resolve(response);
            } else if (shouldRetry(requestsAttempted)) {
              // Fetch was not successful, retrying.
              // TODO(#7595849): Only retry on transient HTTP errors.
              // eslint-disable-next-line
              console.log(false, 'fetchWithRetries: HTTP error, retrying.'), retryRequest();
            } else {
              // Request was not successful, giving up.
              const error: any = new Error(
                `fetchWithRetries(): Still no successful response after ${requestsAttempted} retries, giving up.`,
              );
              error.response = response;
              reject(error);
            }
          }
        })
        .catch(error => {
          clearTimeout(requestTimeout);
          if (shouldRetry(requestsAttempted)) {
            retryRequest();
          } else {
            reject(error);
          }
        });
    }

    /**
     * Schedules another run of sendTimedRequest based on how much time has
     * passed between the time the last request was sent and now.
     */
    function retryRequest(): void {
      const retryDelay = _retryDelays[requestsAttempted - 1];
      const retryStartTime = requestStartTime + retryDelay;
      // Schedule retry for a configured duration after last request started.
      setTimeout(sendTimedRequest, retryStartTime - Date.now());
    }

    /**
     * Checks if another attempt should be done to send a request to the server.
     */
    function shouldRetry(attempt: number): boolean {
      return ExecutionEnvironment.canUseDOM && attempt <= _retryDelays.length;
    }

    sendTimedRequest();
  });
}

export default fetchWithRetries;
