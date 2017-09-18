import { Injectable } from '@angular/core';

@Injectable()
export class Services {
    userDetails: any = {userName: '', userId: '', tags: ['html', 'css']};
    url: string = 'http://10.14.224.144:3000/api/';
    deepCopy(oldObj: any) {
        var newObj = oldObj;
        if (oldObj && typeof oldObj === "object") {
          newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
          for (var i in oldObj) {
            newObj[i] = this.deepCopy(oldObj[i]);
          }
        }
        return newObj;
    }

    getUserDetails() {
        return {userName: this.userDetails.userName, userId: this.userDetails.userId, tags: this.userDetails.tags};
    }

    setUserDetails(userDetails) {
         this.userDetails.userName = userDetails.userName;
         this.userDetails.userId = userDetails.userId;
         this.userDetails.tags = userDetails.tags;
    }    
}
