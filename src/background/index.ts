import {browser} from 'webextension-polyfill-ts';
import jsonata from "jsonata";
const matchUrl = require("match-url-wildcard");


interface SyringeScript {
    name: string;
    key: string;
    version: string;
    author: string[];
    description: string;
    match: string[];
    data: any;
    modules: SyringeModule[];
}

type SyringeModule = SyringeDOMReplaceModule | SyringeInputHintModule;

interface SyringeDOMReplaceModule {
    performer: "DOMReplace";
    parameter: {
        rules: SyringeDOMReplaceRule[]
    }
}

interface SyringeDOMReplaceRule {
    nodeName?: string[];
    matches?: string[];
    dictionary?: Map<string, string> | string;
    read?: string; // attr:title textContent innerHTML innerText
    write?: string;
    cloneNode?: boolean;
    replaces?: SyringeDOMReplaceReg[];
}

interface SyringeDOMReplaceReg {
    pattern: string;
    flags?: string;
    replace: string;
}

interface SyringeInputHintModule {
    performer: "InputHint";
    parameter: {
        matches: string[];
        dataset: SyringeInputHintDataset[] | string;
    }
}

interface SyringeInputHintDataset {
    label: string;
    value: string;
    [key: string] : string;
}

const script: SyringeScript = {
    "name": "",
    "key": "eh",
    "version": "0.1",
    "author": [""],
    "description": "",
    "match": ["example.com", "*.example.com"],
    "data": { // 存储数据
        "tags": [
            {"namespace": "parody", "key": "touhou project", "name": "东方系列"}
        ]
    },
    "modules": [ // 模块
        {
            "performer": "DOMReplace", // dom替换模块
            "parameter": {
                "rules": [
                    {
                        "nodeName": ["#TEXT"], // 遍历节点匹配nodename
                        "dictionary": "JSONATA:data.tags{namespace & ':' & key: name}", // http://try.jsonata.org/BkFU1x6k8
                        "read": "textContent", // 从什么地方读取 attr:title textContent innerHTML innerText
                        "write": "textContent", // 写入什么地方 attr:title textContent innerHTML innerText
                        "replaces": [ // 正则替换
                            {
                                "pattern": "([0-9.]+) star",
                                "flags": "i",
                                "replace": "$1 星"
                            }
                        ]
                    },
                    {
                        "matches": [ // 指定匹配的节点
                            "#list>li .title",
                            "#list2>li .title"
                        ],
                        "replaces": [ // 正则替换
                            {
                                "pattern": "([0-9.]+) star",
                                "flags": "i",
                                "replace": "$1 星"
                            }
                        ],
                        "cloneNode": true // 复制一个新的节点，来存储翻译，旧节点display:none隐藏掉，用于兼容其他插件
                    }
                ]
            }
        },
        {
            "performer": "InputHint",  // 输入提示模块
            "parameter": {
                "matches": [ // 指定输入框
                    "input#search"
                ],
                "dataset": "JSONATA:data.tags.{'label': name,'value': namespace & ':' & key}", // http://try.jsonata.org/SJD-ye6y8
            }
        },
    ]
};

function jsonataAnalysis(value: any, fullData: any) {
    if(typeof value === 'object') {
        for(let key in value) {
            if(!value.hasOwnProperty(key)) continue;
            const v = value[key];
            if(typeof v === "string" && v.slice(0, 8) === 'JSONATA:') {
                const jsonataScript = v.slice(8);
                value[key] = jsonata(jsonataScript).evaluate(fullData);
            }else if(typeof v === "object") {
                jsonataAnalysis(v, fullData);
            }
        }
    }
}
jsonataAnalysis(script, script);

const executeScripts: {match: string[], key: string, data: string}[] = [];
executeScripts.push({
    match: script.match,
    data: JSON.stringify(script),
    key: script.key,
});

browser.tabs.onUpdated.addListener(async (tabId: number, changeInfo, tab) => {
    if (changeInfo['status'] != 'loading') return;
    let hit = false;

    for(const scriptPack of executeScripts) {
        if (scriptPack.match.find(rule => matchUrl(tab.url, rule))) {
            hit = true;
            const data = scriptPack.data;
            const code = `if(!window.syringe) window.syringe = {};\nwindow.syringe["${scriptPack.key}"] = ${data};`;
            await browser.tabs.executeScript(tabId, {
                code: `
                    const script = document.createElement('script');
                    script.innerHTML = \`${code.replace(/\\/igm, "\\\\")}\`;
                    document.head.appendChild(script);
                `,
                runAt: "document_start",
            });

        }
    }

    if(hit) {
        await browser.tabs.executeScript(tabId, {
            file: 'script/main.js',
            runAt: "document_start",
        });
    }

});

