import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MainService } from './main.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ MainService ]
})
export class MainComponent {
  private showVideo: boolean = false;
  private linkVideo: string = "https://www.youtube.com/embed/XGSy3_Czz8k";
  private safeLinkVideo: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer,
              private service: MainService){
    this.sanatizeLinkVideo();
  }

  fieldVideo(fieldId) {
    this.service.get('./db/fields.json').subscribe(fields => console.log(fields));
    this.linkVideo = 'https://www.youtube.com/embed/2QLM0AQLfgw';
    this.sanatizeLinkVideo();
    this.showVideo = true;
  }

  closeVideo() {
    this.showVideo = false;
  }

  sanatizeLinkVideo() {
    this.safeLinkVideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.linkVideo);
  }
}
