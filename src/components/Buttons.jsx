/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { useEffect } from 'react';
import * as VoxImplant from 'voximplant-websdk';

function Buttons({ voxAPI, currentCall, outboundCall, inboundCall, currentACDstatus}) {
    const [statusClient, setStatus] = useState('');
    const [isActive, setIsActive] = useState(false);

    const getStatus = async () => {
        const status = await voxAPI.getOperatorACDStatus()
        console.log('SOY STATUS', status)
        setStatus(status);
        if(status === 'READY'){
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }
    // const active = async() => {
    //     await voxAPI.setOperatorACDStatus(VoxImplant.OperatorACDStatuses.Ready)
    //     getStatus();
    // }
    // const desactive = async() => {
    //     await voxAPI.setOperatorACDStatus(VoxImplant.OperatorACDStatuses.Online)
    //     getStatus()
    // }

    // const inService = async() => {
    //     await voxAPI.setOperatorACDStatus(VoxImplant.OperatorACDStatuses.InService)
    //     getStatus()
    // }

    const updateStatus = async(e) => {
        await voxAPI.setOperatorACDStatus(e)
        getStatus()
    }
    const callStatus = (e) => {
        inboundCall = currentCall = e.call;
        console.log('ESTOY AQUI')
		// currentCall.addEventListener(VoxImplant.CallEvents.Connected, updateStatus(VoxImplant.OperatorACDStatuses.InService));
		// currentCall.addEventListener(VoxImplant.CallEvents.Disconnected, updateStatus(VoxImplant.OperatorACDStatuses.Ready));
		// currentCall.addEventListener(VoxImplant.CallEvents.Failed, updateStatus(VoxImplant.OperatorACDStatuses.Ready));
    }
        voxAPI.addEventListener(VoxImplant.Events.ACDStatusUpdated, (e)=> console.log('SE EJECUTA,', e))
        voxAPI.addEventListener(VoxImplant.Events.IncomingCall, callStatus)
    useEffect(() => {
        // voxAPI.addEventListener(VoxImplant.Events.IncomingCall, callStatus)
        // handleChangeStatus()
        getStatus()
    }, [statusClient])
    return (
        <div>
            {isActive ? <button onClick={()=> updateStatus(VoxImplant.OperatorACDStatuses.Online)}>DESACTIVAR</button>: <button onClick={()=> updateStatus(VoxImplant.OperatorACDStatuses.Ready)}>ACTIVAR</button>}
            <p>{statusClient}</p>
        </div>
    )
}

export default Buttons;