const baseUrl = "https://neo-gym-backend.vercel.app/academia"

let cpfDoAluno = document.getElementById('cpf')

async function pegarCpf() {
    try {
        const cpf = await fetch(baseUrl)

        const cpfJson = await cpf.json()
        cpfDoAluno = cpfJson.cpfDoAluno
    }
    catch (error){
        console.log('Erro ao chamar a API:'+error)
    }
}

pegarCpf()