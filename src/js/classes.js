class Item {
    constructor (object) {
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                this.key = object[key];                
            }
        }
    }
}

