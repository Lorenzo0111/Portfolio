import { Index } from "@upstash/vector";
import {
  buildKnowledgeDocs,
  type KnowledgeDoc,
  type KnowledgeType,
} from "./knowledge";

type Metadata = Pick<KnowledgeDoc, "type" | "title" | "url">;

let index: Index<Metadata> | null = null;

/**
 * Upstash Vector index. It must be created with a built-in embedding model
 * so we can upsert and query raw text.
 */
function getIndex() {
  if (
    !process.env.VECTOR_UPSTASH_VECTOR_REST_URL ||
    !process.env.VECTOR_UPSTASH_VECTOR_REST_TOKEN
  )
    return null;

  index ??= Index.fromEnv({
    UPSTASH_VECTOR_REST_URL: process.env.VECTOR_UPSTASH_VECTOR_REST_URL,
    UPSTASH_VECTOR_REST_TOKEN: process.env.VECTOR_UPSTASH_VECTOR_REST_TOKEN,
  }) as Index<Metadata>;
  return index;
}

export async function semanticSearch(
  query: string,
  { topK = 6, type }: { topK?: number; type?: KnowledgeType } = {},
) {
  const index = getIndex();
  if (!index) return null;

  const results = await index.query({
    data: query,
    topK,
    includeData: true,
    includeMetadata: true,
    filter: type ? `type = '${type}'` : undefined,
  });

  return results
    .filter((result) => result.score >= 0.5)
    .map((result) => ({
      title: result.metadata?.title,
      type: result.metadata?.type,
      url: result.metadata?.url,
      relevance: Math.round(result.score * 100) / 100,
      content: result.data,
    }));
}

/**
 * Re-embeds the whole portfolio and removes documents that no longer exist.
 */
export async function indexKnowledge() {
  const index = getIndex();
  if (!index) throw new Error("Upstash Vector is not configured");

  const docs = await buildKnowledgeDocs();

  for (let i = 0; i < docs.length; i += 100) {
    await index.upsert(
      docs.slice(i, i + 100).map((doc) => ({
        id: doc.id,
        data: `${doc.title}\n${doc.text}`,
        metadata: { type: doc.type, title: doc.title, url: doc.url },
      })),
    );
  }

  const ids = new Set(docs.map((doc) => doc.id));
  const stale: string[] = [];
  let cursor: string | number = 0;
  do {
    const page: Awaited<ReturnType<typeof index.range>> = await index.range({
      cursor,
      limit: 1000,
    });
    for (const vector of page.vectors)
      if (!ids.has(String(vector.id))) stale.push(String(vector.id));
    cursor = page.nextCursor;
  } while (cursor && cursor !== "0");

  if (stale.length > 0) await index.delete(stale);

  return { indexed: docs.length, removed: stale.length };
}
