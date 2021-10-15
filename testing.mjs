import {
    createNewTree,
    listIterate
} from "./BinarySearchTree.mjs";

console.log("\n <<-- test insert -->> \n" );
var tree = createNewTree();
tree.insertFruit("Apple",10);
tree.insertFruit("Grapes",20);
tree.insertFruit("Elderberries",5);
tree.insertFruit("Blackberries",3);
tree.insertFruit("Blackberries",2);
tree.insertFruit("Gooseberries",30);
tree.insertFruit("Apple",80);
tree.insertFruit("Blackberries",15);
tree.insertFruit("Avocado",18);
tree.insertFruit("Berry",13);
tree.insertFruit("Grapes",14);
console.log("--------- Traversing Tree\n")
tree.iterate();

console.log("----------------------------------------------------------------------");

console.log("\n<<-- test lightest -->> \n");
tree.findLightest().print();

console.log("----------------------------------------------------------------------");

console.log("\n<<-- test heaviest -->> \n");
tree.findHeaviest().print();

console.log("----------------------------------------------------------------------");

console.log("\n<<-- test filter by type -->> \n");
console.log("-------- Filtering Grapes");
var filteredFruits = tree.filterByType("Grapes");
listIterate( filteredFruits );

console.log();sleep_listsleep_listsleep_list
console.log("-------- Filtering Berries");
var filteredFruits = tree.filterByType("Berry");
listIterate( filteredFruits );

console.log("----------------------------------------------------------------------");


console.log("\n<<-- test filter by weight -->> \n");
console.log("-------- Filtering fruits hevier that 10 gm");
var filteredFruits = tree.filterByWeight(10);
listIterate( filteredFruits );


console.log("----------------------------------------------------------------------"); 

console.log("\n<<-- test magnify -->> \n");
console.log("--------------- Magnify Berries by 20 ")
console.log("--- Tree Before ")
tree.iterate();
console.log();
console.log("--- Berries Before Magnify: ");
var filteredFruits = tree.filterByType("Berry");
listIterate( filteredFruits );
console.log();
tree.magnifyByType("Berry", 20);
console.log("--- Tree After Magnify: ")
tree.iterate();

console.log("----------------------------------------------------------------------");
console.log("\n<<-- test delete -->>  \n");

tree.delete( tree.getFruit(20));
tree.iterate();
console.log(tree.getSize());
console.log("----------------------------------------------------------------------");
tree.delete( tree.getFruit(10));
console.log("----------------------------------------------------------------------");
tree.iterate();
console.log(tree.getSize());
console.log("----------------------------------------------------------------------");
tree.delete( tree.getFruit(14));
tree.iterate();
console.log(tree.getSize());
console.log("----------------------------------------------------------------------");
tree.delete( tree.getFruit(18));
tree.iterate();
console.log(tree.getSize());
console.log("----------------------------------------------------------------------");
tree.delete( tree.getFruit(50));
tree.iterate();
console.log(tree.getSize());
console.log("----------------------------------------------------------------------");
tree.delete( tree.getFruit(80));
tree.iterate();
console.log(tree.getSize());
console.log("----------------------------------------------------------------------");
tree.delete( tree.getFruit(22));
tree.iterate();
console.log(tree.getSize());
console.log("----------------------------------------------------------------------");
tree.delete( tree.getFruit(23));
tree.iterate();
console.log(tree.getSize());
console.log("----------------------------------------------------------------------");
tree.delete( tree.getFruit(33));
tree.iterate();
console.log(tree.getSize());
console.log("----------------------------------------------------------------------");
tree.delete( tree.getFruit(35));
tree.iterate();
console.log(tree.getSize());
console.log("----------------------------------------------------------------------");
tree.delete( tree.getFruit(25));
tree.iterate();
console.log(tree.getSize());
console.log( tree.getRoot() + " " + tree.getSize());

