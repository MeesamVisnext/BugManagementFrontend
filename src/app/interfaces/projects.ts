import { UserModel } from "./userModel";

export interface Projects{
    project_id:number;
    project_name:string;
    project_description:string;
    assignedUsers : UserModel[];
}