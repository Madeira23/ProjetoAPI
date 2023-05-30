const apiKey = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Csolana%2Ctron%2Ctether%2CCardano%2Cethereum%2CDogeCoin%2CUniswap%2Clitecoin&vs_currencies=eur&include_24hr_change=true";

let xhr = new XMLHttpRequest();
xhr.open("GET", apiKey );
xhr.responseType = 'json';
xhr.onload = function() {
  const result = this.response;
  console.log(result);
  for(const item in result){
    const divContent = document.createElement('div');
    const value = result[`${item}`];
    const divMain = document.createElement('div');

    const logoDiv = document.createElement('div');
    logoDiv.className = 'coin-logo';
    const logoImg = document.createElement('img');
    logoImg.src = `images/${item}.png`;
    logoImg.style.width = '30px';
    logoImg.style.height = '30px';
    logoDiv.appendChild(logoImg);
    divMain.appendChild(logoDiv);
    
    // Criar elementos separados para cada parte do texto
    const currencyName = document.createElement('span');
    currencyName.textContent = item;
    currencyName.className = 'currency-name currency-coin';

    const separator = document.createElement('p');
    separator.textContent = "➜";
    separator.className = 'currency-name separator';

    const divValues = document.createElement('div');
    divValues.classList.add('div-values');
    
    const eurValue = document.createElement('span');
    eurValue.textContent = value.eur;
    eurValue.className = 'eur-value';
    
    const eurChange = document.createElement('span');
    eurChange.textContent = value.eur_24h_change;
    eurChange.className = 'eur-change';
    
    divValues.appendChild(eurValue);
    divValues.appendChild(eurChange);

    // Adicionar os elementos ao parágrafo
    divMain.appendChild(currencyName);
    divMain.appendChild(separator);
    divValues.appendChild(eurValue);
    divValues.appendChild(eurChange);

    // Adicionar o parágrafo ao elemento cnt
    divMain.appendChild(divValues);
    
    // Adicionar as classes aos elementos conforme necessário
    divMain.classList.add('currency');
    
    //let spanMoeda = document.createElement('span');
    //spanMoeda.setAttribute('class', 'moeda');
    //spanMoeda.textContent = item; // nome da moeda
    //p.appendChild(spanMoeda);
    
    if (value.eur_24h_change < 0) {
      divMain.classList.add("negative-change");
    } else if (value.eur_24h_change > 0) {
      divMain.classList.add("positive-change");
    }
    
    const inputInicial = document.createElement('input');
    inputInicial.type = 'number';
    inputInicial.valueMin = 1;
    inputInicial.value = 1;
    
    const inputConvertido = document.createElement('input');
    inputConvertido.type = 'text';
    inputConvertido.disabled = true;
    inputConvertido.value = value.eur + "€";
    
    inputInicial.addEventListener('change', ()=>{
      let v = parseInt(inputInicial.value);
      if (v < 1) inputInicial.value = 1;
      inputConvertido.value = inputInicial.value * value.eur + "€";
    });

    const inputDivs = document.createElement('div');
    
    inputDivs.appendChild(inputInicial);
    inputDivs.appendChild(inputConvertido);

    inputDivs.className = "div-inputs"

    divContent.appendChild(divMain);
    divContent.appendChild(inputDivs);

    divContent.className = "div-content"

    cnt.appendChild(divContent);

  }
};
xhr.send();

const cnt = document.querySelector('.container');
