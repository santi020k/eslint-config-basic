import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line @tanstack/query/exhaustive-deps
useQuery({ queryKey: ["foo"], queryFn: () => {} });