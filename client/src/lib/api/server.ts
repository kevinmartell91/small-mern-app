interface Body<TVariables> {
  query: string;
  variables?: TVariables;
}

interface Error {
  message: string;
}

export const server = {
  fetch: async <TData = any, TVariables = any>(body: Body<TVariables>) => {
    const res = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error('Failed to fetch from server.');
    }
    // return <Promise<{ data: TData }>>res.json(); // angle brackets to type assert res.json()
    return res.json() as Promise<{ data: TData; errors: Error[] }>; // (as) to type assert res.json()
  },
};
