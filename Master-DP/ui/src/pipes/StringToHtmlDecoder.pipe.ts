import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
@Pipe({
    name: 'htmldecoder'
})
export class StringToHtmlDecoderPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) { }
    transform(value: any) {
        // value = value.substring(13, value.length-1);
        // let doc: any = new DOMParser().parseFromString(value, "text/html");
        // let value123: any = doc.documentElement.textContent;
        // return this.sanitized.bypassSecurityTrustHtml(value123);
        return this.sanitized.bypassSecurityTrustHtml(value);
    }

}