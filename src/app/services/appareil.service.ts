import {Subject} from "rxjs/Subject";

export class AppareilService {

    appareilSubject = new Subject<any[]>();

    private appareils = [
        {
            id: 1,
            name: 'Machine à laver',
            status: 'éteint'
        },
        {
            id: 2,
            name: 'Frigo',
            status: 'allumé'
        },
        {
            id: 3,
            name: 'Ordinateur',
            status: 'éteint'
        }
    ];

    getAppareilById(id: number) {

        const appareil = this.appareils.find(
            (s) => {
                return s.id === id;
            }
        );

        return appareil;

    }

    emitAppareilSubject() {
        this.appareilSubject.next(this.appareils.slice());
    }

    switchOnAll() {
        for(let appareil of this.appareils) {
            appareil.status = "allumé";
        }
        this.emitAppareilSubject();
    }

    switchOffAll() {
        for(let appareil of this.appareils) {
            appareil.status = "éteint";
            this.emitAppareilSubject();
        }
    }

    switchOneOne(i: number) {
        this.appareils[i].status = "allumé";
        this.emitAppareilSubject();
    }

    switchOffOne(i: number) {
        this.appareils[i].status = "éteint";
        this.emitAppareilSubject();
    }
}