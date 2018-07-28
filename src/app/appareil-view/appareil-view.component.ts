import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppareilService} from "../services/appareil.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.css']
})
export class AppareilViewComponent implements OnInit, OnDestroy {

    appareils: any[];
    appareilSubscription: Subscription;

    title = 'app';

    isAuth = false;
    lastUpdate = new Promise((resolve, reject) => {
        const date = new Date();
        setTimeout(
            () => {
                resolve(date);
            }, 2000
        );
    });

    constructor(private appareilService: AppareilService) {
        setTimeout(
            () => {
                this.isAuth = true;
            }, 2000
        );
    }

    ngOnInit() {
        this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
            (appareils: any[]) => {
                this.appareils = appareils;
            }
        );
        this.appareilService.emitAppareilSubject();
    }

    onAllumer() {
        console.log("click sur on allume tout");

        this.appareilService.switchOnAll();
    }

    onEteindre() {
        if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
            this.appareilService.switchOffAll();
        } else {
            return null;
        }
    }

    ngOnDestroy() {
        this.appareilSubscription.unsubscribe();
    }

}
