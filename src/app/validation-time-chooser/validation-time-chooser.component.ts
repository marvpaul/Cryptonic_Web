import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'validation-time-chooser',
  templateUrl: './validation-time-chooser.component.html',
  styleUrls: ['./validation-time-chooser.component.css']
})
export class ValidationTimeChooserComponent {
  exirationDates: any = [
    {value: 'never', viewValue: 'never'},
    {value: '1h', viewValue: '1 hour'},
    {value: '1d', viewValue: '1 day'},
    {value: '7d', viewValue: '7 day'}
  ];
  selected = 'never';
}
