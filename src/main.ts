import {SyringeDOMReplaceRule, SyringeScript} from "./interface";
const syringe: {[key: string]: SyringeScript} = (window as any)['syringe'];

console.log('main', (window as any)['syringe']);

const DOMReplaceRules : SyringeDOMReplaceRule[] = [];

for(let key in syringe) {
    if(!syringe.hasOwnProperty(key)) continue;
    for(let module of syringe[key].modules) {
        if(module.performer === 'DOMReplace') {
            DOMReplaceRules.push(...module.parameter.rules);
        }
    }
}
for(const rule of DOMReplaceRules) {
    if(Array.isArray(rule.nodeName)) {
        if(rule.nodeName) rule.nodeName = new Set(rule.nodeName.map((v) => v.toLowerCase()));
    }
}

let documentEnd = false;
window.document.addEventListener('DOMContentLoaded', (e) => {
    documentEnd = true;
});
const observer = new MutationObserver(mutations => mutations.forEach(mutation =>
    mutation.addedNodes.forEach(node1 => {
        translateNode(node1 as Element);
        if (documentEnd && node1.childNodes) {
            const nodeIterator = document.createNodeIterator(node1);
            let node = nodeIterator.nextNode();
            while (node) {
                translateNode(node as Element);
                node = nodeIterator.nextNode();
            }
        }
    })
));
observer.observe(window.document, {
    attributes: true,
    childList: true,
    subtree: true
});

function translateNode(node: Element) {
    for(const rule of DOMReplaceRules) {
        const nodeName = node.nodeName.toLowerCase();
        const parentNodeName = node.parentNode ? node.parentNode.nodeName.toLowerCase() : '';
        if (nodeName === 'script' || nodeName === 'style' || parentNodeName == 'script' || parentNodeName == 'style') { continue; }

        if(rule.nodeName){
            if(!(rule.nodeName as Set<string>).has(nodeName)) {
                continue;
            }
        }
        if(rule.matches && rule.matches.length && node.matches) {
            // @ts-ignore
            if(!node.matches(rule.matches)) {
                continue;
            }else {
                console.log(rule.matches, node);
            }
        }

        const read = rule.read || 'textContent';
        const write = rule.write || 'textContent';
        let value: string = '';
        if(read === 'textContent' || read ===  'innerHTML' || read === 'innerText') {
            value = (node as any)[read] || '';
        }else if(read.slice(0, 5) === 'attr:') {
            const attrKey = read.slice(5);
            value = node.getAttribute(attrKey) || '';
        }
        if (typeof rule.dictionary === 'object') {
            const newValue = rule.dictionary[value];
            if(newValue && newValue !== value) {
                if(!newValue) {
                    console.log('dictionary', value, newValue);
                }
                if(write === 'textContent' || write ===  'innerHTML' || write === 'innerText') {
                    (node as any)[write] = newValue;
                }else if(read.slice(0, 5) === 'attr:') {
                    const attrKey = read.slice(5);
                    node.setAttribute(attrKey, newValue);
                }
                continue;
            }
        }

        if (Array.isArray(rule.replaces)) {
            let newValue = value;
            rule.replaces.forEach(v => {
                newValue = newValue.replace(new RegExp(v.pattern, v.flags), v.replace);
            });
            if (newValue !== value) {

                if(!newValue) {
                    console.log('RegExp', value, newValue);
                }

                if(write === 'textContent' || write ===  'innerHTML' || write === 'innerText') {
                    (node as any)[write] = newValue;
                }else if(read.slice(0, 5) === 'attr:') {
                    const attrKey = read.slice(5);
                    node.setAttribute(attrKey, newValue);
                }
                continue;
            }
        }


    }
}
