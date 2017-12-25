<template>
    <div id="app">
            <div>
                <center>
                    维基搜索
                </center>
            </div>
          <input v-model="search">
          <div v-if="results">
                <h1>{{ results.term }}</h1>
                <ul v-if="results.matches.length">
                      <li v-for="match in results.matches">
                            <a :href="match.url">{{ match.title }}</a>
                            <p>{{ match.description }}</p>
                      </li>
                </ul>
                <p v-else>
                    未找到搜索内容！
                </p>
          </div>
     </div>
</template>

<script>
import Rx from 'rxjs/Rx';
import $ from 'jquery';

export default {
     name: 'app',
     data() {
        return {
            search: ''
        }
     },
     methods: {
         fetchTerm (term) {
               return Rx.Observable.fromPromise($.ajax({
                     url: 'http://en.wikipedia.org/w/api.php',
                     dataType: 'jsonp',
                     data: {
                           action: 'opensearch',
                           format: 'json',
                           search: term
                     }
               }).promise())
         },
         formatResult (res) {
              return {
                    term: res[0],
                    matches: res[1].map((title, i) => ({
                          title: title,
                          description: res[2][i],
                          url: res[3][i]
                    }))
              }
        }
     },
     subscriptions () {
        return {
          // this is the example in RxJS's readme.
          results: this.$watchAsObservable('search')
            .pluck('newValue')
            .filter(text => text.length > 2)
            .debounceTime(500)
            .distinctUntilChanged()
            .switchMap(this.fetchTerm)
            .map(this.formatResult)
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
