
window.addEventListener('DOMContentLoaded', function() {
  var dataInicioInput = document.getElementById('dataInicio');
  dataInicioInput.addEventListener('input', formatarData);
  
  var calcularBtn = document.getElementById('calcularBtn');
  calcularBtn.addEventListener('click', calcularMeses);
});

function formatarData() {
  var dataInicioInput = document.getElementById('dataInicio');
  var valor = dataInicioInput.value;
  
  if (valor.length === 2 && !valor.includes('/')) {
      valor += '/';
  }
  
  dataInicioInput.value = valor;
}

function calcularMeses() {
  var dataInicioInput = document.getElementById('dataInicio');
  var resultadoElement = document.getElementById('resultado');

  var dataInicio = dataInicioInput.value;
  var dataInicioParts = dataInicio.split('/');

  var mesInicio = parseInt(dataInicioParts[0]);
  var anoInicio = parseInt(dataInicioParts[1]);

  var dataAtual = new Date();
  var mesAtual = dataAtual.getMonth() + 1;

  var totalMeses = mesAtual - mesInicio + (dataAtual.getFullYear() - anoInicio) * 12;

  resultadoElement.textContent = 'O No. Total de Meses Autorizados é: ' + totalMeses;
}

window.addEventListener('DOMContentLoaded', function() {
  exibirHoraAtual();
  calcularHorasFaltantes();
  setInterval(exibirHoraAtual, 1000); // Atualizar a hora a cada segundo
  setInterval(calcularHorasFaltantes, 1000); // Recalcular as horas faltantes a cada segundo
});

function exibirHoraAtual() {
  var horaAtualElement = document.getElementById('horaAtual');
  var dataAtual = new Date();
  var horaAtual = formatarNumero(dataAtual.getHours());
  var minutoAtual = formatarNumero(dataAtual.getMinutes());
  var segundoAtual = formatarNumero(dataAtual.getSeconds());

  horaAtualElement.textContent = '⌚ ' + horaAtual + ':' + minutoAtual + ':' + segundoAtual;
}

function calcularHorasFaltantes() {
  var horasFaltantesElement = document.getElementById('horasFaltantes');
  var dataAtual = new Date();
  var horaAtual = dataAtual.getHours();

  var horasFaltantes13h = 0;
  if (horaAtual < 13) {
      horasFaltantes13h = 13 - horaAtual;
  } else if (horaAtual > 13) {
      horasFaltantes13h = 13 + (24 - horaAtual);
  }

  var horasFaltantes19h = 0;
  if (horaAtual < 19) {
      horasFaltantes19h = 19 - horaAtual;
  } else if (horaAtual > 19) {
      horasFaltantes19h = 19 + (24 - horaAtual);
  }

  horasFaltantesElement.textContent = '🕗 Faltam ' + horasFaltantes13h + 'h para 13:00  | 🕓 Faltam ' + horasFaltantes19h + 'h para 19:00. 💪 Força! ';
}

function formatarNumero(numero) {
  return numero.toString().padStart(2, '0');
}


document.getElementById('startDate').addEventListener('input', function(event) {
  var startDate = event.target.value;
  if (startDate.length === 2 || startDate.length === 5) {
      event.target.value = startDate + '/';
  }
});

document.getElementById('dateForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  var startDateString = document.getElementById('startDate').value;
  var startDateParts = startDateString.split('/');
  
  if (startDateParts.length === 3) {
      var day = parseInt(startDateParts[0]);
      var month = parseInt(startDateParts[1]);
      var year = parseInt(startDateParts[2]);
      
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          var startDate = new Date(year, month - 1, day);
          var endDate = new Date(year, month, 0);
          
          var daysOfWeek = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
          var eventDays = [];
          
          if (startDate.getDay() === 1 || startDate.getDay() === 3 || startDate.getDay() === 5) {
              while (startDate.getMonth() === endDate.getMonth()) {
                  if (startDate.getDay() === 1 || startDate.getDay() === 3 || startDate.getDay() === 5) {
                      eventDays.push(startDate.getDate());
                  }
                  startDate.setDate(startDate.getDate() + 1);
              }
          } else if (startDate.getDay() === 2 || startDate.getDay() === 4 || startDate.getDay() === 6) {
              while (startDate.getMonth() === endDate.getMonth()) {
                  if (startDate.getDay() === 2 || startDate.getDay() === 4 || startDate.getDay() === 6) {
                      eventDays.push(startDate.getDate());
                  }
                  startDate.setDate(startDate.getDate() + 1);
              }
          }
          
          var message = 'A quantidade de transfusões sanguíneias previstas para o mês  '   + month + '/' + year + ' é de '  + eventDays.length + '. \n \n Os dias em que ocorrem transfusão nesse mês são:  ' + eventDays.join(', ') + '\n \n Cheque se há funcionamento da clínica caso a data prevista de transfusão ocorra em um feriado ou dia não útil.'
          
          var resultElement = document.getElementById('result');
          resultElement.innerText = message;
      } else {
          alert('Formato de data inválido. Utilize o formato DD/MM/AAAA.');
      }
  } else {
      alert('Formato de data inválido. Utilize o formato DD/MM/AAAA.');
  }
});
 


