import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => HelloComponent),
          multi: true
      },
      {
          provide: NG_VALIDATORS,
          useExisting: HelloComponent,
          multi: true
      }
  ]
})
export class HelloComponent implements OnInit, ControlValueAccessor {
  constructor() { }

  /**
   * getter for reactive form value
   */
  /* istanbul ignore next */
  get value() {
      return this._value;
  }

  /**
   * setter for reactive form value
   * @param val - dropdown value
   */
  set value(val) {
      this._value = val;
      this.onChange(val);
      this.onTouched();
  }

  /**
   * Event notifier when an item is selected
   */
  @Output() selected: EventEmitter<any> = new EventEmitter<SelectItem>();

  /**
   * List of Items for the dropdown.
   * Expected input is Array of Objects.
   * [{label: 'Label Name', value: 'Value'}]
   */
  @Input() items: SelectItem[];

  /**
   * Filter toggle. Default is false.
   * Set to `true` to turn on the filter
   *
   */
  @Input() filterable = false;

  /**
   * To enable virtual / smart scroll for large set of data.
   */
  @Input() virtualScroll = false;

  /**
   * Default placeholder text
   */
  @Input() defaultText = 'dropdown';

  /**
   * When present, it specifies that the component should be disabled.
   */
  @Input() disabled = false;

  /**
   * Used to pass in the default selected item, if not supplied the placeholder text is used.
   */
  @Input() selectedItem = '';

  /**
   * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element
   */
  @Input() appendTo = '';

  /**
   * Indicates how nulls should be handled when dropdown is used in a reactive form
   */
  @Input() allowNullValue = false;

  // tslint:disable-next-line:variable-name no-input-rename
  @Input('value') _value = false;
  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit() { }

  validate({ value }: FormControl) {

      if (this.allowNullValue) {
          return null;
      }

      const isNotValid = (this.selectedItem === '' || this.selectedItem === null);
      return isNotValid && { invalid: true };
  }

  /**
   * Reactive Form's method to set the disabled state
   * @param value - dropdown disabled state
   */
  setDisabledState(isDisabled: boolean) {
      this.disabled = isDisabled;
  }

  /**
   * Reactive Form's method when a value change's or get assigned
   * @param value - dropdown selected value
   */
  writeValue(value) {
      if (value) {
          this.value = value;
      }
      // we also need to ensure that the dropdown reflects the same value too
      /* istanbul ignore next */
      if (value && this.selectedItem !== value) {
          this.selectedItem = value;
      }
      if (value === '' || value === null) {
          this.selectedItem = '';
      }
  }

  /**
   * Capturing the change event of the drop down
   * @param event - Event details such as event.value, etc
   */
  dropdownChange(event) {
      this.writeValue(this.selectedItem);
      this.selected.emit(this.selectedItem);
  }

  /**
   * Capturing on change event through reactive form
   * @param fn - callback function to handle / hook into custom logic
   */
  /* istanbul ignore next */
  registerOnChange(fn: any) {
      this.onChange = fn;
  }

  /**
   * Capturing the touched event for reactive control
   * @param fn - - callback function to handle / hook into custom logic
   */
  /* istanbul ignore next */
  registerOnTouched(fn: any) {
      this.onTouched = fn;
  }
}
