import {MINERD_KEY, useStorage} from '../hooks/useStorage';
import { RegisterUserForm } from "../models/register.model";
import { User } from "../models/user.model";

// export const createUser = async(user: RegisterUserForm) =>{   
//     const {users, setUsers, store } = useStorage();
//     const newUser:User = {
//         id:''+new Date().getTime(),
//         name:user.name,
//         lastName:user.lastName,
//         email:user.email,s
//         password:user.password,
//         matricula:user.matricula,
//         photo:user.photo,
//     }

//     const updatedUsers =[...users, newUser]; 
//     setUsers(updatedUsers);
//     console.log(users)
//     store?.set(MINERD_KEY, updatedUsers)
// }

