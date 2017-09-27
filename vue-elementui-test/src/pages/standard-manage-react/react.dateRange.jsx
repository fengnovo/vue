/**
 * Created by chenjiawei1 on 2017/3/28.
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import { DatePicker } from 'antd';
export default class DateRange extends Component {
    constructor(options) {
        super(options);
        this.state = {
            endOpen: false
        };
        this.disabledEndDate = this.disabledEndDate.bind(this);
        this.disabledStartDate = this.disabledStartDate.bind(this);
        this.onStartChange = this.onStartChange.bind(this);
        this.onEndChange = this.onEndChange.bind(this);
        this.handleStartToggle = this.handleStartToggle.bind(this);
        this.handleEndToggle = this.handleEndToggle.bind(this);
    }

    disabledStartDate(startValue) {
        const endValue = this.props.form.getFieldValue(this.props.endProps.name);
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() >= endValue.valueOf();
    }

    disabledEndDate(endValue) {
        const startValue = this.props.form.getFieldValue(this.props.startProps.name);
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onStartChange(value) {
        this.props.form.setFieldsValue({
            [this.props.startProps.name]: value
        });
    }

    onEndChange(value) {
        this.props.form.setFieldsValue({
            [this.props.endProps.name]: value
        });
    }

    handleStartToggle(open) {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndToggle(open) {
        this.setState({ endOpen: open });
    }

    render() {
        const { endOpen } = this.state;
        const { rangeProps, startProps, endProps } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div {...rangeProps}>
                {getFieldDecorator(startProps.name, { ...startProps })(
                    <DatePicker
                        disabledDate={this.disabledStartDate}
                        showTime
                        format="YYYY/MM/DD HH:mm:ss"
                        placeholder="开始日期"
                        {...startProps}
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartToggle}
                    />
                )}
                ~
                {getFieldDecorator(endProps.name, { ...endProps })(
                    <DatePicker
                        disabledDate={this.disabledEndDate}
                        showTime
                        format="YYYY/MM/DD HH:mm:ss"
                        placeholder="结束日期"
                        {...endProps}
                        onChange={this.onEndChange}
                        onOpenChange={this.handleEndToggle}
                        open={endOpen}
                    />
                )}
            </div>
        );
    }
}

