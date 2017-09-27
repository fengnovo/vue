export let html_encode = str => {
    let s = '';
    if (str.length === 0) return '';
    s = str.replace(/&/g, '&amp;');
    s = s.replace(/</g, '&lt;');
    s = s.replace(/>/g, '&gt;');
    s = s.replace(/ /g, '&nbsp;');
    s = s.replace(/\'/g, '&#39;');
    s = s.replace(/\"/g, '&quot;');
    s = s.replace(/\n/g, '<br>');
    return s;
};

export let html_decode = str => {
    let s = '';
    if (str.length === 0) return '';
    s = str.replace(/&amp;/g, '&');
    s = s.replace(/&lt;/g, '<');
    s = s.replace(/&gt;/g, '>');
    s = s.replace(/&nbsp;/g, ' ');
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, '"');
    s = s.replace(/<br>/g, '\n');
    return s;
};