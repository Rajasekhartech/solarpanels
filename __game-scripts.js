var GlobalVariables=pc.createScript("globalVariables");GlobalVariables.attributes.add("IsGamePause",{type:"boolean",default:!1}),GlobalVariables.attributes.add("IsControllBlocked",{type:"boolean",default:!1}),GlobalVariables.attributes.add("GameManager",{type:"entity"}),GlobalVariables.attributes.add("SoundManager",{type:"entity"}),GlobalVariables.attributes.add("UIManager",{type:"entity"}),GlobalVariables.prototype.initialize=function(){window.globalVariables=this};var SoundManager=pc.createScript("soundManager");SoundManager.attributes.add("Common",{type:"entity"}),SoundManager.prototype.Play=function(){this.Common.sound.play("")},SoundManager.prototype.Play=function(){this.Common.sound.play("")},SoundManager.prototype.Play=function(){this.Common.sound.play("")},SoundManager.prototype.Play=function(){this.Common.sound.play("")},SoundManager.prototype.Play=function(){this.Common.sound.play("")},SoundManager.prototype.Play=function(){this.Common.sound.play("")},SoundManager.prototype.Play=function(){this.Common.sound.play("")};var AnimateSprite=pc.createScript("animateSprite");AnimateSprite.attributes.add("startFrame",{type:"number",default:0,description:"Frame to start animation from"}),AnimateSprite.attributes.add("numFrames",{type:"number",default:1,description:"Number of frames to play before looping"}),AnimateSprite.attributes.add("frameRate",{type:"number",default:1,description:"Playback frames per second"}),AnimateSprite.prototype.initialize=function(){this.timer=1/this.frameRate,this.frame=this.startFrame},AnimateSprite.prototype.update=function(t){this.timer-=t,this.timer<0&&(this.frame++,this.frame>=this.numFrames+this.startFrame&&(this.frame=this.startFrame),this.entity.element.spriteFrame=this.frame,this.timer=1/this.frameRate)};var GameManager=pc.createScript("gameManager");GameManager.attributes.add("UiManager",{type:"entity"}),GameManager.attributes.add("GameDurationInSec",{type:"number"}),GameManager.attributes.add("StarCount",{type:"number"}),GameManager.attributes.add("IsGameStart",{type:"boolean",default:!1}),GameManager.attributes.add("BlowerEntity",{type:"entity"}),GameManager.attributes.add("BulletEntity",{type:"entity"}),GameManager.attributes.add("BulletSpawningPosition",{type:"entity"}),GameManager.attributes.add("IsShootBlock",{type:"boolean",default:!1}),GameManager.attributes.add("LampHandler",{type:"entity"}),GameManager.attributes.add("FanHandler",{type:"entity"}),GameManager.attributes.add("TvHandler",{type:"entity"}),GameManager.attributes.add("FridgeHandler",{type:"entity"}),GameManager.attributes.add("RandomHandlers",{type:"number",array:!0}),GameManager.prototype.initialize=function(){this.UiManager.script.uimanager.UpdateTimer(this.GameDurationInSec),this.StartGame()},GameManager.prototype.StartGame=function(){globalVariables.IsGamePause=!1,this.IsGameStart=!0,this.CreateCloudSet()},GameManager.prototype.CreateCloudSet=function(){var a=Math.floor(pc.math.random(1,4));this.SuffleRandomHandlers(),console.log(a);for(var t=0;t<a;t++)0===this.RandomHandlers[t]?this.LampHandler.script.lampHandler.ShowCloud():1===this.RandomHandlers[t]?this.FanHandler.script.fanHandler.ShowCloud():2===this.RandomHandlers[t]?this.TvHandler.script.tvHandler.ShowCloud():3===this.RandomHandlers[t]&&this.FridgeHandler.script.fridgeHandler.ShowCloud()},GameManager.prototype.SuffleRandomHandlers=function(){for(var a=0;a<this.RandomHandlers.length;a++){var t=Math.floor(Math.random()*this.RandomHandlers.length),e=this.RandomHandlers[t];this.RandomHandlers[t]=this.RandomHandlers[a],this.RandomHandlers[a]=e}},GameManager.prototype.CloudHidded=function(a){globalVariables.GameManager.script.gameManager.AddStar(1);var t=this.LampHandler.script.lampHandler,e=this.FanHandler.script.fanHandler,r=this.TvHandler.script.tvHandler,o=this.FridgeHandler.script.fridgeHandler,n=1,i=3;if(this.GameDurationInSec<20?(n=1,i=3):(n=1,i=2),0===a){t.IsCloudShowing=!1;for(var s=Math.floor(pc.math.random(n,i)),l=0;l<s;l++)e.IsCloudShowing?r.IsCloudShowing?o.IsCloudShowing||o.ShowCloud():r.ShowCloud():e.ShowCloud()}else if(1===a){e.IsCloudShowing=!1;for(var d=Math.floor(pc.math.random(n,i)),h=0;h<d;h++)t.IsCloudShowing?r.IsCloudShowing?o.IsCloudShowing||o.ShowCloud():r.ShowCloud():t.ShowCloud()}else if(2===a){r.IsCloudShowing=!1;for(var m=Math.floor(pc.math.random(n,i)),u=0;u<m;u++)t.IsCloudShowing?e.IsCloudShowing?o.IsCloudShowing||o.ShowCloud():e.ShowCloud():t.ShowCloud()}else if(3===a){o.IsCloudShowing=!1;for(var g=Math.floor(pc.math.random(n,i)),p=0;p<g;p++)t.IsCloudShowing?e.IsCloudShowing?r.IsCloudShowing||r.ShowCloud():e.ShowCloud():t.ShowCloud()}},GameManager.prototype.update=function(a){this.StartEndTimer&&(this.TotalTime-=60*a,this.UiManager.script.uimanager.UpdateTimer(this.TotalTime),this.TotalTime<0&&(this.UiManager.script.uimanager.UpdateTimer(0),this.StartEndTimer=!1)),globalVariables.IsGamePause||this.IsGameStart&&(this.UiManager.script.uimanager.UpdateTimer(this.GameDurationInSec),this.GameDurationInSec-=a,this.GameDurationInSec<0&&(this.GameEnd(),this.IsGameStart=!1))},GameManager.prototype.OnClickShoot=function(){this.IsShootBlock||(this.IsShootBlock=!0,this.CreateBullet(),setTimeout((()=>{this.IsShootBlock=!1}),800))},GameManager.prototype.CreateBullet=function(){var a=this.BulletEntity.clone();a.setPosition(this.BulletSpawningPosition.getPosition()),a.enabled=!0},GameManager.prototype.AddStar=function(a){globalVariables.IsGamePause||(this.StarCount+=a,this.UiManager.script.uimanager.UpdateScore(this.StarCount),this.UiManager.script.uimanager.PlayStarCollectAnimation())},GameManager.prototype.RemoveStar=function(a){globalVariables.IsGamePause||(this.StarCount-=a,this.StarCount<0&&(this.StarCount=0),this.UiManager.script.uimanager.UpdateScore(this.StarCount),this.UiManager.script.uimanager.PlayStarLoseAnimation())},GameManager.prototype.EnergyLosed=function(){globalVariables.IsGamePause=!0,globalVariables.IsControllBlocked=!0,setTimeout((()=>{this.GameEnd()}),3e3)},GameManager.prototype.TimeOut=function(){globalVariables.IsGamePause=!0,globalVariables.IsControllBlocked=!0,this.UiManager.script.uimanager.ShowTimeOut(this.StarCount)},GameManager.prototype.GameEnd=function(){globalVariables.IsGamePause=!0,globalVariables.IsControllBlocked=!0,this.UiManager.script.uimanager.ShowGameEnd(this.StarCount)};pc.script.createLoadingScreen((function(e){var n,t;n=["body {","    background-color: #283538;","}","","#application-splash-wrapper {","    position: absolute;","    top: 0;","    left: 0;","    height: 100%;","    width: 100%;","    background-color: #E33939;","}","","#application-splash {","    position: absolute;","    top: calc(50% - 28px);","    width: 264px;","    left: calc(50% - 132px);","}","","#application-splash img {","    position: absolute;","    margin: 20px auto 0 auto;","    width: 50%;","    left: 25%;","}","","#progress-bar-container {","    margin: 20px auto 0 auto;","    height: 20px;","    width: 100%;","    border: black;","    border-color: white;","    border-style: solid;","    border-width: 5px;","    box-shadow: 5px 5px;","    border-radius: 10px;","    background-color: #F7B4B4;","}","","#progress-bar {","    width: 0%;","    height: 100%;","    background-color: #E33939;","}","","@media (max-width: 480px) {","    #application-splash {","        width: 170px;","        left: calc(50% - 85px);","    }","}"].join("\n"),(t=document.createElement("style")).type="text/css",t.styleSheet?t.styleSheet.cssText=n:t.appendChild(document.createTextNode(n)),document.head.appendChild(t),function(){var e=document.createElement("div");e.id="application-splash-wrapper",document.body.appendChild(e);var n=document.createElement("div");n.id="application-splash",e.appendChild(n),n.style.display="none";var t=document.createElement("div");t.id="progress-bar-container",n.appendChild(t);var a=document.createElement("div");a.id="progress-bar",t.appendChild(a);var r=document.createElement("img");r.src="data:image/png;base64,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",n.appendChild(r),r.onload=function(){n.style.display="block"}}(),e.on("preload:end",(function(){e.off("preload:progress")})),e.on("preload:progress",(function(e){var n=document.getElementById("progress-bar");n&&(e=Math.min(1,Math.max(0,e)),n.style.width=100*e+"%")})),e.on("start",(function(){var e=document.getElementById("application-splash-wrapper");e.parentElement.removeChild(e)}))}));var Uimanager=pc.createScript("uimanager");function setCookie(t,n,e){var i=new Date;i.setDate(i.getDate()+e);var a=escape(n)+(null==e?"":"; expires="+i.toUTCString());document.cookie=t+"="+a+"; path=/"}Uimanager.attributes.add("TimerTxt",{type:"entity"}),Uimanager.attributes.add("ScoreTxt",{type:"entity"}),Uimanager.attributes.add("StarCollectAnim",{type:"entity"}),Uimanager.attributes.add("StarLoseAnim",{type:"entity"}),Uimanager.attributes.add("PauseBtnEntity",{type:"entity"}),Uimanager.attributes.add("PauseMenuEntity",{type:"entity"}),Uimanager.attributes.add("ResumeBtnEntity",{type:"entity"}),Uimanager.attributes.add("RestartBtnEntity",{type:"entity"}),Uimanager.attributes.add("SoundMuteBtn",{type:"entity"}),Uimanager.attributes.add("SoundUnMuteBtn",{type:"entity"}),Uimanager.attributes.add("ExitBtn",{type:"entity"}),Uimanager.attributes.add("GameEndEntity",{type:"entity"}),Uimanager.attributes.add("GameEndRemainingTimeTxt",{type:"entity"}),Uimanager.attributes.add("GameEndStarCountTxt",{type:"entity"}),Uimanager.attributes.add("GameEndRestartEntity",{type:"entity"}),Uimanager.attributes.add("GameEndContinueBtnEntity",{type:"entity"}),Uimanager.attributes.add("TimeOutEntity",{type:"entity"}),Uimanager.attributes.add("TimeOutStarCountTxt",{type:"entity"}),Uimanager.attributes.add("TimeOutRestartEntity",{type:"entity"}),Uimanager.attributes.add("TimeOutContinueBtnEntity",{type:"entity"}),Uimanager.attributes.add("ShootBtn",{type:"entity"}),Uimanager.prototype.initialize=function(){this.PauseBtnEntity.button.on("mousedown",this.OnClickPlause,this),this.ResumeBtnEntity.button.on("mousedown",this.OnClickResume,this),this.RestartBtnEntity.button.on("mousedown",this.OnClickRestart,this),this.SoundMuteBtn.button.on("mousedown",this.OnClickMute,this),this.SoundUnMuteBtn.button.on("mousedown",this.OnClickUnMute,this),this.ExitBtn.button.on("mousedown",this.OnClickContinue,this),this.GameEndRestartEntity.button.on("mousedown",this.OnClickRestart,this),this.GameEndContinueBtnEntity.button.on("mousedown",this.OnClickContinue,this),this.TimeOutRestartEntity.button.on("mousedown",this.OnClickRestart,this),this.TimeOutContinueBtnEntity.button.on("mousedown",this.OnClickContinue,this),this.ShootBtn.button.on("mousedown",this.OnClickShoot,this),this.PauseBtnEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickPlause,this),this.ResumeBtnEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickResume,this),this.RestartBtnEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickRestart,this),this.SoundMuteBtn.button.on(pc.EVENT_TOUCHEND,this.OnClickMute,this),this.SoundUnMuteBtn.button.on(pc.EVENT_TOUCHEND,this.OnClickUnMute,this),this.ExitBtn.button.on(pc.EVENT_TOUCHSTART,this.OnClickContinue,this),this.GameEndRestartEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickRestart,this),this.GameEndContinueBtnEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickContinue,this),this.TimeOutRestartEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickRestart,this),this.TimeOutContinueBtnEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickContinue,this),this.ShootBtn.button.on(pc.EVENT_TOUCHSTART,this.OnClickShoot,this),this.StartCoinAnim=!1,this.CoinsCount=0,this.CoinAnimCount=0},Uimanager.prototype.OnClickShoot=function(){globalVariables.IsGamePause||globalVariables.GameManager.script.gameManager.OnClickShoot()},Uimanager.prototype.update=function(t){this.StartCoinAnim&&(this.CoinAnimCount+=60*t,this.GameEndStarCountTxt.element.text=Math.round(this.CoinAnimCount),this.CoinsCount<this.CoinAnimCount&&(this.GameEndStarCountTxt.element.text=Math.round(this.CoinAnimCount),this.StartCoinAnim=!1))},Uimanager.prototype.UpdateTimer=function(t){Math.floor(t/3600);var n=Math.floor(t%3600/60),e=Math.round(t%60);this.TimerTxt.element.text=e>9?"0"+n+":"+e:"0"+n+":0"+e},Uimanager.prototype.UpdateScore=function(t){this.ScoreTxt.element.text=t},Uimanager.prototype.PlayStarCollectAnimation=function(){this.StarCollectAnim.enabled=!0,setTimeout((()=>{this.StarCollectAnim.enabled=!1}),800)},Uimanager.prototype.PlayStarLoseAnimation=function(){this.StarLoseAnim.enabled=!0,setTimeout((()=>{this.StarLoseAnim.enabled=!1}),800)},Uimanager.prototype.OnClickPlause=function(){globalVariables.IsGamePause||(globalVariables.IsGamePause=!0,this.PauseMenuEntity.enabled=!0,this.app.timeScale=0)},Uimanager.prototype.OnClickResume=function(){this.app.timeScale=1,this.PauseMenuEntity.enabled=!1,setTimeout((()=>{globalVariables.IsGamePause=!1}),500)},Uimanager.prototype.OnClickMute=function(){this.app.systems.sound.volume=0,this.IsMuted=!1,this.SoundUnMuteBtn.enabled=!0,this.SoundMuteBtn.enabled=!1},Uimanager.prototype.OnClickUnMute=function(){this.app.systems.sound.volume=1,this.IsMuted=!0,this.SoundUnMuteBtn.enabled=!1,this.SoundMuteBtn.enabled=!0},Uimanager.prototype.ShowTimeOut=function(t){this.TimeOutStarCountTxt.element.text=t,this.TimeOutEntity.enabled=!0},Uimanager.prototype.ShowGameEnd=function(t){this.GameEndStarCountTxt.element.text=t,this.GameEndEntity.enabled=!0},Uimanager.prototype.OnClickContinue=function(t){setCookie("SustainabilityProgress",6,1),window.location.replace("../main.html")},Uimanager.prototype.OnClickRestart=function(){this.app.timeScale=1,window.location.reload()};var BlowerHandler=pc.createScript("blowerHandler");BlowerHandler.attributes.add("EndPoint",{type:"vec3"}),BlowerHandler.attributes.add("CycleTime",{type:"number",default:1}),BlowerHandler.prototype.initialize=function(){this.Tween=null,this.Moving()},BlowerHandler.prototype.Moving=function(){this.entity.tween(this.entity.getLocalPosition()).to(this.EndPoint,this.CycleTime,pc.SineOut).loop(!0).yoyo(!0).start()};var BulletHandler=pc.createScript("bulletHandler");BulletHandler.attributes.add("EndPoint",{type:"vec3"}),BulletHandler.attributes.add("CycleTime",{type:"number",default:1}),BulletHandler.prototype.initialize=function(){this.Moving()},BulletHandler.prototype.Moving=function(){var t=this.entity.getLocalPosition().clone();t.y=this.EndPoint.y,this.entity.tween(this.entity.getLocalPosition()).to(t,this.CycleTime,pc.SineOut).loop(!1).yoyo(!1).start(),setTimeout((()=>{this.entity.destroy()}),2e3)};var LampHandler=pc.createScript("lampHandler");LampHandler.attributes.add("HealthBar",{type:"entity"}),LampHandler.attributes.add("Warning",{type:"entity"}),LampHandler.attributes.add("EnergyRatio",{type:"number",default:.05}),LampHandler.attributes.add("BarPositionMin",{type:"number",default:0}),LampHandler.attributes.add("BarPositionMax",{type:"number",default:1}),LampHandler.attributes.add("CloudHandler",{type:"entity"}),LampHandler.attributes.add("IsCloudShowing",{type:"boolean",default:!1}),LampHandler.attributes.add("CloudStageIndex",{type:"number",default:0}),LampHandler.attributes.add("IsGameOver",{type:"boolean",default:!1}),LampHandler.attributes.add("Stage4ScroreReduced",{type:"boolean",default:!1}),LampHandler.attributes.add("Stage5ScroreReduced",{type:"boolean",default:!1}),LampHandler.attributes.add("ForHappyAnimation",{type:"boolean",default:!1}),LampHandler.attributes.add("SpriteAnimation",{type:"entity"}),LampHandler.attributes.add("LampEntity",{type:"entity"}),LampHandler.prototype.initialize=function(){this.IncreaseFactor=this.EnergyRatio},LampHandler.prototype.update=function(e){if(!globalVariables.IsGamePause){var a,t=this.HealthBar.getLocalScale();if(this.IsCloudShowing){var r=this.CloudHandler.script.cloudHandler;console.log(r.StageIndex),0==r.StageIndex?this.IncreaseFactor=.75*this.EnergyRatio:1==r.StageIndex?this.IncreaseFactor=.5*this.EnergyRatio:2==r.StageIndex?this.IncreaseFactor=.25*this.EnergyRatio:3==r.StageIndex?(this.ForHappyAnimation||(this.ForHappyAnimation=!0,this.SpriteAnimation.sprite.play("Happy")),this.IncreaseFactor=0):4==r.StageIndex?(this.Stage4ScroreReduced||(this.SpriteAnimation.sprite.play("Sad"),this.Stage4ScroreReduced=!0,globalVariables.GameManager.script.gameManager.RemoveStar(1)),this.IncreaseFactor=.25*-this.EnergyRatio):5==r.StageIndex&&(this.Stage5ScroreReduced||(this.Stage5ScroreReduced=!0,globalVariables.GameManager.script.gameManager.RemoveStar(1)),this.IncreaseFactor=.5*-this.EnergyRatio)}else this.IncreaseFactor=this.EnergyRatio,this.Stage4ScroreReduced=!1,this.Stage5ScroreReduced=!1,this.ForHappyAnimation=!1;(a=t.x+e*this.IncreaseFactor)<=1&&a>=0?(t.x=a,this.HealthBar.setLocalScale(t)):a<0&&(this.IsGameOver||(this.IsGameOver=!0,this.LampEntity.model.meshInstances[0].material.emissiveIntensity=0,this.LampEntity.model.meshInstances[0].material.update(),globalVariables.GameManager.script.gameManager.EnergyLosed()))}},LampHandler.prototype.ShowCloud=function(){this.IsCloudShowing=!0,this.CloudHandler.enabled=!0,this.CloudHandler.script.cloudHandler.ShowCloud()};var FanHandler=pc.createScript("fanHandler");FanHandler.attributes.add("HealthBar",{type:"entity"}),FanHandler.attributes.add("Warning",{type:"entity"}),FanHandler.attributes.add("EnergyRatio",{type:"number",default:.05}),FanHandler.attributes.add("BarPositionMin",{type:"number",default:0}),FanHandler.attributes.add("BarPositionMax",{type:"number",default:1}),FanHandler.attributes.add("CloudHandler",{type:"entity"}),FanHandler.attributes.add("IsCloudShowing",{type:"boolean",default:!1}),FanHandler.attributes.add("IsGameOver",{type:"boolean",default:!1}),FanHandler.attributes.add("Stage4ScroreReduced",{type:"boolean",default:!1}),FanHandler.attributes.add("Stage5ScroreReduced",{type:"boolean",default:!1}),FanHandler.attributes.add("ForHappyAnimation",{type:"boolean",default:!1}),FanHandler.attributes.add("SpriteAnimation",{type:"entity"}),FanHandler.attributes.add("FanAnimation",{type:"entity"}),FanHandler.prototype.initialize=function(){this.IncreaseFactor=this.EnergyRatio},FanHandler.prototype.update=function(a){if(!globalVariables.IsGamePause){var e,t=this.HealthBar.getLocalScale();if(this.IsCloudShowing){var n=this.CloudHandler.script.cloudHandler;console.log(n.StageIndex),0==n.StageIndex?this.IncreaseFactor=.75*this.EnergyRatio:1==n.StageIndex?this.IncreaseFactor=.5*this.EnergyRatio:2==n.StageIndex?this.IncreaseFactor=.25*this.EnergyRatio:3==n.StageIndex?(this.ForHappyAnimation||(this.ForHappyAnimation=!0,this.SpriteAnimation.sprite.play("Happy")),this.IncreaseFactor=0):4==n.StageIndex?(this.Stage4ScroreReduced||(this.SpriteAnimation.sprite.play("Sad"),this.Stage4ScroreReduced=!0,globalVariables.GameManager.script.gameManager.RemoveStar(1)),this.IncreaseFactor=.25*-this.EnergyRatio):5==n.StageIndex&&(this.Stage5ScroreReduced||(this.Stage5ScroreReduced=!0,globalVariables.GameManager.script.gameManager.RemoveStar(1)),this.IncreaseFactor=.5*-this.EnergyRatio)}else this.IncreaseFactor=this.EnergyRatio,this.Stage4ScroreReduced=!1,this.Stage5ScroreReduced=!1,this.ForHappyAnimation=!1;(e=t.x+a*this.IncreaseFactor)<=1&&e>=0?(t.x=e,this.HealthBar.setLocalScale(t)):e<0&&(this.IsGameOver||(this.IsGameOver=!0,this.FanAnimation.animation.enabled=!1,globalVariables.GameManager.script.gameManager.EnergyLosed()))}},FanHandler.prototype.ShowCloud=function(){this.IsCloudShowing=!0,this.CloudHandler.enabled=!0,this.CloudHandler.script.cloudHandler.ShowCloud()};var TvHandler=pc.createScript("tvHandler");TvHandler.attributes.add("HealthBar",{type:"entity"}),TvHandler.attributes.add("Warning",{type:"entity"}),TvHandler.attributes.add("EnergyRatio",{type:"number",default:.05}),TvHandler.attributes.add("BarPositionMin",{type:"number",default:0}),TvHandler.attributes.add("BarPositionMax",{type:"number",default:1}),TvHandler.attributes.add("CloudHandler",{type:"entity"}),TvHandler.attributes.add("IsCloudShowing",{type:"boolean",default:!1}),TvHandler.attributes.add("IsGameOver",{type:"boolean",default:!1}),TvHandler.attributes.add("Stage4ScroreReduced",{type:"boolean",default:!1}),TvHandler.attributes.add("Stage5ScroreReduced",{type:"boolean",default:!1}),TvHandler.attributes.add("ForHappyAnimation",{type:"boolean",default:!1}),TvHandler.attributes.add("SpriteAnimation",{type:"entity"}),TvHandler.attributes.add("MonitorOff",{type:"entity"}),TvHandler.prototype.initialize=function(){this.IncreaseFactor=this.EnergyRatio},TvHandler.prototype.update=function(e){if(!globalVariables.IsGamePause){var t,a=this.HealthBar.getLocalScale();if(this.IsCloudShowing){var r=this.CloudHandler.script.cloudHandler;console.log(r.StageIndex),0==r.StageIndex?this.IncreaseFactor=.75*this.EnergyRatio:1==r.StageIndex?this.IncreaseFactor=.5*this.EnergyRatio:2==r.StageIndex?this.IncreaseFactor=.25*this.EnergyRatio:3==r.StageIndex?(this.ForHappyAnimation||(this.ForHappyAnimation=!0,this.SpriteAnimation.sprite.play("Happy")),this.IncreaseFactor=0):4==r.StageIndex?(this.Stage4ScroreReduced||(this.SpriteAnimation.sprite.play("Sad"),this.Stage4ScroreReduced=!0,globalVariables.GameManager.script.gameManager.RemoveStar(1)),this.IncreaseFactor=.25*-this.EnergyRatio):5==r.StageIndex&&(this.Stage5ScroreReduced||(this.Stage5ScroreReduced=!0,globalVariables.GameManager.script.gameManager.RemoveStar(1)),this.IncreaseFactor=.5*-this.EnergyRatio)}else this.IncreaseFactor=this.EnergyRatio,this.Stage4ScroreReduced=!1,this.Stage5ScroreReduced=!1,this.ForHappyAnimation=!1;(t=a.x+e*this.IncreaseFactor)<=1&&t>=0?(a.x=t,this.HealthBar.setLocalScale(a)):t<0&&(this.IsGameOver||(this.IsGameOver=!0,this.MonitorOff.enabled=!0,globalVariables.GameManager.script.gameManager.EnergyLosed()))}},TvHandler.prototype.ShowCloud=function(){this.IsCloudShowing=!0,this.CloudHandler.enabled=!0,this.CloudHandler.script.cloudHandler.ShowCloud()};var FridgeHandler=pc.createScript("fridgeHandler");FridgeHandler.attributes.add("HealthBar",{type:"entity"}),FridgeHandler.attributes.add("Warning",{type:"entity"}),FridgeHandler.attributes.add("EnergyRatio",{type:"number",default:.05}),FridgeHandler.attributes.add("BarPositionMin",{type:"number",default:0}),FridgeHandler.attributes.add("BarPositionMax",{type:"number",default:1}),FridgeHandler.attributes.add("CloudHandler",{type:"entity"}),FridgeHandler.attributes.add("IsCloudShowing",{type:"boolean",default:!1}),FridgeHandler.attributes.add("IsGameOver",{type:"boolean",default:!1}),FridgeHandler.attributes.add("Stage4ScroreReduced",{type:"boolean",default:!1}),FridgeHandler.attributes.add("Stage5ScroreReduced",{type:"boolean",default:!1}),FridgeHandler.attributes.add("ForHappyAnimation",{type:"boolean",default:!1}),FridgeHandler.attributes.add("SpriteAnimation",{type:"entity"}),FridgeHandler.prototype.initialize=function(){this.IncreaseFactor=this.EnergyRatio},FridgeHandler.prototype.update=function(e){if(!globalVariables.IsGamePause){var a,t=this.HealthBar.getLocalScale();if(this.IsCloudShowing){var r=this.CloudHandler.script.cloudHandler;console.log(r.StageIndex),0==r.StageIndex?this.IncreaseFactor=.75*this.EnergyRatio:1==r.StageIndex?this.IncreaseFactor=.5*this.EnergyRatio:2==r.StageIndex?this.IncreaseFactor=.25*this.EnergyRatio:3==r.StageIndex?(this.ForHappyAnimation||(this.ForHappyAnimation=!0,this.SpriteAnimation.sprite.play("Happy")),this.IncreaseFactor=0):4==r.StageIndex?(this.Stage4ScroreReduced||(this.SpriteAnimation.sprite.play("Sad"),this.Stage4ScroreReduced=!0,globalVariables.GameManager.script.gameManager.RemoveStar(1)),this.IncreaseFactor=.25*-this.EnergyRatio):5==r.StageIndex&&(this.Stage5ScroreReduced||(this.Stage5ScroreReduced=!0,globalVariables.GameManager.script.gameManager.RemoveStar(1)),this.IncreaseFactor=.5*-this.EnergyRatio)}else this.IncreaseFactor=this.EnergyRatio,this.Stage4ScroreReduced=!1,this.Stage5ScroreReduced=!1,this.ForHappyAnimation=!1;(a=t.x+e*this.IncreaseFactor)<=1&&a>=0?(t.x=a,this.HealthBar.setLocalScale(t)):a<0&&(this.IsGameOver||(this.IsGameOver=!0,globalVariables.GameManager.script.gameManager.EnergyLosed()))}},FridgeHandler.prototype.ShowCloud=function(){this.IsCloudShowing=!0,this.CloudHandler.enabled=!0,this.CloudHandler.script.cloudHandler.ShowCloud()};var MeshVis=pc.createScript("meshVis");MeshVis.attributes.add("MeshIndex",{type:"number",array:!0}),MeshVis.attributes.add("OnUpdate",{type:"boolean",default:!1}),MeshVis.prototype.initialize=function(){for(var e=0;e<this.MeshIndex.length;e++){this.entity.model.meshInstances[this.MeshIndex[e]].visible=!1}},MeshVis.prototype.update=function(e){if(this.OnUpdate)for(var s=0;s<this.MeshIndex.length;s++){var t=this.entity.model.meshInstances[this.MeshIndex[s]];console.log(t.visible),t.visible=!1}};var RotateMesh=pc.createScript("rotateMesh");RotateMesh.attributes.add("MeshIndex",{type:"number"}),RotateMesh.prototype.initialize=function(){this.entity.model.meshInstances[this.MeshIndex]},RotateMesh.prototype.update=function(t){};pc.extend(pc,function(){var TweenManager=function(t){this._app=t,this._tweens=[],this._add=[]};TweenManager.prototype={add:function(t){return this._add.push(t),t},update:function(t){for(var i=0,e=this._tweens.length;i<e;)this._tweens[i].update(t)?i++:(this._tweens.splice(i,1),e--);this._add.length&&(this._tweens=this._tweens.concat(this._add),this._add.length=0)}};var Tween=function(t,i,e){pc.events.attach(this),this.manager=i,e&&(this.entity=null),this.time=0,this.complete=!1,this.playing=!1,this.stopped=!0,this.pending=!1,this.target=t,this.duration=0,this._currentDelay=0,this.timeScale=1,this._reverse=!1,this._delay=0,this._yoyo=!1,this._count=0,this._numRepeats=0,this._repeatDelay=0,this._from=!1,this._slerp=!1,this._fromQuat=new pc.Quat,this._toQuat=new pc.Quat,this._quat=new pc.Quat,this.easing=pc.Linear,this._sv={},this._ev={}},_parseProperties=function(t){var i;return t instanceof pc.Vec2?i={x:t.x,y:t.y}:t instanceof pc.Vec3?i={x:t.x,y:t.y,z:t.z}:t instanceof pc.Vec4||t instanceof pc.Quat?i={x:t.x,y:t.y,z:t.z,w:t.w}:t instanceof pc.Color?(i={r:t.r,g:t.g,b:t.b},void 0!==t.a&&(i.a=t.a)):i=t,i};Tween.prototype={to:function(t,i,e,n,s,r){return this._properties=_parseProperties(t),this.duration=i,e&&(this.easing=e),n&&this.delay(n),s&&this.repeat(s),r&&this.yoyo(r),this},from:function(t,i,e,n,s,r){return this._properties=_parseProperties(t),this.duration=i,e&&(this.easing=e),n&&this.delay(n),s&&this.repeat(s),r&&this.yoyo(r),this._from=!0,this},rotate:function(t,i,e,n,s,r){return this._properties=_parseProperties(t),this.duration=i,e&&(this.easing=e),n&&this.delay(n),s&&this.repeat(s),r&&this.yoyo(r),this._slerp=!0,this},start:function(){var t,i,e,n;if(this.playing=!0,this.complete=!1,this.stopped=!1,this._count=0,this.pending=this._delay>0,this._reverse&&!this.pending?this.time=this.duration:this.time=0,this._from){for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this._properties[t],this._ev[t]=this.target[t]);this._slerp&&(this._toQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,n=void 0!==this._properties.z?this._properties.z:this.target.z,this._fromQuat.setFromEulerAngles(i,e,n))}else{for(t in this._properties)this._properties.hasOwnProperty(t)&&(this._sv[t]=this.target[t],this._ev[t]=this._properties[t]);this._slerp&&(this._fromQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z),i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,n=void 0!==this._properties.z?this._properties.z:this.target.z,this._toQuat.setFromEulerAngles(i,e,n))}return this._currentDelay=this._delay,this.manager.add(this),this},pause:function(){this.playing=!1},resume:function(){this.playing=!0},stop:function(){this.playing=!1,this.stopped=!0},delay:function(t){return this._delay=t,this.pending=!0,this},repeat:function(t,i){return this._count=0,this._numRepeats=t,this._repeatDelay=i||0,this},loop:function(t){return t?(this._count=0,this._numRepeats=1/0):this._numRepeats=0,this},yoyo:function(t){return this._yoyo=t,this},reverse:function(){return this._reverse=!this._reverse,this},chain:function(){for(var t=arguments.length;t--;)t>0?arguments[t-1]._chained=arguments[t]:this._chained=arguments[t];return this},update:function(t){if(this.stopped)return!1;if(!this.playing)return!0;if(!this._reverse||this.pending?this.time+=t*this.timeScale:this.time-=t*this.timeScale,this.pending){if(!(this.time>this._currentDelay))return!0;this._reverse?this.time=this.duration-(this.time-this._currentDelay):this.time-=this._currentDelay,this.pending=!1}var i=0;(!this._reverse&&this.time>this.duration||this._reverse&&this.time<0)&&(this._count++,this.complete=!0,this.playing=!1,this._reverse?(i=this.duration-this.time,this.time=0):(i=this.time-this.duration,this.time=this.duration));var e,n,s=0===this.duration?1:this.time/this.duration,r=this.easing(s);for(var h in this._properties)this._properties.hasOwnProperty(h)&&(e=this._sv[h],n=this._ev[h],this.target[h]=e+(n-e)*r);if(this._slerp&&this._quat.slerp(this._fromQuat,this._toQuat,r),this.entity&&(this.entity._dirtifyLocal(),this.element&&this.entity.element&&(this.entity.element[this.element]=this.target),this._slerp&&this.entity.setLocalRotation(this._quat)),this.fire("update",t),this.complete){var a=this._repeat(i);return a?this.fire("loop"):(this.fire("complete",i),this.entity&&this.entity.off("destroy",this.stop,this),this._chained&&this._chained.start()),a}return!0},_repeat:function(t){if(this._count<this._numRepeats){if(this._reverse?this.time=this.duration-t:this.time=t,this.complete=!1,this.playing=!0,this._currentDelay=this._repeatDelay,this.pending=!0,this._yoyo){for(var i in this._properties){var e=this._sv[i];this._sv[i]=this._ev[i],this._ev[i]=e}this._slerp&&(this._quat.copy(this._fromQuat),this._fromQuat.copy(this._toQuat),this._toQuat.copy(this._quat))}return!0}return!1}};var BounceOut=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},BounceIn=function(t){return 1-BounceOut(1-t)};return{TweenManager:TweenManager,Tween:Tween,Linear:function(t){return t},QuadraticIn:function(t){return t*t},QuadraticOut:function(t){return t*(2-t)},QuadraticInOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},CubicIn:function(t){return t*t*t},CubicOut:function(t){return--t*t*t+1},CubicInOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},QuarticIn:function(t){return t*t*t*t},QuarticOut:function(t){return 1- --t*t*t*t},QuarticInOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},QuinticIn:function(t){return t*t*t*t*t},QuinticOut:function(t){return--t*t*t*t*t+1},QuinticInOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},SineIn:function(t){return 0===t?0:1===t?1:1-Math.cos(t*Math.PI/2)},SineOut:function(t){return 0===t?0:1===t?1:Math.sin(t*Math.PI/2)},SineInOut:function(t){return 0===t?0:1===t?1:.5*(1-Math.cos(Math.PI*t))},ExponentialIn:function(t){return 0===t?0:Math.pow(1024,t-1)},ExponentialOut:function(t){return 1===t?1:1-Math.pow(2,-10*t)},ExponentialInOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))},CircularIn:function(t){return 1-Math.sqrt(1-t*t)},CircularOut:function(t){return Math.sqrt(1- --t*t)},CircularInOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},BackIn:function(t){var i=1.70158;return t*t*((i+1)*t-i)},BackOut:function(t){var i=1.70158;return--t*t*((i+1)*t+i)+1},BackInOut:function(t){var i=2.5949095;return(t*=2)<1?t*t*((i+1)*t-i)*.5:.5*((t-=2)*t*((i+1)*t+i)+2)},BounceIn:BounceIn,BounceOut:BounceOut,BounceInOut:function(t){return t<.5?.5*BounceIn(2*t):.5*BounceOut(2*t-1)+.5},ElasticIn:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),-e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4))},ElasticOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),e*Math.pow(2,-10*t)*Math.sin((t-i)*(2*Math.PI)/.4)+1)},ElasticInOut:function(t){var i,e=.1,n=.4;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=n*Math.asin(1/e)/(2*Math.PI),(t*=2)<1?e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/n)*-.5:e*Math.pow(2,-10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/n)*.5+1)}}}()),function(){pc.Application.prototype.addTweenManager=function(){this._tweenManager=new pc.TweenManager(this),this.on("update",(function(t){this._tweenManager.update(t)}))},pc.Application.prototype.tween=function(t){return new pc.Tween(t,this._tweenManager)},pc.Entity.prototype.tween=function(t,i){var e=this._app.tween(t);return e.entity=this,this.once("destroy",e.stop,e),i&&i.element&&(e.element=i.element),e};var t=pc.Application.getApplication();t&&t.addTweenManager()}();var CloudHandler=pc.createScript("cloudHandler");CloudHandler.attributes.add("Index",{type:"number",default:0}),CloudHandler.attributes.add("Colider",{type:"entity"}),CloudHandler.attributes.add("HitParticle",{type:"entity"}),CloudHandler.attributes.add("CloudEntity",{type:"entity"}),CloudHandler.attributes.add("TransitionTime",{type:"number",default:10}),CloudHandler.attributes.add("IsCloudShow",{type:"boolean",default:!1}),CloudHandler.attributes.add("StageIndex",{type:"number",default:10}),CloudHandler.prototype.initialize=function(){this.Colider.collision.on("triggerenter",this.onTriggerEnter,this)},CloudHandler.prototype.onTriggerEnter=function(t){t.tags.has("Bullet")&&(globalVariables.GameManager.script.gameManager.CloudHidded(this.Index),this.HideCloud())},CloudHandler.prototype.update=function(t){if(this.IsCloudShow){var e=this.CloudEntity.model.meshInstances;this.TransitionTime-=t,this.TransitionTime>0&&(this.TransitionTime<2?(this.StageIndex=5,e[0].material.emissiveIntensity=0):this.TransitionTime<4?(this.StageIndex=4,e[0].material.emissiveIntensity=.1):this.TransitionTime<6?(this.StageIndex=3,e[0].material.emissiveIntensity=.2):this.TransitionTime<8?(this.StageIndex=2,e[0].material.emissiveIntensity=.3):this.TransitionTime<9?(this.StageIndex=1,e[0].material.emissiveIntensity=.4):this.TransitionTime<10&&(e[0].material.emissiveIntensity=.5,this.StageIndex=0)),e[0].material.update()}},CloudHandler.prototype.ShowCloud=function(){this.TransitionTime=10,this.IsCloudShow=!0,this.Colider.enabled=!0;var t=this.entity.getLocalScale();t.x=0,t.y=0,t.z=0,this.entity.setLocalScale(t),this.entity.tween(this.entity.getLocalScale()).to({x:1,y:1,z:1},.5,pc.SineOut).start()},CloudHandler.prototype.HideCloud=function(){this.IsCloudShow=!1,this.Colider.enabled=!1;var t=this.HitParticle.clone();t.enabled=!0,setTimeout((()=>{t.destroy()}),1500),this.entity.tween(this.entity.getLocalScale()).to({x:0,y:0,z:0},.05,pc.SineOut).start()};var SpriteAnimHandler=pc.createScript("spriteAnimHandler");SpriteAnimHandler.prototype.initialize=function(){},SpriteAnimHandler.prototype.PlayHappy=function(){this.entity.sprite.play("Happy")},SpriteAnimHandler.prototype.PlaySad=function(){this.entity.sprite.play("Sad")},SpriteAnimHandler.prototype.PlayIdle=function(){this.entity.sprite.play("Idle"),this.entity.sprite.on("end",this.EndIdle,this)},SpriteAnimHandler.prototype.EndIdle=function(){this.entity.sprite.off("end",this.EndIdle,this),0===Math.floor(pc.math.random(0,2))?this.PlayIdle():this.PlayBlink()},SpriteAnimHandler.prototype.PlayBlink=function(){this.entity.sprite.play("Blink"),this.entity.sprite.on("end",this.EndBlink,this)},SpriteAnimHandler.prototype.EndBlink=function(){this.entity.sprite.off("end",this.EndBlink,this),0===Math.floor(pc.math.random(0,2))?this.PlayIdle():this.PlayBlink()};