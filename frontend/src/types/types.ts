export type JSONValue = null | string | number | JSONValue[] | {[k:string]:JSONValue}  
export type HttpMetod = 'post' | 'get' | 'patch' | 'put' | 'options' | 'delete'
export type Patient = {
    name: string;
    email: string;
    phone: string;
    photo: File;
  }