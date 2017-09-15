import { Component, OnInit } from '@angular/core';
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
  private titleVideo: string = "";
  private linkVideo: string = "";
  private videoProperties: Object = {
    width: 242,
    height: 191,
    icon_class: "glyphicon glyphicon-resize-full",
    video_class: "video-small",
    title: "",
    linkVideo: ""
  };
  private properties: Object = {
    full: {
      width: 600,
      height: 420,
      icon_class: "glyphicon glyphicon-resize-small",
      video_class: "video-full"
    },
    small: {
      width: 242,
      height: 191,
      icon_class: "glyphicon glyphicon-resize-full",
      video_class: "video-small"
    }
  };
  private safeLinkVideo: SafeResourceUrl;
  private fields = [];

  constructor(public sanitizer: DomSanitizer,
              private service: MainService){ }

  /**
   * É executado toda fez que a página
   */
  ngOnInit() {
    // busca os links de vídeos de todos os campos em uma única requisição para melhor performance
    this.service.get('/assets/db/fields-new.json').subscribe(
      fields => {
        // main é a página acessada no momento
        this.fields = fields['main'];
      }
    );
    this.sanatize();
  }

  /**
   * Método para rezise automático do vídeo
   */
  resizeVideo() {
    if (this.videoProperties == this.properties['full']) {
      this.videoProperties = this.properties['small'];
    } else {
      this.videoProperties = this.properties['full'];
    }
    this.sanatize();
  }

  /**
   * Busca o vídeo referente ao campo
   */
  fieldVideo(fieldId) {
    this.linkVideo = this.fields[fieldId]['link'];
    this.titleVideo = this.fields[fieldId]['title'];
    this.sanatize();
    this.showVideo = true;
  }

  /**
   * Encerra o vídeo
   */
  closeVideo() {
    this.showVideo = false;
  }

  /**
   * Transforma os estilos e a url do vídeo em safe para o html
   */
  private sanatize() {
    this.sanatizeLinkVideo();
    this.sanatizeStyleVideo();
  }

  private sanatizeLinkVideo() {
    this.safeLinkVideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.linkVideo);
  }

  private sanatizeStyleVideo() {
    this.videoProperties['style'] = this.sanitizer.bypassSecurityTrustStyle(this.videoProperties['style']);
  }
}
