import fs from 'fs';

async function extraiLinks(texto) {
    const regex = /\[(.*?)\]\((https?:\/\/[^ \s]+)\)/gm;
    const capturas = texto.matchAll(regex);
    const resultado = [...capturas].map(captura => ({ [captura[1]]: captura[2] }));
    return resultado.length !== 0 ? resultado : 'Não há links!';
}

async function pegaArquivo(caminhoArquivo) {
    const encoding = 'utf-8';
    const texto = await fs.promises.readFile(caminhoArquivo, encoding);
    return extraiLinks(texto); // Aguarda a extração de links
}

export default pegaArquivo;