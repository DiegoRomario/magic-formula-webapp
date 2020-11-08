import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'm4-error-list',
    templateUrl: './error-list.component.html',
    styleUrls: ['./error-list.component.css']
})
export class ErrorListComponent implements OnInit {
    @Input() Errors: string[];

    constructor() { }

    ngOnInit(): void { }
}
