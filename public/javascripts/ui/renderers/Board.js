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

}

class Board {

    static tileheight = 50;
    static nTiles = 6;

    constructor(buildingsInfo, x, y, buildingImg)
    {
        this.x = x;
        this.y = y;
        this.buildings = this.createBuildings(buildingsInfo, buildingImg);
        this.buildingImg = buildingImg;
        //this.clickAction = clickAction;
    }

    createBuildings(buildingsInfo, buildingImg) {
        let buildings = [];
        let x = this.x;
        for (let buildingInfo of buildingsInfo)
        {
            buildings.push(new Building(buildingInfo, x, this.y, buildingImg));
            x += Building.width;
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
            image(build.img, build.x, build.y, Building.width, Building.height);
        }
        
        // Draw the text information for the buildings in a separate area
        textAlign(CENTER, CENTER);
        textSize(20);
        fill('black');

        for (let i = 0; i < this.buildings.length; i++)
        {
        let b = this.buildings[i];
        let x = b.x + Building.width / 2;
        let y = b.y + Building.height;

        text(b.building.name, x, y - Building.width / 2);
        text(b.building.health, x, y - Building.width / 5);
        text(b.building.level, x - Building.width * 0.35, y - Building.height + Building.height / 5);
        text(b.building.effect, x + Building.width * 0.4, y + Building.height / 2);
        }
        
    }

}
