import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const dictPath = path.join(process.cwd(), "dictionary.json");
  try {
    const raw = await fs.readFile(dictPath, "utf8");
    const words = JSON.parse(raw);
    return Response.json(words);
  } catch {
    return Response.json({ error: "Dictionary not found" }, { status: 404 });
  }
}