//There needs to be 2 informations showns.
//Sync the buildings with its sprites
//Sync the board to have the buildings if they exists, if not, use empty slot.
//Might need to change database to patch null places to have buildings.


class Building {

    static width = 100;
    static height = 100;
    
    constructor(building, x, y, img) 
    {
        this.building = building;
        this.x = x;
        this.y = y;
        this.img = img;
    }

    click() {

        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

        return mouseX > this.x && mouseX < this.x+ Building.width &&
               mouseY > this.y && mouseY < this.y+ Building.height;

               
    }

}

class Board {

    static width = 100;
    static height = 100;
    static tileheight = 50;
    static nTiles = 6;

    constructor(buildingsInfo, x, y, buildingImg, clickAction)
    {
        this.x = x;
        this.y = y;
        this.buildingImg = buildingImg;
        this.buildings = this.createBuildings(buildingsInfo);
        this.clickAction = clickAction;
    }

    createBuildings(buildingsInfo) {
        let buildings = [];
        let x = this.x;
        for (let buildingInfo of buildingsInfo)
        {
            buildings.push(new Building(buildingInfo, x, this.y, this.buildingImg));
            x += Board.width;
        }
        this.buildings = buildings;
        return buildings;
    }

    update(buildingsInfo)
    {
        if (buildingsInfo && buildingsInfo.length > 0){
            this.buildings = this.createBuildings(buildingsInfo);
        }
    }

    draw()
    {
        //Draw images on the board
        for (let i = 0; i < this.buildings.length; i++)
        {
            let build = this.buildings[i];
            image(build.img, build.x, build.y, Board.width, Board.height);
        }
        
        // Draw the text information for the buildings in a separate area
        textAlign(CENTER, CENTER);
        textSize(20);
        fill('black');

        for (let i = 0; i < this.buildings.length; i++)
        {
        let b = this.buildings[i];
        let x = b.x + Board.width / 2;
        let y = b.y + Board.height;

        text(b.building.name, x, y - Board.width / 2);
        text(b.building.health, x, y - Board.width / 5);
        text(b.building.level, x - Board.width * 0.35, y - Board.height + Board.height / 5);
        text(b.building.effect, x + Board.width * 0.4, y + Board.height / 2);
        }
        
    }

    click() {
        if (this.clickAction)
        {
            for (let building of this.buildings)
            {
                if (building.click())
                {
                    this.clickAction(building.building);
                }
            }
        }
    }

}
