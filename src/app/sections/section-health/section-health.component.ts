import { Component, OnInit } from '@angular/core';
import { Server } from '../../shared/server';
import { ServersService } from 'src/app/services/servers.service';
import { Observable , timer } from 'rxjs';
import { ServerMessage } from 'src/app/shared/server-message';

 // const SAMPLE_SERVERS = [
 //   { id: 1, name: 'dev-web', isOnline: true },
 //   { id: 2, name: 'dev-mail', isOnline: false },
 //   { id: 3, name: 'prod-web', isOnline: true },
 //   { id: 4, name: 'prod-mail', isOnline: true }
 // ];


@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.css']
})
export class SectionHealthComponent implements OnInit {
  timerSubscription: any ;

  constructor(private serv: ServersService) { }

  servers: Server[] ;

  ngOnInit(): void {

    this.refreshData();

  }


  refreshData() {

    this.serv.getServers().subscribe( res => {
      this.servers = res as Server[];
    },
    err => { this.serv.handleError(err);});
    this.subscribeToData();
  }
  subscribeToData() {
    this.timerSubscription = timer(2000);
    this.timerSubscription.subscribe(() => this.refreshData());
  }

  sendMessage(msg: ServerMessage) {
    this.serv.handleServerMessage(msg)
      .subscribe(res => console.log('Message sent to server:', msg),
                 err => console.log('Error:', err));
  }

}
