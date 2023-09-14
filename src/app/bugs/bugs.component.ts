import { Component, ElementRef, OnInit, ViewChild, untracked } from '@angular/core';
import { UserModel } from '../interfaces/userModel';
import { Projects } from '../interfaces/projects';
import { UserService } from '../services/user.service';
import { ProjectService } from '../services/projects.service';
import { BugService } from '../services/bug.service';
import { NgForm } from '@angular/forms';
import { Bug } from '../interfaces/bug';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'bug-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss']
})
export class BugsComponent implements OnInit {
  developers!: UserModel[];
  users!: UserModel[];
  projects!: Projects[];
  bug_title!: string;
  bug_description!: string;
  selectedDate!: Date;
  selectedImage: File | undefined = undefined;
  selectedType: string = 'Feature';
  selectedDeveloperId!: number;
  selectedProjectId!: number;
  msg!: any;
  bugsCreated!: Bug[];
  bugsAssigned!: Bug[];
  currentUserType!: string;  


  @ViewChild('myForm') myForm!: NgForm;


  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private bugService: BugService,
    private sanitizer: DomSanitizer,
    private jwtService: JwtService
  ) { }
  ngOnInit(): void {
    this.getProjects();
    this.getUsers();
    this.getBugsCreated();
    this.getBugsAssigned();
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token); // Use the injected service
      this.currentUserType = decodedToken.user.user_type
    }
  }
  getProjectNameById(project_id: number): string {
    if (this.projects) {
      const project = this.projects.find(p => p.project_id === project_id);
      return project ? project.project_name : 'Unknown Project';
    }
    return '';
  }
  getUserNameById(user_id: number): string {
    if (this.developers) {
      const user = this.developers.find(d => d.user_id === user_id);
      return user ? user.user_name : 'Unknown User';
    }
    return '';
  }

  onImageUpload(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedImage = file;
    }
  }
  onProjectChange() {
    this.getUsersByProjectId(this.selectedProjectId);
  }
  updateBugStatus(bug: Bug): void {
    this.bugService.updateBugStatus(bug).subscribe(
      (response) => {
        console.log(response);
        // Handle success (e.g., show a success message)
      },
      (error) => {
        console.error(error);
        // Handle error (e.g., show an error message)
      }
    );
    console.log(`Bug ${bug.bug_id} status updated to ${bug.state}`);
  }
  onSubmit() {
    const bugData = {
      bug_title: this.bug_title,
      bug_description: this.bug_description,
      deadline: this.selectedDate,
      type: this.selectedType,
      developer: this.selectedDeveloperId,
      project_id: this.selectedProjectId,
      ss: null // Set to null when no image is selected
  };
    if(this.selectedImage){
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const imageBinary = e.target.result;
      bugData.ss = imageBinary;
      console.log(bugData, this.selectedImage);
      this.addBug(bugData, this.selectedImage);
      this.myForm.resetForm();
      this.selectedImage = undefined;
    };
    reader.readAsArrayBuffer(this.selectedImage);
  }
  else {
    // No image selected, so just call addBug with bugData
    console.log(bugData);
    this.addBug(bugData, this.selectedImage); // Pass null or some default value for the image
    this.myForm.resetForm();
    this.selectedImage = undefined;
}
  }
  getUsers() {
    this.userService.getUsers().subscribe((response: any) => {
      this.developers = response.users;
    }, (error: any) => {
      if (error.status === 401) {
        alert('You are not authorized to access this page.');
      }
    })
  }
  addBug(bugData: any, selectedImage: File | undefined) {
    this.bugService.addBug(bugData, selectedImage).subscribe((response: any) => {
      console.log(response);
      this.msg = response.message;
      this.getProjects();
      this.getBugsCreated();
      this.getBugsAssigned();
    }, (error: any) => {

      this.msg = error.error.message;
      alert(this.msg);
    });
  }
  getBugsCreated() {
    this.bugService.getBugsCreated().subscribe((response: any) => {
      this.bugsCreated = response.bugsCreated;
    }, (error: any) => {
      if (error.status === 401) {
        alert('You are not authorized to access this page');
      }
    });
  }
  getBugsAssigned() {
    this.bugService.getBugsAssigned().subscribe((response: any) => {
      this.bugsAssigned = response.bugsAssigned;
    }, (error: any) => {
      if (error.status === 401) {
        alert('You are not authorized to access this page');
      }
    });
  }
  getProjects() {
    this.projectService.getProjects().subscribe((response: any) => {
      this.projects = response.projects;
    }, (error: any) => {
      if (error.status === 401) {
        alert('You are not authorized to access this page');
      }
    });
  }
  getUsersByProjectId(project_id: number) {
    this.userService.getUsersByProjectId(project_id).subscribe((response: any) => {
      this.users = response.users;
    }, (error: any) => {
      if (error.status === 401) {
        alert('You are not authorized to access this page.');
      }
      alert(error.error.message);
    })
  }
}
