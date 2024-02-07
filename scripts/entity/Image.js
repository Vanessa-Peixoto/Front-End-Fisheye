class Image extends Media {
    constructor(data, url) {
        super(data.title, data.likes, data.date, data.price);
        this.url = url;
    }

    createElement(indexOrder) {

        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', this.url);
        imgElement.alt = this.title;
        imgElement.classList.add('vignette');
        imgElement.setAttribute('data-order', indexOrder);

        const article = this.createArticle();
        const a = article.querySelector('.media');
    
        a.appendChild(imgElement);

        return article;
    }
}