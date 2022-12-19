import React from 'react';
import "./Loading.scss"
import { Spin } from 'antd';

export default function Loanding() {
    return (
        <div className='body'>
            <div className="example center">
                <Spin tip="Loading" size="large" />
            </div>
        </div>
    )
}


