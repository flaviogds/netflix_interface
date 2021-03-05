import { buildBanner } from'./Components/Banner/banner.js';
import { appendCollection } from './Components/Collection/collection.js';

import { DataBase } from './Components/Shared/db.js';
import { getData } from './Components/Service/services.js'

import { genres } from './Components/default/genres.js';
import environment from './environment/environment.js';

const db = new DataBase;

/***********Initialize***********/

document.addEventListener("DOMContentLoaded", async () => startApplication() );

async function startApplication(data = []){

    const query = new URLSearchParams();
    query.set('api_key', environment.api_key)
    query.set('language', 'pt-BR')
    query.set('sort_by', 'popularity.desc')
    query.set('include_adult', false)

    try {
        for(let i = 1; i <= 5; i++){         
            query.set('page', i)
            data.push(
                ...dataConstructor(await getData(environment.url.concat("movie", '?', query)), "movies"),
                ...dataConstructor(await getData(environment.url.concat("tv", '?', query)), "series")
            );
        } 
    }catch(err) {
        console.log(err);
    }finally {
        data.forEach(item => !Object.values(item).includes(null) && buildCollections(item));

        db.getData().forEach(collection => {
            if(collection.name === "Banner"){
                buildBanner(collection.banner);
            }else{
                appendCollection(collection.collection, collection.name);
            }
        });
    }
}

function dataConstructor (data, media){
    return data.results.map(input => {
        return {
            id: input.id,
            media: media,
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
    });
}

function buildCollections (input){
    db.getData().forEach(item => {
        if(item.name === "Minha Lista"){
            input.rating > 8 && item.collection.push(input);
        }
        if(item.name === "Destaques"){
            input.rating >= 7.5 && item.collection.push(input);
        }
        if(item.name === "Banner"){
            if(input.rating >> item.banner && input.description){
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