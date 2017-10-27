export let textConst = obj => ({
    name: obj.name,
    desc: obj.desc,
    comment: obj.comment || '',
    use: 'required',
    min_occurs: 1,
    max_occurs: 1,
    default: '',
    fixed: '',
    type: 'TEXT',
    dimension: {
        content: {
            min_length: obj.min_length,
            max_length: obj.max_length
        }
    }
});

export let imageConst = obj => ({
    name: obj.name,
    desc: obj.desc,
    comment: obj.comment || '',
    use: 'repeated',
    min_occurs: 1,
    max_occurs: 1,
    default: '',
    fixed: '',
    type: 'IMAGE',
    dimension: {
        resource: {
            width: obj.width || 1,
            height: obj.height || 1,
            file_size_KB_limit: obj.file_size_KB_limit || 1,
            file_format: obj.fileFormat || 1,
            min_duration: obj.min_duration || 0,
            max_duration: obj.max_duration || 0,
            duration_type: obj.duration_type || '',
            jdwatermarkpos: obj.jdwatermarkpos || 1,
            jdwatermark: obj.jdwatermark || ''
        }
    }
});

export let imageListConst = obj => ({
    name: obj.name,
    desc: obj.desc,
    comment: obj.comment || '',
    use: 'repeated',
    min_occurs: obj.min_occurs || 1,
    max_occurs: obj.max_occurs || 1,
    default: '',
    fixed: '',
    type: 'IMAGE',
    dimension: {
        resource: {
            width: obj.width || 1,
            height: obj.height || 1,
            file_size_KB_limit: obj.file_size_KB_limit || 1,
            file_format: obj.fileFormat || 1,
            min_duration: obj.min_duration || 0,
            max_duration: obj.max_duration || 0,
            duration_type: obj.duration_type || '',
            jdwatermarkpos: obj.jdwatermarkpos || 1,
            jdwatermark: obj.jdwatermark || ''
        }
    },
    title: '图片',
    caption: '请上传图片'
});

export let urlConst = obj => ({
    name: 'url',
    desc: '链接',
    comment: '',
    use: 'required',
    min_occurs: 1,
    max_occurs: 1,
    default: '',
    fixed: '',
    type: 'URL',
    dimension: {
        content: {
            min_length: obj.min_length || 1,
            max_length: obj.max_length || 1024,
            pattern: '^https?:\\/\\/([a-zA-Z0-9\\-]+\\.)+([a-zA-Z]{2,4})([\\/\\?#][a-zA-Z0-9`~!@#%&_=;\\$\\^\\*\\(\\)\\-\\+\\{\\}\\[\\]\\:\\,\\.\\?\\/\\|]*)?$'
        }
    },
    title: '链接',
    caption: '请输入链接地址'
});

export let enumConst = obj => ({
    name: 'sortable',
    desc: '自动优化图片排序',
    comment: obj.desc,
    use: 'required',
    min_occurs: 1,
    max_occurs: 1,
    default: '1',
    fixed: '',
    type: 'ENUM',
    dimension: {
        option: obj.option || []
    },
    title: '自动优化图片排序',
    caption: '自动优化图片排序'
});

