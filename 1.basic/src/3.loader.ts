import { CSVLoader } from "@langchain/community/document_loaders/fs/csv"
import { load } from "@langchain/community/load";
import { OpenAIEmbeddings } from "@langchain/openai"
import path from "node:path"
import { getEnv } from "./utils";
const input = {
    filePath: path.resolve(__dirname, "../assets/Sheet_20260622.csv")
}
const loader = new CSVLoader(input.filePath);
export const invoke = async () => {
    const loader = new CSVLoader(input.filePath);
    const document = await loader.load();
    console.log("document", document)
    console.log("长度", document.length)


//模型初始化
    const embedding = new OpenAIEmbeddings({
        model: getEnv("NANA_EMBEDDING_MODEL"),
        apiKey: getEnv("NANA_EMBEDDING_API_KEY"),
        configuration: {
            baseURL: getEnv("EMBEDDING_BASE_URL"),
        },
    })
  
    const vectors = await embedding.embedDocuments(document.map(d => d.pageContent));
    // console.log("向量：", vectors)

    // 余弦相似度函数
    const cosineSimilarity = (v1: number[], v2: number[]) => {
        const dotProduct = v1.reduce((acc, cur, index) => acc + cur * (v2[index] ?? 0), 0);
        const magnitude1 = Math.sqrt(v1.reduce((acc, cur) => acc + cur * cur, 0));
        const magnitude2 = Math.sqrt(v2.reduce((acc, cur) => acc + cur * cur, 0));
        return dotProduct / (magnitude1 * magnitude2)
    }

    const simirlarity =  cosineSimilarity(vectors[1] || [],vectors[2] || [])
    console.log(simirlarity)
    };