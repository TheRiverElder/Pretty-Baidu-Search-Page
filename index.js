// ==UserScript==
// @name         百度搜索页面双列美化
// @name:en      Pretty Baidu Search Page
// @namespace    https://github.com/TheRiverElder/Pretty-Baidu-Search-Page/blob/master/index.js
// @version      1.0
// @description  美化百度搜索页面，去除广告、相关关键词、提供自定义的图片背景、毛玻璃圆角卡片、双列布局。双列布局采用紧密布局，不会出现某个搜索结果有过多空白。
// @description:en  Prettify Baidu search page. Removed the ads, relative keywords. Offers custom image or color backgroud. Uses round corner card to display result. Densitive layout ensures no more blank in result cards.
// @author       TheRiverElder
// @compatible   chrome
// @include      *//www.baidu.com/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

// 嵌入css
GM_addStyle(`
    html, body {
        font-family: 微软雅黑, Helvatica, sans serif;
    }
    .s_form_wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .bdsug {
        width: 100%;
        border: none;
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(2px);
        border-bottom-left-radius: 1.5em;
        border-bottom-right-radius: 1.5em;
        box-shadow: none;
        overflow: hidden;
    }
    .bdsug li {
        width: 100%;
        margin: 0;
        padding: .5em 0;
        padding-left: 1em;
        box-sizing: border-box;
        transition: all 100ms;
    }
    .bdsug li.bdsug-s {
        padding-left: 2em;
        background-color: rgba(255, 255, 255, 0.5);
        transition: all 100ms;
    }
    .bdsug-feedback-wrap {
        height: 2em;
    }
    .bdsug-feedback {
        padding-right: 2em;
    }
    #result_logo, #form {
        float: none;
    }
    #form .s_ipt_wr {
        border-top-left-radius: 1.5em;
        border-bottom-left-radius: 1.5em;
        padding-left: 1.5em;a
    }
    #form .s_btn_wr {
        border-top-right-radius: 1.5em;
        border-bottom-right-radius: 1.5em;
        overflow: hidden;
    }
    #form .s_ipt_wr.iptfocus {
        border-bottom-left-radius: 0;
    }
    #form .s_ipt_wr.iptfocus ~ .s_btn_wr {
        border-bottom-right-radius: 0;
    }


    #wrapper {
        backgroun-color: #001133;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        background-attachment: fixed;
    }
    #s_tab {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(5px);
    }
    #container {
        width: 100%;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    #content_left {
        width: 100%;
        margin: 0;
        padding: 0 8em;
        box-sizing:
        border-box;
        display: flex;
        flex-direction: row;
    }
    .result_column {
        flex: 1;
        min-width: 1em;
        padding: 1em;
        box-sizing:
        border-box;
    }
    .result, .result-op {
        width: 100%;
        padding: 1em 2em;
        margin: 0;
        margin-bottom: 1em;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(5px);
        border-radius: .5em;
        transition: background 100ms;
    }
    .result:hover, .result-op:hover {
        background: rgba(255, 255, 255, 0.9);
        transition: background 100ms;
    }
    .result img, .result-op img {
        border-radius: .2em;
    }
    .result:last-child {
        margin-bottom: 0;
    }

    .c-border {
        width: auto;
        border: none;
        box-shadow: none;
    }

    #page {
        padding: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-end;
    }
    #page strong, #page a {
        height: auto;
        background: transparent;
    }
    #page .pc, #page .n {
        border-radius: 1.5em;
        background: rgba(255, 255, 255, 0.8);
    }
    #page strong .fk, #page .fk {
        display: none;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 401;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(2px);
        visibility: collapse;
    }
    .settings {
        width: 50%;
        height: 90%;
        border-radius: 1em;
        background: rgba(255, 255, 255, 0.5);
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }
    .settings > * {
        width: 80%;
        margin: em 0;
    }
    .settings > .title {
        text-align: center;
        letter-spacing: .5em;
        font-size: 2em;
        font-weight: bold;
    }
    .settings > .hint {
        text-align: center;
        bord-break: break-all;
        font-size: 1em;
        color: #808080
    }
    .settings > textarea {
        resize: none;
        height: 5em;
        padding: 1em;
        border-radius: 1em;
        outline: none;
    }
    .settings > .triponent {
        margin: 0;
        height: 2em;
        box-sizing: border-box;
        border: 1px solid #808080;
        border-radius: 1em;
        display: flex;
        flex-direction: row;
        align-items: center;
        background: #FFFFFF;
    }
    .settings > .triponent > * {
        height: 100%;
        background: transparent;
    }
    .settings > .triponent > *:first-child {
        height: auto;
        padding: 0 2em;
    }
    .settings > .triponent > *:nth-child(2) {
        flex: 1;
        min-width: 1em;
        padding: 0 2em;
        box-sizing: border-box;
        border: 0;
    }
    .settings > .triponent > button {
        padding: 0 2em;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    .settings .buttons {
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .settings button {
        margin: 0;
        padding: .5em 2em;
        box-sizing: border-box;
        border: 0;
        border-radius: 1.5em;
        outline: none;
    }
    .bg-img-preview {
        border: .1em solid #808080;
        border-radius: .5em;
        padding: .5em;
        box-sizing: border-box;
        display: none;
    }
`);

