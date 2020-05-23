<template>
  <a-scene>

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
</template>

<script>

export default {
  props: {
    mode: String,
    song: String,
    visualizerEnabled: Boolean,
  },
  data(){
    return{
      music: '',
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
  mounted(){
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
   }
}

</script>

<style scoped>

</style>