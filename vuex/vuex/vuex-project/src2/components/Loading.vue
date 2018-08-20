<template>
    <div class="loader">
	    <div v-if="loaderStyle=='ball-spin-fade-loader'" 
	    	 class="loader-inner ball-spin-fade-loader">
	      <div></div>
	      <div></div>
	      <div></div>
	      <div></div>
	      <div></div>
	      <div></div>
	      <div></div>
	      <div></div>
	    </div>

	    <div v-if="loaderStyle=='line-scale'" 
	    	 class="loader-inner line-scale">
	      <div></div>
	      <div></div>
	      <div></div>
	      <div></div>
	      <div></div>
	    </div>
  	</div>
</template>

<script>
	export default {
		props: {
			loaderStyle: {
				default: 'ball-spin-fade-loader'
			}
		}
	}
</script>

<style scoped>
	@-webkit-keyframes line-scale {
	  0% {
	    -webkit-transform: scaley(1);
	            transform: scaley(1); }

	  50% {
	    -webkit-transform: scaley(0.4);
	            transform: scaley(0.4); }

	  100% {
	    -webkit-transform: scaley(1);
	            transform: scaley(1); } }
	@keyframes line-scale {
	  0% {
	    -webkit-transform: scaley(1);
	            transform: scaley(1); }

	  50% {
	    -webkit-transform: scaley(0.4);
	            transform: scaley(0.4); }

	  100% {
	    -webkit-transform: scaley(1);
	            transform: scaley(1); } }

	.line-scale > div:nth-child(1) {
	  -webkit-animation: line-scale 1s 0.1s infinite cubic-bezier(.2, .68, .18, 1.08);
	          animation: line-scale 1s 0.1s infinite cubic-bezier(.2, .68, .18, 1.08); }
	.line-scale > div:nth-child(2) {
	  -webkit-animation: line-scale 1s 0.2s infinite cubic-bezier(.2, .68, .18, 1.08);
	          animation: line-scale 1s 0.2s infinite cubic-bezier(.2, .68, .18, 1.08); }
	.line-scale > div:nth-child(3) {
	  -webkit-animation: line-scale 1s 0.3s infinite cubic-bezier(.2, .68, .18, 1.08);
	          animation: line-scale 1s 0.3s infinite cubic-bezier(.2, .68, .18, 1.08); }
	.line-scale > div:nth-child(4) {
	  -webkit-animation: line-scale 1s 0.4s infinite cubic-bezier(.2, .68, .18, 1.08);
	          animation: line-scale 1s 0.4s infinite cubic-bezier(.2, .68, .18, 1.08); }
	.line-scale > div:nth-child(5) {
	  -webkit-animation: line-scale 1s 0.5s infinite cubic-bezier(.2, .68, .18, 1.08);
	          animation: line-scale 1s 0.5s infinite cubic-bezier(.2, .68, .18, 1.08); }
	.line-scale > div {
	  background-color: blue;
	  width: 4px;
	  height: 35px;
	  border-radius: 2px;
	  margin: 2px;
	  -webkit-animation-fill-mode: both;
	          animation-fill-mode: both;
	  display: inline-block; }



	@-webkit-keyframes ball-spin-fade-loader {
  50% {
    opacity: 0.3;
    -webkit-transform: scale(0.4);
            transform: scale(0.4); }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
            transform: scale(1); } }



 @keyframes ball-spin-fade-loader {
  50% {
    opacity: 0.3;
    -webkit-transform: scale(0.4);
            transform: scale(0.4); }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
            transform: scale(1); } }

.ball-spin-fade-loader {
  position: relative; }
  .ball-spin-fade-loader > div:nth-child(1) {
    top: 25px;
    left: 0;
    -webkit-animation: ball-spin-fade-loader 1s 0s infinite linear;
            animation: ball-spin-fade-loader 1s 0s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(2) {
    top: 17.04545px;
    left: 17.04545px;
    -webkit-animation: ball-spin-fade-loader 1s 0.12s infinite linear;
            animation: ball-spin-fade-loader 1s 0.12s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(3) {
    top: 0;
    left: 25px;
    -webkit-animation: ball-spin-fade-loader 1s 0.24s infinite linear;
            animation: ball-spin-fade-loader 1s 0.24s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(4) {
    top: -17.04545px;
    left: 17.04545px;
    -webkit-animation: ball-spin-fade-loader 1s 0.36s infinite linear;
            animation: ball-spin-fade-loader 1s 0.36s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(5) {
    top: -25px;
    left: 0;
    -webkit-animation: ball-spin-fade-loader 1s 0.48s infinite linear;
            animation: ball-spin-fade-loader 1s 0.48s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(6) {
    top: -17.04545px;
    left: -17.04545px;
    -webkit-animation: ball-spin-fade-loader 1s 0.6s infinite linear;
            animation: ball-spin-fade-loader 1s 0.6s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(7) {
    top: 0;
    left: -25px;
    -webkit-animation: ball-spin-fade-loader 1s 0.72s infinite linear;
            animation: ball-spin-fade-loader 1s 0.72s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(8) {
    top: 17.04545px;
    left: -17.04545px;
    -webkit-animation: ball-spin-fade-loader 1s 0.84s infinite linear;
            animation: ball-spin-fade-loader 1s 0.84s infinite linear; }
  .ball-spin-fade-loader > div {
    background-color: blue;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 2px;
    -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
    position: absolute; }

</style>