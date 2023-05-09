//função que seleciona os cartões
function selectCard(nome) {
    const opcoes = document.querySelectorAll('.radio-group .radio');
    opcoes.forEach(opcao => {
        if (opcao.getAttribute('name') === nome) {
            opcao.classList.add('selected');
            opcao.classList.remove('gray');
        } else {
            opcao.classList.remove('selected');
            opcao.classList.add('gray');
        }
    });
}
//máscara para o campo data de validade 
const expInput = document.getElementById('exp');

expInput.addEventListener('input', function () {
    let exp = this.value.replace(/\D/g, '');
    exp = exp.substring(0, 6);

    if (exp.length > 2) {
        exp = exp.substring(0, 2) + '/' + exp.substring(2);
    }

    this.value = exp;
});

//máscara para o campo número do cartão
const cnumInput = document.getElementById('cnum');

cnumInput.addEventListener('input', function() {
  let cnum = this.value.replace(/\D/g, '');
  cnum = cnum.substring(0, 16);

  if (cnum.length > 12) {
    cnum = cnum.substring(0, 4) + ' ' + cnum.substring(4, 8) + ' ' + cnum.substring(8, 12) + ' ' + cnum.substring(12);
  } else if (cnum.length > 8) {
    cnum = cnum.substring(0, 4) + ' ' + cnum.substring(4, 8) + ' ' + cnum.substring(8);
  } else if (cnum.length > 4) {
    cnum = cnum.substring(0, 4) + ' ' + cnum.substring(4);
  }

  this.value = cnum;
});