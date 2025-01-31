import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavigationComponent } from './views/partials/navigation/navigation.component';
import { SummaryComponent } from './views/summary/summary.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavigationComponent,SummaryComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'HM-UI';
  // constructor(private taost:ToastrService) {
  //   this.taost.success('Hello world!', 'Toastr fun!');
  // }

}
