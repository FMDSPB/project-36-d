var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
let feed, lastFed

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedTheDog = createButton("Feed Dog");
  feedTheDog.position(700, 95);
  feedTheDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
  //console.log("h")
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

  let fod = foodObj.getFoodStock();
  if(fod <=0){

    foodObj.updateFoodStock(fod * 0);

  } else {

    foodObj.updateFoodStock(fod - 1);

  }
  foodObj.deductFood();
  
  foodObj.updateFoodStock(foodStock);

  currentHour = hour();
  updateLastFed(currentHour);
  console.log(currentHour)

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


function updateLastFed(a) {
  database.ref("/").update({
    FeedTime:a
  })
}