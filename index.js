// ==UserScript==
// @name         百度搜索页面双列美化
// @name:en      Pretty Baidu Search Page
// @namespace    https://github.com/TheRiverElder/Pretty-Baidu-Search-Page/blob/master/index.js
// @version      1.3.1
// @description  美化百度搜索页面，去除广告、相关关键词、提供自定义的图片背景、毛玻璃圆角卡片、双列布局。双列布局采用紧密布局，不会出现某个搜索结果有过多空白。
// @description:en  Prettify Baidu search page. Removed the ads, relative keywords. Offers custom image or color backgroud. Uses round corner card to display result. Densitive layout ensures no more blank in result cards.
// @author       TheRiverElder
// @icon         https://theriverelder.github.io/assets/river_icon_dark.ico
// @compatible   chrome
// @include      *//www.baidu.com/s?*
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
    /* 搜索建议列表外层 */
    .bdsug, 
    .wrapper_new.wrapper_s #form .bdsug-new, 
    .wrapper_new .wrapper_new #form .bdsug-new ul, 
    .wrapper_new .fix-head.s_down #form .bdsug-new {
        width: 100%;
        border: none;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(2px);
        border-bottom-left-radius: 1.5em;
        border-bottom-right-radius: 1.5em;
        box-shadow: none;
        overflow: hidden;
    }
    .busug input, .busug-new input, .wrapper_new .s_btn_wr .s_btn {
        border-radius: 0;
    }
    /* 搜索建议表 */
    .wrapper_new #form .bdsug-new ul, 
    .wrapper_new .fix-head.s_down #form .bdsug-new,
    .wrapper_new #form .bdsug-new {
        width: 100%;
        margin: 0;
        padding: 0;
    }
    /* 普通的搜索建议 */
    .wrapper_new.wrapper_s #form .bdsug-new ul li, 
    .wrapper_new #form .bdsug-new ul li {
        width: 100%;
        margin: 0;
        padding: .5em .5em;
        padding-left: 1em;
        box-sizing: border-box;
        transition: padding-left 100ms;
    }
    /* 被选中的搜索建议，注意被选中不仅仅是鼠标悬停，通过上下键所选中的也在其中 */
    .wrapper_new.wrapper_s #form .bdsug-new ul li.bdsug-s, 
    .wrapper_new #form .bdsug-new .bdsug-s {
        padding-left: 2em;
        background-color: rgba(255, 255, 255, 0.5);
        transition: padding-left 100ms;
        display: flex;
        align-items: center;
    }
    .wrapper_new.wrapper_s #form .bdsug-new ul li.bdsug-s span, .wrapper_new #form .bdsug-new ul li.bdsug-s span {
        flex: 1;
    }
    .wrapper_new.wrapper_s #form .bdsug-new ul li.bdsug-s .bdsug-store-del.wrapper_new #form .bdsug-new ul li.bdsug-s .bdsug-store-del  {
        position: relative;
        right: 0;
    }
    /* 搜索建议列表的反馈栏 */
    .wrapper_new .bdsug-new .bdsug-feedback-wrap {
        margin: 0;
        padding-top: 5px;
        background: #F5F5F6;
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
    #form {
        margin: 12px 15px;
    }
    #form .s_ipt_wr {
        border-top-left-radius: 2em;
        border-bottom-left-radius: 2em;
        padding-left: 1.5em;
    }
    #form .s_btn_wr {
        border-top-right-radius: 2em;
        border-bottom-right-radius: 2em;
        overflow: hidden;
    }
    #form .s_ipt_wr.iptfocus {
        border-bottom-left-radius: 0;
    }
    #form .s_ipt_wr.iptfocus ~ .s_btn_wr {
        border-bottom-right-radius: 0;
    }

    .wrapper_new #head.fix-head .s_form,
    .wrapper_new .s_form {
        height: auto;
    }
    #wrapper {
        backgroun-color: #001133;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        background-attachment: fixed;
    }
    #s_tab {
        background: #F5F5F680;
        backdrop-filter: blur(5px);
    }
    /* 同关键词链接，例如文库、百科之类的 */
    .wrapper_new #s_tab .s-tab-item, .wrapper_new #s_tab .s-tab-item:before {
        transition: color 100ms;
    }
    .wrapper_new #s_tab .s-tab-item:hover, .wrapper_new #s_tab .s-tab-item:hover:before {
        color: #FFFFFF;
        transition: color 100ms;
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
        align-items: flex-start;
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

    #page, .wrapper_new .container_new~#page {
        background-color: transparent;
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
        margin: .5em 0;
    }
    .settings > .title {
        margin: .5em 0;
        text-align: center;
        letter-spacing: .5em;
        font-size: 2em;
        font-weight: bold;
    }
    .settings > .hint {
        text-align: center;
        bord-break: break-all;
        font-size: .8em;
        color: #404040
    }
    .settings > textarea {
        resize: none;
        height: 5em;
        padding: 1em;
        border-radius: 1em;
        outline: none;
    }
    .settings > .triponent {
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
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
    .settings button {
        margin: 0;
        padding: .5em 2em;
        box-sizing: border-box;
        border: 0;
        border-radius: 1.5em;
        outline: none;
    }
    .bg-img-preview-wrapper {
        flex: 1;
        box-sizing: border-box;
        overflow: hidden;
    }
    .bg-img-preview {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: 50% 50%;
        border: .1em solid #808080;
        border-radius: .5em;
        padding: .5em;
        box-sizing: border-box;
        display: none;
    }

    #head, #s_tab, #foot, #container {
        opacity: 1;
        transition: opacity 200ms;
    }
    #head.hidden, #s_tab.hidden, #foot.hidden, #container.hidden {
        opacity: 0;
        transition: opacity 200ms;
    }

    .setting-dropdown {
        display: none;
        right: 200px;
        top: 48px;
        user-select: none;
    }
