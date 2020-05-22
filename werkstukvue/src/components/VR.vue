<template>
    <div class="container">
    
      <div class="card" v-if="!startVR">

        <div v-if="!menuOpen" id="screen1" ref="screen1">
          <p>ENABLE MENU MUSIC?</p>
          <div>
            <p class="hover" value="YES" v-on:click="enableMenuMusic(), openMenu()">YES</p>
            <p>/</p>
            <p class="hover" value="NO" v-on:click="openMenu()">NO</p>
          </div>
        </div>

        <div v-if="menuOpen" id="screen2">
          <video src="../assets/background.mp4" autoplay muted loop></video>

          <div class="wrapper" ref="wrapper">
            <div class="selectMode">
              <img src="../assets/synthrider.png">
              <div class="column">
                <p class="hover" value="DRIVER MODE" v-on:click="selectMode('driver')">DRIVER MODE</p>
                <p class="hover" value="DISKJOCKEY MODE" v-on:click="selectMode('dj')">DISKJOCKEY MODE</p>
              </div>
            </div>

            <div class="selectSong">
              <p class="hover" value="&lt; BACK" id="back" v-on:click="deselectMode()">&lt; BACK</p>
              <p>CHOOSE YOUR SONG</p>
              <div class="song">
                <p class="hover" value="&lt;" v-on:click="previousSong()">&lt;</p>
                <img v-bind:src="coverSrc" id="cover" ref="cover" value="0">
                <p class="hover" value="&gt;" v-on:click="nextSong()">&gt;</p>
              </div>
              <p class="coverSong">{{coverSong}}</p>
              <div class="start">
                <p class="hover" value="START" v-on:click="openVR()">START</p>
              </div>
            </div>
          </div>

          <audio v-if="menuMusic" src="../assets/menu.mp3" autoplay loop></audio>
        </div>

        <div v-if="menuOpen" class="bottom">
            <div class="links">
              <img src="../assets/github.png">
              <img src="../assets/linkedin.png">
            </div>

            <div class="checkbox">
              <input type="checkbox" id="check" name="check" v-model="visualizerEnabled">
              <label for="check">ENABLE AUDIO VISUALIZER (PERFORMANCE-HEAVY)</label>
            </div>

            <div class="name">
              <p>PROJECT BY</p><img src="../assets/tim.png"><p>TIM WILLAERT</p>
            </div>
        </div>
      </div>

      <a-scene v-if="startVR">

        <a-entity environment="preset: starry; groundColor: #000;"></a-entity>

        <a-assets>
          <a-asset-item id="model" src="model.obj"></a-asset-item>
          <a-asset-item id="material" src="model.mtl"></a-asset-item>
          <a-asset-item id="djmodel" src="platform.obj"></a-asset-item>
          <a-asset-item id="djmaterial" src="platform.mtl"></a-asset-item>

          <img id="sun" src="../assets/sun.png">

          <a-mixin id="beveled-square" geometry="primitive: cone; radiusTop: 0.15; radiusBottom: 0.19; height: 0.02; segmentsRadial: 4; segmentsHeight: 1" rotation="0 45 0"></a-mixin>
          <a-mixin id="square" geometry="primitive: box; width: 0.18; height: 0.025; depth: 0.18;" position="0 0.02 0"></a-mixin>
          <a-mixin id="blue" material="color: #1E2768;"></a-mixin>
          <a-mixin id="darkgreen" material="color: #4dffff;"></a-mixin>
          <a-mixin id="yellow" material="color: #FFF88E;"></a-mixin>
          <a-mixin id="offset" position="0 0.01 0"></a-mixin>

          <a-asset-item id="optimerBoldFont" src="https://rawgit.com/mrdoob/three.js/dev/examples/fonts/optimer_bold.typeface.json"></a-asset-item>

          <a-mixin id="bar"
          geometry="primitive: box;"
          material="shader: standard; color: #9400D3; emissive: #fff; emissiveIntensity: 0.1;"
          rotation="90 0 0"></a-mixin>

          <audio id="song" ref="song" crossorigin loop v-bind:src="song"></audio>
        </a-assets>

        <a-entity position="0 0 1.314" animation="property: position; to: 0 0 -0.708; loop: true; easing: linear; dur: 500;">
          <a-entity v-if="mode == 'driver'" id="car" obj-model="obj: #model; mtl: #material" scale="0.01 0.01 0.01">
          </a-entity>
          <a-entity v-if="mode == 'dj'" id="platform" obj-model="obj: #djmodel; mtl: #djmaterial" scale="0.01 0.01 0.01" position="0.440 0 -1">
          </a-entity>

          <a-entity v-if="visualizerEnabled"
            audio-visualizer="src: #song; smoothingTimeConstant: 0.8"
            audio-visualizer-spectrum-scale="max: 1000; multiplier: 0.03"
            entity-generator="mixin: bar; num: 50"
            layout="type: circle; radius: 10; angle: 9;"
            rotation="90 0 0"
            position="0 0 0">
          </a-entity>

          <a-entity v-if="mode == 'driver'" id="rig" position="0.32 -0.63 0.3">
            <a-camera look-controls="pointerLockEnabled: true">
            </a-camera>
            <a-entity id="leftHand" hand-controls="hand: left; handModelStyle: highPoly; color: #ffcccc"></a-entity>
            <a-entity id="rightHand" hand-controls="hand: right; handModelStyle: highPoly; color: #ffcccc"></a-entity>
          </a-entity>

          <a-entity v-if="mode == 'dj'" id="rig" position="0 0 0.4">
            <a-camera look-controls="pointerLockEnabled: true">
            </a-camera>
            <a-entity id="leftHand" hand-controls="hand: left; handModelStyle: highPoly; color: #ffcccc"></a-entity>
            <a-entity id="rightHand" hand-controls="hand: right; handModelStyle: highPoly; color: #ffcccc"></a-entity>
          </a-entity>

          <a-entity v-if="mode == 'dj'">
            <a-entity id="kicks" geometry="primitive: box; width: 0.6; height: 0.3; depth: 0.2;" position="0 1.5 -0.3" rotation="10 180 0" material="shader: flat; color: #ff1493; opacity: 0.5; transparent: true;">
              <a-entity text-geometry="value: Kicks; font: #optimerBoldFont; size: 0.05" rotation="0 180 0" material="shader: flat; color: #fff;" position="0.274 0.062 -0.052"></a-entity>
              <a-entity v-on:buttondown="clickBtn('kick')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="0.2 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
              <a-entity v-on:buttondown="clickBtn('kick2')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="0 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
              <a-entity v-on:buttondown="clickBtn('kick3')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="-0.2 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
            </a-entity>

            <a-entity id="hihats" geometry="primitive: box; width: 0.6; height: 0.3; depth: 0.2;" position="0 1.85 -0.3" rotation="-10 180 0" material="shader: flat; color: #ff1493; opacity: 0.5; transparent: true;">
              <a-entity text-geometry="value: HiHats; font: #optimerBoldFont; size: 0.05" rotation="0 180 0" material="shader: flat; color: #fff;" position="0.274 0.062 -0.052"></a-entity>
              <a-entity v-on:buttondown="clickBtn('hihat')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="0.2 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
              <a-entity v-on:buttondown="clickBtn('hihat2')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="0 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
              <a-entity v-on:buttondown="clickBtn('hihat3')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="-0.2 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
            </a-entity>

            <a-entity id="claps" geometry="primitive: box; width: 0.6; height: 0.3; depth: 0.2;" position="-0.632 1.5 -0.070" rotation="10 -140 0" material="shader: flat; color: #ff1493; opacity: 0.5; transparent: true;">
              <a-entity text-geometry="value: Claps; font: #optimerBoldFont; size: 0.05" rotation="0 180 0" material="shader: flat; color: #fff;" position="0.274 0.062 -0.052"></a-entity>
              <a-entity v-on:buttondown="clickBtn('clap')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="0.2 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
              <a-entity v-on:buttondown="clickBtn('clap2')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="0 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
              <a-entity v-on:buttondown="clickBtn('clap3')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="-0.2 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
            </a-entity>

            <a-entity id="snares" geometry="primitive: box; width: 0.6; height: 0.3; depth: 0.2;" position="-0.632 1.85 -0.070" rotation="-10 -140 0" material="shader: flat; color: #ff1493; opacity: 0.5; transparent: true;">
              <a-entity text-geometry="value: Snares; font: #optimerBoldFont; size: 0.05" rotation="0 180 0" material="shader: flat; color: #fff;" position="0.274 0.062 -0.052"></a-entity>
              <a-entity v-on:buttondown="clickBtn('snare')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="0.2 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
              <a-entity v-on:buttondown="clickBtn('snare2')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="0 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
              <a-entity v-on:buttondown="clickBtn('snare3')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="-0.2 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
            </a-entity>

            <a-entity id="bass" geometry="primitive: box; width: 0.6; height: 0.3; depth: 0.2;" position="0.632 1.5 -0.070" rotation="10 140 0" material="shader: flat; color: #ff1493; opacity: 0.5; transparent: true;">
              <a-entity text-geometry="value: Bass; font: #optimerBoldFont; size: 0.05" rotation="0 180 0" material="shader: flat; color: #fff;" position="0.274 0.062 -0.052"></a-entity>
              <a-entity v-on:buttondown="clickBtn('bass')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="0.2 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
              <a-entity v-on:buttondown="clickBtn('bass2')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="0 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
              <a-entity v-on:buttondown="clickBtn('bass3')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="-0.2 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
            </a-entity>

            <a-entity id="voices" geometry="primitive: box; width: 0.6; height: 0.3; depth: 0.2;" position="0.632 1.85 -0.070" rotation="-10 140 0" material="shader: flat; color: #ff1493; opacity: 0.5; transparent: true;">
              <a-entity text-geometry="value: Voices; font: #optimerBoldFont; size: 0.05" rotation="0 180 0" material="shader: flat; color: #fff;" position="0.274 0.062 -0.052"></a-entity>
              <a-entity v-on:buttondown="clickBtn('voice')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="0.2 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
              <a-entity v-on:buttondown="clickBtn('voice2')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="0 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
              <a-entity v-on:buttondown="clickBtn('voice3')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" rotation="-90 0 0" position="-0.2 -0.05 -0.12" scale="0.5 0.5 0.5"></a-entity>
            </a-entity>

            <a-entity id="loops" geometry="primitive: box; width: 0.6; height: 0.3; depth: 0.2;" position="0.922 1.5 0.554" rotation="10 90 0" material="shader: flat; color: #ff1493; opacity: 0.5; transparent: true;">
              <a-entity text-geometry="value: 80s Loops; font: #optimerBoldFont; size: 0.05" rotation="0 180 0" material="shader: flat; color: #fff;" position="0.274 0.062 -0.052"></a-entity>
              <a-entity v-on:change="(toggleLoop('loop1'))" ui-toggle="value: 0;" position="0.189 -0.047 -0.097" rotation="90 180 0" scale="0.6 0.6 0.6"></a-entity>
              <a-entity v-on:change="(toggleLoop('loop2'))" ui-toggle="value: 0;" position="-0.002 -0.047 -0.097" rotation="90 180 0" scale="0.6 0.6 0.6"></a-entity>
              <a-entity v-on:change="(toggleLoop('loop3'))" ui-toggle="value: 0;" position="-0.2 -0.047 -0.097" rotation="90 180 0" scale="0.6 0.6 0.6"></a-entity>
            </a-entity>

            <a-entity id="loops2" geometry="primitive: box; width: 0.6; height: 0.3; depth: 0.2;" position="-0.922 1.5 0.554" rotation="-10 90 0" material="shader: flat; color: #ff1493; opacity: 0.5; transparent: true;">
              <a-entity text-geometry="value: Normal Loops; font: #optimerBoldFont; size: 0.05" rotation="0 0 0" material="shader: flat; color: #fff;" position="-0.274 0.062 0.052"></a-entity>
              <a-entity v-on:change="(toggleLoop('loop4'))" ui-toggle="value: 0;" position="0.189 -0.047 0.097" rotation="90 0 0" scale="0.6 0.6 0.6"></a-entity>
              <a-entity v-on:change="(toggleLoop('loop5'))" ui-toggle="value: 0;" position="-0.002 -0.047 0.097" rotation="90 0 0" scale="0.6 0.6 0.6"></a-entity>
              <a-entity v-on:change="(toggleLoop('loop6'))" ui-toggle="value: 0;" position="-0.2 -0.047 0.097" rotation="90 0 0" scale="0.6 0.6 0.6"></a-entity>
            </a-entity>

            <a-entity v-on:change="changeMusicVolume($event)" ui-slider="min: 0; max: 1; value: 1;" position="0 1.253 -0.159" rotation="50 0 0"></a-entity>
            <a-entity v-on:change="changeEffectVolume($event)" ui-slider="min: 0; max: 1; value: 1;" position="0 1.12 -0.047" rotation="50 0 0"></a-entity>
          </a-entity>
        </a-entity>
        
        <a-entity light="type: ambient; color: #CCC; intensity: 0.2"></a-entity>
        <a-entity light="type: directional; color: #FDB813; intensity: 0.1;" position="0 0 1"></a-entity>

      </a-scene>
    </div>
