const baseUrl = "https://neo-gym-backend.vercel.app/academia"

let cpfDoAluno = document.getElementById('cpf')
async function buscarCpf() {
    const cpf = cpfDoAluno.value

    const cpfBusca = {
        cpf: cpf
    }
    if (!cpf){
        alert("Por favor, insira um CPF! 🙏")
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

        let cpfAluno = cpfJson.status
        console.log(cpfAluno)

        let resposta = ''
        if (cpfAluno == 'true') {
            resposta = "Liberado"
        }
        else {
            resposta = "Bloqueado"
        }

        console.log(resposta)
    } catch(erro) {
        alert(`ERRO! Erro ao buscar o aluno ${erro.message}`)
    }
}
