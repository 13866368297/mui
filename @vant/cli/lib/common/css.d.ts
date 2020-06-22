declare type CSS_LANG = 'css' | 'less' | 'scss';
export declare const CSS_LANG: CSS_LANG;
export declare function getCssBaseFile(): string | null;
export declare function replaceCssImport(code: string): string;
export {};
