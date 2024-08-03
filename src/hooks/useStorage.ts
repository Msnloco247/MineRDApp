import { useEffect, useState } from "react";
import {Drivers, Storage } from "@ionic/storage";
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver' 
import { isPlatform } from "@ionic/react";

export function useStorage(){
    const [store, setStore] = useState<Storage>();

    const initStorage = async() =>{
        const newStore = new Storage({
            name:'minerdDb',
            driverOrder: [CordovaSQLiteDriver._driver,Drivers.IndexedDB, Drivers.LocalStorage]
        });
        if (!isPlatform("desktop")) {
            await newStore.defineDriver(CordovaSQLiteDriver);
        }
        const store = await newStore.create();
        setStore(store);
    }
    useEffect(()=>{
        
        initStorage();
    },[])

    const storageGet = async (databaseKey: string) => {
        return await store?.get(databaseKey) || [];
    }

    function storageSet(databaseKey: string, data: any[]) {
        store?.set(databaseKey, data);
    }

    return {
        storageGet,
        storageSet,
    }
}