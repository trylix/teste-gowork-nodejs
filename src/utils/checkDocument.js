function validCpf(document) {
  const cpf = document.replace(/\D+/g, '');

  if (cpf.length !== 11) {
    return false;
  }

  if (cpf.match(/(\d)\1{10}/)) {
    return false;
  }

  return true;
}

function validCnpj(document) {
  const cnpj = document.replace(/\D+/g, '');

  if (cnpj.length !== 14) {
    return false;
  }

  if (cnpj.match(/(\d)\1{10}/)) {
    return false;
  }

  return true;
}

export { validCnpj, validCpf };
