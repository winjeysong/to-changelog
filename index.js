const fs = require('fs');
const exec = require('child_process').exec;
const flattenDeep = require('lodash.flattendeep');

const { H1, H2, H3, H4, H5, H6 } = require('./md-syntax').H;
const types = require('./types');
const cfg = require('./readConfig');

const trimLeft = str => str.replace(/^\s*/g, "");

exec('git log --pretty=format:"[[%h]] [[%s]]%b"', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  const arr = stdout.replace(/\n\n/g, '\n', ).split('\n');
  const formatted = arr.map(item => {
    const matched = item.match(/\[\[(.+)\]\] \[\[(.+)\]\](.*)/);
    const hash = matched[1];
    const subject = matched[2];
    const body = matched[3];
    const matchedSub = subject.match(/\[(.+)\] *(.+)/);
    let type = 'OTHERS';
    let content = subject;
    let detail = '';
    if (matchedSub) {
      type = matchedSub[1];
      content = matchedSub[2];
    }
    if (body) {
      detail = body;
    }
    return {
      hash,
      type,
      content,
      detail,
    };
  });

  const TITLE = `${H1} ${cfg.title || 'Changelog'}`;
  const RELEASE_TYPE = `${H2} ${cfg.release_type || 'Unreleased'}`;
  const VERSION = `${H3} ${cfg.version}`;

  const rawMd = formatted.map(f => {
    const title = types[f.type.toUpperCase()];
    return f.detail ? [`${title}\n`, `* ${f.content} (${f.hash})\n\n  *${f.detail}*\n`] : [`${title}\n`,`* ${f.content} (${f.hash})\n`];
  });
  const rmDup = new Set(flattenDeep(rawMd));
  const md = [`${TITLE}\n`, `${RELEASE_TYPE}\n`, `${VERSION}\n`, ...rmDup];
  fs.writeFile('CHANGELOG.md', md.join(''), (err) => {
    if (err) {
      console.error(err.message);
    }
  });
});