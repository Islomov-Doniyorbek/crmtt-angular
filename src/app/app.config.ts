import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { icons, LucideAngularModule } from 'lucide-angular';
import { interceptorsInterceptor } from './core/auth/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([interceptorsInterceptor])
    ),
    importProvidersFrom(
      LucideAngularModule.pick(icons) 
    )
  ]
};
