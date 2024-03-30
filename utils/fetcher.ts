import { SWRConfiguration } from "swr";
import useSWR from "swr/immutable";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const useFetcher = <T = any>(url: string | null, options?: SWRConfiguration) =>
  useSWR<T>(url, fetcher, options);
