

//Vectors and angles
function Vector(x, y, z)
{
    if(Array.isArray(x))
    {
        this.x = x[0];
        this.z = x[1];
        this.y = x[2]; 
    }
    else
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    

    this.GetArr = function()
    {

        return [this.x,this.z,this.y];
    }
    this.GetArr2D = function()
    {
        return [this.x, this.y]
    }
    this.Copy = function()
    {
        return new Vector(und, this.x, this.y, this.z);
    }
    this.Length = function()
    {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }
    this.AddFrom = function(v)
    {

        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

    }
    this.SubFrom = function(v)
    {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
    }
    this.Scale = function(n)
    {
        this.x = this.x * n;
        this.y = this.y * n;
        this.z = this.z * n;
    }
    this.GetScaled = function(n)
    {
        var v = this.Copy()
        v.Scale(n)
        return v
    }
    this.GetNormalized = function()
    {
        var v = this.Copy()
        v.Normalize()
        return v
    }
    this.Normalize = function()
    {
        var length = this.Length();
        if(length > 0)
        {
            this.x = this.x / length;
            this.y = this.y / length;
            this.z = this.z / length;
        }
        
    }
    this.Add = function(v)
    {
        res = new Vector(und, this.x + v.x,this.y + v.y,this.z + v.z);
        return res;
    };
    this.Sub = function(v)
    {
        res = new Vector(
            und,
            this.x - v.x,
            this.y - v.y,
            this.z - v.z)
            return res;
    }

    this.Dot = function(v)
    {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }


}


//UI WRAPPERS
const SLIDERINT =     0;
const SLIDERFLOAT =   1;
const DROPDOWN =      2;
const MULTIDROPDOWN = 3;
const CHECKBOX =      4;
const TEXTBOX =       5;
const COLORPICKER =   6;
const HOTKEY =        7;

function UIElement(path, name, type, val1, val2)
{

    this.path = path;
    this.name = name;
    this.fullpath = this.path.concat(this.name)
    this.type = type;
    this.val1 = val1;
    this.val2 = val2;

    this.Get = function()
    {
        return UI.GetValue(this.fullpath);
    }
    this.Set = function(n)
    {
        UI.SetValue(this.fullpath, n);
    }
    this.Hide = function()
    {
        UI.SetEnabled(this.fullpath, 0);
    }
    this.Show = function()
    {
        UI.SetEnabled(this.fullpath, 1);
    }
    this.Delete = function()
    {
        UI.RemoveItem(this.fullpath);
    }

    switch(this.type)
    {
        case SLIDERINT:
            UI.AddSliderInt(this.path, this.name, this.val1, this.val2);
            break;
        case SLIDERFLOAT:
            UI.AddSliderFloat(this.path, this.name, this.val1, this.val2);
            break;
        case DROPDOWN:
            if(this.val2 == undefined)
            {
                this.val2 = 0;
            }
            UI.AddDropdown(this.path, this.name, this.val1, this.val2);
            break;

        case MULTIDROPDOWN:
            
            UI.AddMultiDropdown(this.path, this.name, this.val1)
            this.GetAtIndex = function(i)
            {
                var mask = 1 << i;
                return UI.GetValue(this.fullpath) & mask ? true : false;

            }
            this.SetAtIndex = function(i)
            {
                UI.SetValue(this.fullpath, UI.GetValue(this.fullpath) | (1 << i));
            }
            this.GetAll = function()
            {
                var res = []
                for(var i = 0; i < 32; i++)
                {
                    var state = this.GetAtIndex(i)
                    if(state == true)
                    {
                        res.push(this.val1[i])
                    }
                }
                return res   
            }
            break;
        case CHECKBOX:
            UI.AddCheckbox(this.path, this.name);
            break;

        case TEXTBOX:
            UI.AddTextbox(this.path, this.name);
            this.Get = function()
            {
                return UI.GetString(this.fullpath);
            }
            break;
            
        case COLORPICKER:

            UI.AddColorPicker(this.path, this.name);

            this.Get = function()
            {
                return UI.GetColor(this.fullpath);
            }
            this.Set = function(n)
            {
                UI.SetColor(this.fullpath, n);
            }
            break;
        case HOTKEY:
            UI.AddHotkey(this.path, this.name, this.val1);
            this.GetState = function()
            {
                return UI.GetHotkeyState(this.fullpath);
            }
            this.SetState = function(n)
            {
                UI.SetHotkeyState(this.fullpath, n);
            }

            this.Set = function(n)
            {
                this.Get() != n ? UI.ToggleHotkey(this.fullpath) : 0;
            }
            this.Toggle = function()
            {
                UI.ToggleHotkey(this.fullpath)
            }
            break;
    }


}


