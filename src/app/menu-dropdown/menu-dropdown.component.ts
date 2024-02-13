import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface MenuItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-menu-dropdown',
  templateUrl: './menu-dropdown.component.html',
  styleUrls: ['./menu-dropdown.component.scss'],
})
export class MenuDropdownComponent implements OnInit {
  @Input() label!: string;
  @Input() items: MenuItem[] = [];
  @Output() selected = new EventEmitter<any>();
  isOpen = false;

  constructor() {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onItemSelected(item: MenuItem) {
    this.selected.emit(item.value);
    this.isOpen = false;
  }

  ngOnInit(): void {}
}
