import { dataConst, dataEnum } from './config.const.js';
import { mergeData } from './data.js';
import { rules } from './rules.js';
import { arrRemove } from './util';
import {
    fetchAdd,
    getUploadImgUrl,
    getUploadLayerUrl
} from './common';


function initCreativeElementsData() {
    return {
        1: {
            type: 'TEXT',
            name: 'title',
            desc: '标题'
        },
        2: {
            type: 'TEXT',
            name: 'description',
            desc: '文案'
        },
        3: {
            1: {
                type: 'IMAGE',
                name: 'image',
                desc: '图片',
                format: ['1'],
                position: '1'
            },
            2: {
                type: 'IMAGE',
                name: 'image',
                desc: '图片',
                format: ['1'],
                position: '1'
            },
            3: {
                type: 'IMAGE',
                name: 'image',
                desc: '图片',
                format: ['1'],
                position: '1'
            }
        },
        4: {
            type: 'ENUM',
            name: 'sortable',
            desc: '自动优化图片排序',
            sortFlag: ['0', '1']
        },
        5: {
            type: 'URL',
            name: 'url',
            desc: '链接',
            urlMin: 1,
            urlMax: 1024
        },
        6: {
            type: 'IMAGE',
            name: 'image_list',
            desc: '图片',
            format: ['1'],
            position: '1'
        },
        7: {
            type: 'STRUCT',
            name: 'corporate',
            desc: '商标',
            format: ['1'],
            gdtuin: '1'
        }
    };
}
function initCreativeSetElementsData() {
    return {
        open: false,
        min_occurs: '',
        max_occurs: '',
        type: 'STRUCT',
        name: 'element_story',
        1: {
            open: false,
            type: 'IMAGE',
            name: 'image',
            desc: '图片',
            comment: '',
            format: ['1'],
            jdwatermarkpos: '1'
        },
        2: {
            open: false,
            type: 'TEXT',
            name: 'title',
            desc: '子标题'
        },
        3: {
            open: false,
            type: 'TEXT',
            name: 'description',
            desc: '子文案'
        },
        4: {
            open: false,
            type: 'URL',
            name: 'url',
            desc: '链接',
            urlMin: 1,
            urlMax: 1024
        }
    };
}

function initOptionsData() {
    return {
        showPlat: [],
        auditType: [],
        adSiteSet: [],
        adType: [],
        specType: [],
        adElement: [{
            value: '1',
            label: '标题'
        }, {
            value: '2',
            label: '描述'
        }, {
            value: '3',
            label: '图片'
        }, {
            value: '4',
            label: 'Sortable'
        }, {
            value: '5',
            label: 'URL'
        }, {
            value: '6',
            label: '图片集合(image_list)'
        }, {
            value: '7',
            label: '商标'
        }],
        adSetElement: [{
            value: '1',
            label: '子素材图片'
        }, {
            value: '2',
            label: '子素材标题'
        }, {
            value: '3',
            label: '子素材描述'
        }, {
            value: '4',
            label: '子素材URL'
        }]
    };
}

function initFormData() {
    return {
        adSpecName: '',
        adBizId: 1,
        specType: '',
        subAdBizId: '',
        adSiteSet: '',
        adElement: '1',
        adSetElement: '子素材图片',
        creativeElements: initCreativeElementsData(),
        creativeSetElements: initCreativeSetElementsData(),
        adSpecGdtFlag: true,
        adSpecGdt: '',
        adBidTypeCPCFlag: true,
        adBidTypeCPCMin: '',
        adBidTypeCPCMax: '',
        adBidTypeCPMFlag: true,
        adBidTypeCPMMin: '',
        adBidTypeCPMMax: '',
        showPlat: '',
        auditType: '',
        examplePreviewImgUrl1: '',
        imgUrlDisabled1: false,
        examplePreviewImgUrl2: '',
        imgUrlDisabled2: false,

        uploadImgUrl: getUploadImgUrl(),
        uploadParam1: {
            buisinesstype: 1,
            imagelimitconfig: '0-1024-0:0x0-0:0-1',
            userType: 1,
            uploadUin: 51959,
            creativeNum: ''
        },
        uploadParam2: {
            buisinesstype: 1,
            imagelimitconfig: '3-100-0:100x100-0:0-1', // `3-100-0:${creativeWidth}x${creativeHeight}-0:0-1`;  
            userType: 1,
            uploadUin: 51959,
            creativeNum: ''
        }
    };
}

