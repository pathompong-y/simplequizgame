var currentstate = "intro";

var introspeech = [
    "Hi! I\'m the Clutter Hunter.<br>I\'m on the quest to clear document clutter.",
    "I\'ll face with 3 rageful chubby unorganized folders.",
    "They will harm me, if i can't make decision well on how should I declutter them.",
    "Please help me complete it!"
];
var introspeechIndex = 0;

var newenemyspeech = [
//    "Brace yourself! something is coming!",
    "...hm...this guy could be"
];
var newenemyspeechIndex = 0;

var toolURL = [
    "<img src='img\\tool_sharepoint.png'>",
    "<img src='img\\tool_onedrive.png'>",
    "<img src='img\\tool_recycle.png'>"
];

var playerSprite = [
    "<img src='img\\player_idle.png'>",
    "<img src='img\\player_atk.png'>",
    "<img src='img\\player_dmg.png'>",
    "<img src='img\\player_win.png'>"
];

var enemypaperSprite = [
    "<img src='img\\folder_paper_fly_1.png'>",
    "<img src='img\\folder_paper_fly_2.png'>"
];

var enemySprite = [
    "<img src='img\\folder_battle.png'>",
    "<img src='img\\folder_win.png'>"
];

var userinput = 0;
var inputScore = -1;
var userHP = 2;
var enemyNum = 3;
var playercontainer_offset;
var playercontainer_height;

var enemycontainer_offset;
var enemycontainer_height;
var enemycontainer_width;

var question;

$(document).ready(function(){

    //Main flow start from here
    
    //Force hide both scroll
    $("body").css("overflow","hidden");
    
    question = RandomlyGetQuestions(5);
    console.log(question);
    
    playercontainer_offset = $(".playercontainer").offset();
    playercontainer_height = $(".playercontainer").height();
    enemycontainer_offset = $(".enemycontainer").offset();
    enemycontainer_height = $(".enemycontainer").height();
    enemycontainer_width = $(".enemycontainer").width();
        
   
    if(currentstate == "intro")
    {
        //start intro
        setTimeout(function(e){
            introspeechIndex = 0;
            togglePlayerSpeech(true);
        },2000);
            
    }
        
    
    //Input handler
    $(".speech-bubble-player").hover(function(e){
        $(this).css("cursor","pointer");
    });
    
    $(".startgame").click(function(e){
        $(".splash").animate({opacity:"0"},function(e){
            $(".splash").css("display","none");
        });
    });
    
    $(".speech-bubble-player").click(function(e){
        if(currentstate == "intro")
        {
            togglePlayerSpeech(true);
        }
        else if(currentstate == "newenemy")
        {
            togglePlayerSpeech(true);
        }
        else if(currentstate == "turnsummary")
        {
            if(enemyNum > 0)
            {
                //reset sprite
                $(".toolcontainer").animate({opacity: "0"});
                $(".tooleffectcontainer").animate({opacity: "0"});
                $(".toolshadow").animate({opacity: "0"});
                $(".player").html(playerSprite[0]);
                
                $(".enemyspritecontainer").animate({opacity: "0"},function(e){
                    $(".enemy").html(enemySprite[0]);
                });
                callNewEnemy();
                currentstate = "newenemy";
                togglePlayerSpeech(true);
            }
        }
    });
    
    $(".buttonlablecontainer").hover(function(e){
        $(this).css("cursor","pointer");
    });
    $(".buttonlablecontainer").click(function(e){
        if(userinput==0)
        {
            $(this).find(".buttonlabel").addClass("select");
            var thisans = $(this).attr("id");

            if(thisans == "record")
            {
                userinput = 1;
                togglePlayerSpeech(true, "I'll treat you as <b>company record</b>...go to SOR");
                
            }
            else if (thisans == "reference")
            {
                userinput = 2;
                togglePlayerSpeech(true, "I'll treat you as my <b>business reference</b>...go to my One Drive");
                
            }
            else if (thisans == "rot")
            {
                userinput = 3;
                togglePlayerSpeech(true, "I'll treat you as <b>R.O.T</b>...go to my recycle bin");
                
            }            
            
            //call answer validation here
            if(IsCorrect(question[enemyNum-1],userinput))
                inputScore=true;
            else
                inputScore=false;
            
            $(".toolcontainer").html(toolURL[userinput-1]);
            $(".player").html(playerSprite[1]);
            $(".tooleffectcontainer").css("top",playercontainer_offset.top + playercontainer_height/2 - $(".toolcontainer").height()*1.2);
            $(".tooleffectcontainer").css("left",playercontainer_offset.left - $(".toolcontainer").width()*1.2);
            $(".tooleffectcontainer").animate({opacity: "1"});
            $(".toolcontainer").animate({opacity: "1"});

            var newleft = enemycontainer_offset.left+(playercontainer_offset.left - enemycontainer_offset.left)/2 + enemycontainer_width - $(".tooleffectcontainer").width()*2;

            $(".tooleffectcontainer").animate({
                                                top: "-="+playercontainer_height*0.4,
                                                left: (playercontainer_offset.left - enemycontainer_offset.left)/2 + $(".toolcontainer").width()
                                                },function(e){
                if(inputScore)
                {
                    //toggle right animation
                    $(".enemypaperfly").css("top",enemycontainer_offset.top-$(".enemypaperfly").height()*0.3);
                    $(".enemypaperfly").css("left",enemycontainer_offset.left+enemycontainer_width*0.6);

                    $(".enemypaperfly").animate({opacity: "1"});
                    $(".enemypaperfly").animate({opacity: "0"});
                    $(".enemypaperfly").html(enemypaperSprite[1]);
                    $(".enemypaperfly").animate({opacity: "1"});
                    $(".enemypaperfly").animate({opacity: "0"});
                    $(".enemypaperfly").html(enemypaperSprite[0]);
                    $(".enemypaperfly").animate({opacity: "1"});
                    $(".enemypaperfly").animate({opacity: "0"}, function(e){
                        $(".enemy").html(enemySprite[1]);    
                    });
                    $(".enemypaperfly").html(enemypaperSprite[1]);
                    $(".enemypaperfly").animate({opacity: "1"});
                    $(".enemypaperfly").animate({opacity: "0"},function(e){
                        togglePlayerSpeech(false);
                        endAnimation();
                    });
                }    
                
                if(!inputScore)
                {
                    //toggle wrong animation
                    setTimeout(function(){
                        togglePlayerSpeech(true,".......oops");
                        endAnimation();
                    },2000);
                    
                }
            });
        }
    });
    
    $(".retry").click(function(e){
        location.reload();
    });
});

