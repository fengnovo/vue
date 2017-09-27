<template>
    <div class='tinymce-container editor-container' >
        <textarea class='tinymce-textarea' 
            :id="id" ></textarea>
        <p :class="fullscreen ? 'fixed-right-bottom' : ''" style="float: right">
            <span :style="{color: richTextLength > 300 ? '#f00' : '#666'}">
                {{richTextLength || 18}}</span>/300
        </p>
    </div>
</template>

<script>
/** tinymce的uploadimage控件 */
tinymce.PluginManager.add('uploadimage', function (editor) {
    function selectLocalImages() {
        var dom = editor.dom;
        var input_f = $('<input type="file" name="thumbnail" accept="image/jpg,image/jpeg,image/png,image/gif" multiple="multiple">');
        input_f.on('change', function () {
            var form = $("<form/>",
                {
                    action: editor.settings.upload_image_url, //设置上传图片的路由，配置在初始化时
                    style: 'display:none',
                    method: 'post',
                    enctype: 'multipart/form-data'
                }
            );
            form.append(input_f);
            //ajax提交表单
            form.ajaxSubmit({
                beforeSubmit: function () {
                    return true;
                },
                success: function (data) {
                    if (data && data.file_path) {
                        editor.focus();
                        data.file_path.forEach(function (src) {
                            editor.selection.setContent(dom.createHTML('img', {src: src}));
                        })
                    }
                }
            });
        });

        input_f.click();
    }

    editor.addCommand("mceUploadImageEditor", selectLocalImages);

    editor.addButton('uploadimage', {
        icon: 'image',
        tooltip: '上传图片',
        onclick: selectLocalImages
    });

    editor.addMenuItem('uploadimage', {
        icon: 'image',
        text: '上传图片',
        context: 'tools',
        onclick: selectLocalImages
    });
});

/** 待整合，消息触达用 */
function typeIs(target) {
    return Object.prototype.toString.apply(target).match(/\[object\s(\w+)\]/)[1].toLowerCase();
}
function decodeHtml(html) {
    if (typeIs(html) !== 'string') {
        return '';
    }
    let _ele = document.createElement('div');
    _ele.innerHTML = html;
    return _ele.innerText || _ele.textContent;
}

function getClipboardData(e, format = 'text') {
    if (e.clipboardData) {
        return e.clipboardData.getData(format);
    }
    if (window.clipboardData) {
        return window.clipboardData.getData(format);
    }
}
  
export default {
    name: 'tinymce',
    props: {
        id: {
            type: String,
            default: 'tinymceEditor'
        },
        value: {
            type: String,
            default: `<p>尊敬的广告主：</p>
                  <p><span id='virPlaceholder' style='color:#ccc;'>描述系统消息内容</span></p>
                  <br>
                  <p>京东直投团队</p>`
        },
        toolbar: {
            type: Array,
            required: false,
            default() {
                return [ 'mybutton bold italic underline custom_fontsize custom_link link image forecolor fullpage']
            }
        },
        menubar: {
            default: ''
        },
        height: {
            type: Number,
            required: false,
            default: 400
        }
    },
    data() {
        return {
            hasChange: false,
            hasInit: false,
            richTextLength: 18,
            fullscreen: false
        }
    },
    watch: {
        value(val) {
            if (!this.hasChange && this.hasInit) {
                this.$nextTick(() => tinymce.get(this.id).setContent(val))
            }
        }
    },

    methods: {
        handleRichTextFocus(e) {
            let _placeholder = tinymce.activeEditor.dom.select('#virPlaceholder')[0];
            if (_placeholder) {
                let _parent = _placeholder.parentNode;
                _parent.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';
                tinymce.activeEditor.selection.setCursorLocation(_parent, 1);
            }
        },
        handleRichTextChange() {
            let content = tinymce.get()[0].getContent();
            // this.props.form.setFieldsValue({ content: content });
            console.log(content);
            this.richTextLength = decodeHtml(content.replace(/[\n\r]/g, '')).replace(/[\n\r]/g, '').length
            // this.props.form.validateFields(['content']);
        },
        handleRichTextPaste(e) {
            let clipData = getClipboardData(e);
            let content = tinymce.get()[0].getContent();
            this.richTextLength = decodeHtml((content + clipData).replace(/[\n\r]/g, '')).replace(/[\n\r]/g, '').length
        },
    },
    mounted() {
        const _this = this;
        tinymce.init({
            selector: `#${this.id}`,
            height: this.height,
            body_class: 'panel-body ',
            object_resizing: false,
            language: 'zh_CN',
            language_url: '/static/tinymce/langs/zh_CN.js',
            upload_image_url: 'http://xoa.pp.jd.com/xoa/jdzt/sysmsg/image', //配置的上传图片的路径，待提取，消息触达用
            plugins: 'textcolor fullscreen uploadimage fontsizeselect link',
            toolbar: 'bold italic underline fontsizeselect link forecolor uploadimage fullscreen',
            menubar: false,
            statusbar: false,
            fontsize_formats: "标准=12px 中=13px 大=14px 较大=15px 最大=16px",
            font_size: '标准=12px',
            default_link_target: '_self',
            link_title: false,
            target_list: [
                { title: '在当前页打开', value: '_self' },
                { title: '在新标签页打开', value: '_blank' }
            ],
            custom_url_opt: {
                valid_url: true,
                errClass: 'url-err',
                errText: '格式错误，只能输入网址'
            },
            init_instance_callback: editor => {
                if (_this.value) {
                    editor.setContent(_this.value)
                }
                _this.hasInit = true;
                editor.on('NodeChange Change KeyUp', () => {
                    this.hasChange = true;
                    // 获取内容，触发父组件的input方法
                    this.$emit('input', editor.getContent({ format: 'raw' }));
                });

                editor.on('focus', function() {
                    _this.handleRichTextFocus();
                });
                editor.on('keyup', function(){
                    _this.handleRichTextChange();
                });
                editor.on('change', function() {
                    _this.handleRichTextChange();
                });
                editor.on('paste', function(){
                    _this.handleRichTextPaste();
                });
            }
        });
    },
    destroyed() {
        tinymce.get(this.id).destroy();
    }
}
</script>

<style scoped>
.tinymce-container {
    position: relative
}

.tinymce-textarea {
    visibility: hidden;
    z-index: -1;
}

.editor-custom-btn-container {
    position: absolute;
    right: 15px;
    top: 18px;
}

.editor-upload-btn {
    display: inline-block;
}

.fixed-right-bottom {
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 999;
}
</style>

