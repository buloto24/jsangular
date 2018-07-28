import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppareilService} from "./services/appareil.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/interval';
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

    secondes: number;
    counterSubcription : Subscription;

    constructor() {

    }

    ngOnInit() {
        const counter = Observable.interval(1000);
        this.counterSubcription = counter.subscribe(
            (value: number) => {
                this.secondes = value;
            },
            (error: any) => {
                console.log("Une error sur observable");
            },
            () => {
                console.log("Observable complete");
            }
        );
    }

    ngOnDestroy() {
        this.counterSubcription.unsubscribe();
    }
}