`);

(function() {
    'use strict';

    // 保存先前设置的背景的键
    const BG_KEY = 'baidu-search-background';
    // 保存先前设置的导航栏可见性的键
    const TV_KEY = 'baidu-search-tab-visibility';

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
    const head = document.getElementById('head'); // 页眉：Logo、搜索框、首页链接、设置链接
    const u = document.getElementById('u'); // 页眉处的链接
    const tab = document.getElementById('s_tab'); // 图片、文库等标签
    const container = document.getElementById('container'); // 主要内容：搜索结果与页码
    const content = document.getElementById('content_left'); // 搜索结果列表
    const results = [...document.getElementsByClassName('result'), ...document.getElementsByClassName('result-op')]; // 搜索结果，一般10个，而且id分别以数字1~10命名
    const foot = document.getElementById('foot'); // 页脚：举报、帮助、用户反馈

    // 封杀所有冗杂内容
    [...content.childNodes].forEach(node => node.remove())

    // 双列排布搜索结果
    const left = Object.assign(document.createElement('div'), {className: 'result_column'});
    const right = Object.assign(document.createElement('div'), {className: 'result_column'});
    content.appendChild(left);
    content.appendChild(right);
    // 重新将实际的搜索结果分两列填充至容器
    for (let result of results) {
        appendResult(result);
    }
    
    // 添加新的搜索结果，哪怕后来的有新的结果，也能被显示，而不会打乱排版
    function appendResult(elem) {
        (left.clientHeight <= right.clientHeight ? left : right).appendChild(elem);
        // 阻止双击事件冒泡，这样只有双击没有被遮挡的背景才能隐藏元素
        elem.addEventListener('dblclick', event => event.stopPropagation());
    }

    // 双击隐藏所有元素并显示背景
    let showBg = false;
    container.addEventListener('dblclick', event => {
        showBg = true;
        [head, tab, foot, container].forEach(e => e.classList.add('hidden'));
        event.stopPropagation();
    });
    // 在任意地方单击以重现元素
    wrapper.addEventListener('click', () => {
        if (showBg) {
            showBg = false;
            [head, tab, foot, container].forEach(e => e.classList.remove('hidden'));
        }
    });

    // 监听新的结果或者广告的添加，Sky Killed 度娘有时候会在脚本载入后添加新的搜索结果，导致排版错乱，所以在这里通吃进入结果列表
    if (MutationObserver) { // 如果有MutationObserver API，吐槽：Sky Killed百度封杀了MutationObserver
        const resultListOvserver = new MutationObserver(mutations => mutations.forEach(mutation => {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                [...mutation.addedNodes].forEach(node => {
                    node.remove();
                    if (node.classList.contains('result') || node.classList.contains('result-op')) {
                        appendResult(node);
                    }
                });
            }
        }));
        resultListOvserver.observe(content, {childList: true});
    } else { // 否则就使用旧的Mutation Events API
        content.addEventListener('DOMNodeInserted', event => {
            if (event.relatedNode === content) {
                const target = event.target;
                target.remove();
                if (target.classList.contains('result') || target.classList.contains('result-op')) {
                    appendResult(event.target);
                }
            }
        });
    }

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
        innerText: `先选择颜色或者文件，之后点击“使用该颜色”或者“使用该图片”，
        之后会看见文本框中的样式代码发生改变，
        此时点击“确定”以确认更改，否则点击“取消”以返回。
        目前URL不支持预览，但是可以使用（图片载入耗时取决于网络环境）`
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
    // 图片预览
    const imgFileWrapper = Object.assign(document.createElement('div'), {className: 'bg-img-preview-wrapper'});
    const imgFile = Object.assign(document.createElement('img'), {className: 'bg-img-preview', alt: '背景预览'});
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
    imgFileWrapper.appendChild(imgFile);
    // 图片URL输入
    const divUrl = Object.assign(document.createElement('div'), {className: 'triponent'});
    const txtUrl = Object.assign(document.createElement('span'), {innerText: '图片URL'});
    const iptUrl = Object.assign(document.createElement('input'), {type: 'url', className: 'bg-input'});
    const btnUrl = Object.assign(document.createElement('button'), {innerText: '使用该图片URL'});
    divUrl.addEventListener('click', () => txtBgPreview.innerText = `url('${iptUrl.value}')`);
    divUrl.appendChild(txtUrl);
    divUrl.appendChild(iptUrl);
    divUrl.appendChild(btnUrl);

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
    btnCancel.addEventListener('click', () => {
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
    settings.appendChild(imgFileWrapper);
    settings.appendChild(divUrl);
    settings.appendChild(divButtons);
    document.getElementsByTagName('body')[0].appendChild(overlay);
    // 设置下拉菜单
    const settingsDropdown = Object.assign(document.createElement('div'), {className: 'usermenu setting-dropdown', 
        onmouseleave: () => settingsDropdown.style.display = 'none'
    });
    settingsDropdown.appendChild(Object.assign(document.createElement('a'), {innerText: '设置背景', onclick: openSettingsPanel}));
    settingsDropdown.appendChild(Object.assign(document.createElement('a'), {innerText: '开关导航', onclick: toggleTab}));
    // 在页面右上角的连接处，增加一个设置菜单的<a>标签（实际上是仅仅是按钮的功能，但是使用<a>可以保持原有样式）
    const btnSettings = Object.assign(document.createElement('a'), {innerText: '美化设置', className: 'btn-open-settings',
        onmouseover: () => settingsDropdown.style.display = 'block',
    });
    if (u.insertBefore) {
        u.insertBefore(btnSettings, u.children[0]);
    } else {
        u.appendChild(btnSettings);
    }
    u.appendChild(settingsDropdown);

    // 打开背景设置界面
    function openSettingsPanel() {
        overlay.style.visibility = 'visible';
        txtBgPreview.innerText = GM_getValue(BG_KEY, '#001133');
    }

    // 开关导航栏
    function toggleTab() {
        const newVisibility = tab.style.visibility === 'hidden' ? 'visible' : 'hidden';
        setTabVisibility(newVisibility);
        GM_setValue(TV_KEY, newVisibility);
    }

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

    // 设置导航栏可见性
    function setTabVisibility(visibility) {
        tab.style = `
        visibility: ${visibility};
        height: ${visibility === 'hidden' ? '0' : 'auto'};`;
    }

    // 初始化，读取先前设置的背景与导航栏可见性
    setBackground(GM_getValue(BG_KEY, '#001133'));
    setTabVisibility(GM_getValue(TV_KEY, 'visibile'));

})();