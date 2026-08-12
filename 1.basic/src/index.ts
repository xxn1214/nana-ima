import "dotenv/config";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
// import { HumanMessage } from "@langchain/core/messages";

const getEnv = (key: string) => {
    return process.env[key] || "";
}

// const invoke = async (prompt: string) => {
//     const res = await llm.invoke(prompt)
//     console.log(res.content)
// }

// invoke("1+2");
// const invoke = async() => {
//     //模型初始化
//     const llm = new ChatOpenAI({
//         model: getEnv("NANA_MODEL"),
//         apiKey: getEnv("NANA_API_KEY"),
//         configuration: {
//             baseURL: getEnv("NANA_API_BASE_URL"),
//         },
//     })

//     const stream = await llm.stream([new HumanMessage("写一首关于AI的诗")]);
//     for await (const chunk of stream) {
//         const content = Array.isArray(chunk.content) ?
//             chunk.content.map(item => ("text" in item ? item.text : "")).join("")
//             : chunk.content;
//         if (content) {
//             process.stdout.write(content)
//         }
//     }
// }

const invoke = async () => {

    //模型初始化
    const embedding = new OpenAIEmbeddings({
        model: getEnv("NANA_EMBEDDING_MODEL"),
        apiKey: getEnv("NANA_EMBEDDING_API_KEY"),
        configuration: {
            baseURL: getEnv("EMBEDDING_BASE_URL"),
        },
    })
    const vector1 = await embedding.embedQuery("李子")
    const vector2 = await embedding.embedQuery("杏子")
    const vectors = await embedding.embedDocuments(["苹果", "李子"])
    // console.log("向量：", vectors)

    // 余弦相似度函数
    const cosineSimilarity = (v1: number[], v2: number[]) => {
        const dotProduct = v1.reduce((acc, cur, index) => acc + cur * (v2[index] ?? 0), 0);
        const magnitude1 = Math.sqrt(v1.reduce((acc, cur) => acc + cur * cur, 0));
        const magnitude2 = Math.sqrt(v2.reduce((acc, cur) => acc + cur * cur, 0));
        return dotProduct / (magnitude1 * magnitude2)
    }

    const simirlarity =  cosineSimilarity(vector1,vector2)
    console.log(simirlarity)
}

invoke();