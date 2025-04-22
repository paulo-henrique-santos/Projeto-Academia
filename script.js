const baseUrl = "https://neo-gym-backend.vercel.app/academia"

let cpfDoAluno = document.getElementById('cpf')
let divStatus = document.querySelector('#status')
const maxLength = 11

divStatus.style.display = 'none'

function updatePlaceholder(){
    if (cpfDoAluno.textContent.length === 0) {
        cpfDoAluno.classList.add('vazio')
    }else {
        cpfDoAluno.classList.remove('vazio')
    }
}

function insert(valor) {
    if (cpfDoAluno.textContent.length < maxLength){
        cpfDoAluno.textContent += valor
        updatePlaceholder()
    } else {
        console.log('limite de caracteres atingido!')
    }
}

function back() {
    
    let resultado = document.getElementById('cpf').innerHTML
    document.getElementById('cpf').innerHTML = resultado.substring(0, resultado.length -1)
        
    
}

async function buscarCpf() {
    divStatus.style.display = 'flex'
    let cpfDoAluno = document.getElementById('cpf').innerHTML

    const cpf = cpfDoAluno
    const cpfBusca = {
        cpf: cpf
    }
    if (!cpf){
        alert("Por favor, insira um CPF! 🙏")
        divStatus.style.display = 'none'
        return
    }
    try{
        
        const respostaHttp = await fetch(`${baseUrl}/consulta`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cpfBusca)
        })
        const cpfJson = await respostaHttp.json()
        console.log(cpfJson.aluno.status)
        let cpfStatus = cpfJson.aluno.status
        console.log('o status do aluno é',+ cpfStatus)

        let resposta = ''
        let corFundo = ''
        let corFonte = ''

        if (cpfStatus == 'true' || cpfStatus == true) {
            resposta = '✅Liberado✅'
            corFundo = 'bg-green-500/80'
            corFonte = 'text-white'
        }
        else {
            resposta = '⛔Bloqueado⛔'
            corFundo = 'bg-red-600/80'
            corFonte = 'text-white'
        }

        console.log(resposta)
        let elementoDiv = document.createElement('div')
        elementoDiv.classList.add(corFundo, corFonte,'flex-col', 'border', 'border-gray-300', 'p-2', 'mb-3', 'rounded', 'flex', 'justify-center','items-center', 'w-full', 'h-full')
        elementoDiv.innerHTML = `<p class='text-8xl mb-6' >${cpfJson.aluno.nome}</p> <p class='text-8xl'>${resposta}</p> `

        divStatus.appendChild(elementoDiv)

        setTimeout(() =>{
            window.location.reload()
        }, 1500)
    } catch(erro) {
        alert(`ERRO! Erro ao buscar o aluno ${erro.message}`)
        divStatus.style.display = 'none'
    }


}

updatePlaceholder()
