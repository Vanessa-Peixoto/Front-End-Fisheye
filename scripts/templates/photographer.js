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
        link.setAttribute("aria-label", "Aller à la page du photographe")

        link.appendChild(img);
        link.appendChild(h2);

        article.appendChild(link);
        article.appendChild(location);
        article.appendChild(description);
        article.appendChild(priceElement);
        return (article);
    }
    return { pagePhotographer, name, picture, city, country, tagline, price, getUserCardDOM }
}