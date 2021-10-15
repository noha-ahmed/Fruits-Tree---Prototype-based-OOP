
function Fruit() {}
Fruit.prototype = {
    weight: 0,
    left: undefined,
    right: undefined,
    getLeft: function () {
        return this.left;
    },
    getRight: function () {
        return this.right;
    },
    getWeight: function () {
        return this.weight;
    },
    getType: function () {
        return "Fruit";
    },
    getColor: function () {
        return "Many colors !";
    },
    getTaste: function () {
        return "Many Tastes !";
    },
    print: function(){
        return console.log("I am " +  this.getType() + " with weight " + this.getWeight() + " !");
    }
};

function OvalFruit() {}
OvalFruit.prototype = {
    __proto__: Fruit.prototype,
    getType: function () {
        return "Oval Fruit";
    },
};



function TinyFruit() {}
TinyFruit.prototype = {
    __proto__: Fruit.prototype,
    getType: function () {
        return "Tiny Fruit";
    }
};

// Oval Apple fruits
function Apple() {}
Apple.prototype = {
    __proto__: OvalFruit.prototype,
    getType: function () {
        return "Apple";
    },
    getColor: function () {
        return "I am Red";
    },
    getTaste: function () {
        return "I am Sweet";
    }
}

function Avocado() {}
Avocado.prototype = {
    __proto__: OvalFruit.prototype,
    getType: function () {
        return "Avocado";
    },
    getColor: function () {
        return "I am Blueish-purble";
    },
    getTaste: function () {
        return "I am Sweet";
    }
};


//Tiny fruits
function Berry() {}
Berry.prototype = {
    __proto__: TinyFruit.prototype,
    getType: function () {
        return "Berry";
    },
    getTaste: function () {
        return "I am Sour";
    }
};

function Grapes() {}
Grapes.prototype = {
    __proto__: TinyFruit.prototype,
    getType: function () {
        return "Grapes";
    }
};

//Berry fruits
function Blackberries() {}
Blackberries.prototype = {
    __proto__: Berry.prototype,
    getType: function () {
        return "Blackberries";
    },
    getColor: function () {
        return "I am Black";
    }
}

function Gooseberries() {}
Gooseberries.prototype = {
    __proto__: Berry.prototype,
    getType: function () {
        return "Gooseberries";
    },
    getColor: function () {
        return "I am Orange or green";
    }
};

function Elderberries() {}
Elderberries.prototype = {
    __proto__: Berry.prototype,
    getType: function () {
        return "Elderberries";
    },
    getColor: function () {
        return "I am Green";
    }
};



//fruits factory ( applying pattern matching )
//used in tree ->> delegation is applied

var getFruitInstance = function(type){
    var fruitPrototype = getFruitPrototype(type);
    if( fruitPrototype === undefined ){
        return undefined;
    }
    return Object.create(fruitPrototype);
};

var getFruitPrototype = function(type){
    switch (type) {
        case "Fruit":
            return Fruit.prototype;
        case "Oval Fruit":
            return OvalFruit.prototype;
        case "Tiny Fruit":
            return TinyFruit.prototype;
        case "Avocado":
            return Avocado.prototype;
        case "Apple":
            return Apple.prototype;
        case "Grapes":
            return Grapes.prototype;
        case "Berry":
            return Berry.prototype;
        case "Elderberries":
            return Elderberries.prototype;
        case "Blackberries":
            return Blackberries.prototype;
        case "Gooseberries":
            return Gooseberries.prototype;
        default:
            return Fruit.prototype;
    }
};



export {
    getFruitInstance , getFruitPrototype}; 