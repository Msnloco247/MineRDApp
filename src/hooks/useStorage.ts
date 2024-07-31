import { useEffect, useState } from "react";
import {Drivers, Storage } from "@ionic/storage";
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver' 

const MINERD_KEY = "MINERD";



export function useStorage(){
    const [store, setStore] = useState<Storage>();

    const initStorage = async() =>{
        const newStore = new Storage({
            name:'minerdDb',
            driverOrder: [CordovaSQLiteDriver._driver,Drivers.IndexedDB, Drivers.LocalStorage]
        });
        await newStore.defineDriver(CordovaSQLiteDriver)
        const store = await newStore.create();
        setStore(store);

        const storedIncidences = await store.get(MINERD_KEY) || [];
    }
    useEffect(()=>{
        
        initStorage();
    },[])

   
    return{

    }
}