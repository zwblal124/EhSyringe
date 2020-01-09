
export interface EHTDatabase {
    head: {
        author: {
            name: string;
            email: string;
            when: string;
        };
        committer: {
            name: string;
            email: string;
            when: string;
        };
        sha: string;
        message: string;
    };
    version: number;
    repo: string;
    data: EHTNamespace[];
}

export type EHTNamespaceName =
    | 'rows'
    | 'reclass'
    | 'language'
    | 'parody'
    | 'character'
    | 'group'
    | 'artist'
    | 'male'
    | 'female'
    | 'misc';

export interface EHTNamespace {
    namespace: EHTNamespaceName;
    count: number;
    data: { [tag: string]: EHTTag };
}

export interface EHTTag {
    name: string;
    intro: string;
    links: string;
}

export interface TagItem extends EHTTag {
    search: string;
    namespace: EHTNamespaceName;
    key: string;
    fullKey: string;
}

export type TagList = TagItem[];
export interface TagReplace { [key: string]: string; }

export interface Suggestion {
    tag: TagItem;
    score: number;
    term: string;

    match: {
        key?: { start: number; length: number };
        name?: { start: number; length: number };
    };
}

export interface ReleaseCheckData {
    old: string;
    oldLink: string;
    new: string;
    newLink: string;
    timestamp: number;

    githubRelease: any;
}

export interface DownloadStatus {
    run: boolean;
    progress: number;
    info: string;
    complete: boolean;
    error: boolean;
}

export interface SyringeScript {
    name: string;
    key: string;
    version: string;
    author: string[];
    description: string;
    match: string[];
    data: any;
    modules: SyringeModule[];
}

export type SyringeModule = SyringeDOMReplaceModule | SyringeInputHintModule;

export interface SyringeDOMReplaceModule {
    performer: "DOMReplace";
    parameter: {
        rules: SyringeDOMReplaceRule[]
    }
}

export interface SyringeDOMReplaceRule {
    nodeName?: string[] | Set<string>;
    matches?: string[];
    dictionary?: {[key: string]: string} | string;
    read?: string; // attr:title textContent innerHTML innerText
    write?: string;
    cloneNode?: boolean;
    replaces?: SyringeDOMReplaceReg[];
}

export interface SyringeDOMReplaceReg {
    pattern: string;
    flags?: string;
    replace: string;
}

export interface SyringeInputHintModule {
    performer: "InputHint";
    parameter: {
        matches: string[];
        dataset: SyringeInputHintDataset[] | string;
    }
}

export interface SyringeInputHintDataset {
    label: string;
    value: string;
    [key: string] : string;
}

