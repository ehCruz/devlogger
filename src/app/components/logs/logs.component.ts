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
    selectedLog: Log;

    constructor(private logService: LogService) { }

    ngOnInit() {
        this.logService.isClear.subscribe(clear => {
            if (clear) {
                this.selectedLog = { id: '', text: '', date: '' }
            }
        });
        
        this.logService.getLogs().subscribe(logs => this.logs = logs);
    }

    onSelectLog(log: Log): void {
        this.logService.setFormLog(log);
        this.selectedLog = log;
    }

    onRemoveLog(logUuid: string): void {
        if (confirm('Você tem certeza que deseja deletar esse item?')) {
            this.logService.deletLog(logUuid);
        }
    }
}