</template>

<script>

export default {
 data(){
   return{
     songDict: {
       0: 'The Waterboys - The Whole Of The Moon',
       1: 'a-ha - Take On Me',
       2: 'Soft Cell - Tainted Love',
       3: 'Journey - Don\'t Stop Believin\'',
       4: 'Berlin - Take My Breath Away',
       5: 'Belinda Carlisle - Heaven Is A Place On Earth',
       6: 'Guns N\' Roses - Sweet Child O\' Mine',
       7: 'Bruce Springsteen - Dancing In The Dark',
       8: 'Simple Minds - Don\'t You (Forget About Me)',
       9: 'Tears For Fears - Everybody Wants To Rule The World',
       10: 'Kenny Loggins - Playing With The Boys',
       11: 'Dexy\'s Midnight Runners - Come On Eileen',
       12: 'The Human League - Don\'t You Want Me',
       13: 'The Bangles - Walk Like An Egyptian',
       14: 'Survivor - Eye Of The Tiger',
       15: 'Samuel Kim - Star Wars (Epic Main Theme)',
       16: 'C418 - Stranger Things Main Theme Remix',
       17: 'Astronomia (Coffin Dance) 80s Remix'
     },
     menuMusic: false,
     menuOpen: false,
     coverSrc: '0.jpg',
     coverSong: 'The Waterboys - The Whole Of The Moon',
     startVR: false,
     mode: '',
     song: '0.mp3',
     music: '',
     visualizerEnabled: false,
     effectVolume: 1.0,
     loop1: new Audio(require('../assets/loop.wav')),
     loop1Playing: false,
     loop2: new Audio(require('../assets/loop2.wav')),
     loop2Playing: false,
     loop3: new Audio(require('../assets/loop3.wav')),
     loop3Playing: false,
     loop4: new Audio(require('../assets/loop4.wav')),
     loop4Playing: false,
     loop5: new Audio(require('../assets/loop5.wav')),
     loop5Playing: false,
     loop6: new Audio(require('../assets/loop6.wav')),
     loop6Playing: false
   }
 },
 methods: {
   selectMode(mode){
    this.mode = mode;
    this.$refs.wrapper.classList.add('slideLeft');
    this.$refs.wrapper.classList.remove('slideRight');
   },
   deselectMode(){
    this.$refs.wrapper.classList.add('slideRight');
    this.$refs.wrapper.classList.remove('slideLeft');
   },
   nextSong(){
     let value = parseInt(this.$refs.cover.getAttribute('value')) + 1;
     let string = '';
     if(value > 17){
       string = '0.jpg';
       this.song = '0.mp3';
       value = 0;
       this.coverSong = this.songDict[value];
     } else{
       string = value + '.jpg';
       this.song = value + '.mp3';
       this.coverSong = this.songDict[value];
     }
     this.$refs.cover.setAttribute('src', string);
     this.$refs.cover.setAttribute('value', value);
   },
   previousSong(){
    let value = parseInt(this.$refs.cover.getAttribute('value')) - 1; 
     let string = '';
     if(value < 0){
       string = '17.jpg';
       this.song = '17.mp3';
       value = 17;
       this.coverSong = this.songDict[value];
     } else{
       string = value + '.jpg';
       this.song = value + '.mp3';
       this.coverSong = this.songDict[value];
     }
     this.$refs.cover.setAttribute('src', string);
     this.$refs.cover.setAttribute('value', value);
   },
   openVR(){
     this.startVR = true;

     this.loop1.loop = true;
     this.loop2.loop = true;
     this.loop3.loop = true;
     this.loop4.loop = true;
     this.loop5.loop = true;
     this.loop6.loop = true;

    setTimeout(()=>{
      this.$refs.song.play();
    },5000);
   },
   clickBtn(instrument){
     var audio = new Audio(require('../assets/'+instrument+'.wav'));
     audio.volume = this.effectVolume;
     audio.play();
   },
   changeMusicVolume(event){
     this.$refs.song.volume = parseFloat(event.detail.value);
   },
   changeEffectVolume(event){
     this.effectVolume = parseFloat(event.detail.value);

     this.loop1.volume = parseFloat(event.detail.value);
     this.loop2.volume = parseFloat(event.detail.value);
     this.loop3.volume = parseFloat(event.detail.value);
     this.loop4.volume = parseFloat(event.detail.value);
     this.loop5.volume = parseFloat(event.detail.value);
     this.loop6.volume = parseFloat(event.detail.value);
   },
   toggleLoop(loop){
     if(this[loop+"Playing"] == false){
       this[loop].play();
     } else{
       this[loop].pause();
       this[loop].currentTime = 0.0;
     }
     this[loop+"Playing"] = !this[loop+"Playing"];
   },
   enableMenuMusic(){
    this.menuMusic = true;
   },
   openMenu(){
    this.$refs.screen1.classList.add('openMenu');
     setTimeout(()=>{
      this.menuOpen = true;
    },1500);
   }
 }
}

