class MediaFactory {
    constructor(data, photographerName, type) {
        if (type === 'image') {
            const url = 'assets/images/' + photographerName + '/' + data.image;
            return new Image(data, url);
        } else if (type === 'video') {
            const url = 'assets/images/' + photographerName + '/' + data.video;
            return new Video(data, url);
        } else {
            throw 'Unknown type format';
        }
    }
}