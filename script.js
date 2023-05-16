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

    cnt.appendChild( p );
    p.textContent = item + " ➜ " + value.eur + "; " + value.eur_24h_change;
    p.className = "currency";

    let spanMoeda = document.createElement('span');
    spanMoeda.setAttribute('class', 'moeda');
    spanMoeda.textContent = item; // nome da moeda
    p.appendChild( spanMoeda );

    //let spanValor = document.createElement('span');
    //spanValor.setAttribute('class', 'valor');
    //spanValor.textContent = item; // valor da moeda
    //p.appendChild( spanValor ); 

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

