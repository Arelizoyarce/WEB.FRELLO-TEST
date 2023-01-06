import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as VoxImplant from 'voximplant-websdk';
import Buttons from "./Buttons";

function LogIn() {
    var voxAPI = VoxImplant.getInstance(),
    currentCall = null,
    outboundCall = null,
    inboundCall = null,
    currentACDstatus = null;
    const params = useParams();
    const [isLogin, setIsLogin] = useState(false);
    const login = async () => {
        try {
            await voxAPI.init();
            console.log("SDK is ready!")
            console.log(voxAPI);
            try {
                await voxAPI.connect();
                console.log("Connected");
            } catch (e) {
                console.log("Connection failed!");
            }
            try {
                await voxAPI.login(`${params.dni}@freelo.kolmena.n2.voximplant.com`, `${params.password}`);
                setIsLogin(true);
                console.log("Logged in!");
            } catch (e) {
                console.log("Login failure!");
            }
        } catch (e) {
            console.log("SDK init failure!");
        }
    };
    useEffect(() => {
        login()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            {isLogin ? <Buttons voxAPI={voxAPI} currentCall={currentCall} outboundCall={outboundCall}
            inboundCall={inboundCall} currentACDstatus={currentACDstatus}></Buttons> : '...logueando'}
        </div>
    )
}

export default LogIn;