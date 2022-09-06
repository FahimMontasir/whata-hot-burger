import { format, getTime, formatDistanceToNow } from "date-fns";

export function fDate(date) {
  return date ? format(new Date(date), "dd MMM yyyy") : "no date found";
}

export function fDateTime(date) {
  return date ? format(new Date(date), "dd MMM yyyy HH:mm") : "no date found";
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : "no date found";
}

export function fDateTimeSuffix(date) {
  return date
    ? format(new Date(date), "dd/MM/yyyy hh:mm aaaa")
    : "no date found";
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "no date found";
}
