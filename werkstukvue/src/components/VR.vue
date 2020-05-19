<template>
    <div class="container">
    
      <div class="card">
        <button v-on:click="openVR">VR</button>
      </div>

      <a-scene animation-timeline="timeline: #timeline" v-if="startVR">
        <a-assets>

          <audio id="music" src="../assets/music.mp3"></audio>

          <img id="header" src="../assets/header.jpg">
          <img id="stars" src="../assets/stars.png">
          <img id="flowers" src="../assets/flowers.jpg">
          <img id="mandala" src="../assets/mandala.jpg">

          <a-timeline id="timeline">
            <a-timeline-animation select="#rig" name="1"></a-timeline-animation>
            <a-timeline-animation select="#rig" name="2"></a-timeline-animation>
          </a-timeline>

        </a-assets>

        <!-- Banner -->
        <a-entity geometry="primitive: plane; height: 10; width: 15" position="0 5 -40" material="shader: standard; src: #header"></a-entity>

        <!-- Player -->
        <a-entity id="rig" position="0 1.6 0"
        animation__1="property: position; to: 0 1.6 -1500; dur: 15000;"
        animation__2="property: position; from: 0 1.6 -1500; to: 0 1.6 -4500; dur: 25000;">
          <a-camera sound="src: #music; autoplay: true; positional: false;">
            <a-cursor></a-cursor>
          </a-camera>
        </a-entity>

        <a-entity geometry="primitive: cylinder; height: 2000; radius: 20; open-ended: true"
        position="0 0 -250" rotation="-90 0 0" material="shader: flat; side: double; color: #000000"></a-entity>

        <a-entity geometry="primitive: cylinder; height: 2000; radius: 20; open-ended: true"
        position="0 0 -2550" rotation="-90 0 0" material="shader: flat; side: double; src: #mandala; repeat: 2 5"></a-entity>

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