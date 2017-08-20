<template>
  <div class="components-container">
    <p>cms系统富文本,Tinymce<a target='_blank' href='https://segmentfault.com/a/1190000009762198#articleHeader13'> 相关文章 </a></p>
    <div>
      <Tinymce :height=200 ref="editor" v-model="content"></Tinymce>
    </div>
    <div class='editor-content' v-html='content'></div>
  </div>
</template>

<script>
  import Tinymce from './Editor';

  export default {
    components: { Tinymce },
    data() {
      return {
        content: 'Tinymce'
      }
    }
  };
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>
