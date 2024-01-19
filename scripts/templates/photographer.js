function photographerTemplate(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    const pagePhotographer = `/photographer.html?id=${id}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.alt = 'portrait de ' + name;
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const location = document.createElement('p');
        location.textContent = city + ', ' + country;
        const description = document.createElement('p');
        description.textContent = tagline;
        const priceElement = document.createElement('p');
        priceElement.textContent = price + '€/jour';

        const link = document.createElement('a');
        link.setAttribute("href", pagePhotographer);
        link.setAttribute("aria-label", "Aller à la page du photographe");
        link.setAttribute("tabindex", "0");

        link.addEventListener('focus', () => {
            console.log('le lien est focus');
        })

        link.appendChild(img);
        link.appendChild(h2);

        const pElement = document.createElement('div');
        pElement.classList.add('information-section');
        pElement.appendChild(location);
        pElement.appendChild(description);
        pElement.appendChild(priceElement);

        article.appendChild(link);
        article.appendChild(pElement);
        return (article);
    }
    return { pagePhotographer, name, picture, city, country, tagline, price, getUserCardDOM }
}