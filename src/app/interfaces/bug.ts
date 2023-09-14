import { BugImg } from "./bugImg";

export interface Bug{
    bug_id:number,
    bug_title:string,
    bug_description:string,
    deadline:Date,
    ss:BugImg,
    type:string,
    state:string,
    creater:number,
    developer:number,
    project_id:number,
}