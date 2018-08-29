import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { MessageService } from '../_services/message.service';
import { PlayerdetailsService } from '../_services/playerdetails.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{

  addPlyDtlForm: FormGroup;  
  Playername:string='';  
  Country:string='';  
  Role:string='';  

  ngOnInit() {
  }

  public username :string;
  public imagePath: string;
  public detailName: string;
  public detail: string;
  public playerName: string;
  public isSelected="hidden";
  public isAddFormVisible="hidden";
  public isAddButtonVisible=localStorage.getItem("currentUser")=='"Admin"'?"visible":"hidden";
  
  public msg="";
  private player ={};
  public uploader: FileUploader = new FileUploader({url: 'http://localhost:3000/imgUpload', itemAlias: 'pic'});

  constructor( private _messageService: MessageService, private router: Router,private fb: FormBuilder, private _playerdetails :PlayerdetailsService) { 
     // To initialize FormGroup  
     this.username=localStorage.getItem("currentUser");
  this.addPlyDtlForm = fb.group({  
    'Playername' : [null, Validators.required],  
    'Country' : [null, Validators.required],  
    'Role' : [null, Validators.required]
  });
    this._messageService.listen().subscribe((m:any) => {
      console.log(m);
      this.onFilterClick(m);
  }); 
  }

  onFilterClick(data) {
    // this.isAddButtonVisible="visible";
    this.isAddFormVisible="hidden";     
    this.msg="";
    this.isSelected="visible";
    this.imagePath='./../../assets/img/'+data.key+'.jpg';
    this.detailName=data.category=="Role"?"Country":"Role";
    this.detail=data.value;
    this.playerName=data.key;
}


ngAfterViewInit () {
    if( localStorage.getItem('currentUser')=='"Admin"'){
      this.uploader.onAfterAddingFile = (file) => 
      { file.withCredentials = false; 
        file.file.name = this.Playername+".jpg";
      };
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          console.log('ImageUpload:uploaded:', item, status, response);
      };
    }
  }

  openEditForm(){
    this.msg="";
    this.isAddFormVisible="visible";
    this.isAddButtonVisible="hidden";
    this.isSelected="hidden";
  }

     // Executed When Form Is Submitted  
     onFormSubmit(form:NgForm)  
     {  
       console.log(form); 
       this.player["name"]=form["Playername"];
       this.player["role"]=form["Role"];
       this.player["country"]=form["Country"];
       
       this.uploader.uploadAll();
        this._playerdetails.addPlayerDetails(this.player)
         .subscribe(data => {
          this.isAddButtonVisible="visible";
          this.isAddFormVisible="hidden";             
          this.msg="Player added successfully"     
         },
          error => {
            this.isAddButtonVisible="visible";
            this.isAddFormVisible="hidden";     
            this.msg=error.error; 
          });
     }

     logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
  }

}
