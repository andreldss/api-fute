let idTimeSelecionado = 0;

const insereTimes = async () => {
    try {
        const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/teams/?league=72&season=2023&', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '368d7d64e7mshe3ff74c8b62bd3ep1a1695jsn51114961df92',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        });
        const data = await response.json();
        const times = data.response;
        console.log(data)
        const timesDropdown = document.querySelector('.dropdown-menu');
        timesDropdown.innerHTML = '';

        times.forEach(time => {
            const li = document.createElement('li');
            li.classList.add('dropdown-item');
            li.style.cursor = "pointer";
            
            li.addEventListener('click', function() {
                const botaoDropdown = document.querySelector('.dropdown-toggle');
                botaoDropdown.textContent = time.team.name;
                idTimeSelecionado = time.team.id;
            });
           
            li.textContent = time.team.name;
            timesDropdown.appendChild(li);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

const buscar = async (tipo) => {
    try {
        const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?season=2023&league=72&team=${idTimeSelecionado}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '368d7d64e7mshe3ff74c8b62bd3ep1a1695jsn51114961df92',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        });
        
        const data = await response.json();
        const jogos = data.response;
        const resultados = document.getElementById('resultados');
        jogos.reverse();
        resultados.innerHTML = '';

        const maxJogosExibidos = 38;
        const maxJogosExibidosInicio = 5;
        let jogosExibidos = 0;

        jogos.forEach(jogo => {
            let placarTexto

            if (jogosExibidos >= maxJogosExibidosInicio) {
                return;
            }

            if (jogo.fixture.status.long === "Not Started") {
                let dataJogo = jogo.fixture.date
                dataJogo = new Date
                const options = { day: '2-digit', month: '2-digit', year: 'numeric'}
                const dataFormatada = dataJogo.toLocaleDateString('pt-BR', options)
                placarTexto = "("+dataFormatada+")"
            } else {
                placarTexto = jogo.score.fulltime.home + " X " + jogo.score.fulltime.away;
            }
            

            const divJogo = document.createElement('div');
            divJogo.style.marginBottom = "10px"
            divJogo.className = "border border-light rounded"

            const imagemTimeCasa = document.createElement('img');
            imagemTimeCasa.src = jogo.teams.home.logo 
            imagemTimeCasa.className = "img-fluid"
            imagemTimeCasa.style.width = "70px"

            const placar = document.createElement('div');
            placar.textContent = jogo.teams.home.name+" "+placarTexto+" "+jogo.teams.away.name
            placar.className = "badge bg-primary text-wrap"
            placar.style.lineHeight = "15px"
            placar.style.width = "9rem"

            const imagemTimeFora = document.createElement('img');
            imagemTimeFora.src = jogo.teams.away.logo 
            imagemTimeFora.className = "img-fluid"
            imagemTimeFora.style.width = "70px"

            divJogo.appendChild(imagemTimeCasa);
            divJogo.appendChild(placar);
            divJogo.appendChild(imagemTimeFora);
            resultados.appendChild(divJogo);

            jogosExibidos++;

            verMais.style.margin = "20px"
            verMais.className = "btn btn-primary btn-lg"
            verMais.style.display = 'inline';
        })
        
        if (jogosExibidos < jogos.length) {
            if (tipo == 'verMais') {
                const proximosJogos = jogos.slice(jogosExibidos, jogosExibidos + maxJogosExibidos);
                proximosJogos.forEach(jogo => {
                    let placarTexto;
                    if (jogo.fixture.status.long === "Not Started") {
                        let dataJogo = jogo.fixture.date
                        dataJogo = new Date
                        const options = { day: '2-digit', month: '2-digit', year: 'numeric'}
                        const dataFormatada = dataJogo.toLocaleDateString('pt-BR', options)
                        placarTexto = "("+dataFormatada+")"
                    } else {
                        placarTexto = jogo.score.fulltime.home + " X " + jogo.score.fulltime.away;
                    }

                    const divJogo = document.createElement('div');
                    divJogo.style.marginBottom = "10px"
                    divJogo.className = "border border-light rounded"
        
                    const imagemTimeCasa = document.createElement('img');
                    imagemTimeCasa.src = jogo.teams.home.logo 
                    imagemTimeCasa.className = "img-fluid"
                    imagemTimeCasa.style.width = "70px"
        
                    const placar = document.createElement('div');
                    placar.textContent = jogo.teams.home.name+" "+placarTexto+" "+jogo.teams.away.name
                    placar.className = "badge bg-primary text-wrap"
                    placar.style.lineHeight = "15px"
                    placar.style.margin = "15px"
                    placar.style.width = "9rem"
        
                    const imagemTimeFora = document.createElement('img');
                    imagemTimeFora.src = jogo.teams.away.logo 
                    imagemTimeFora.className = "img-fluid"
                    imagemTimeFora.style.width = "70px"
        
                    divJogo.appendChild(imagemTimeCasa);
                    divJogo.appendChild(placar);
                    divJogo.appendChild(imagemTimeFora);
                    resultados.appendChild(divJogo);
                    jogosExibidos++;

                    if (jogosExibidos >= jogos.length) {
                        const verMais = document.getElementById('verMais');
                        verMais.style.display = 'none';
                    }
                });
            }
        }        
    } catch (error) {
        console.error('Erro:', error);
    }
}

const insereEstatisticas = async () => {
    try{
        const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?season=2023&league=72&team=${idTimeSelecionado}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '368d7d64e7mshe3ff74c8b62bd3ep1a1695jsn51114961df92',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        });
        
        const data = await response.json();
    } catch(error){
        console.error('Erro:', error);
    }
}