function print(v)
{
    Cheat.Print(v.toString())
    Cheat.Print("\n")
}

/*
SFX = {
    onSight : [
        "danger_alarm.wav",
        "oh_mah_god.wav",
        "impostor.wav",
        "scary_violin.wav",
    ],
    onDeath : [
        "disintergrating_emoji.wav",
        "mutahar_laugh.wav",
        "funny_fail.wav"
        
    ],
    onKill : [
        "woo_yeah_baby.wav",
        "certified_hood_classic.wav"
    ],

    
    onMiss : [
        "oh_hell_naw.wav",
        "funny_chuckle.wav",
        //hahahhahahahha
        "cartoon_slipping.wav"
        
    ],
    onHit : [
        "apple_success.wav"
    ],
}
*/
// 2lazy 2bad

function Timer(time)
{
    this.curTime = 0.0
    this.targetTime = time
    this.Check = function()
    {
        if(this.curTime > this.targetTime)
        {
            return true
        }
        return false
    }
    this.CheckAndReset = function()
    {
        if(this.Check())
        {
            this.curTime = 0.0
            return true
        }
        return false
    }
    this.Increment = function(t)
    {
        this.curTime += t
    }
}

//END LIBS
//GLOBALS
UI.AddSubTab(["Config", "SUBTAB_MGR"], "Funny JZ Settings")
const UI_PATH = ["Config", "SUBTAB_MGR", "Funny JZ Settings", "SHEET_MGR", "Funny JZ Settings"];

SFX_ALL = [
    "danger_alarm",
    "oh_mah_god",
    "impostor",
    "scary_violin",
    "fnaf_hallway",
    "disintergrating_emoji",
    "mutahar_laugh",
    "funny_fail",
    "woo_yeah_baby",
    "certified_hood_classic",
    "oh_hell_naw",
    "funny_chuckle",
    "cartoon_slipping",
    "apple_success",
    "amogus",
    "bonk",
    "bruh",
    "fart_earrape",
    "vineboom",
    "amogus_drip"
]

IMG_NAMES = {
    circ_arrow : "ot/scripts/red_circle_and_arrow.png",
}

G = {
    interpSpeed : new UIElement(UI_PATH, "Interpolation speed(per second)", SLIDERFLOAT, 128, 4096),
    delayedInterpTime : new UIElement(UI_PATH, "Time delayed for interpolation", SLIDERFLOAT, 0, 2),
    sfxSettings : {
        "On Sight" : 0,
        "On Death" : 0,
        "On Kill" : 0,
        "On Miss" : 0,
        "On Hit" : 0,
    },
    sfxVolume : new UIElement(UI_PATH, "SFX Volume", SLIDERINT, 0, 100)

}

//initialize the thing
Object.keys(G.sfxSettings).forEach(function(k)
{

    G.sfxSettings[k] = new UIElement(UI_PATH, k, MULTIDROPDOWN, SFX_ALL)
    //Cheat.Print(G.sfxSettings[k].toString())
})





function Enemy(){
    
    this.playedVisible = false;
    this.startPlay = false;
    //start interpolation after x seconds
    this.timeUntilInterp = G.delayedInterpTime.Get()
    this.currentPos = new Vector(0,0,0)



}






//interpolation speed is constant lmao
//Note that these are 2d vecs
function BadInterpolation(p1, p2, speed)
{
    p1.z = 0
    p2.z = 0
    dir = p1.Sub(p2)
    dir.Scale(speed)    
    dir.Add(p1)
    return dir
}



