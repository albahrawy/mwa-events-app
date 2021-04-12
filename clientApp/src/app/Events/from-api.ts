import { Pipe, PipeTransform } from "@angular/core";
import { getUrl } from "../service/config";

@Pipe({ name: 'fromapi' })
export class FromApiUrlPipe implements PipeTransform {

    transform(value: string) {
        if (!!value) {
            return getUrl('picture', value);
        }
    }

}