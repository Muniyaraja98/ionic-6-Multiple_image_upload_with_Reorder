import { Component, ViewChild, ElementRef } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  selectedImages: any = [];
  previewImages: any = [];

  @ViewChild('openImg') input: ElementRef<HTMLElement> | any;

  constructor() {}

  imageFiles(event: any) {
    // console.log(event);
    this.selectedImages.push(...event.target.files);
    for (let i = 0; i < this.selectedImages.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImages.push(e.target.result);
      };
      console.log(this.selectedImages[i]);
      reader.readAsDataURL(this.selectedImages[i]);
    }
  }

  imageReorder(ev: any) {
    // console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    this.previewImages = ev.detail.complete(this.previewImages);
    var newArr = this.selectedImages;
    [newArr[ev.detail.from], newArr[ev.detail.to]] = [
      newArr[ev.detail.to],
      newArr[ev.detail.from],
    ];
    console.log(newArr);
  }

  undoImage(event: any) {
    this.previewImages.splice(event, 1);
    this.selectedImages.splice(event, 1);
  }
}
