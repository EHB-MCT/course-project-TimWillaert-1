<template>
    <div class="container">
    
      <div class="card" v-if="!startVR">
        <button v-on:click="openVR">Start experience</button>
      </div>

      <a-scene v-if="startVR" background="color: #ECECEC">

        <a-entity environment="preset: starry; dressingAmount: 500" scale="5 5 5"></a-entity>

        <a-assets>
          <a-asset-item id="model" src="model.obj"></a-asset-item>
          <a-asset-item id="material" src="material.mtl"></a-asset-item>
          <audio id="music" src="../assets/music.mp3"></audio>
        </a-assets>


        <a-entity obj-model="obj: #model; mtl: #material" scale="0.01 0.01 0.01">
        </a-entity>

        <a-entity id="rig" position="0.32 -0.7 0.3">
          <a-camera sound="src: #music; autoplay: true; positional: false;">
          </a-camera>
        </a-entity>
      <!--
        <a-assets>

          <a-timeline id="timeline">
            <a-timeline-animation select="#rig" name="1"></a-timeline-animation>
          </a-timeline>

        </a-assets>


        <a-entity geometry="primitive: plane; height: 10; width: 15" position="0 1.6 -150" material="shader: standard; src: #header; side: double"></a-entity>


        <a-entity id="rig" position="0 1.6 0"
        animation__1="property: position; to: 0 1.6 -1500; dur: 15000;">
          <a-camera sound="src: #music; autoplay: true; positional: false;">
          </a-camera>
        </a-entity>

        <a-entity rotation="-90 0 0">
          <a-entity geometry="primitive: cylinder; height: 1000; radius: 20; open-ended: true"
          position="0 0 0" rotation="0 0 0" material="shader: flat; side: double; src: #stars" 
          animation="property: rotation; to: 0 -360 0; loop: true; dur: 30000"></a-entity>
        </a-entity>

        <a-entity geometry="primitive: plane; height: 100; width: 100;" position="0 0 -493"
          material="shader: flat; src: #stars; side: double"></a-entity>

        <a-entity rotation="-90 0 0" position="0 0 -730">
          <a-entity geometry="primitive: cylinder; height: 450; radius: 20; open-ended: true"
           rotation="0 0 0" material="shader: flat; side: double; src: #mandala" 
          animation="property: rotation; to: 0 -360 0; loop: true; dur: 20000"></a-entity>
        </a-entity>

        <a-entity geometry="primitive: plane; height: 100; width: 100;" position="0 0 -943"
          material="shader: flat; src: #mandala; side: double"></a-entity>
          !-->
      </a-scene>
    </div>
</template>

<script>

export default {
 data(){
   return{
     startVR: false
   }
 },
 methods: {
   openVR(){
     this.startVR = true;
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
  background-color: blue;
  border-radius: 20px;
}

</style>