//eid -> enemy
var enemies = {

}

function PlaySound(sfxName, volume)
{
    //playvol "goofy_sfx/name.wav" "volume"
    var command = "playvol " + "\"goofy_sfx/" + sfxName + ".wav\" \"" + volume + '"';
    Cheat.Print(command + "\n")
    Cheat.ExecuteCommand(command)
}


function PlayRand(sfxTableName)
{
    sfxs = G.sfxSettings[sfxTableName].GetAll()
    var item = sfxs[Math.floor(Math.random() * sfxs.length)];
    PlaySound(item, G.sfxVolume.Get())

}

function GetRenderOrigin2D(entity)
{
    var res = Render.WorldToScreen(Entity.GetRenderOrigin(entity))
    return new Vector(res[0], res[1], res[2]);
}

//iterate all enemies
function UpdateEnemies(){
    var localEnemies = Entity.GetEnemies()
    for(i = 0; i < localEnemies.length; i++)
    {
        var curEnemy = localEnemies[i]
        if(Entity.IsDormant(curEnemy) || !Entity.IsAlive(curEnemy))
        {
            delete enemies[curEnemy];
            continue;

        }

        var isNew = enemies[curEnemy] == undefined;
        //if is new
        if(isNew)
        {
            enemies[curEnemy] = new Enemy()
            
        }
        enemies[curEnemy].currentPos = GetRenderOrigin2D(curEnemy);
        //if visible
        if(enemies[curEnemy].currentPos.z == 1)
        {
            //if havnt played yet
            if(!enemies[curEnemy].playedVisible)
            {
                enemies[curEnemy].startPlay = true;
            }

        }
        else
        {
            enemies[curEnemy].playedVisible = false
        }
        
    }
}

function EnemyUpdateCallback(enemyInstance)
{
    if(enemyInstance.startPlay)
    {
        enemyInstance.startPlay = false;
        OnSightSFX()
        enemyInstance.playedVisible = true;
    }
    
}
function DrawRedCircle(enemyID)
{
    var pos = GetRenderOrigin2D(parseInt(enemyID));
    if(!pos)
    {
        return;
    }

    if(pos.z == 0)
    {
        return;
    }
    //possible optimization?
    
    var width = 225;
    var height = 225;

    var texture = Render.AddTexture(IMG_NAMES.circ_arrow);
    Render.TexturedRect(pos.x - width / 2, pos.y - height / 2, width, height, texture);
    
}

function IterateEnemies()
{
    //Object.values(enemies).forEach(EnemyUpdateCallback);
    Object.keys(enemies).forEach(function(k)
    {
        DrawRedCircle(k);
        EnemyUpdateCallback(enemies[k])
    });
}




function OnSightSFX(){
    PlayRand("On Sight")
}
function OnKillSFX(){
    PlayRand("On Kill")
}
function OnMissSFX(){
    PlayRand("On Miss")
}
function OnDeathSFX(){
    PlayRand("On Death")
}
function OnHitSFX(){
    PlayRand("On Hit")
}




function OnHit()
{
    var attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"))
    if(attacker)
    {
        if(Entity.IsLocalPlayer(attacker))
        {
            OnHitSFX()
        }
    }
}

function OnDeath()
{
    var deadPlayer = Entity.GetEntityFromUserID(Event.GetInt("userid"))
    var attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"))
    if(Entity.IsLocalPlayer(deadPlayer))
    {
        OnDeathSFX()
        return
    }
    if(!attacker)
    {
        return
    }
    if(Entity.IsLocalPlayer(attacker))
    {
        OnKillSFX()
    }
}

//TODO: finish onmiss
function OnBulletImpact()
{
    
}

//Draw the red circles n shit
function OnDraw()
{
    //Cheat.Print("draw called\n")
    UpdateEnemies()
    IterateEnemies()
    
}

//TODO: do only visible thing
function OnCM()
{

}
Cheat.RegisterCallback("player_death", "OnDeath")
Cheat.RegisterCallback("player_hurt", "OnHit")
Cheat.RegisterCallback("Draw", "OnDraw")