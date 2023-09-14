import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ProjectService } from '../services/projects.service';
import { UserService } from '../services/user.service';
import { UserModel } from '../interfaces/userModel';
import { Projects } from '../interfaces/projects';
import { Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';


@Component({
  selector: 'bug-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnChanges {
  projects!: Projects[];
  users!: UserModel[];
  msg!: string;
  projectName: string = '';
  projectDescription: string = '';
  selectedUsers: number[] = [];
  project_id!: number;
  isUpdating: boolean = false;
  currentUserType!: string;
  isManager: boolean = false;
  showAddProjectForm: boolean = false;

  // assignedUsers!: UserModel[];
  @ViewChild('myForm') myForm: any;
  constructor(private projectService: ProjectService,
    private userService: UserService,
    private router: Router,
    private jwtService: JwtService) { }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit(): void {
    this.getProjects();
    this.getUsers();
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token); // Use the injected service
      this.currentUserType = decodedToken.user.user_type
    }
    if(this.currentUserType === 'Manager'){
      this.isManager=true;
    }
    // console.log(this.currentUserType);
    // console.log(this.isManager);
  }
  onClickAddProjectButton(){
    this.showAddProjectForm = true;
  }

  onChange() {
    this.selectedUsers = this.users
      .filter(user => user.isSelected) // Filter users where 'isSelected' is true
      .map(user => user.user_id); // Map 'user_id' values of selected users

    // Now, 'selectedUsers' contains 'user_id' values of selected users.
    console.log(this.selectedUsers);
  }
  onSubmit() {
    const data: any = {
      project_name: this.projectName,
      project_description: this.projectDescription,
      user_ids: this.selectedUsers
    }
    console.log(data);
    this.projectName = ''; // Reset project name
    this.projectDescription = ''; // Reset project description
    this.selectedUsers = []; // Reset selected users 
    this.getUsers();
    this.addProject(data);
  }
  updatingProject(project: Projects) {
    this.project_id = project.project_id;
    this.projectName = project.project_name; // Reset project name
    this.projectDescription = project.project_description; // Reset project description
    this.selectedUsers = project.assignedUsers.map(user => user.user_id);
    for (let i = 0; i < this.selectedUsers.length; i++) {
      this.users
        .filter(x => x.user_id === this.selectedUsers[i])
        .map(x => x.isSelected = true);
    }
    this.isUpdating = true;
  }
  editProject() {
    this.isUpdating = false;
    const data: any = {
      project_id: this.project_id,
      project_name: this.projectName,
      project_description: this.projectDescription,
      user_ids: this.selectedUsers
    }
    console.log(data);
    this.project_id = 0;
    this.projectName = ''; // Reset project name
    this.projectDescription = ''; // Reset project description
    this.selectedUsers = []; // Reset selected users 
    this.getUsers();
    this.updateProject(data);
  }

  getProjects() {
    this.projectService.getProjects().subscribe((response: any) => {
      this.projects = response.projects;
      response.projects.map((project: Projects) => {
        this.getAssignedDevelopersForProject(project.project_id);
      }, (error: any) => {
        if (error.status === 401) {
          alert('You are not authorized to access this page');
        }
      })
    });
  }
  getAssignedDevelopersForProject(project_id: number) {

    this.userService.getAssignedUsers(project_id).subscribe((response: any) => {
      const p = this.projects.filter((project) => project.project_id === project_id)
      p[0].assignedUsers = response.users;
    }, (error: any) => {
      if (error.status === 401) {
        alert('You are not authorized to access this page.');
      }
      alert(error.error.message);
    })
  }
  getUsers() {
    this.userService.getUsers().subscribe((response: any) => {
      this.users = response.users.map((user: UserModel) => {
        return { ...user, isSelected: false };
      })
    }, (error: any) => {
      if (error.status === 401) {
        alert('You are not authorized to access this page.');
      }
    })
  }
  addProject(data: any) {
    this.projectService.addProject(data).subscribe((response: any) => {
      this.msg = response.message;
      this.getProjects();
    }, (error: any) => {
      this.msg = error.error.message;
      alert(this.msg);
    })
  }
  updateProject(data: any) {
    this.projectService.updateProject(data).subscribe((response: any) => {
      this.msg = response.message;
      this.getProjects();
    }, (error: any) => {
      this.msg = error.error.message;
      alert(this.msg);
    })
  }
}
