import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getEnv } from "./utils";

export const invoke= async()=>{
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 50, //每片大小（字符数）
        chunkOverlap: 2, //重叠大小（保证上下文连续）
    })
    const chunks = await splitter.splitText("向量嵌入技术能够将文本转换为高维数值向量，使计算机可以基于语义计算相似度。通过余弦相似度，我们能衡量两句话在含义上的接近程度，从而支撑语义检索、智能问答与推荐系统等应用场景。")
    console.log("chunks",chunks)
    //模型初始化
    const embedding = new OpenAIEmbeddings({
        model: getEnv("NANA_EMBEDDING_MODEL"),
        apiKey: getEnv("NANA_EMBEDDING_API_KEY"),
        configuration: {
            baseURL: getEnv("EMBEDDING_BASE_URL"),
        },
    })
  
    const vectors = await embedding.embedDocuments(chunks);
     // 余弦相似度函数
    const cosineSimilarity = (v1: number[], v2: number[]) => {
        const dotProduct = v1.reduce((acc, cur, index) => acc + cur * (v2[index] ?? 0), 0);
        const magnitude1 = Math.sqrt(v1.reduce((acc, cur) => acc + cur * cur, 0));
        const magnitude2 = Math.sqrt(v2.reduce((acc, cur) => acc + cur * cur, 0));
        return dotProduct / (magnitude1 * magnitude2)
    }
    const inputVector = await embedding.embedQuery("向量")
    const simirlarity =  cosineSimilarity(inputVector,vectors[1] || [])
    //全文检索
    const k = chunks[0]?.indexOf("向量")
    console.log(simirlarity,k)

}

