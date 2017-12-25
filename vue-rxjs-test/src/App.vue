<template>
    <div id="app">
        <div>{{ count }}</div>

        <!-- simple usage -->
        <button v-stream:click="plus$">Add on Click</button>

        <button v-stream:click="{ subject: plus$, data: minusDelta1, options:{once:true} }">Add on Click (Option once:true)</button>

        <!-- you can also stream to the same subject with different events/data -->
        <button
          v-stream:click="{ subject: minus$, data: minusDelta1 }"
          v-stream:mousemove="{ subject: minus$, data: minusDelta2 }">
          Minus on Click &amp; Mousemove
        </button>

        <pre>{{ $data }}</pre>

        <my-button v-stream:click="plus$"></my-button>
     </div>
</template>

<script>
import Rx from 'rxjs/Rx'
export default {
     name: 'app',
     data () {
           return {
               minusDelta1: -1,
               minusDelta2: -1
           }
      },

     components: {
           myButton: {
               template: '<button>MyButton</button>'
           }
     },
     created () {
           //Speed up mousemove minus delta after 5s
           setTimeout(() => {
               this.minusDelta2 = -5
           }, 5000)
     },
     // declare dom stream Subjects
     domStreams: ['plus$', 'minus$'],
     subscriptions () {
           var count$ = Rx.Observable
                         .merge(
                           this.plus$.map(() => 1),
                           this.minus$.pluck('data')
                         )
                         .startWith(0)
                         .scan((total, change) => total + change)
           return {
               count: count$
           }
     }
}
</script>

<style>
#app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
}
</style>
