
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { getEnv } from "./utils";
import { HumanMessage } from "@langchain/core/messages";



// const invoke = async (prompt: string) => {
//     const res = await llm.invoke(prompt)
//     console.log(res.content)
// }

// invoke("1+2");
export const invoke = async() => {
    //模型初始化
    const llm = new ChatOpenAI({
        model: getEnv("NANA_MODEL"),
        apiKey: getEnv("NANA_API_KEY"),
        temperature:0,
        configuration: {
            baseURL: getEnv("NANA_API_BASE_URL"),
        },
    })

    const stream = await llm.stream([new HumanMessage("写一首关于AI的诗")]);
    for await (const chunk of stream) {
        const content = Array.isArray(chunk.content) ?
            chunk.content.map(item => ("text" in item ? item.text : "")).join("")
            : chunk.content;
        if (content) {
            process.stdout.write(content)
        }
    }
}


