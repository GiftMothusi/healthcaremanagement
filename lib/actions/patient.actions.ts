"use server";
import { ID, Query} from "node-appwrite"
import { parseStringify } from "../utils";


import {
    BUCKET_ID,
    DATABASE_ID,
    ENDPOINT,
    PATIENT_COLLECTION_ID,
    PROJECT_ID,
    databases,
    storage,
    users,
  } from "../appwrite.config";

//create user 
export const createUser = async (user: CreateUserParams) => {
    try{
        // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
        //NOTE order of create parameter is really important, it must be ID,email,Phone,password then name, otherwise it won't pass data to the AUTH table
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );
        
        //console.log(newUser);
        
        return parseStringify({newUser});
    }catch(error:any){
        //if user already exists, handle it here.
        if(error && error?.code === 409){
            const documents = await users.list([
                Query.equal('email', [user.email])
            ]);

            return documents.users[0];
        }
       
        console.log("Ran into a problem while creating a new user:", error); 
    }
};

