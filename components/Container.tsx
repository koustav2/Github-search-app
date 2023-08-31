'use client'
import React, { FunctionComponent} from 'react';
import { ModeToggle } from './ModeToggle';
import Userdetails from './Userdetails';

const Container: FunctionComponent = () => {
    return (
        <div className='m-[0_auto] font-mono max-w-[730px] flex flex-col gap-8 w-full'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl'>devfinder</h1>
                <ModeToggle />
            </div>
            <Userdetails/>
        </div>
    );
}


export default Container;