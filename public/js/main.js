'use strict';

if(new URL(location).pathname === '/') history.pushState(null, null, '/app')

function getFlagEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

console.log(getFlagEmoji('us'))

const contriesEl = document.querySelector('#countries')

fetch('/country')
.then(res => res.json())
.then(countries => {
    while(contriesEl.firstElementChild) contriesEl.firstElementChild.remove()
    countries.forEach(country => {
        const countryEl = document.importNode(document.querySelector('#countryTemplate').content, true)
        countryEl.querySelector('.country__flag').textContent = getFlagEmoji(country.country_code)
        countryEl.querySelector('.country__name').textContent = country.country
        const requestsCount = country.ips.reduce((acc, current) => acc + current.requests.length, 0)
        countryEl.querySelector('.country__requests').textContent = `${requestsCount} request${requestsCount === 1 ? '' : 's'}`
        const ipsCount = country.ips.length
        countryEl.querySelector('.country__ips').textContent = `${ipsCount} IP${ipsCount === 1 ? '' : 's'}`

        contriesEl.appendChild(countryEl)
    })
})