export default {
    data() {
        return {
            actioning: false,
            options: initOptionsData(),
            form: initFormData(),
            creativeElements: {
                3: {
                    items: {}
                }
            },
            disabledAdd: false,
            elements: {
                3: {
                    items: {}
                }
            },
            rules,

            creativeSetElements: {},
            disabledSetAdd: false,
            elementsSet: {}
        };
    },

    mounted() {
        this.initData();
        this.initOptions();
    },
    methods: {
        initData() {
            this.options = initOptionsData();
            this.form = initFormData();
            this.creativeElements = {
                3: {
                    items: {}
                }
            };
            this.disabledAdd = false;
            this.elements = {
                3: {
                    items: {}
                }
            };

            this.creativeSetElements = {};
            this.disabledSetAdd = false;
            this.elementsSet = {};
        },
        handleRemove1(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview1(file) {
            console.log(file);
        },
        handleSuccess1(e) {
            console.log(e);
            if (+e.errcode === 0) {
                this.form.examplePreviewImgUrl1 = e.imageUrl;
                this.imgUploadSuccess();
            } else {
                this.handleError(e);
            }
        },
        handleChange1(file, fileList) {
            console.log(file, fileList);
            if (fileList.length > 1 && file.status === 'success') {
                fileList.shift();
            }
        },
        handleRemove2(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview2(file) {
            console.log(file);
        },
        handleSuccess2(e) {
            console.log(e);
            if (+e.errcode === 0) {
                this.form.examplePreviewImgUrl2 = e.imageUrl;
                this.imgUploadSuccess();
            } else {
                this.handleError(e);
            }
        },
        handleChange2(file, fileList) {
            console.log(file, fileList);
            if (fileList.length > 1 && file.status === 'success') {
                fileList.shift();
            }
        },


        handleRemove311(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview311(file) {
            console.log(file);
        },
        handleSuccess311(e) {
            console.log(e);
            if (+e.errcode === 0) {
                this.form.examplePreviewImgUrl311 = e.imageUrl;
                this.imgUploadSuccess();
            } else {
                this.handleError(e);
            }
        },
        handleChange311(file, fileList) {
            console.log(file, fileList);
            if (fileList.length > 1 && file.status === 'success') {
                fileList.shift();
            }
        },
        handleRemove312(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview312(file) {
            console.log(file);
        },
        handleSuccess312(e) {
            console.log(e);
            if (+e.errcode === 0) {
                this.form.examplePreviewImgUrl312 = e.imageUrl;
                this.imgUploadSuccess();
            } else {
                this.handleError(e);
            }
        },
        handleChange312(file, fileList) {
            console.log(file, fileList);
            if (fileList.length > 1 && file.status === 'success') {
                fileList.shift();
            }
        },


        handleRemove321(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview321(file) {
            console.log(file);
        },
        handleSuccess321(e) {
            console.log(e);
            if (+e.errcode === 0) {
                this.form.examplePreviewImgUrl321 = e.imageUrl;
                this.imgUploadSuccess();
            } else {
                this.handleError(e);
            }
        },
        handleChange321(file, fileList) {
            console.log(file, fileList);
            if (fileList.length > 1 && file.status === 'success') {
                fileList.shift();
            }
        },
        handleRemove322(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview322(file) {
            console.log(file);
        },
        handleSuccess322(e) {
            console.log(e);
            if (+e.errcode === 0) {
                this.form.examplePreviewImgUrl322 = e.imageUrl;
                this.imgUploadSuccess();
            } else {
                this.handleError(e);
            }
        },
        handleChange322(file, fileList) {
            console.log(file, fileList);
            if (fileList.length > 1 && file.status === 'success') {
                fileList.shift();
            }
        },


        handleRemove331(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview331(file) {
            console.log(file);
        },
        handleSuccess331(e) {
            console.log(e);
            if (+e.errcode === 0) {
                this.form.examplePreviewImgUrl331 = e.imageUrl;
                this.imgUploadSuccess();
            } else {
                this.handleError(e);
            }
        },
        handleChange331(file, fileList) {
            console.log(file, fileList);
            if (fileList.length > 1 && file.status === 'success') {
                fileList.shift();
            }
        },
        handleRemove332(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview332(file) {
            console.log(file);
        },
        handleSuccess332(e) {
            console.log(e);
            if (+e.errcode === 0) {
                this.form.examplePreviewImgUrl332 = e.imageUrl;
                this.imgUploadSuccess();
            } else {
                this.handleError(e);
            }
        },
        handleChange332(file, fileList) {
            console.log(file, fileList);
            if (fileList.length > 1 && file.status === 'success') {
                fileList.shift();
            }
        },


        handleRemove41(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview41(file) {
            console.log(file);
        },
        handleSuccess41(e) {
            console.log(e);
            if (+e.errcode === 0) {
                this.form.examplePreviewImgUrl41 = e.imageUrl;
                this.imgUploadSuccess();
            } else {
                this.handleError(e);
            }
        },
        handleChange41(file, fileList) {
            console.log(file, fileList);
            if (fileList.length > 1 && file.status === 'success') {
                fileList.shift();
            }
        },
        handleRemove42(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview42(file) {
            console.log(file);
        },
        handleSuccess42(e) {
            console.log(e);
            if (+e.errcode === 0) {
                this.form.examplePreviewImgUrl42 = e.imageUrl;
                this.imgUploadSuccess();
            } else {
                this.handleError(e);
            }
        },
        handleChange42(file, fileList) {
            console.log(file, fileList);
            if (fileList.length > 1 && file.status === 'success') {
                fileList.shift();
            }
        },


        handleRemove51(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview51(file) {
            console.log(file);
        },
        handleSuccess51(e) {
            console.log(e);
            if (+e.errcode === 0) {
                this.form.examplePreviewImgUrl51 = e.imageUrl;
                this.imgUploadSuccess();
            } else {
                this.handleError(e);
            }
        },
        handleChange51(file, fileList) {
            console.log(file, fileList);
            if (fileList.length > 1 && file.status === 'success') {
                fileList.shift();
            }
        },
        handleRemove52(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview52(file) {
            console.log(file);
        },
        handleSuccess52(e) {
            console.log(e);
            if (+e.errcode === 0) {
                this.form.examplePreviewImgUrl52 = e.imageUrl;
                this.imgUploadSuccess();
            } else {
                this.handleError(e);
            }
        },
        handleChange52(file, fileList) {
            console.log(file, fileList);
            if (fileList.length > 1 && file.status === 'success') {
                fileList.shift();
            }
        },


        imgUploadSuccess() {
            this.$message({
                message: '图片上传成功',
                type: 'success'
            });
        },
        handleError(e) {
            this.$message({
                message: '图片上传失败，' + e.errmsg,
                type: 'error'
            });
        },
        changElement() {
            for (let i = 1; i < 4; i++) {
                if (!this.creativeElements[3].items[i]) {
                    this.creativeElements[3][i] = true;
                    this.creativeElements[3].items[i] = true;
                    this.elements[3][i] = true;
                    this.elements[3].items[i] = true;
                    this.form.creativeElements[3][i].open = true;
                    return;
                }
            }
        },
        addCreativeElement() {
            let adElement = this.form.adElement;
            if (+adElement === 3) {
                this.changElement();
                let items = this.creativeElements[3].items;
                this.disabledAdd = !((items[1] && items[2] && items[3]));
                this.disabledAdd = !this.disabledAdd;
            } else {
                this.disabledAdd = !this.elements[adElement];
                this.elements[adElement] = true;
                this.creativeElements[adElement] = true;
                this.form.creativeElements[adElement].open = true;
            }
        },
        closeCreativeElement(adElement, picIndex) {
            if (picIndex) {
                this.creativeElements[adElement].items[picIndex] = false;
                this.disabledAdd = !this.elements[adElement][picIndex];
                this.elements[adElement][picIndex] = false;
                this.creativeElements[adElement][picIndex] = false;
                this.form.creativeElements[adElement][picIndex] = initCreativeElementsData()[adElement][picIndex];
                let adElementX = this.form.adElement;
                this.disabledAdd = !!this.elements[adElementX][picIndex];
            } else {
                this.disabledAdd = !this.elements[adElement];
                this.elements[adElement] = false;
                this.creativeElements[adElement] = false;
                this.form.creativeElements[adElement] = initCreativeElementsData()[adElement];
                let adElementX = this.form.adElement;
                this.disabledAdd = !!this.elements[adElementX];
            }
        },
        initOptions() {
            let bizTypeMap = dataEnum.bizTypeMap;
            let specType = dataEnum.specTypeEnum;               // 商品类型
            let showPlat = dataEnum.showPlatFormEnum;           // 投放平台
            let auditType = dataEnum.auditTypeEnum;             // 审核规则

            let bizTypeArr = [];        // 产品类型
            let adTypeArr = [];         // 子产品类型
            let adSiteSetArr = [];      // 投放站点
            let specTypeArr = [];       // 商品类型
            let showPlatArr = [];       // 投放平台
            let auditTypeArr = [];      // 审核规则
            specType.forEach(function(item) {     // 子产品类型
                specTypeArr.push({
                    label: item.name,
                    value: item.id
                });
            });
            bizTypeMap.forEach(function(item1) {
                bizTypeArr.push({                       // 产品类型
                    label: item1.name,
                    value: item1.id
                });
                item1.child.forEach(function(item2) {     // 子产品类型
                    adTypeArr.push({
                        label: item2.name,
                        value: item2.id
                    });
                });
            });

            showPlat.forEach(function(item) {       // 投放平台
                showPlatArr.push({
                    label: item.name,
                    value: item.id
                });
            });

            auditType.forEach(function(item) {      // 审核规则
                auditTypeArr.push({
                    label: item.name,
                    value: item.id
                });
            });

            this.options.bizType = bizTypeArr;
            this.options.specType = specTypeArr;
            this.form.specType = '1';
            this.options.adType = adTypeArr;
            this.form.subAdBizId = '3';
            // this.options.adSiteSet = adSiteSetArr;

            this.options.showPlat = showPlatArr;
            this.form.showPlat = '2';
            this.options.auditType = auditTypeArr;
            this.form.auditType = '1';
        },
        cancel() {
            this.$emit('closeAddSlide');
            this.initData();
        },
        handleSubmit() {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    // alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
            console.log(this.form);
            this.actioning = true;
            let s = mergeData(this.form);
            console.log(s);
            setTimeout(() => {
                this.actioning = false;
            }, 3000);
            fetchAdd(mergeData(this.form)).then(response => {
                this.actioning = false;
                let tipType = response.errcode === 0 ? 'success' : 'error';
                let tipText = response.errcode === 0 ? '新增成功！' : '新增失败！' + response.errmsg;
                this.$notify({
                    title: '提示',
                    message: tipText,
                    type: tipType
                });
                // if(response.errcode == '0'){
                //     debugger
                // }
            }).catch(e => {
                this.actioning = false;
                console.log(e);
            });
        },
        validate(rule, value, callback, a) {
            // if (value === '') {
            //     callback(new Error('不能为空'));
            // } else if(!/^\d+(?:\.\d{1,2})?$/.test(value)) {
            //     callback(new Error('输入不对'));
            // } else {
            //     callback();
            // }
            callback();
        }
    },
    watch: {
        'form.subAdBizId': function() {
            let adBizId = this.form.adBizId;
            let subAdBizId = this.form.subAdBizId;
            let bizTypeMap = dataEnum.bizTypeMap;
            let adSiteSetArr = [];
            bizTypeMap.forEach(function(item1) {
                item1.child.forEach(function(item2) {     // 子产品类型
                    if (item2.id === subAdBizId) {
                        item2.child.forEach(function(item3) {       // 投放站点
                            adSiteSetArr.push({
                                label: item3.name,
                                value: item3.id
                            });
                        });
                    }
                });
            });
            this.form.adSiteSet = '';
            this.options.adSiteSet = adSiteSetArr;
            this.form.adSiteSet = adSiteSetArr[0] && [adSiteSetArr[0].value];
        },
        'form.adElement': function() {
            let adElementX = this.form.adElement;
            if (+adElementX !== 3) {
                this.disabledAdd = !!this.creativeElements[adElementX];
            } else {
                let items = this.creativeElements[3].items;
                this.disabledAdd = !!((items[1] && items[2] && items[3]));
            }
        }
    }
};