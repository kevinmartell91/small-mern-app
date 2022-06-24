interface Body<TVariables> {
  query: string;
  variables?: TVariables;
}

export const server = {
  fetch: async <TData = any, TVariables = any>(body: Body<TVariables>) => {
    const res = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    // return <Promise<{ data: TData }>>res.json(); // angle brackets to type assert res.json()
    return res.json() as Promise<{ data: TData }>; // (as) to type assert res.json()
  },
};
