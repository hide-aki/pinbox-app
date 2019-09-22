import {DropBox} from '../components/DropBox';
import {DemoButton} from '../components/DemoButton';
import React from 'react';

export const Index: React.FC = () => (
    <div>
        <h1>test</h1>
        <DropBox onDrop={(files, event) => {
        }}/>
        <DemoButton/>
    </div>
);

