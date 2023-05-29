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

        return mouseX > this.x && mouseX < this.x+ Building.width &&
               mouseY > this.y && mouseY < this.y+ Building.height;

               
    }

}

class Board {

    static width = 100;
    static height = 100;
    static tileheight = 50;
    static nTiles = 6;

    constructor(buildingsInfo, x, y, images, clickAction)
    {
        this.x = x;
        this.y = y;
        this.buildingImg = images.buildingImg;
        this.buildings = this.createBuildings(buildingsInfo);
        this.clickAction = clickAction;
    }

    createBuildings(buildingsInfo) {
        let buildings = [];
        let x = this.x;
        for (let buildingInfo of buildingsInfo)
        {
            let img = this.getBuildingImage(buildingInfo.name);
            buildings.push(new Building(buildingInfo, x, this.y, img));
            x += Board.width;

            console.log("---------------------------------");
            console.log(buildingInfo);
            console.log(buildingInfo.name);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        }

        this.buildings = buildings;
        return buildings;
    }
      

    getBuildingImage(buildingType) {
        // Determine the image based on the building type
        switch (buildingType) {
            case "Castle":
                return GameInfo.images.castle;

            case "Blacksmith 1":
            case "Blacksmith 2":
            case "Blacksmith 3":
                return GameInfo.images.blacksmith;
            
            case "Tavern 1":
            case "Tavern 2":
            case "Tavern 3":
               return GameInfo.images.tavern; 
        
            case "Farm 1":
            case "Farm 2":
            case "Farm 3":
                return GameInfo.images.farm;
            
            default:
                return GameInfo.images.board;
        }
    }

    update(buildingsInfo) {
        if (buildingsInfo && buildingsInfo.length > 0) {
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
            
            if (build.building === GameInfo.selectedBuilding) {
                image(GameInfo.images.boardOverlay, build.x, build.y, Board.width, Board.height);
            }
        
        }
        
        for (let i = 0; i < this.buildings.length; i++)
        {
        let b = this.buildings[i];
        let x = b.x + Board.width / 2;
        let y = b.y + Board.height;

        // Draw the text information for the buildings in a separate area
        textAlign(CENTER, CENTER);
        textSize(20);        
        //text(b.building.name, x, y - Board.width / 2);
        fill('red');
        text(b.building.health, x + Board.width / 4, y - Board.width / 7);
        fill('black');
        textSize(12);
        text(b.building.level, x - Board.width * 0.38, y - Board.height + Board.height / 7);
        //text(b.building.effect, x + Board.width * 0.4, y + Board.height / 2);
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
