import { CSVLoader } from "@langchain/community/document_loaders/fs/csv"
import { load } from "@langchain/community/load";
import path from "node:path"
const input = {
    filePath: path.resolve(__dirname, "../assets/Sheet_20260622.csv")
}
const loader = new CSVLoader(input.filePath);
export const invoke = async () => {
    const loader = new CSVLoader(input.filePath);
    const document = await loader.load();
    console.log("document", document)
    console.log("长度", document.length)
}

