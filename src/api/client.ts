export interface MockNetworkConfig {
  latencyMs: number;
  shouldFail: boolean;
}

export const mockNetwork: MockNetworkConfig = {
  latencyMs: 700,
  shouldFail: false,
};

export function mockRequest<T>(
  data: T,
  options?: Partial<MockNetworkConfig>,
): Promise<T> {
  const latency = options?.latencyMs ?? mockNetwork.latencyMs;
  const shouldFail = options?.shouldFail ?? mockNetwork.shouldFail;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Mock network request failed'));
        return;
      }

      resolve(data);
    }, latency);
  });
}
