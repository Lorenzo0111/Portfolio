import useSWR from "swr/immutable";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const useFetcher = (url: string | null) => useSWR(url, fetcher);
