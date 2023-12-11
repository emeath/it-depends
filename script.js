const apiUrl_template = 'https://api.memegen.link/templates'
const apiUrl_images = 'https://api.memegen.link/images'



const remover_imagem_anterior_html = () => {
    const meme = document.getElementById('meme')
    meme.setAttribute('src', '')
}

const colocar_imagem_no_html = (meme_url) => {
    const meme = document.getElementById('meme')
    meme.setAttribute('src', meme_url)

    const img = document.querySelector('img');
    img.style.transform = 'scale(1)'; // Inicia a imagem com escala total

    document.querySelector('.img_meme').classList.add('mostrar');
}



const criar_meme = (template_meme_id) => {

    const upperText = ''
    const bottomText = 'DEPENDE'
    const postData = {
        template_id: template_meme_id,
        text: [upperText, bottomText]
    };

    // Configuração da requisição
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Especifique o tipo de conteúdo que está sendo enviado
        },
        body: JSON.stringify(postData), // Converte o objeto para JSON e o envia no corpo da requisição
    };


    // Realiza a requisição POST usando a Fetch API
    fetch(apiUrl_images, requestOptions)
        .then(response => {
            // Verifica se a requisição foi bem-sucedida (código de status 2xx)
            if (!response.ok) {
                throw new Error('Erro na requisição!');
            }

            // Converte a resposta para o formato JSON (se necessário)
            return response.json();
        })
        .then(data => {
            // Manipula os dados recebidos após a requisição bem-sucedida
            colocar_imagem_no_html(data.url)
        })
        .catch(error => {
            // Trata erros durante a requisição
            console.error('Erro:', error);
        });

}

const showLoading = () => {
    const meme = document.getElementById('meme')
    meme.setAttribute('src', 'loading.png')
}

const gerar_template_para_meme = () => {



    remover_imagem_anterior_html()

    showLoading()

    // Configuração da requisição
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Especifique o tipo de conteúdo que está sendo enviado
        }
    };


    // Realiza a requisição GET usando a Fetch API
    fetch(apiUrl_template, requestOptions)
        .then(response => {
            // Verifica se a requisição foi bem-sucedida (código de status 2xx)
            if (!response.ok) {
                throw new Error('Erro na requisição!');
            }

            // Converte a resposta para o formato JSON (se necessário)
            return response.json();
        })
        .then(data => {
            // Manipula os dados recebidos após a requisição bem-sucedida
            // Gera um número inteiro aleatório entre 0 e 200
            const numeroAleatorio = Math.floor(Math.random() * 201);
            criar_meme(data[numeroAleatorio].id)
        })
        .catch(error => {
            // Trata erros durante a requisição
            console.error('Erro:', error);
        });

}



runButton = document.getElementById('run')
runButton.addEventListener("click", gerar_template_para_meme);
