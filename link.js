var script = document.createElement('script');
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(script);
var chamados = [];
var chamados_html = [];
var posicao = 0;

setTimeout(function() { 

	var h = $('#ln_retorno').html();

	$('td[width="10%"]').each(function(){
		var t  = $(this).text();
		if(t.indexOf('Número') < 0 && t.indexOf('Finalizados') < 0 ){
			chamados.push(t*1);		
			
		}
	})	
	rodar();

}, 2000);

function rodar(){

	if(posicao < chamados.length){
	//if(posicao < 2){
		carregar_chamado(chamados[posicao])
	}else{
		
	

	}
	posicao++;

}

function carregar_chamado(numero){

	busca_conversa(true, numero)
	setTimeout(function() { 

		var retorno = "";
		var h = $('#ln_retorno tr');
		h.each(function(){retorno+=$(this).text()+"\n"})
		
		$.ajax({
			type: 'POST',
			url: 'https://3000-f6bf4e61-2d7d-4dc7-a8e9-8ea3b86412c5.ws-us02.gitpod.io/consultas',
			data: JSON.stringify ({codigo:numero, tabela: retorno}),    
			contentType: "application/json",
			crossDomain: true,
			dataType: 'json'
		});
		rodar();
		
	}, 2000);

}

