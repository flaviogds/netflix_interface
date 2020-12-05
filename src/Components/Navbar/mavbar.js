/*Navbar aparence*/
document.addEventListener('scroll', event => {

    let ticking = false;

    let scroll_pos = window.scrollY;

    let navbar = document.getElementById("navbar");

    if (!ticking) {
        window.requestAnimationFrame(() => {
            if(scroll_pos > 50){
                navbar.style.background = "linear-gradient(180deg, rgba(14, 14, 14, 1), rgba(0, 0, 0, 1))"
            }else{
                navbar.style.background = "linear-gradient(180deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))";
            }

            ticking = false;
        });
    }
});