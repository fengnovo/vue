# vue-es6

``` bash
npm install --save-dev babel-plugin-transform-object-rest-spread
```

``` bash
{
  "presets": [["env", { "modules": false }]],
  "plugins": [
    "transform-vue-jsx",
    "transform-runtime",
    "transform-object-rest-spread",
    [
      "import",
      {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
```
