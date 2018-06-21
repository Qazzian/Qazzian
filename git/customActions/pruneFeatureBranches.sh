#!/usr/bin/env bash
cd $1
git branch --merged develop | grep feature | grep -v \* | xargs git branch -d
