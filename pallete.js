let btnModos = document.getElementById("btn-modos");
let TxtModo = document.getElementById('txt-btn-modos')

btnModos.addEventListener('click', Horario => {  
    {
        document.body.classList.toggle('dark-theme');
}});

if (document.body.classList.contains('dark-theme')){
    TxtModo.textContent = "Escuro"
}
else {
    TxtModo.textContent = "Claro"
}