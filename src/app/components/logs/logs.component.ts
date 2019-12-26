import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';
import { Log } from 'src/app/models/Log';

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

    logs: Array<Log>;

    constructor(private logService: LogService) { }

    ngOnInit() {
        this.logService.getLogs().subscribe(logs => this.logs = logs);
    }

    onSelectLog(log: Log): void {
        this.logService.setFormLog(log);
    }
}