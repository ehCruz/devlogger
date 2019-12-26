import { Injectable } from '@angular/core';
import { Log } from '../models/Log';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LogService {

    private logs: Array<Log>;
    private subject: BehaviorSubject<Log> = new BehaviorSubject({ id: null, text: null, date: null } as Log);
    selectedLog: Observable<Log> = this.subject.asObservable();

    constructor() {
        this.logs = [
            { id: 1, text: 'Generated Component', date: new Date() },
            { id: 2, text: 'Add Bootstrap Component', date: new Date() },
            { id: 3, text: 'Its christmas time', date: new Date() }
        ]
        // this.subject = new BehaviorSubject({ id: null, text: null, date: null } as Log);
        // this.selectedLog = this.subject.asObservable();
    }

    getLogs(): Observable<Array<Log>> {
        return of(this.logs);
    }

    setFormLog(log: Log): void {
        this.subject.next(log);
    }
}