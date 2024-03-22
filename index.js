const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/api/manipulacao-string', (req, res) => {
    
    const texto = req.body.texto;

    // Verifica se a propriedade 'texto' está presente no corpo da requisição  
    if (!req.body.hasOwnProperty('texto') || req.body.texto.trim() === '') {
        return res.status(400).json({ error: 'O texto não pode ser vazio ou indefinido.' });
    }

    // Remover acentos
    let textoLimpo = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Remover espaços e caracteres especiais
    textoLimpo = textoLimpo.replace(/[^\w\s]/gi, ''); 

    // Converter para minúsculas
    textoLimpo = textoLimpo.toLowerCase();

    // Remover espaços extras
    textoLimpo = textoLimpo.trim().replace(/\s+/g, '');

    // Verifica se o texto invertido é igual ao texto limpo
    const textoInvertido = textoLimpo.split('').reverse().join('');
    const palindromo_resulado = textoLimpo === textoInvertido;
    

    const contarOcorrencias = (str) => {
        const ocorrencias = {};
        for (let char of str) {
            if (ocorrencias[char]) {
                ocorrencias[char]++;
            } else {
                ocorrencias[char] = 1;
            }
        }
        return ocorrencias;
    };

    const palindromo = palindromo_resulado;
    const ocorrencias_caracteres = contarOcorrencias(textoLimpo);

    res.json({palindromo, ocorrencias_caracteres });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
