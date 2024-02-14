class Image extends Media {
    constructor(data, url) {
        super(data.title, data.likes, data.date, data.price);
        this.url = url;
    }

    /**
     * @description Create HTML element
     * @param {number} indexOrder 
     * @returns {HTMLElement}
     */
    createElement(indexOrder) {

        //Create img element with attributes
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', this.url);
        imgElement.alt = this.title;
        imgElement.classList.add('vignette');
        imgElement.setAttribute('data-order', indexOrder);

        //Create article which contains the img element
        const article = this.createArticle();
        const a = article.querySelector('.media');
        a.appendChild(imgElement);

        //return article element
        return article;
    }
}