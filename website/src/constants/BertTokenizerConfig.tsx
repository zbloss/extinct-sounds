export default function BertTokenizerConfig () {
    return {
        cleanText: true,
        clsToken: "[CLS]",
        handleChineseChars: true,
        lowercase: true,
        maskToken: "[MASK]",
        padToken: "[PAD]",
        sepToken: "[SEP]",
        stripAccents: true,
        unkToken: "[UNK]",
        wordpiecesPrefix: "##",
    }
};