function togglePlayerSpeech(toggle, text=null)
{
    var classname = ".speech-bubble-player";
    var selfheight;
    var selfwidth;
    
    if(toggle)
    {
        $(classname).animate({opacity: "0"},function()
        {
            if(currentstate == "intro")
            {
                if(introspeechIndex < introspeech.length)
                {
                    text = introspeech[introspeechIndex];
                    introspeechIndex++;
                    if(introspeechIndex >= introspeech.length)
                    {
                        introspeechIndex=0;
                        currentstate = "newenemy";
                        toggleEnemyHP(true);
                    }
                }
                else
                {
                    introspeechIndex=0;
                    currentstate = "newenemy";
                }
            }
            else if(currentstate == "newenemy")
            {
                if(newenemyspeechIndex < newenemyspeech.length)
                {
                    text = newenemyspeech[newenemyspeechIndex];
                    newenemyspeechIndex++;
                }
                else
                {
                    //get question here
                    currentstate = "waitforinput";
                    text = "<b>" + question[enemyNum-1].question + "</b><br>How should I treat this document...?";
                    newenemyspeechIndex = 0;
                }
            }
            else if(currentstate == "waitforinput")
            {
                //
            }
                        
            $(classname+" span").html(text);
            selfheight = $(classname).height() + 50;
            selfwidth = $(classname).width();
            $(classname).css("top",playercontainer_offset.top+playercontainer_height+20);
            
            $(classname).animate({opacity: "1"},function(e){
                //handle after animation end for specific case
                if(currentstate == "waitforinput")
                {
                    $(".nextbutton").css("opacity","0");
                    if($(".buttoncontainer").css("opacity")!=1)
                    {
                        showControl(true);
                    }
                }
                else if(currentstate == "turnsummary")
                {
                    $(".nextbutton").css("opacity","1");
                }
            });
        });
        
    }else{
        $(classname).animate({opacity: "0"});
    }
}

