import { Client } from "@elastic/elasticsearch";
const esapi = new Client({
  node: "http://localhost:9200",
});

const IndexesList = [
  {
    index: "event",
    mapping: {
      properties: {
        title: {
          type: "text",
        },
        description: {
          type: "text",
        },
        location: {
          type: "text",
        },
        banner: {
          type: "keyword",
        },
        id: {
          type: "integer",
        },
      },
    },
  },
];

const resetIndex = async () => {
  for (const index of IndexesList) {
    try {
      await esapi.indices.delete({ index: index.index });
    } catch (error) {
      console.log(`${index.index} index not found`);
    }
  }
};

const createIndexMapping = async () => {
  for (const index of IndexesList) {
    await esapi.indices.create({
      index: index.index,
      mappings: index.mapping,
    });
    console.log(`Created mapping for ${index.index}`);
  }
};

await resetIndex();
await createIndexMapping();
