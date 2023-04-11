#!/bin/bash

vision \
 --projectRootPath='../../..' \
 --tsConfig='../../../tsconfig.json' \
 --destName='vision' \
 --printIgnorePaths='[
   "src/index",
   "src/types/type.d.ts",
   "src/util"
]'
