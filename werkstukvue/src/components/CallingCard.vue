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

        <div v-if="menuOpen" id="screen2" ref="screen2">
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
              <a href="https://github.com/TimWillaert" target="_blank"><img src="../assets/github.png"></a>
              <a href="https://www.linkedin.com/in/timwillaert/" target="_blank"><img src="../assets/linkedin.png"></a>
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

      <div v-if="startVR">
          <VR :mode="mode" :song="song" :visualizerEnabled="visualizerEnabled"></VR>
      </div>
    </div>
</template>

<script>
import VR from './VR.vue'

export default {
 components: {
    VR
 },
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
       17: 'Astronomia (Coffin Dance) 80s Remix',
       18: 'Rick Astley - Never Gonna Give You Up'
     },
     menuMusic: false,
     menuOpen: false,
     coverSrc: '0.jpg',
     coverSong: 'The Waterboys - The Whole Of The Moon',
     startVR: false,
     mode: '',
     song: '0.mp3',
     visualizerEnabled: false,
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
     if(value > 18){
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
       string = '18.jpg';
       this.song = '18.mp3';
       value = 18;
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

@keyframes fadeOut{
  0%{opacity: 1; display: block;}
  100%{opacity: 0; display: none;}
}

#screen1{
  animation: showMenu 1.5s step-end;
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

@keyframes imgAnim{
  0%{transform: translateY(50%)}
  100%{transform: translateY(0%)}
}

.selectMode img{
  height: 50vh;
  align-self: center;
  animation: imgAnim 2s ease forwards;
}

@keyframes openMenu{
  0%{opacity: 0; width: 40%; filter: grayscale(100%)}
  20%{opacity: 1;}
  30%{width: 40%;}
  60%{filter: grayscale(100%)}
  100%{width: 75%; filter: grayscale(0%)}
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

@keyframes VHS{
  0%{background-position: top;}
  100%{background-position: bottom;}
}

#screen2::after{
  content: '';
  width: 100%;
  height: 100%;
  background: url('../assets/overlay.png');
  animation: VHS 20s infinite linear;
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

@keyframes showMenu{
  0%{opacity: 0; display: none;}
  20%{opacity: 1;}
  40%{opacity: 0;}
  60%{opacity: 1;}
  80%{opacity: 0;}
  100%{opacity: 1; display: block;}
}

.column{
  opacity: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  animation: showMenu 1.5s step-start;
  animation-fill-mode: forwards;
  animation-delay: 4s;
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