</script>

<style scoped>

body{
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

::selection{
  background: transparent;
}

@font-face {
    font-family: 'VCR OSD Mono';
    src: url('../assets/VCROSDMono.eot');
    src: url('../assets/VCROSDMono.eot?#iefix') format('embedded-opentype'),
        url('../assets/VCROSDMono.woff2') format('woff2'),
        url('../assets/VCROSDMono.woff') format('woff'),
        url('../assets/VCROSDMono.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

@keyframes startApp{
  0%{opacity: 0; display: none;}
  20%{opacity: 1;}
  40%{opacity: 0;}
  60%{opacity: 1;}
  100%{opacity: 1; display: block;}
}

@keyframes fadeOut{
  0%{opacity: 1; display: block;}
  100%{opacity: 0; display: none;}
}

#screen1{
  animation: startApp 1.5s step-end;
  animation-fill-mode: forwards;
}

#screen1.openMenu{
  animation: fadeOut 1.5s;
  animation-fill-mode: forwards;
}

.hover{
  position: relative;
  z-index: 1;
}

.hover:hover{
  cursor: pointer;
}

.hover:hover::before{
  content: attr(value);
  color: #FF2929;
  position: absolute;
  z-index: -1;
  left: -2px;
}

.hover:hover::after{
  content: attr(value);
  color: #4EE2FF;
  position: absolute;
  z-index: -1;
  right: -2px;
}

.container{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: black;
  color: white;
  font-family: 'VCR OSD Mono';
}

p{
  font-size: 4.5vh;
}

#screen1 div{
  display: flex;
  justify-content: center;
}

