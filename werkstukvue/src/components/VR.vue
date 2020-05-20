<template>
    <div class="container">
    
      <div class="card" v-if="!startVR">
        <select name="song" id="song" v-model="song">
          <option value="takeonme">Take On Me</option>
          <option value="playingwiththeboys">Playing with the boys</option>
        </select>
        <button v-on:click="openVR('driver')">Driver mode</button>
        <button v-on:click="openVR('dj')">Diskjockey mode</button>
      </div>

      <a-scene v-if="startVR">

        <a-entity environment="preset: starry;"></a-entity>

        <a-assets>
          <a-asset-item id="model" src="model.obj"></a-asset-item>
          <a-asset-item id="material" src="model.mtl"></a-asset-item>
          <a-asset-item id="djmodel" src="platform.obj"></a-asset-item>
          <a-asset-item id="djmaterial" src="platform.mtl"></a-asset-item>

          <img id="sun" src="../assets/sun.png">

          <a-mixin id="beveled-square" geometry="primitive: cone; radiusTop: 0.15; radiusBottom: 0.19; height: 0.02; segmentsRadial: 4; segmentsHeight: 1" rotation="0 45 0"></a-mixin>
          <a-mixin id="square" geometry="primitive: box; width: 0.18; height: 0.025; depth: 0.18;" position="0 0.02 0"></a-mixin>
          <a-mixin id="blue" material="color: #1E2768;"></a-mixin>
          <a-mixin id="darkgreen" material="color: #22FF90;"></a-mixin>
          <a-mixin id="yellow" material="color: #FFF88E;"></a-mixin>
          <a-mixin id="offset" position="0 0.01 0"></a-mixin>

          <a-asset-item id="optimerBoldFont" src="https://rawgit.com/mrdoob/three.js/dev/examples/fonts/optimer_bold.typeface.json"></a-asset-item>
        </a-assets>

        <a-entity position="0 0 1.314" animation="property: position; to: 0 0 -0.708; loop: true; easing: linear; dur: 500;">
          <a-entity v-if="mode == 'driver'" id="car" obj-model="obj: #model; mtl: #material" scale="0.01 0.01 0.01">
          </a-entity>
          <a-entity v-if="mode == 'dj'" id="platform" obj-model="obj: #djmodel; mtl: #djmaterial" scale="0.009 0.009 0.009" position="0.440 0 -1.453">
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

          <a-entity id="kicks" geometry="primitive: box; width: 1; height: 3; depth: 0.2;" position="0 0 -0.5" rotation="10 180 0" material="shader: flat; color: #ff1493; opacity: 0.5; transparent: true;">
            <a-entity text-geometry="value: Kicks; font: #optimerBoldFont; size: 0.2" rotation="0 180 0" position="0.35 1.25 -0.12" material="shader: flat; color: #0006b1;"></a-entity>
          </a-entity>

          <a-entity id="snares" geometry="primitive: box; width: 1; height: 3; depth: 0.2;" position="0 0 0.9" rotation="-10 180 0" material="shader: flat; color: #0006b1; opacity: 0.5; transparent: true;">

          </a-entity>

          <a-entity v-on:buttondown="clickBtn('kick')" id="button" ui-button="base: beveled-square, darkgreen; top: square, blue; pressed: yellow, offset" position="-0.188 1 0.446"></a-entity>
          <a-entity v-on:buttondown="clickBtn('clap')" id="button" ui-button="base: beveled-square, darkgreen; top: square, yellow; pressed: blue, offset" position="-0.188 1 0.132"></a-entity>
        </a-entity>
        
        <a-entity light="type: ambient; color: #CCC; intensity: 0.1"></a-entity>
        <a-entity light="type: directional; color: #FDB813; intensity: 0.1;" position="0 0 1"></a-entity>

      </a-scene>
    </div>
</template>

<script>

export default {
 data(){
   return{
     startVR: false,
     mode: '',
     song: 'takeonme'
   }
 },
 methods: {
   openVR(mode){
     this.mode = mode;
     this.startVR = true;

    setTimeout(()=>{
      var audio = new Audio(require('../assets/'+this.song+'.mp3'));
      audio.loop = true;
      audio.play();
    },5000);
   },
   clickBtn(instrument){
     var audio = new Audio(require('../assets/'+instrument+'.wav'));
     audio.play();
   }
 }
}

</script>

<style scoped>

.container{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.card{
  border-radius: 20px;
}

button{
  padding: 10px;
  margin: 10px;
}

</style>