class StatsModifiers
{
    static width = 100;
    static height = 100;

    
    constructor (stats, x, y, img)
    {
        this.stats = stats;
        this.x = x;
        this.y = y;
        this.img = img;
    }


    draw()
    {
        image(this.img, this.x, this.y, StatsModifiers.width, StatsModifiers.height);

        textAlign(CENTER, CENTER);
        fill(255);
        textStyle(BOLD);
        textSize(12);
        stroke(0);
        strokeWeight(2);
        //Add image for attack
        text("Attack: " + this.stats.attack, this.x + StatsModifiers.width * 0.665, this.y + StatsModifiers.height * 0.095);
        //Add image for AP
        text("AP: " + this.stats.ap, this.x + StatsModifiers.width * 0.665, this.y + StatsModifiers.height * 0.095);
        //Add image for RP
        text("RP: " + this.stats.rp, this.x + StatsModifiers.width * 0.665, this.y + StatsModifiers.height * 0.095);

    }

}

/* need to change values so it makes sense why is it called Hidden
class HiddenStatsModifier
{
    static width = 100;
    static height = 100;

    constructor (stats, x, y, img)
    {
        this.stats = stats;
        this.x = x;
        this.y = y;
        this.img = img;
    }

    draw()
    {
        image(this.img, this.x, this.y, StatsModifiers.width, StatsModifiers.height);

        textAlign(CENTER, CENTER);
        fill(255);
        textStyle(BOLD);
        stroke(0);
        strokeWeight(2);
        //Add image for attack
        text("Attack: " + this.stats.attack, this.x + StatsModifiers.width * 0.665, this.y + StatsModifiers.height * 0.095);
        //Add image for AP
        text("AP: " + this.stats.ap, this.x + StatsModifiers.width * 0.665, this.y + StatsModifiers.height * 0.095);
        //Add image for RP
        text("RP: " + this.stats.rp, this.x + StatsModifiers.width * 0.665, this.y + StatsModifiers.height * 0.095);

    }
}
*/