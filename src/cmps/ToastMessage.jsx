import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMsg } from '../store/actions/app.actions';

export function ToastMessage() {
    const dispatch = useDispatch();
    const msg = useSelector(storeState => storeState.appModule.msg);

    useEffect(() => {
        if (msg) {
            const timeoutId = setTimeout(() => {
                clearMsg();
            }, 3000); 
            return () => clearTimeout(timeoutId); 
        }
    }, [dispatch, msg]);

    return (
        <div className='toast-container'>
            {msg && <div className={`toast ${msg.type}`}>{msg.txt}</div>}
        </div>
    );
}
