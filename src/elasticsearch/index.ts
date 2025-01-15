import { Client } from "@elastic/elasticsearch";

export const esapi = new Client({
  node: "http://127.0.0.1:9200",
});

export const Indexes = {
  EVENT: "event",
  CALL: "call",
} as const;

export type IndexTypes = (typeof Indexes)[keyof typeof Indexes];

export const IndexesList: IndexTypes[] = [Indexes.EVENT, Indexes.CALL];
