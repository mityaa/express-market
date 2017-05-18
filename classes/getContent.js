var fs = require('fs');

module.exports = class {

    static getImagesSrc() {
        return fs.readdirSync('./public/img/gallery/');
    }

}