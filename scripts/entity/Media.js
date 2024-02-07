class Media {
    constructor(title, likes, date, price) {
        this._title = title;
        this._likes = likes;
        this._date = date;
        this._price = price;
    }

    get title() {
        return this._title;
    }

    get likes() {
        return this._likes;
    }

    get date() {
        return this._date;
    }

    get price() {
        return this._price;
    }

    createArticle() {
        const titleElement = document.createElement('p');
        titleElement.textContent = this.title;

        const likesElement = document.createElement('span');
        likesElement.textContent = this.likes;

        const likesImg = document.createElement('img');
        likesImg.setAttribute('src', 'assets/icons/heart.svg');
        likesImg.alt = 'likes';
        likesImg.classList.add('likes');

        const btnLikes = document.createElement('button');
        btnLikes.classList.add('btn-likes')
        btnLikes.appendChild(likesImg);

        const containerLikes = document.createElement('div');
        containerLikes.appendChild(likesElement);
        containerLikes.appendChild(btnLikes);

        const containerTitle = document.createElement('div');
        containerTitle.classList.add('container-title');
        containerTitle.appendChild(titleElement);
        containerTitle.appendChild(containerLikes);

        const a = document.createElement('a');
        a.setAttribute('href', '#');
        a.classList.add('media');

        const article = document.createElement('article');
        article.appendChild(a);
        article.appendChild(containerTitle);

        return article;
    }
}