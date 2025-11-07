declare module 'accept-language-parser' {
  export interface Language {
    code: string;
    script?: string;
    region?: string;
    quality: number;
  }

  export function parse(acceptLanguage: string): Language[];
}
