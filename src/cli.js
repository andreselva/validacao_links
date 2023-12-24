import fs from 'fs';
import pegaArquivo from './index.js';
import listaValidada from './http-validacao.js';

const caminho = process.argv;

async function imprimeResultado(valida = false, resultado) {

    if (valida == true) {
        console.log(await listaValidada(resultado))
    } else {
        console.log(await resultado);
    }
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    let valida = true;

    try {
        fs.lstatSync(caminho);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log('Arquivo ou diretório não existe.');
            return;
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(caminho);
        imprimeResultado(valida, resultado);

    } else if (fs.lstatSync(caminho).isDirectory()) {
        const leDiretorio = await fs.promises.readdir(caminho);

        leDiretorio.forEach(async (arquivos) => {
            const resultados = await pegaArquivo(`${caminho}/${arquivos}`);
            imprimeResultado(valida, resultados);
        })

    }
}

processaTexto(caminho);
export default imprimeResultado;
