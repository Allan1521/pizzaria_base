let modalQtd;


/* -------------------EXIBE INFORMAÇÕES DA PIZZAS------------------ */

pizzaJson.map((item, index) => {

    //clonando o pizza-item
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);


    // Definindo um atributo chamado 'data-key' ao elemento .pizza-item, contendo o id da pizza que foi selecionada pelo usuário.
    pizzaItem.setAttribute('data-key', index);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;

    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;

    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();

        modalQtd = 1;
        let key = event.target.closest('.pizza-item').getAttribute('data-key');
        console.log(pizzaJson[key]);

        document.querySelector('.pizzaBig img').src = pizzaJson[key].img;

        document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        document.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            // Fará que o tamanho grande sempre seja selecionada por padrão ao usuário clicar em uma pizza.
            if (sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
            //size.querySelector('span').innerHTML = '123';
        });



        //definindo sempre 1 para quantidade de pizza
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;

        // definindo opacidade 0 para que o modal nao seja exibida na tela logo de inicio
        document.querySelector('.pizzaWindowArea').style.opacity = 0;

        //exibindo a janela modal na tela ao clicar em uma pizza
        document.querySelector('.pizzaWindowArea').style.display = 'flex';

        setTimeout(() => {
            document.querySelector('.pizzaWindowArea').style.opacity = 1;
        }, 200)


        //console.log(pizzaJson[key]);

    });

    //append = cria um elemento dentro do local especificado sempre na última posição, ou seja, não substitui os elementos que já estavam dentro.
    document.querySelector('.pizza-area').append(pizzaItem);

});

//eventos do modal
function closeModal() {
    document.querySelector('.pizzaWindowArea').style.opacity = 0;

    setTimeout(() => {
        document.querySelector('.pizzaWindowArea').style.display = 'none';
    }, 500)
}


/* Estamos usando forEach para que automaticamente ele selecione automaticamente cada um dos elementos com as classes abaixo e adicione um EventListener nesses elementos, a cada vez que o usuário clicar em um botão de fechar ele irá detectar o clique e irá chamar a função closeModal para fechar a janela. */
document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

document.querySelector('.pizzaInfo--qtmais').addEventListener('click', () => {
    //a cada vez que o usuário clicar no modal a variável modalQtd será incrementada em +1
    modalQtd++;

    //selecionando o elemento onde a quantidade de pizzas irá aparecer e atualizaando-o conforme a variável modalQtd
    document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;
});

document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', () => {

    if (modalQtd >1){
        modalQtd--;
    }

    document.querySelector('.pizzaInfo--qt').innerHTML = modalQtd;
});
//document.querySelector('.pizzaInfo--cancelButton').addEventListener('click',(event=>{}))
