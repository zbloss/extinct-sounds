import * as tf from '@tensorflow/tfjs';
// import { BertWordPieceTokenizer } from "tokenizers";


const LoadTokenizer = async () => {
    console.log("loading tokenizer");
    // const wordPieceTokenizer = await BertWordPieceTokenizer.fromOptions({ vocabFile: ".vocab.txt" });
    
}

const LoadModel = async () => {
    console.log("loading model");
    try {
        const model = await tf.loadGraphModel(
            'https://extinct-sounds.com/models/js/tf_model/model.json'
        );
        console.log("loaded model");
        
        const vocab = await fetch('https://extinct-sounds.com/models/vocab.txt')
        console.log("vocab:", vocab)
        return model;
    } catch(err) {
        console.error("unable to load model:", err)
    }    
}
export default LoadModel;