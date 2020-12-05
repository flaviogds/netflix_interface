import { genres } from '../default/genres.js';
import appendFeature from'../Feature/feature.js';
import appendCollection from '../Collection/collection.js';


/***********DataBase Model***********/
const dataBase = [
    { name: "Minha Lista",    collection: [] },
    { name: "Destaques",    collection: [] },
    { name: 'Ação',         collection: [] },
    { name: 'Animação',     collection: [] },
    { name: 'Comédia',      collection: [] },
    { name: 'Aventura',     collection: [] },
    { name: 'Drama',        collection: [] },
    { name: 'Fantasia',     collection: [] },
    { name: 'Ficção Cientifica',collection: [] },
    { name: 'Banner',       banner: 0 },
];

/***********Requesition***********/
async function request(url, media) {
    const resolve = await fetch(url, { method: 'GET', mode: 'cors', cache: 'default' } );
    const response = await resolve.json();

    return {...response, media: media}
}

/***********Initialize***********/

document.addEventListener("DOMContentLoaded", async () => {

    let data = []

    try {
        for(let i = 1; i <= 5; i++) data.push(...reOrder(await request(`https://api.themoviedb.org/3/discover/movie?api_key=dbe1aa519bb6148b9e6311a75dd51ed0&language=pt-BR&sort_by=popularity.desc&include_adult=false&page=${i}`, "movie")));
        for(let i = 1; i <= 5; i++) data.push(...reOrder(await request(`https://api.themoviedb.org/3/discover/tv?api_key=dbe1aa519bb6148b9e6311a75dd51ed0&language=pt-BR&sort_by=popularity.desc&include_adult=false&page=${i}`, "series")));
    } catch(err) {
        console.log(err)
    }

    data.forEach(item => collection(item));


    dataBase.forEach(collection => {
        if(collection.name === "Banner"){
            appendFeature(collection.banner);
        }else{
            appendCollection(collection.collection, collection.name);
        }
    })
});

/***********Operator functions***********/

const reOrder = data => {
    let list = [];
    data.results.forEach(input => {
        list.push(
            {
                id: input.id,
                media: data.media,
                name: (input.name ? input.name : input.title),
                original_name: (input.original_name ? input.original_name : input.original_title),
                release_date: (input.first_air_date ? input.first_air_date : input.release_date),
                genres : input.genre_ids.map(id => genres.filter(item => item.id === id).pop()),
                rating: input.vote_average,
                sm_banner: input.backdrop_path,
                lg_banner: input.poster_path,
                description: input.overview,
                poster: ''
            }
        );
    });
    return [...list]
}

const collection = input => {

    dataBase.forEach(item => {
        if(item.name === "Minha Lista"){
            if(input.rating > 8){
                item.collection.push(input);
            }
        }
        if(item.name === "Destaques"){
            if(input.rating >= 7.5){
                item.collection.push(input);
            }
        }
        if(item.name === "Banner"){
            if(input.rating >> item.banner){
                item.banner = input;
            }
        }
        else{
            input.genres.forEach(genre => {
                if(item.name === genre.name){
                    item.collection.push(input);
                }
            });
        }
    });
}



/**************************ROTAS***********************************/
/*

https://api.themoviedb.org/3/discover/movie/550/?api_key=dbe1aa519bb6148b9e6311a75dd51ed0&include_adult=false&page=" + i

prefixo/endpoint da API:
    
    "https://api.themoviedb.org/3/"

Identificador de conteudo: 

    discover/           = necessita do tipo de conteudo movie/, tv/ etc &sort_by=xxx
    list/{array list}   = requesição multipla

Conteudo da requisição

    movie/550           =define o conteudo a ser pesquisado, tipo movie '/' id do item
    tv/150


Key de validação da requisição

    "/?api_key=dbe1aa519bb6148b9e6311a75dd51ed0


Terminadores/filtros

    &include_adult=false            =incluir filmes  +18;
    &sort_by                        =ordernar lista com multiplos retornos
    &page=                          =seleciona a pagina em caso de retorno com multiplas paginas



    montar requisição em daus etapas:
    1º gerar usandop discovery a lista de conteudo tv/movie
    2º requisição quando solicitado do item para recuperar trailer no youtube

*/