(function() {
    'use strict';

    // 保存先前设置的背景的键
    const BG_KEY = 'baidu-search-background';

    // 移除冗杂内容
    [
        'content_right', // 右侧推荐内容
        'rs', // 相关关键词
        'rs_top_new', // 新的相关词
        'super_se_tip' // 错字提示
    ].forEach(id => {
        const elem = document.getElementById(id);
        if (elem && elem.remove) elem.remove();
    });

    // 获取相关DOM
    const wrapper = document.getElementById('wrapper'); // 整个页面
    // const head = document.getElementById('head'); // 页眉：Logo、搜索框、首页链接、设置链接
    const u = document.getElementById('u'); // 页眉处的链接
    // const tab = document.getElementById('s_tab'); // 图片、文库等标签
    // const container = document.getElementById('container'); // 主要内容：搜索结果与页码
    const content = document.getElementById('content_left'); // 搜索结果列表
    const results = [...document.getElementsByClassName('result'), ...document.getElementsByClassName('result-op')]; // 搜索结果，一般10个，而且id分别以数字1~10命名
    // const foot = document.getElementById('foot'); // 页脚：举报、帮助、用户反馈

    // 清空搜索结果中的所有内容，包括广告等，真正的搜索结果会在之后注入
    [...content.childNodes].forEach(e => e.remove());

    // 双列排布搜索结果
    const left = Object.assign(document.createElement('div'), {className: 'result_column'});
    const right = Object.assign(document.createElement('div'), {className: 'result_column'});
    // 重新将实际的搜索结果分两列填充至容器
    for (let result of results) {
        (left.children.length <= right.children.length ? left : right).appendChild(result);
    }
    content.appendChild(left);
    content.appendChild(right);

    // 设置页面，当前只能设置背景内容
    // 不使用innerHTML嵌入，虽然降低了可读性，但是方便获取DOM
    // 浮层
    const overlay = Object.assign(document.createElement('div'), {className: 'overlay'});
    // 主要面板
    const settings = Object.assign(document.createElement('div'), {className: 'settings'});
    // 标题
    const title = Object.assign(document.createElement('p'), {className: 'title', innerText: '背景设置'});
    // 提示
    const hint = Object.assign(document.createElement('p'), {className: 'hint', 
        innerText: '先选择颜色或者文件，之后点击“使用该颜色”或者“使用该图片”，之后会看见文本框中的样式代码发生改变，此时点击“确定”以确认更改，否则点击“取消”以返回。'
    });
    // 背景样式预览
    const txtBgPreview = Object.assign(document.createElement('textarea'), {className: 'bg-preview'});
    // 颜色输入
    const divColor = Object.assign(document.createElement('div'), {className: 'triponent'});
    const txtColor = Object.assign(document.createElement('span'), {innerText: '使用纯色'});
    const iptColor = Object.assign(document.createElement('input'), {type: 'color', className: 'bg-input'});
    const btnColor = Object.assign(document.createElement('button'), {innerText: '使用该颜色'});
    btnColor.addEventListener('click', () => txtBgPreview.innerText = iptColor.value);
    divColor.appendChild(txtColor);
    divColor.appendChild(iptColor);
    divColor.appendChild(btnColor);
    // 图片输入
    const divFile = Object.assign(document.createElement('div'), {className: 'triponent'});
    const txtFile = Object.assign(document.createElement('span'), {innerText: '图片'});
    const iptFile = Object.assign(document.createElement('input'), {type: 'file', accept: 'image/*', className: 'bg-input'});
    const btnFile = Object.assign(document.createElement('button'), {innerText: '使用该图片'});
    const imgFile = Object.assign(document.createElement('img'), {className: 'bg-img-preview'});
    iptFile.addEventListener('change', () => {
        if (!iptFile.files.length) return;
        const reader = new FileReader();
        reader.onload = () => {
            imgFile.src = reader.result;
            imgFile.style.display = 'block';
        };
        reader.readAsDataURL(iptFile.files[0]);
    });
    btnFile.addEventListener('click', () => txtBgPreview.innerText = `url('${imgFile.src}')`); // 由于使用的是DataURL，故会产生些许卡顿
    divFile.appendChild(txtFile);
    divFile.appendChild(iptFile);
    divFile.appendChild(btnFile);

    // 按钮
    const divButtons = Object.assign(document.createElement('div'), {className: 'buttons'});
    // 确认按钮
    const btnConfirm = Object.assign(document.createElement('button'), {innerText: '确定'});
    btnConfirm.addEventListener('click', () => {
        overlay.style.visibility = 'collapse';
        const bg = txtBgPreview.value;
        setBackground(bg);
        GM_setValue(BG_KEY, bg);
    });
    // 取消按钮
    const btnCancel = Object.assign(document.createElement('button'), {innerText: '取消'});
    btnConfirm.addEventListener('click', () => {
        overlay.style.visibility = 'collapse';
    });
    divButtons.appendChild(btnConfirm);
    divButtons.appendChild(btnCancel);

    overlay.appendChild(settings);
    settings.appendChild(title);
    settings.appendChild(hint);
    settings.appendChild(txtBgPreview);
    settings.appendChild(divColor);
    settings.appendChild(divFile);
    settings.appendChild(imgFile);
    settings.appendChild(divButtons);
    document.getElementsByTagName('body')[0].appendChild(overlay);

    // 在页面右上角的连接处，增加一个用于打开设置面板的链接（实际上是仅仅是按钮的功能，但是使用<a>可以保持原有样式）
    const btnSettings = Object.assign(document.createElement('a'), {innerText: '设置背景', className: 'btn-open-settings'});
    btnSettings.addEventListener('click', () => {
        overlay.style.visibility = 'visible';
    });
    u.appendChild(btnSettings);

    // 初始化，读取先前设置的背景
    setBackground(GM_getValue(BG_KEY, '#001133'));

    // 设置背景，如果是使用DataUrl可能会导致些许卡顿
    function setBackground(bg) {
        // 由于在设置新的背景后，background-*的样式会失效，故需要重新设置
        wrapper.style = `
        background: ${bg};
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        background-attachment: fixed;`;
    }
})();