import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appOnlyHebrewLettersInput]'
})
export class OnlyHebrewLettersInputDirective {
  regexStr = '^[a-zA-Z]*$';
 public constructor(private el: ElementRef) { }

  @Input() OnlyHebrewLetters: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent>event;
    if (this.OnlyHebrewLetters) {
      if ([46, 8, 9, 27, 13, 110, 190, 186, 188].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (e.keyCode == 86 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }
      let ch = String.fromCharCode(e.keyCode);
      let regEx = new RegExp(this.regexStr);
      if (regEx.test(ch) || ch === " ")
        //not allow:in english-char that correct in hebrew but not in english and the contrary
        if ([".", ",", "\/", "\'", ";"].indexOf(e.key) !== -1)
          e.preventDefault();
        else
          return;
      else
        e.preventDefault();
    }
  }
}
