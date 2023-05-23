const apiKey = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Csolana%2Ctron%2Ctether%2Cethereum%2Clitecoin&vs_currencies=eur&include_24hr_change=true";

let xhr = new XMLHttpRequest();
xhr.open("GET", apiKey );
xhr.responseType = 'json';
xhr.onload = function() {
  const result = this.response;
  console.log(result);
  for(const item in result){
    const value = result[`${item}`];
    const p = document.createElement('p');

    // Criar elementos separados para cada parte do texto
    const currencyName = document.createElement('span');
    currencyName.textContent = item + " ➜    ";
    currencyName.className = 'currency-name';

    const eurValue = document.createElement('span');
    eurValue.textContent = value.eur;
    eurValue.className = 'eur-value';

    const eurChange = document.createElement('span');
    eurChange.textContent = value.eur_24h_change;
    eurChange.className = 'eur-change';

    // Adicionar os elementos ao parágrafo
    p.appendChild(currencyName);
    p.appendChild(eurValue);
    p.appendChild(eurChange);

    // Adicionar o parágrafo ao elemento cnt
    cnt.appendChild(p);

    // Adicionar as classes aos elementos conforme necessário
    p.classList.add('currency');

    //let spanMoeda = document.createElement('span');
    //spanMoeda.setAttribute('class', 'moeda');
    //spanMoeda.textContent = item; // nome da moeda
    //p.appendChild(spanMoeda);

    const logoDiv = document.createElement('div');
    logoDiv.className = 'coin-logo';
    const logoImg = document.createElement('img');
    logoImg.src = `images/${item}.png`;
    logoImg.style.width = '25px';
    logoImg.style.height = '25px';
    logoDiv.appendChild(logoImg);
    p.appendChild(logoDiv);

    

    if (value.eur_24h_change < 0) {
      p.classList.add("negative-change");
    } else if (value.eur_24h_change > 0) {
      p.classList.add("positive-change");
    }
  }
};
xhr.send();

const cnt = document.querySelector('.container');
