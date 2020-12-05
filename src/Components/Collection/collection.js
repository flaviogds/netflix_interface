/*Creating and attaching collection to the DOM*/
export default function appendCollection(data, nameCollection) {

    const content = document.getElementById("content");

    /*create the collection*/
        let container = document.createElement("div");
        container.setAttribute("id", nameCollection);

        let titleList = document.createElement("div");
        titleList.classList.add("title-carousel");

        let title = document.createElement("h3");
        title.innerHTML = nameCollection;

        let linkList = document.createElement("a");
        let link = document.createTextNode("Ver tudo");
        linkList.appendChild(link);

        linkList.href = "http://link:"+nameCollection;

        let collection = document.createElement("div");
        collection.classList.add("owl-carousel");
        collection.classList.add("owl-theme");

        content.appendChild(container);
        container.appendChild(titleList);
        titleList.appendChild(title);
        titleList.appendChild(linkList);
        container.appendChild(collection);

        /*loads line elements*/
        data.forEach(element => {
            let item = document.createElement("div");
            item.classList.add("item");
            item.setAttribute("id",element.id);
            item.setAttribute("name", element.name);
            item.setAttribute("onmouseover", "mouseOver(this)");
        
            let image = document.createElement("img");
            image.src = "https://image.tmdb.org/t/p/w780"+(nameCollection === "Destaques" ? element.lg_banner : element.sm_banner);
       
            collection.appendChild(item);
            item.appendChild(image);
        });

    $('.owl-carousel').owlCarousel({
        items: 5,
        loop: false,
        margin: 5,
        nav: true,
        responsive:{
            400:{ items: 2 },
            600:{ items: 3 },
            1000:{ items: 5 },
        }
    });
}

/*


*/