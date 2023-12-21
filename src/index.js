import chalk from 'chalk';
import fs from 'fs';

function trataErro(erro) {
    throw new Error(chalk.red((erro.code, 'não há arquivo no diretório')));
};


function extraiLinks(texto) {
    const regex = new RegExp(/\[(.*?)\]\((https?:\/\/[^ \s]+)\)/gm)
    const capturas = [...texto.matchAll(regex)]
    const resultado = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return resultado
}


async function pegaArquivo(caminhoArquivo) {
 
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoArquivo, encoding);
        console.log(extraiLinks(texto))

    } catch (erro) {
        trataErro(erro);
    }

}

export default pegaArquivo;