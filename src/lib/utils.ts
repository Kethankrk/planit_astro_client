import type { ToastProps } from "@/components/ui/toast";
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

type ToasterToast = ToastProps & {
  title?: React.ReactNode;
  description?: React.ReactNode;
};

export const toastBadRequest: ToasterToast = {
  title: "Bad request",
  description: "Invalid data provided",
  variant: "destructive",
};

export const toastServerError: ToasterToast = {
  title: "Something went wrong in our side",
  description: "Unkown server error",
  variant: "destructive",
};

export const toastUnknownError: ToasterToast = {
  title: "Something went wrong",
  description: "Please try again later",
  variant: "destructive",
};

export const EVENTLIMIT = 2;
