import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HueApiService } from './hue-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lightOn = false;
  brightness = 127;
  message = 'Loading...';

  constructor(private hueApi: HueApiService) {}

  ngOnInit() {
    this.hueApi.getGroupState().subscribe(
      (data) => {
        this.lightOn = data.state.any_on; // "any_on" for group state
        this.brightness = data.action.bri; // Group's last brightness
        this.message = this.lightOn ? 'Lights are on' : 'Lights are off';
      },
      (error) => {
        this.message = 'Error loading group state';
        console.error(error);
      }
    );
  }

  toggleLight() {
    this.hueApi.toggleLight(this.lightOn).subscribe(
      () => {
        this.message = this.lightOn ? 'Lights are on' : 'Lights are off';
      },
      (error) => {
        this.message = 'Error toggling lights';
        console.error(error);
      }
    );
  }

  setBrightness() {
    if (this.lightOn) {
      this.hueApi.setBrightness(this.brightness).subscribe(
        () => {
          this.message = `Brightness set to ${this.brightness}`;
        },
        (error) => {
          this.message = 'Error setting brightness';
          console.error(error);
        }
      );
    }
  }
}