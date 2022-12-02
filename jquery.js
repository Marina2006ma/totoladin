async function carregarDados() {
  
  const divErro = document.getElementById('div-erro');
  divErro.style.display = 'none';

  
  await fetch('https://covid19-brazil-api.now.sh/api/report/v1')     
      .then(response => response.json())                    
      .then(dados => prepararDados(dados))                 
      .catch(e => exibirErro(e.message));                  
}

function exibirErro(mensagem) {
  const divErro = document.getElementById('div-erro');
  divErro.style.display = 'block';
  divErro.innerHTML = '<b>Erro ao acessar a API</b><br />' + mensagem;
}


function prepararDados(dados) {
  if (dados != null) {
      
      let linhas = document.getElementById('linhas');
      linhas.innerHTML = '';

      for (let i=0; i<dados['data'].length; i++) {
          let auxLinha = '';

          if (i%2 != 0)
              auxLinha = '<tr class="listra">';
          else
              auxLinha = '<tr>';

          auxLinha = auxLinha +   '<td>'+ dados['data'][i].uf + '</td>'+
          '<td>'+ dados['data'][i].state + '</td>'+
          '<td>'+ dados['data'][i].cases + '</td>'+
          '<td>'+ dados['data'][i].deaths + '</td>'+
          '<td>'+ dados['data'][i].suspects + '</td>'+
          '<td>'+ dados['data'][i].refuses + '</td>'+
          '</tr>',
           
          linhas.innerHTML = linhas.innerHTML + auxLinha;            
      }
  }
}

document.addEventListener("DOMContentLoaded",
                          function(event){
                            CarregarDados();
                          });


google.charts.load('current', {
'packages': ['geochart'],
});
google.charts.setOnLoadCallback(drawRegionMap);
                        
                        
async function drawRegionMap(){
  var json = await obter_inf();
  var data = google.visualization.arrayToDataTable(json);
                        
  var options = {};
                        
  var place = document.getElementById('mapinha');
                        
var chart = new google.visualization.GeoChart(place);
                        
chart.draw(data, options);}                        

async function obter_inf(){
  var inf= await fetch('https://covid19-brazil-api.vercel.app/api/report/v1/countries')
  var data= await inf.json();
                        
  console.log(data);
                        
  var response = [];
  response.push(['Países ','positivo ', 'Mortos ']);
                        
  for(let i=0;i<data.data.length;i++){
    response.push(
    [
     data.data[i].country,
     data.data[i].confirmed,
     data.data[i].deaths
    ]
    );
                         
    }
    console.log(response);
    return response;
                        
    }

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    
    async function drawChart(){
        var json= await pie();
        var data = google.visualization.arrayToDataTable(json);
    
        var options = {};
        var chart = new google.visualization.PieChart(document.getElementById('pizza'));
        chart.draw(data,options);
    }
    
    async function pie(){
        var inf= await fetch('https://covid19-brazil-api.now.sh/api/report/v1/countries');
        var data = await inf.json();
        console.log(data);
        var response=[];
        var deaths=0;
        var confirmed=0;
        var recovered=0;
    
        for(let i=0;i<data.data.length; i++){
            deaths += data.data[i].deaths,
            confirmed += data.data[i].confirmed,
            recovered += data.data[i].recovered
        }
    
        response =
        [
            ['Status','Total'],
            ['Mortes',deaths],
            ['Confirmados',confirmed],
            ['Recuperados',recovered]
        ];
        console.log(response);
        return response;
    }
