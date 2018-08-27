import { Component, OnInit } from '@angular/core';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public imagePath: string;
  public detailName: string;
  public detail: string;
  public playerName: string;
  public isSelected="hidden";

  constructor( private _messageService: MessageService) { 
    this._messageService.listen().subscribe((m:any) => {
      console.log(m);
      this.onFilterClick(m);
  })
  }

  onFilterClick(data) {
    console.log('Fire onFilterClick: ', data);
    this.isSelected="visible";
    this.imagePath='./../../assets/img/'+data.key+'.jpg';
    this.detailName=data.category=="Role"?"Country":"Role";
    this.detail=data.value;
    this.playerName=data.key;
}

  ngOnInit() {
  }

}
