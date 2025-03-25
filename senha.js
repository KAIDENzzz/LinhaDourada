const senhaCorreta = "0501";

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

function validarSenha() {
    const senha = [...Array(4).keys()].map(i => document.getElementById(`d${i + 1}`).value).join("");

    if (senha.length === 4) {
        if (senha === senhaCorreta) {
            window.location.href = "ProjetoLinhaDourdaIndex.html";
        } else {
            document.getElementById("mensagem").innerText = "Senha incorreta!";
        }
    }
}
