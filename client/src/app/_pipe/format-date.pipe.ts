import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeago',
})
export class FormatDateAddressPipe implements PipeTransform {
  transform(timestamp: any) {
    const currentTimestamp: any = new Date();
    const previousTimestamp: any = new Date(timestamp);

    // Calculate the time difference between the two timestamps (in milliseconds)
    const timeDifference: any = currentTimestamp - previousTimestamp;

    // Convert the time into seconds, minutes, hours, days, weeks, months, and years
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44);
    const years = Math.floor(days / 365);

    // Return a string describing the elapsed time
    if (years > 0) {
      return years + ' years ago';
    } else if (months > 0) {
      return months + ' months ago';
    } else if (weeks > 0) {
      return weeks + ' weeks ago';
    } else if (days > 0) {
      return days + ' days ago';
    } else if (hours > 0) {
      return hours + ' hours ago';
    } else if (minutes > 0) {
      return minutes + ' minutes ago';
    } else {
      return seconds + ' seconds ago';
    }
  }
}
