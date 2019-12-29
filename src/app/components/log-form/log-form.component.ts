import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';
import { v4 } from 'uuid';
import { Log } from 'src/app/models/Log';

@Component({
    selector: 'app-log-form',
    templateUrl: './log-form.component.html',
    styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

    id: string;
    text: string;
    date: string;

    private isNew: boolean = true;

    constructor(private logService: LogService) {
    }

    ngOnInit() {
        this.logService.selectedLog.subscribe(log => {
            if (log.id) {
                this.isNew = false;
                this.id = log.id;
                this.text = log.text;
                this.date = log.date;
            }
        });
    }

    onSubmit() {
        this.isNew ? this.logService.addLog(this.getLog(v4())) : this.logService.updateLog(this.getLog(this.id));
        this.clearFormFields();
    }

    clearFormFields(): void {
        this.id = '';
        this.text = '';
        this.isNew = true;
        this.logService.clearSelectedLogOnForm();
    }

    private getLog(uuid: string): Log {
        return {
            id: uuid,
            text: this.text,
            date: new Date()
        } as Log;
    }
}
