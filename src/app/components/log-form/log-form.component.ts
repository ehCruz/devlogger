import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';
import { Log } from 'src/app/models/Log';

@Component({
    selector: 'app-log-form',
    templateUrl: './log-form.component.html',
    styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

    id: number;
    text: string;
    date: string;

    constructor(private logService: LogService) {
    }
    
    ngOnInit() {
        this.logService.selectedLog.subscribe(log => {
            console.log(this.logService.selectedLog)
            if (log.id) {
                this.id = log.id;
                this.text = log.text;
                this.date = log.date;
            }
        })
    }

}
