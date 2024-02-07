class Video extends Media {
    constructor(data, url) {
        super(data.title, data.likes, data.date, data.price);
        this.url = url
    }

    createElement(indexOrder) {

        const videoElement = document.createElement('video');
        videoElement.controls = true;
        videoElement.classList.add('vignette');
        videoElement.setAttribute('data-order', indexOrder);

        const sourceElement = document.createElement('source');
        sourceElement.src = this.url;
        sourceElement.type = "video/mp4";

        videoElement.appendChild(sourceElement);

        const article = this.createArticle();
        const a = article.querySelector('.media');
    
        a.appendChild(videoElement);

        return article;
    }
}
