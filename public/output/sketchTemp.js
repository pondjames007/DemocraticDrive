
let vehicle;
let direction;
let trackImg;
let count = 0;
let trackPos = [], obstaclePos = [];
let resume = false;


function preload(){
    trackImg = loadImage('track.jpg');
}

function setup(){
    vehicle = new Vehicle()
    direction = createVector();
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);
    
    trackImg.resize(width, height);
    trackImg.loadPixels();
    //console.log(track);
    for(let i = 0; i < trackImg.pixels.length; i +=4){
        if(trackImg.pixels[i] == 0){
            //console.log((i/4)%width, floor((i/4)/width));
            trackPos.push(createVector((i/4)%width, floor((i/4)/width)));
        }
        if(trackImg.pixels[i] >= 200 && trackImg.pixels[i+1] == 0 && trackImg.pixels[i+2] == 0){
            obstaclePos.push(createVector((i/4)%width, floor((i/4)/width)));
        }

    }
    
}

function draw(){
    background(220);
    vehicle.update(direction);
    //direction.mult(0);
    vehicle.display();
    vehicle.checkCollision(trackPos, true);
    

    if(vehicle.isCollide == true){
        vehicle.vel.mult(0);
        direction.mult(0);
        count++;
        // print(count);
        if(count == 60){
            if(abs(vehicle.collideRelation.y) > 5){
            //vehicle.pos.add(vehicle.collideRelation.mult(3));
                vehicle.pos.y += vehicle.collideRelation.y*5;
            }
            else{
                vehicle.pos.x += vehicle.collideRelation.x*5;
            }
            resume = true;
            //console.log(vehicle.collideRelation);
            count = 0;
        }
    }
    
    if(resume == true){
        count++;
        if(count == 60){
            //console.log("GOGO")
            vehicle.vel.add(2, 0);
            count = 0;
            resume = false;
        }
    }



    vehicle.calculatePoints();
    
    for(let i of trackPos){
        stroke(0);
        //strokeWeight(3);
        point(i.x, i.y);
    }
    for(let i of obstaclePos){
        stroke(255, 0, 0);
        //strokeWeight(3);
        point(i.x, i.y);
    }

    console.log(vehicle.users);

}

function keyPressed(){
    // if(keyCode == LEFT_ARROW){
    //     direction.x = -5;
    //     direction.y = 0;
    // }
    // else if(keyCode == RIGHT_ARROW){
    //     direction.x = 5;
    //     direction.y = 0;
    // }
    if(vehicle.isCollide == false){
        if(keyCode == UP_ARROW){
            direction.y = -2;
            direction.x = 0;
        }
        else if(keyCode == DOWN_ARROW){
            direction.y = 2;
            direction.x = 0;
        }
    }
}