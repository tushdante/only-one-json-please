#!/usr/bin/env node
'use strict';
const shell = require('shelljs');
const fs = require('fs');
const request = require('request');
const jsonfile = require('jsonfile');
const glob = require('glob');

shell.exec('echo "Concatenating files in the current directory..."');

  glob(`${__dirname}/*.json`, function (err, files) {
    if (err) {
      console.log(`ERROR: Unable to read the folder: ${__dirname}`, err);
    }

    const masterObj = {};

    files.forEach(function(file, index) {
      fs.readFile(file, 'utf8', function(err, data) {
        if (err) throw err;

        let obj = JSON.parse(data);

        Object.keys(obj).forEach((key) => {
          masterObj[key] = obj[key];
          jsonfile.writeFileSync(`./output.json`, masterObj);
        });
      });
    });
  });
