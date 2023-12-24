function extraiLinks(arrayLinks) {
    return arrayLinks.map((objetoLink) => Object.values(objetoLink).join());
}


async function checaStatus(listaURLs) {

    const arrStatus = await Promise.all(listaURLs.map(async (url) => {

        try {
            const response = await fetch(url);
            return response.status;
        } catch (erro) {
            return trataErros(erro)
        }

    }))
    return arrStatus
}

function trataErros(erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'ERRO! Link não encontrado!'
    } else {
        return 'Ocorreu um problema.'
    }
}


export default async function listaValidada(listaDeLinks) {
    const links = await extraiLinks(listaDeLinks);
    const status = await checaStatus(links);
    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }))
}