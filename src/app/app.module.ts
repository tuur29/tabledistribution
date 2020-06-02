import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { routes, PreloadSelectedModulesList } from './app.routing';
import { RouterModule } from '@angular/router';
import { WebStorageModule } from 'ngx-store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { ErrorModule } from './pages/error/error.module';
import { HeaderModule } from './parts/header/header.module';

import { CanDeactivateGuard } from './services/candeactivate-guard.service';
import { GlobalsService } from './services/globals.service';
import { SavesService } from './services/saves.service';

import { DialogsModule } from './dialogs/dialogs.module';
import { MessagesModule } from './messages/messages.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpModule,

    RouterModule.forRoot(routes, {
      useHash: true, preloadingStrategy: PreloadSelectedModulesList
    }),
    WebStorageModule,

    BrowserAnimationsModule,
    MaterialModule,

    DialogsModule,
    MessagesModule,

    ErrorModule,
    HeaderModule
  ],
  providers: [
    PreloadSelectedModulesList,
    CanDeactivateGuard,
    GlobalsService,
    SavesService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
