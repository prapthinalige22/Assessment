import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../_services/message.service';
import { PlayerdetailsService } from '../_services/playerdetails.service';
import {IPlayerObj} from './../_interfaces/playerObj';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  addPlyDtlForm: FormGroup;  
  Playername:string='';  
  Country:string='';  
  Role:string='';  

  public imagePath: string;
  public detailName: string;
  public detail: string;
  public playerName: string;
  public isSelected="hidden";
  public isAddFormVisible="hidden";
  public isAddButtonVisible="visible";
  public msg="";
  private player ={};
  


  constructor( private _messageService: MessageService, private router: Router,private fb: FormBuilder, private _playerdetails :PlayerdetailsService) { 
     // To initialize FormGroup  
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
    this.isAddButtonVisible="visible";
    this.isAddFormVisible="hidden";     

    this.msg="";
    console.log('Fire onFilterClick: ', data);
    this.isSelected="visible";
    this.imagePath='./../../assets/img/'+data.key+'.jpg';
    this.detailName=data.category=="Role"?"Country":"Role";
    this.detail=data.value;
    this.playerName=data.key;
}

  ngOnInit() {
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
       
        this._playerdetails.addPlayerDetails(this.player)
         .subscribe(data => {
        this.isAddButtonVisible="visible";
        this.isAddFormVisible="hidden";     
        this.msg="Player added successfully"     
         },
          error => {
            this.isAddButtonVisible="visible";
            this.isAddFormVisible="hidden";     
            this.msg="Player could not be added. Please try again"   
          });
     }

     logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
  }

}
