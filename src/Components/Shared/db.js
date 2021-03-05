export class DataBase {
    data = [
        { name: "Minha Lista",  collection: [] },
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

    getData(){
        return this.data;
    }
}