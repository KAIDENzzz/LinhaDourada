// Nova versão segura do senha.js
async function gerarHash(texto) {
    const encoder = new TextEncoder();
    const data = encoder.encode(texto);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

async function validarSenha() {
    const senhaCorretaHash = "e3c9b89a77eabf7a6ad6b7d3c8f96b1d4b6e76e1fc47c5c76e27b8aabf1670f8"; // Hash da senha
    const senhaDigitada = [...Array(4).keys()].map(i => document.getElementById(`d${i + 1}`).value).join("");

    if (senhaDigitada.length === 4) {
        const senhaHash = await gerarHash(senhaDigitada);
        if (senhaHash === senhaCorretaHash) {
            window.location.href = "ProjetoLinhaDourdaIndex.html";
        } else {
            document.getElementById("mensagem").innerText = "Senha incorreta!";
        }
    }
}

function moverParaProximo(index) {
    const proximoCampo = document.getElementById(`d${index + 1}`);
    if (proximoCampo) {
        proximoCampo.disabled = false;
        proximoCampo.focus();
    } else {
        validarSenha();
    }
}

function moverParaAnterior(event, index) {
    if (event.key === "Backspace" && !document.getElementById(`d${index}`).value) {
        const campoAnterior = document.getElementById(`d${index - 1}`);
        if (campoAnterior) {
            campoAnterior.value = "";
            campoAnterior.focus();
        }
    }
}

function apenasNumeros(campo, index) {
    campo.value = campo.value.replace(/\D/g, '');
    if (campo.value !== "") {
        moverParaProximo(index);
    }
}
