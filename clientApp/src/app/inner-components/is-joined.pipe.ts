
import { Pipe, PipeTransform } from "@angular/core";
import { UserService } from "../service/userservice.service";

@Pipe({
    name: 'isJoined'
})
export class IsJoind implements PipeTransform {

    constructor(private userService: UserService) { }

    transform(value: string | boolean, event: any) {
        const email = this.userService.getUserInfo()?.email;
        if (!!event && !!event.attendees && !!email) {
            const isJoind = event.attendees.find(a => a.email == email);
            if (!!isJoind) {
                if (typeof value == 'string') {
                    return 'Joined';
                } else {
                    return true;
                }
            }
        }
        return value;
    }
}