export let elementStoryConst = obj => {
    let eobj = {
        name: 'element_story',
        desc: '素材',
        comment: '',
        use: 'repeated',
        min_occurs: obj.min_occurs,
        max_occurs: obj.max_occurs,
        default: '',
        fixed: '',
        type: 'STRUCT',
        dimension: {}
    };
    let hasChild = false;
    if (obj[2].open) {
        hasChild = true;
        eobj.dimension.title = {
            name: 'title',
            desc: '子标题',
            comment: obj[2].comment || '',
            use: 'required',
            min_occurs: 1,
            max_occurs: 1,
            default: '',
            fixed: '',
            type: 'TEXT',
            dimension: {
                content: {
                    min_length: obj[2].min_length * 2,
                    max_length: obj[2].max_length * 2
                }
            }
        };
    }
    if (obj[3].open) {
        hasChild = true;
        eobj.dimension.description = {
            name: 'description',
            desc: '子文案',
            comment: obj[3].comment || '',
            use: 'required',
            min_occurs: 1,
            max_occurs: 1,
            default: '',
            fixed: '',
            type: 'TEXT',
            dimension: {
                content: {
                    min_length: obj[3].min_length * 2,
                    max_length: obj[3].max_length * 2
                }
            }
        };
    }
    if (obj[1].open) {
        hasChild = true;
        let fileFormat = 0;   // 图片格式 jpg 1，  png 2，  gif 4
        if (obj[1].format.length > 0) {
            fileFormat = obj[1].format.reduce((i1, i2) => i1 | i2);
        }
        eobj.dimension.image = {
            name: 'image',
            desc: '图片',
            comment: obj[1].comment || '',
            use: 'required',
            min_occurs: 1,
            max_occurs: 1,
            default: '',
            fixed: '',
            type: 'IMAGE',
            dimension: {
                resource: {
                    width: obj[1].width || 1,
                    height: obj[1].height || 1,
                    file_size_KB_limit: obj[1].picSize || 1,
                    file_format: fileFormat || 1,
                    min_duration: obj[1].min_duration || 0,
                    max_duration: obj[1].max_duration || 0,
                    duration_type: obj[1].duration_type || '',
                    jdwatermarkpos: obj[1].jdwatermarkpos || 1,
                    jdwatermark: obj[1].jdwatermark || '',
                    watermarklayer: '',
                    tipslayer: ''
                }
            }
        };
    }
    if (obj[4].open) {
        hasChild = true;
        eobj.dimension.url = {
            name: 'url',
            desc: '链接',
            comment: '',
            use: 'required',
            min_occurs: 1,
            max_occurs: 1,
            default: '',
            fixed: '',
            type: 'URL',
            dimension: {
                content: {
                    min_length: obj[4].urlMin * 2 || 2,
                    max_length: obj[4].urlMax * 2 || 2048,
                    pattern: '^https?:\\/\\/([a-zA-Z0-9\\-]+\\.)+([a-zA-Z]{2,4})([\\/\\?#][a-zA-Z0-9`~!@#%&_=;\\$\\^\\*\\(\\)\\-\\+\\{\\}\\[\\]\\:\\,\\.\\?\\/\\|]*)?$'
                }
            },
            title: '链接',
            caption: '请输入链接地址'
        };
    }
    return hasChild ? eobj : null;
};


export let corporateConst = obj => {
    let cobj = {
        name: 'corporate',
        desc: '商标',
        comment: '',
        use: 'required',
        min_occurs: 1,
        max_occurs: 1,
        default: '',
        fixed: '',
        type: 'STRUCT',
        dimension: {
            corporate_name: {
                name: 'corporate_name',
                desc: '商标长度',
                comment: '',
                use: 'required',
                min_occurs: 1,
                max_occurs: 1,
                default: '',
                fixed: '',
                type: 'TEXT',
                dimension: {
                    content: {
                        min_length: obj.min,
                        max_length: obj.max
                    }
                }
            },
            corporate_img: {
                name: 'corporate_img',
                desc: '商标图片',
                comment: obj.comment,
                use: 'required',
                min_occurs: 1,
                max_occurs: 1,
                default: '',
                fixed: '',
                type: 'IMAGE',
                dimension: {
                    resource: {
                        width: obj.width || 1,
                        height: obj.height || 1,
                        file_size_KB_limit: obj.file_size_KB_limit || 1,
                        file_format: obj.fileFormat || 1,
                        min_duration: obj.min_duration || 0,
                        max_duration: obj.max_duration || 0,
                        duration_type: obj.duration_type || '',
                        jdwatermarkpos: obj.jdwatermarkpos || 1,
                        jdwatermark: obj.jdwatermark || ''
                    }
                }
            },
            puin: {
                name: 'puin',
                desc: '商户UIN',
                comment: '',
                use: 'required',
                min_occurs: 1,
                max_occurs: 1,
                default: '',
                fixed: '',
                type: 'TEXT',
                dimension: {
                    content: {
                        min_length: 1,
                        max_length: 1024
                    }
                }
            }
        }
    };
    if (+obj.gdtuin === 2) {
        delete cobj.dimension.puin;
    }
    return cobj;
};

export function typeIs(target) {
    return Object.prototype.toString.apply(target).match(/\[object\s(\w+)\]/)[1].toLowerCase();
}
export function range(num) {
    return [...Array(num).keys()];
}
export function decodeSiteSet(siteset, dataEnum, returnType = 'id') {
    var arr = siteset.split('');
    var siteResult = [];
    arr.forEach((v, k) => {
        if (+v === 1) {
            siteResult.push(k + 1);
        }
    });
    return dataEnum
        .filter(data => siteResult.indexOf(+data.id) !== -1)
        .map(data => data[returnType]);
}
export function encodeSiteSet(arr) {
    if (typeIs(arr) !== 'array') {
        arr = Array.of(arr);
    }
    let siteArr = range(Math.max(...arr)).fill(0);
    arr.forEach(data => {
        siteArr[data - 1] = 1;
    });
    return siteArr.join('');
}

export function arrRemove(arr, val) {
    var index = arr.indexOf(val);
    return index === -1 ? arr : arr.splice(index, 1);
}