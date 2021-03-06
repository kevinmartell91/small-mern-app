import { useCallback, useEffect, useReducer } from 'react';
import { server } from './server';

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

type Action<TData> =
  | { type: 'FETCH' }
  | { type: 'FETCH_SUCCESS'; payload: TData }
  | { type: 'FETCH_ERROR' };
interface QueryResult<TData> extends State<TData> {
  refetch: () => void;
}

const reducer =
  <TData>() =>
  (state: State<TData>, action: Action<TData>) => {
    switch (action.type) {
      case 'FETCH':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: false,
        };
      case 'FETCH_ERROR':
        return {
          ...state,
          loading: false,
          error: true,
        };

      default:
        throw new Error();
    }
  };

export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
  const fetchReducer = reducer<TData>();

  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false,
  });

  // const [state, setState] = useState<State<TData>>({
  //   data: null,
  //   loading: false,
  //   error: false,
  // });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      try {
        // setState({
        //   data: null,
        //   loading: true,
        //   error: false,
        // });
        dispatch({ type: 'FETCH' });
        const { data, errors } = await server.fetch<TData>({
          query,
        });

        if (errors && errors.length) {
          throw new Error();
        }
        dispatch({ type: 'FETCH_SUCCESS', payload: data });

        // setState({ data, loading: false, error: false });
      } catch (error) {
        // setState({
        //   data: null,
        //   loading: false,
        //   error: true,
        // });
        dispatch({ type: 'FETCH_ERROR' });
      }
    };
    fetchApi();
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
};
