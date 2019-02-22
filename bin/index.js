#!/usr/bin/env node

const toChangelog = require('../index');
const program = require('commander');

program.action(function() {
  toChangelog;
});