#screen1 p{
  margin: 10px 10px;
}

.selectMode img{
  height: 50vh;
  align-self: center;
}

@keyframes openMenu{
  0%{opacity: 0; width: 40%;}
  20%{opacity: 1;}
  30%{width: 40%;}
  100%{width: 75%;}
}

#screen2{
  border-radius: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  animation: openMenu 4.5s ease;
  animation-fill-mode: forwards;
  text-align: center;
  height: 70vh;
  overflow: hidden;
}

#screen2::after{
  content: '';
  width: 100%;
  height: 100%;
  background: url('../assets/overlay.png');
  opacity: 0.4;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 30px;
}

#screen2 video{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: fill;
  border-radius: 30px;
  z-index: -1;
}

.column{
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  animation: startApp 1.5s step-end 2;
  animation-fill-mode: forwards;
  animation-delay: 1s;
  padding-bottom: 6vh;
}

.selectMode{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.column p{
  margin: 1vh 0;
}

@keyframes fadeIn{
  0%{opacity: 0}
  100%{opacity: 0.7}
}

.bottom{
  position: absolute;
  opacity: 0;
  bottom: 0;
  left: 5%;
  height: 10%;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2vh;
  animation: fadeIn 3s ease forwards;
  animation-delay: 4s;
}

.bottom input, .bottom label{
  margin: 0 5px;
}

.checkbox{
  display: flex;
  align-items: center;
}

.name, .links{
  display: flex;
  align-items: center;
}

.name img{
  height: 3vh;
  border-radius: 50px;
  margin: 0 10px;
}

.name p{
  font-size: 2vh;
}

.links img{
  height: 2.5vh;
  margin: 0 7px;
}

.links img:hover{
  cursor: pointer;
  opacity: 0.4;
}

@keyframes slideLeft{
  0%{}
  100%{transform: translateX(-50%)}
}

@keyframes slideRight{
  0%{transform: translateX(-50%)}
  100%{transform: translateX(0%)}
}

.selectMode, .selectSong{
  display: inline-block;
  width: 50%;
  position: relative;
}

.wrapper{
  width: 200%;
  display: flex;
}

.wrapper.slideLeft{
  animation: slideLeft .5s linear;
  animation-fill-mode: forwards;
}

.wrapper.slideRight{
  animation: slideRight .5s linear;
  animation-fill-mode: forwards;
}

#back{
  position: absolute;
  left: 5%;
  top: 10%;
}

.selectSong{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 7vh 0;
}

.start p{
  display: inline-block;
}

.song{
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

#cover{
  height: 25vh;
  width: 25vh;
  object-fit: cover;
  margin: 0 5vw;
}

.coverSong{
  font-size: 3vh;
}

</style>