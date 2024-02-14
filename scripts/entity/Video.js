class Video extends Media {
    constructor(data, url) {
        super(data.title, data.likes, data.date, data.price);
        this.url = url
    }

    /**
     * @description Create HTML element
     * @param {number} indexOrder 
     * @returns {HTMLElement}
     */
    createElement(indexOrder) {

        //Create video element with attributes
        const videoElement = document.createElement('video');
        videoElement.controls = true;
        videoElement.classList.add('vignette');
        videoElement.setAttribute('data-order', indexOrder);

        const sourceElement = document.createElement('source');
        sourceElement.src = this.url;
        sourceElement.type = "video/mp4";
        videoElement.appendChild(sourceElement);

        //Create article which contains the video element
        const article = this.createArticle();
        const a = article.querySelector('.media');
        a.appendChild(videoElement);

        //return article element
        return article;
    }
}
