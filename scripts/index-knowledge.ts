import "dotenv/config";

import { indexKnowledge } from "@/lib/chat/vector";

indexKnowledge()
  .then(({ indexed, removed }) => {
    console.log(`Indexed ${indexed} documents, removed ${removed} stale ones`);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
