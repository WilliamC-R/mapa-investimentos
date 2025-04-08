document.getElementById("simulador-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const tipo = document.getElementById("tipo").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const taxa = parseFloat(document.getElementById("taxa").value);
  const prazo = parseFloat(document.getElementById("prazo").value);
  const aporte = parseFloat(document.getElementById("aporte").value);

  const meses = prazo * 12;
  const taxaMensal = Math.pow(1 + taxa / 100, 1 / 12) - 1;
  
  let montante = 0;

  if (tipo === "pre") {
    // Pré-fixado: fórmula básica de juros compostos
    montante = valor * Math.pow(1 + taxa / 100, prazo);
  }

  if (tipo === "pre" || tipo === "pos") {
    montante =
      valor * Math.pow(1 + taxaMensal, meses) +
      aporte * ((Math.pow(1 + taxaMensal, meses) - 1) / taxaMensal);
  }

  else if (tipo === "hibrido") {
    const ipcaExemplo = 5.5;
    const taxaTotal = ipcaExemplo + taxa;
    const taxaHibridaMensal = Math.pow(1 + taxaTotal / 100, 1 / 12) - 1;

    montante =
      valor * Math.pow(1 + taxaHibridaMensal, meses) +
      aporte * ((Math.pow(1 + taxaHibridaMensal, meses) - 1) / taxaHibridaMensal);
  }

  const investimentoTotal = valor + aporte * meses;
  const lucro = montante - investimentoTotal;

  // Exibir resultado
  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = `
    <strong>Resultado:</strong><br>
    Montante final: R$ ${montante.toLocaleString('pt-br')}<br>
    Lucro: R$ ${lucro.toLocaleString('pt-br')}
  `;
  resultadoDiv.style.display = "block";
});
