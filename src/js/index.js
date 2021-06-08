const c_primary = '#226ce0';
const c_grey = '#494949';
const c_white = '#ffffff';
const c_black = '#000000';
const c_transparent = 'transparent';

const nav = document.querySelector("#nav");
const nav_logo = document.querySelector("#nav-logo");
const nav_items = Array.from(document.querySelectorAll(".nav__item:not(:last-child)"));
const nav_cta = document.querySelector(".nav__item:last-child");

const sidenav_checkbox = document.querySelector("#navigation_checkbox");
const sidenav_burger_bars = Array.from(document.querySelectorAll("[class^='sidenav__icon--']"));

returnBarsArr = (removeMiddle) => {
    if (removeMiddle) {
        retArray = [];
        for (i=0; i<sidenav_burger_bars.length; i++) {
            if (i == 1) { continue }
            retArray.push(sidenav_burger_bars[i]);
        }

        return retArray
    } else {
        return sidenav_burger_bars;
    }
}

window.addEventListener('scroll', (e) => {
    if (window.pageYOffset > 110) {
        nav.style.backgroundColor = c_white;
        nav.style.boxShadow = '0 .5rem 1.5rem rgba(0,0,0,0.2)';
        nav_logo.style.fill = c_primary;
        returnBarsArr(false).forEach(bar => {
            bar.style.backgroundColor = c_grey;
        });
        nav_cta.style.border = `2px solid ${c_primary}`;
        nav_items.forEach(item => {
            item.style.color = c_grey;
        });
    } else {
        nav.style.backgroundColor = c_transparent;
        nav.style.boxShadow = 'none';
        nav_logo.style.fill = c_white;
        returnBarsArr(false).forEach(bar => {
            bar.style.backgroundColor = c_white;
        });
        nav_cta.style.border = `2px solid ${c_white}`;
        nav_items.forEach(item => {
            item.style.color = c_white;
        });
    }
});

sidenav_checkbox.addEventListener('change', (e) => {
    if (sidenav_checkbox.checked) {
        returnBarsArr(true).forEach(bar => {
            bar.style.backgroundColor = c_grey;
        });
        returnBarsArr(false)[1].style.backgroundColor = c_transparent;
        nav_logo.style.zIndex = '100';
        if (window.pageYOffset < 110) {
            nav_logo.style.fill = c_primary;
            nav.style.backgroundColor = c_white;
        }
    } else {
        if (window.pageYOffset < 110) {
            returnBarsArr(false).forEach(bar => {
                bar.style.backgroundColor = c_white;
            });
            nav_logo.style.fill = c_white;
            nav.style.backgroundColor = c_transparent;
        } else {
            returnBarsArr(false).forEach(bar => {
                bar.style.backgroundColor = c_grey;
            });
        }
    }
})