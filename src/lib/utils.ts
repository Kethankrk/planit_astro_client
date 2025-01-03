import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function postHelper(url: string, data: any, isFormData = false) {
  return fetch(url, {
    method: "POST",
    headers: isFormData
      ? undefined
      : {
          "Content-Type": "application/json",
        },
    body: isFormData ? data : JSON.stringify(data),
  });
}

export function patchHelper(url: string, data: any, isFormData = false) {
  return fetch(url, {
    method: "PATCH",
    headers: isFormData
      ? undefined
      : {
          "Content-Type": "application/json",
        },
    body: isFormData ? data : JSON.stringify(data),
  });
}
