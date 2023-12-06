const minha = () => { 
    const img = document.querySelector('img');
    img.style.transform = 'scale(1.5)'; // Inicia a imagem com escala total
}

runButton = document.getElementById('run')
runButton.addEventListener("click", minha);