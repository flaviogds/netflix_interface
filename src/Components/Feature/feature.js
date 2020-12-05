/*Creating and attaching featured to the DOM*/
export default function appendFeatured(item){
    let banner = document.getElementById("featured-banner");
    banner.style.background = `url("https://image.tmdb.org/t/p/w1280/${item.sm_banner}")`;
    banner.style.backgroundRepeat = 'no-repeat'
    banner.style.backgroundSize = "100% 100%"

    document.getElementById("featured-title").innerHTML = item.original_name;
    document.getElementById("featured-description").innerHTML = item.description;
    document.getElementById("featured-control").style.display = "flex";
    document.getElementById("play").setAttribute("onclick", "onPlay(this.id)")
    document.getElementById("play").setAttribute("id", item.id)
    document.getElementById("info").setAttribute("onclick", "onInfo(this.id)")
    document.getElementById("info").setAttribute("id", item.id)
}