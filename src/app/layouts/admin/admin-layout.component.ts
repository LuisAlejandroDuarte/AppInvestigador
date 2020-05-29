import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import { Subscription } from 'rxjs/internal/Subscription';


declare const $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})

export class AdminLayoutComponent implements OnInit, AfterViewInit {   
    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    url: string;
    location: Location;
    empresaSeleccionada:string;
    @ViewChild('sidebar') sidebar: any;
   
    constructor( private router: Router, location: Location ) {
      this.location = location;
    }
    ngOnInit() {
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
        this.location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
         this.router.events.subscribe((event:any) => {
            if (event instanceof NavigationStart) {
               if (event.url != this.lastPoppedUrl)
                   this.yScrollStack.push(window.scrollY);
           } else if (event instanceof NavigationEnd) {
               if (event.url == this.lastPoppedUrl) {
                   this.lastPoppedUrl = undefined;
                   window.scrollTo(0, this.yScrollStack.pop());
               }
               else
                   window.scrollTo(0, 0);
           }
        });

        const html = document.getElementsByTagName('html')[0];
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            
            html.classList.add('perfect-scrollbar-on');
        }
        else {
            html.classList.add('perfect-scrollbar-off');
        }
       

      
    }
    ngAfterViewInit() {
        this.runOnRouteChange();
    }
    public isMap() {
        if (this.location.prepareExternalUrl(this.location.path()) === '/maps/fullscreen') {
            return true;
        } else {
            return false;
        }
    }
    runOnRouteChange(): void {
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
       
       
      }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
