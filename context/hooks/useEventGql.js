import { useQuery, gql } from "@apollo/client";

const QUERY_FETCH = gql`
  query Events {
    events {
      id
      title
      created_at
      value
    }
  }
`;

export default function useEventGql() {
  const { data, loading, error, refetch } = useQuery(QUERY_FETCH);

  return {
    data,
    loading,
    error,
    refetch,
  };
}
