<template>
    <div class="container">
    <a-scene>
    <a-entity environment="preset: forest;"></a-entity>

      <!-- Player -->
      <a-entity id="rig" movement-controls="controls: checkpoint" checkpoint-controls="mode: animate">
        <a-entity camera
                  position="0 1.6 0"
                  look-controls="pointerLockEnabled: true">
          <a-entity cursor
                    position="0 0 -1"
                    geometry="primitive: ring; radiusInner: 0.005; radiusOuter: 0.01;"
                    material="color: #CCC; shader: flat;"></a-entity>
        </a-entity>
      </a-entity>

      <!-- Checkpoints -->
      <a-entity position="1 0 1">
        <a-cylinder checkpoint radius="1" height="0.1" position="0 0 -10" color="#39BB82"></a-cylinder>
      </a-entity>

    </a-scene>
    </div>
</template>

<script>

export default {
}

</script>

<style scoped>

</style>