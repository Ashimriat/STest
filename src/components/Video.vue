<template lang="pug">
  video.videoFile(ref="videoEl")
    p
      | Неподдерживаемая версия браузера. Пожалуйста, используйте более современный браузер
</template>

<script>
  import { eventBus } from './App';
  import config from '../config';


  export default {
    name: 'Video',
    data() {
      return {
        showPlayButton: false
      }
    },
    methods: {
      playVideo() {
        this.$refs.videoEl.play()
          .catch(e => console.log('ERROR IN VIDEO PLAY.'));
      }
    },
    mounted() {
      this.$refs.videoEl.src = config.videoSource;
      eventBus.$on('PLAY_VIDEO', () => this.playVideo());
    }
  }
</script>

<style lang="sass">
  .videoMain
    display: flex
    justify-content: center
    align-items: center
  .videoFile
    width: 600px
    height: 400px
</style>
