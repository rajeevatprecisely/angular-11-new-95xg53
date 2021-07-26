import { Component, OnInit, VERSION } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Angular " + VERSION.major;
  testForm: FormGroup;
  selectedName:any;
  nameList: any[] = [
    {label: 'TestName1', value: 'TestName1'},
    {label: 'TestName2', value: 'TestName2'},
    {label: 'TestName3', value: 'TestName3'}
  ];

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.testForm = this.fb.group({
      name: new FormControl(this.selectedName)
    });
  }

  onNameChange($event) {
    // console.log($event, 'select event');
    this.selectedName = $event;
    this.testForm.controls.name.setValue($event);
  }

}
