import {
    getFruitInstance,
    getFruitPrototype
} from "./Fruits.mjs";




//utility functions
var filter = function ( criteriaFn , node ){
    var filteredNodes =[];

    function filterRec( node  ){
        if( node === undefined ){
            return;
        }
        filterRec(node.left);
        if( criteriaFn(node)){
            filteredNodes.push(node);
        }
        filterRec(node.right);
    };
    
    filterRec(node);
   
    return filteredNodes;
}

var listIterate = function(fruits) {
    for( var i in fruits ){
         fruits[i].print();
    }
}

var createNewTree = function(){
    console.log("--------- Tree is created!\n")
    return Object.create(BinarySearchTree.prototype);
}
////////////////////////////////////////////////////////////////////////////////////////

function BinarySearchTree() {}
BinarySearchTree.prototype = {
    test:"tree",
    root: undefined,
    size: 0,
    getRoot: function () {
        return this.root;
    },
    getSize: function () {
        return this.size;
    },
    insertFruit: function (type , weight ) {},
    deleteFruit: function (fruit){},
    iterate: function () {},
    filterByType: function (type) {},
    filterByWeight: function (weight) {},
    magnifyByType: function (type, weight) {},
    findHeaviest: function () {},
    findLightest: function () {},
    getFruit: function( weight ){}
}



BinarySearchTree.prototype.insertFruit = function( type , weight  ){
    //applying delegation
    var newFruit = getFruitInstance(type);
    if( newFruit === undefined ){
        console.log("Wrong type entered !")
    }
    newFruit.weight = weight;
    var parentFruit = this.root;

    function insertRecursive( fruit ){
        if( fruit === undefined ) {
            this.root = newFruit;
            this.size++;
            return;
        }
        if( fruit.weight > weight && fruit.left === undefined ){
            fruit.left = newFruit;
            this.size++;
        }
        else if( fruit.weight < weight && fruit.right === undefined ){
            fruit.right = newFruit;
            this.size++;
        }
        else if( fruit.weight > weight ){
            parentFruit = fruit;
            insertRecursive.call(this,fruit.left);
        }
        else if( fruit.weight < weight ){
            parentFruit = fruit;
            insertRecursive.call(this,fruit.right);
        }
        else if( fruit.weight === weight ){
            newFruit.left = fruit.left;
            newFruit.right = fruit.right;
            if( fruit === this.root ){
                this.root = newFruit;   
            }
            else{
                if( parentFruit.right === fruit ){
                    parentFruit.right = newFruit;
                }
                else{
                    parentFruit.left = newFruit;
                }
            }
        }
    };
    insertRecursive.call(this,this.root);
};

BinarySearchTree.prototype.findHeaviest = function(){
    var fruit = this.getRoot();
    while( fruit.right !== undefined ){
        fruit = fruit.right;
    }
    return fruit;
}

BinarySearchTree.prototype.findLightest = function(){
    var fruit = this.getRoot();
    while( fruit.left !== undefined ){
        fruit = fruit.left;
    }
    return fruit;
}


BinarySearchTree.prototype.filterByType = function( type ){
    //applying delegation
    var fruitPrototype = getFruitPrototype(type);

    if( fruitPrototype === undefined ){
        console.log("Wrong type entered !");
    } 

    //applying higher order functions
    var typeCriteriaFn = function(fruit){
        return fruitPrototype.isPrototypeOf( fruit );
    }
            
    return filter(typeCriteriaFn , this.root);
}

BinarySearchTree.prototype.filterByWeight = function( weight ){

    if( weight === undefined ){
        console.log("Wrong weight entered !");
    } 

    //applying higher order functions
    var wieghtCriteriaFn = function(fruit){
        return fruit.weight > weight;
    }
            
    return filter( wieghtCriteriaFn , this.root);
}

BinarySearchTree.prototype.iterate = function(){
    function iterateRec( fruit  ){
        if( fruit === undefined ){
            return;
        }
        iterateRec(fruit.left);
        fruit.print();
        iterateRec(fruit.right);
    };
    iterateRec(this.root);
}

BinarySearchTree.prototype.delete = function( fruit ){
    if( fruit === undefined ) return;
    var parentFruit = this.root;
    var currentFruit = this.root;

    var replaceFruit = function( oldFruit , newFruit , parentFruit ){
        if( oldFruit === this.root ){
            this.root = newFruit;
            return;
        }
        if( parentFruit.left === oldFruit ){
            parentFruit.left = newFruit;
        }
        else{
            parentFruit.right = newFruit;
        }
    }

    var deleted = false;
    while( !deleted ){
        if( fruit === currentFruit ){
            // leafe fruit ->> delete it
            if( currentFruit.left === undefined && currentFruit.right === undefined ){
                replaceFruit.call(this,currentFruit , undefined , parentFruit);
            }
            //only right fruit ->> replace fruit with right fruit
            else if( currentFruit.left === undefined ){
                replaceFruit.call(this,currentFruit , currentFruit.right , parentFruit);
            }
            //only left fruit ->> replace fruit with left fruit
            else if( currentFruit.right === undefined ){
                replaceFruit.call(this, currentFruit , currentFruit.left , parentFruit);
            }
            //2 fruits ->> replace with successor
            else{
                var successorParent = currentFruit;
                var successor = currentFruit.right;
                while( successor.left !== undefined ){
                    successorParent = successor;
                    successor = successor.left;
                }
                //remove successor
                replaceFruit.call(this,successor , successor.right , successorParent );
                //replace current fruit with successor
                successor.left = currentFruit.left;
                successor.right = currentFruit.right;
                replaceFruit.call(this,currentFruit ,successor ,parentFruit );
            }
            this.size--;
            deleted = true;
        }
        else if( fruit.weight < currentFruit.weight ){
            parentFruit = currentFruit;
            currentFruit = currentFruit.left;
        }
        else if( fruit.weight > currentFruit.weight ){
            parentFruit = currentFruit;
            currentFruit = currentFruit.right;
        } 
    }
}

BinarySearchTree.prototype.getFruit = function( weight ){
    function search( fruit ){
        if( fruit === undefined ) {
            console.log("Weight doesnot exist !");
            return undefined;
        }

        if( weight > fruit.weight  ){
            return search(fruit.right);
        }
        else if( weight < fruit.weight  ){
            return search(fruit.left);
        }
        else if( weight === fruit.weight ){
            return fruit;
        }
    };
    return search( this.root );
}

BinarySearchTree.prototype.magnifyByType = function (type , weight ){
    var filteredFruits = this.filterByType(type);
    for( var i in filteredFruits ){
        this.delete(filteredFruits[i]);
    }
    for( var i in filteredFruits ){
        filteredFruits[i].weight = filteredFruits[i].weight + weight;
        this.insertFruit( filteredFruits[i].getType() , filteredFruits[i].getWeight() );
    }
};
export { BinarySearchTree , createNewTree , listIterate }; 

