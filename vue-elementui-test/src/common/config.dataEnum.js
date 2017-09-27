export const dataEnum = {
    bizTypeMap: [
        {
            id: '1',
            name: '腾讯社交资源',
            child: [
                {
                    id: '3',
                    name: '空间直投',
                    child: [
                        { id: '1', name: 'Qzone' },
                        { id: '8', name: '朋友网' },
                        { id: '9', name: 'QQ客户端' },
                        { id: '14', name: 'QQ音乐' },
                        { id: '16', name: '每日精选' },
                        { id: '19', name: '腾讯网' },
                        { id: '20', name: 'QQ邮箱' },
                        { id: '26', name: '外部媒体' }
                    ]
                },
                {
                    id: '6',
                    name: '无线广告',
                    child: [
                        { id: '21', name: '微信' },
                        { id: '15', name: '移动联盟' },
                        { id: '25', name: '移动内部站点' }
                    ]
                },
                {
                    id: '10',
                    name: '朋友圈广告',
                    child: [
                        { id: '35', name: '微信(朋友圈)' }
                    ]
                }
            ]

        }
        // {
        //     id: '2',
        //     name: '其他资源',
        //     child: [
        //         {
        //             id: '7',
        //             name: '无线广告',
        //             child: [
        //                 { id: '27', name: '今日头条直投' },
        //                 { id: '28', name: '腾讯新闻APP' },
        //                 { id: '29', name: '网易新闻APP' },
        //                 { id: '30', name: '一点资讯Android' },
        //                 { id: '31', name: 'ADX联盟' }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     id: '3',
        //     name: '腾讯媒体资源',
        //     child: [
        //         {
        //             id: '9',
        //             name: '无线广告',
        //             child: [
        //                 { id: '32', name: '新闻客户端' },
        //                 { id: '33', name: '天天快报' },
        //                 { id: '34', name: '腾讯视频APP' }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     id: '4',
        //     name: '百度媒体资源',
        //     child: [
        //         {
        //             id: '11',
        //             name: '无线广告',
        //             child: [
        //                 { id: '36', name: '百度信息流直投' }
        //             ]
        //         }
        //     ]
        // }
    ],
    isOrNot: [
        { id: '1', name: '是' },
        { id: '0', name: '否' }
    ],
    isAuth: [
        { id: 1, name: '需要权限' },
        { id: 0, name: '无需权限' }
    ],
    /**
     * 投放平台类型字典
     */
    showPlatFormEnum: [
        { id: '1', name: 'PC端' },
        { id: '2', name: '无线端' }
    ],
    /**
     * 审核规格类型字典
     */
    auditTypeEnum: [
        { id: '1', name: '先发后审' },
        { id: '2', name: '先审后发' }
    ],

    /**
     * 上线产品类型
     */
    operProductTypeEnum: [
        { id: `${1 << 0}`, name: '投放工具' },
        { id: `${1 << 1}`, name: '京东直投' },
        { id: `${1 << 2}`, name: '拍拍直投' }
    ],
    /**
     * 图片类型
     */
    formatTypeEnum: [
        { id: 1 << 0, name: 'jpg' },
        { id: 1 << 1, name: 'png' },
        { id: 1 << 2, name: 'gif' }
    ],
    /**
     * 水印位置
     */
    waterMarkPosEnum: [
        { id: '1', name: '左上角样式' },
        { id: '2', name: '右上角样式' }
    ],

    // property

    chargeTypeEnum: [
        { id: `${1 << 0}`, name: 'CPC' },
        { id: `${1 << 1}`, name: 'CPM' }
        // { id: dataConst.CPT, name: 'CPT' },
        // { id: `${1 << 3}`, name: 'oCPA' }
    ],

    sortableEnum: [
        { id: '0', name: '自动优化' },
        { id: '1', name: '顺序播放' }
    ],

    jrttCrtTypeEnum: [
        { id: '1', name: '京东智推' },
        { id: '2', name: 'ADX' }
    ]
};
