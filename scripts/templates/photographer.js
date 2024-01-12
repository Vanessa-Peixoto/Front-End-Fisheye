function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

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


        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(description);
        article.appendChild(priceElement);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}