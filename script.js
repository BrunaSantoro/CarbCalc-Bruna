const db = new PouchDB('carbon_footprint'); // esta criando uma instancia no banco de dados PouchDB com o nome 'carbon_footprint' e esta guardando essa instancia na variavel db

function saveData(formData) { // esta criando uma função onde ira receber o parametro 'formData'
    return db.put({ // esta chamando o método PUT para salvar algo e ira retorna o resultado da operação que solicitou
        _id: new Date().toISOString(), // vai criar um 'id' se baseando na data atual, o 'new Date' cria a data e hora atual e o 'toISOString'formata essa data e hora
        formData: formData  // esta criando o campo 'formData' que ira salvar dentro o valor que atribuir a ele
    });
}

function displaySavedData() { //esta criando a função 'displaySavedData' que abaixo esta ela ira realizar
    db.allDocs({ include_docs: true, descending: true }) //ira buscar os dados no banco e traze-los em ordem decrescente
        .then(function (result) { // vai executar esta função e lhe mostrar o resultado
            const savedDataDiv = document.getElementById('savedData'); // ira buscar um elemento pelo id 'savedData'
            savedDataDiv.innerHTML = '<h2 class="text-xl font-semibold text-gray-800">Dados Salvos</h2>'; // esta inserindo um conteudo dentro de uma div
            const table = document.createElement('table'); // esta criando um elemento 'table' e guardando na variavel 'table'
            table.classList.add('mt-4', 'w-full', 'border', 'border-gray-200', 'divide-y', 'divide-gray-200'); // esta estilizando uma tabela criada com espaçamento, largura

            const tableHeader = document.createElement('thead'); // esta criando um elemento no cabeçalho da tela
            const headerRow = document.createElement('tr'); // esta criando uma linha e armazenando para ser utilizada
            const header1 = document.createElement('th'); // esta criando um campo para poder inserir informação como um texto
            header1.textContent = 'Data'; // esta inseridno o nome da coluna como 'Data'
            const header2 = document.createElement('th'); // esta criando um campo para poder inserir informação como um texto
            header2.textContent = 'Combustível (litros)'; // esta inseridno o nome da coluna como 'Combustível (litros)'
            const header3 = document.createElement('th'); // esta criando um campo para poder inserir informação como um texto
            header3.textContent = 'Tipo de Combustível'; // esta inseridno o nome da coluna como 'DatTipo de Combustívela'
            const header4 = document.createElement('th'); // esta criando um campo para poder inserir informação como um texto
            header4.textContent = 'Distância Percorrida (km)'; // esta inseridno o nome da coluna como 'Distância Percorrida (km)'

            headerRow.appendChild(header1); //esta adicionando linha na tela 
            headerRow.appendChild(header2); //esta adicionando linha na tela
            headerRow.appendChild(header3); //esta adicionando linha na tela
            headerRow.appendChild(header4); //esta adicionando linha na tela
            tableHeader.appendChild(headerRow); // esta inserindo uma linha no cabeçalho da tabela para estruturar a tabela
            table.appendChild(tableHeader); // esta inserindo o cabeçalho completo

            const tableBody = document.createElement('tbody'); // vai criar o corpo da tabela
            result.rows.forEach(function (row) { // percorre cada linha da consulta no banco e recebe o 'row' que permite algumas ações
                const doc = row.doc; // acessar os campos salvos
                const dataRow = document.createElement('tr'); // cria uma linha vazia na tabela 
                const dateCell = document.createElement('td'); // esta criando uma tela vazia e e defininod o conteudo
                dateCell.textContent = new Date(doc._id).toLocaleString(); // esta inseridno uma data formatada na tabela
                const formData = doc.formData; // esta acessando os dados da tabela
                const fuelCell = document.createElement('td'); // esta criando uma célula para após inserir um dado nele
                fuelCell.textContent = formData.fuel; // esta pegando o valor do campo 'fuel' e inserindo em uma célula na tabela
                const fuelTypeCell = document.createElement('td'); // esta criando um célula vazia na tabela
                fuelTypeCell.textContent = formData.fuelType; // esta pegando o valor do campo 'fuelType' e inserindo em uma célula na tabela
                const distanceCell = document.createElement('td'); // esta criando uma célula vazia
                distanceCell.textContent = formData.distance; // esta pegando o valor do campo 'distance' e inserindo em uma célula na tabela

                dataRow.appendChild(dateCell); //adiciona uma célula com a data formatada
                dataRow.appendChild(fuelCell); // adiciona uma célula com o tipo
                dataRow.appendChild(fuelTypeCell); // adiciona uma célula com outra informação
                dataRow.appendChild(distanceCell); // adiciona uma célula com a distancia 
                tableBody.appendChild(dataRow); //completa o corpo da tabela
            });
            table.appendChild(tableBody); // esta inserindo o corpo da tabela
            savedDataDiv.appendChild(table); // ira exibir a tabela na tela
        }).catch(function (err) { // esta declarando uma função para tratar erros caso tiver
            console.log(err); // ira exibir informações de erro caso tiver
        });
}

document.getElementById('carbonForm').addEventListener('submit', function (event) { //busca o ID 'carbonForm' e após executa a função 'event'
    event.preventDefault(); //não recarrega a pagina, porem a informação inserida é salva no banco
    const formData = { //para armazenar dados do formulario que estamos criando 
        fuel: parseFloat(document.getElementById('fuel').value), //ira pegar o valor inserido no 'fuel' e converter par um numero decimal
        fuelType: document.getElementById('fuelType').value, //ira pegar o for inserido no 'fueltype' e armazenar na 'formData'
        distance: parseFloat(document.getElementById('distance').value) //o valor digitado em 'distance' ira converter para numero 
    };
    saveData(formData).then(function () { //esta chamando a função 'formData' onde sera slvo os dados
        displaySavedData(); //ira executar a função que exibe os dados
    }).catch(function (err) { //serve para capturar e tratar erros
        console.log(err);  // ira exibir informações de erro caso tiver
    });
});

document.getElementById('saveDataBtn').addEventListener('click', function () { //ao clicar no botão ira chamar a função abaixo
    const formData = { //para armazenar dados do formulario que estamos criando 
        fuel: parseFloat(document.getElementById('fuel').value), ////ira pegar o valor inserido no 'fuel' e converter par um numero decimal
        fuelType: document.getElementById('fuelType').value, //ira pegar o for inserido no 'fueltype' e armazenar na 'formData'
        distance: parseFloat(document.getElementById('distance').value) //o valor digitado em 'distance' ira converter para numero 
    };
    saveData(formData).then(function () { //esta chamando a função 'formData' onde sera slvo os dados
        alert('Dados salvos com sucesso!'); //ira lhe mostrar um alerta na tela que foi salvo seu dado
    }).catch(function (err) { // serve para capturar e tratar erros
        console.log(err); // // ira exibir informações de erro caso tiver
    });
});

document.getElementById('loadTableBtn').addEventListener('click', function () { //ao clicar no botão ira chamar a função abaixo
    displaySavedData(); // ira executar a função e ira mostra na tela
});

