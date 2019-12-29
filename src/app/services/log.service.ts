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

    private subjectSelected: BehaviorSubject<boolean> = new BehaviorSubject(true);
    isClear: Observable<boolean> = this.subjectSelected.asObservable();

    constructor() {
        this.getDataFromLocalStorage();
        // this.subject = new BehaviorSubject({ id: null, text: null, date: null } as Log);
        // this.selectedLog = this.subject.asObservable();
    }

    getLogs(): Observable<Array<Log>> {
        this.getDataFromLocalStorage();
        return of(this.logs);
    }

    setFormLog(log: Log): void {
        this.subject.next(log);
    }

    addLog(log: Log): void {
        this.logs.unshift(log);
    }

    updateLog(log: Log): void {
        const index = this.logs.findIndex(el => el.id === log.id);
        this.logs.splice(index, 1);
        this.logs.unshift(log);
        this.setDataOnLocalStorage();
    }

    deletLog(logUuid: string): void {
        const index = this.logs.findIndex(el => el.id === logUuid);
        this.logs.splice(index, 1);
        this.setDataOnLocalStorage();
    }

    clearSelectedLogOnForm() {
        this.subjectSelected.next(true);
    }

    private getDataFromLocalStorage() {
        localStorage.getItem('logs') ? this.logs = JSON.parse(localStorage.getItem('logs')) : this.logs = [];
    }

    private setDataOnLocalStorage() {
        localStorage.setItem('logs', JSON.stringify(this.logs));
    }
}
