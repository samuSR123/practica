const btn = document.querySelector('#btn_nav')
const nav = document.querySelector('#menu_')

function x() {
    nav.classList.toggle('hidden')
}

btn.addEventListener('click', x)

const btn_filter = document.querySelector('#btn_filter')
const filters = document.querySelector('#filters')

function f() {
    filters.classList.toggle('hidden')
}

btn_filter.addEventListener('click', f)