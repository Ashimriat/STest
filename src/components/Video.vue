<template lang="pug">
  video.video(
    ref="videoEl"
    muted="muted"
  )
    p
      | Неподдерживаемая версия браузера. Пожалуйста, используйте более современный браузер
</template>

<script>
  import { eventBus } from './App';
  import config from '../server/config';


  export default {
    name: 'Video',
    data() {
      return {
        currentVideoIndex: 0,
        videoHash: '',
        handleTries: 0
      }
    },
    methods: {
      playVideo() {
      	const videos = this.$store.state.videos;
        if (!videos.length) return;
        if (this.currentVideoIndex === videos.length) this.currentVideoIndex = 0;
        const { hash, url } = videos[this.currentVideoIndex];
        this.videoHash = hash;
      	this.$refs.videoEl.src = url;
      	console.log('VIDEOS', videos);
      	console.log('HASH', hash);
      	console.log('URL', url);
        this.currentVideoIndex += 1;
        this.$refs.videoEl.play()
          .catch(e => {
          	console.log('ERROR IN VIDEO PLAY', e);
          	this.$refs.videoEl.play();
          });
      },
      checkVideos() {
      	if (!this.$store.state.videos.length) {
      		setTimeout(this.checkVideos, 2000);
        } else {
      		this.playVideo();
        }
      },
	  handleNewVideos() {
        const videos = this.$store.state.videos;
        if (!videos.length) {
        	this.handleTries += 1;
        	if (this.handleTries !== 10) setTimeout(this.handleNewVideos, 500);
            return;
        }
        this.handleTries = 0;
        this.currentVideoIndex = 0;
        const newVideoHash = videos[0].hash;
        if (
            (this.videoHash === newVideoHash)
            && (videos.length > 1)
        ) this.currentVideoIndex = 1;
      }
    },
    mounted() {
      this.checkVideos();
      eventBus.$on('newVideos', this.handleNewVideos);
      this.$refs.videoEl.addEventListener('ended', this.playVideo);
    }
  }
</script>

<style lang="sass">
  .video
    width: 100%
    height: 100%
</style>
