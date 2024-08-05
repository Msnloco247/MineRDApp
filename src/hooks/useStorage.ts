import { useEffect, useState } from "react";
import {Drivers, Storage } from "@ionic/storage";
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver' 
import { User } from "../models/user.model";
import { RegisterUserForm } from "../models/register.model";
import { LoginUserForm } from "../models/login.model";
import bcrypt from 'bcryptjs';
import { verifyPassword } from "../helpers/encryptPassword";
import { UserViewModel } from "../models/userView.model";


const MINERD_KEY = "MINERD";
import { isPlatform } from "@ionic/react";

export function useStorage(){
    const [store, setStore] = useState<Storage>();
    const [users, setUsers] = useState<User[]>([]);

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

        const storedUsers = await store.get(MINERD_KEY) || [];
        setUsers(storedUsers);

    }
    useEffect(()=>{
        
        initStorage();
    },[])

    const createUser = async(user: RegisterUserForm) =>{   
        const newUser:User = {
            id:''+new Date().getTime(),
            name:user.name,
            lastName:user.lastName,
            email:user.email,
            password:user.password,
            matricula:user.matricula,
            photo:user.photo,
        }
    
        const updatedUsers =[...users, newUser]; 
        setUsers(updatedUsers);
        console.log(users)
        store?.set(MINERD_KEY, updatedUsers)
    }

    const loginUser = async (user: LoginUserForm): Promise<UserViewModel | null> => {
            const foundUser = users.find(u => u.email === user.email);
            
            if (!foundUser || !foundUser.password) {
              return null;
            }
            let isMatch;
            
            if(user.password != null && user.password != undefined){
                isMatch = await verifyPassword(user.password, foundUser.password);
            }
    
            const userModel: UserViewModel = {
                id:''+new Date().getTime(),
                name:foundUser.name,
                lastName:foundUser.lastName,
                email:foundUser.email,
                matricula:foundUser.matricula,
                photo:foundUser.photo,
            };
            return isMatch ? userModel : null;
       

      };
     const storageGet = async (databaseKey: string) => {
        return await store?.get(databaseKey) || [];
    }

    function storageSet(databaseKey: string, data: any[]) {
        store?.set(databaseKey, data);
    }
    
    
   
    return{
        users,
        setUsers,
        createUser,
        loginUser,
         storageGet,
        storageSet,
    }
}

export {MINERD_KEY};