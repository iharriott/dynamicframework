import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-json',
  templateUrl: './show-json.component.html',
  styleUrls: ['./show-json.component.css']
})
export class ShowJsonComponent implements OnInit {
  @Input()
  public jsonString: string ='hello world today';
  constructor() { }

  ngOnInit(): void {
    
  }

}
