<template>
    <div>
        <div id="editorElem" ref="editorElem" style="text-align:left"></div>
    </div>
</template>

<script>

    import E from '../../node_modules/wangeditor/release/wangEditor.js'

    export default {
      name: 'editor',
      data () {
        return {
          editor: {}
        }
      },
      methods: {
        clickHandle() {
            // let text = this.editor.txt.text()
            let text = this.editor.$textElem[0].innerText
            console.log(text)
            return text
        }
      },
      mounted() {
        this.editor = new E(this.$refs.editorElem)
        // editor.customConfig.onchange = (html) => {
        //   this.editorContent = html
        // }
        console.log(this.editor)
        this.editor.customConfig.uploadImgShowBase64 = true
        this.editor.create()
      }
    }
</script>

<style>

.w-e-toolbar {
    display: block!important;
}
.w-e-text-container {
    height: 400px!important;
}
.w-e-toolbar .w-e-menu {
    display: inline-block!important;
}

</style>
