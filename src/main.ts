import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { NgZone, ɵNoopNgZone } from '@angular/core';

// https://github.com/angular/angular/issues/47538
bootstrapApplication(AppComponent, {
  providers: [{ provide: NgZone, useClass: ɵNoopNgZone }],
});
