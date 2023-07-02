import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNextDate]'
})
export class NextDateDirective {

  constructor(private elRef: ElementRef) { }

  @HostListener('click')
  nextDate() {
    const el = this.elRef.nativeElement.parentElement.parentElement.children[0];
    const item = el.getElementsByClassName('item');
    
    el.append(item[0]);
  }

}
