export const rules = {
    form: {
        creativeElements: {
            min: [
                {
                    validator: (r, v, b) => {
                        console.log('form.creativeElements[1].min');
                        if (v === '') {
                            b(new Error('不能为空'));
                            return;
                        }
                        b();
                    },
                    trigger: 'blur'
                }
            ],
            max: [
                {
                    validator: (r, v, b) => {
                        console.log('form.creativeElements[1].max');
                        if (v === '') {
                            b(new Error('不能为空'));
                            return;
                        }
                        b();
                    },
                    trigger: 'blur'
                }
            ]
        }
    },
    adSpecGdt: [
        {
            validator: (r, v, b) => {
                console.log('form.adSpecGdt');
                if (v === '') {
                    b(new Error('不能为空'));
                    return;
                }
                b();
            },
            trigger: 'blur'
        }
    ],
    adBidTypeCPCFlagMin: [
        {
            validator: (r, v, b) => {
                console.log('form.adSpecGdt');
                if (v === '') {
                    b(new Error('不能为空'));
                    return;
                }
                b();
            },
            trigger: 'blur'
        }
    ],
    adBidTypeCPCFlagMax: [
        {
            validator: (r, v, b) => {
                console.log('form.adSpecGdt');
                if (v === '') {
                    b(new Error('不能为空'));
                    return;
                }
                b();
            },
            trigger: 'blur'
        }
    ]
};