function toggleEnemyHP(toggle)
{
    if(toggle)
    {
        $(".enemyhealth").removeClass("lost");
        $(".enemyhealthcontainer").animate({opacity: "1"},function(e){
            callNewEnemy();
        });
    }
    else
    {
        $(".enemyhealthcontainer").animate({opacity: "0"});
    }
        
}

function endAnimation()
{
    $(".tooleffectcontainer").animate({top: playercontainer_offset.top + playercontainer_height*0.5},function(e){
        var thisoffset = $(".toolcontainer").offset();    
        $(".toolshadow").css("opacity","1");
        $(".toolshadow").css("top",thisoffset.top + $(".toolcontainer").height());
        $(".toolshadow").css("left",thisoffset.left);
        
        if(inputScore)
        {
            $(".player").html(playerSprite[3]);
            $(".enemyhealth#"+enemyNum).addClass("lost");
            if(enemyNum>0)
            {
                enemyNum--;
                showControl(false);
                currentstate = "turnsummary";
                togglePlayerSpeech(true, "YEAH! That's correct");
                
                if(enemyNum == 0)
                {
                    //End
                    currentstate = "end";
                    $(".winscreen").css("display","block");
                    $(".winscreen").animate({opacity:"0.9"});
                }
                            
            }
            
        }else{
            
            setTimeout(function(e){
                
                    
                    $(".enemyattackcontainer").css("top",enemycontainer_offset.top - $(".enemy").height()*0.3);
                    $(".enemyattackcontainer").css("left",enemycontainer_offset.left + enemycontainer_width*0.6);
                    $(".playerdamagecontainer").css("top", -1*$(".playerdamagecontainer").height());
                    $(".playerdamagecontainer").css("left", $(".playerdamagecontainer").width()*1.4);

                    $(".enemy").transition({
                        rotate: "+=30deg"
                    });
                    
                    $(".enemyattackcontainer").animate({
                                                        opacity: "1",
                                                       left: "+=10"
                                                       },"slow",function(e){
                        
                        if(userHP > 0)
                        {
                            $(".playerhealth#hp"+userHP).addClass("lost");
                            
                            userHP--;
                            $(".player").html(playerSprite[2]);
                            showControl(false);
                            currentstate = "turnsummary";
                            
                            togglePlayerSpeech(true, "OUCH! That didn't work!");

                            setTimeout(function(){
                                inputScore = -1;
                                $(".enemyattackcontainer").animate({opacity: "0"});
                                $(".enemy").transition({
                                    rotate: "-=30deg"
                                });

                                $(".toolcontainer").animate({opacity: "0"});
                                $(".tooleffectcontainer").animate({opacity: "0"});
                                $(".toolshadow").animate({opacity: "0"});
                                
                                if(userHP >0)
                                {
                                    $(".player").html(playerSprite[0]);
                                    newenemyspeechIndex = newenemyspeech.length;
                                    currentstate = "newenemy";
                                    togglePlayerSpeech(true);
                                    
                                }else{
                                    currentstate = "end";
                                    $(".gameover").css("display","block");
                                    $(".gameover").animate({opacity:"0.9"});                
                                }
                                    
                            },1500);
                        }
                    });
            },1000);
            
            
        }
    });
}

function callNewEnemy()
{
    $(".enemyspritecontainer").animate({opacity: "1"});
}

function showControl(toggle)
{
    if(toggle)
    {
        var playercontainer_offset = $(".playercontainer").offset();
        var speech_offset = $(".speech-bubble-player").offset();
        var speech_height = $(".speech-bubble-player").height();
        speech_height = speech_height+20;
        $(".buttoncontainer").css("top",speech_offset.top);
        
        $(".buttoncontainer").animate({
                            opacity: "1",
                            top: "+="+speech_height,
                                      });
        $(".button").animate({opacity: "1"});
        $("#record").animate({opacity: "1"});
        $("#reference").animate({opacity: "1"});
        $("#rot").animate({opacity: "1"});
    }else{
        $(".buttoncontainer").animate({opacity: "0"});
        $(".buttonlabel").removeClass("select");
        inputScore = -1;
        userinput = 0;
    }
        
}