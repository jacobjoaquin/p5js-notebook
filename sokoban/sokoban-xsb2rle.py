#!/usr/bin/env python

import re
import sys

level = sys.stdin.read()
flat = []
output = []

for L in [L.rstrip().replace(' ', '-') for L in level.splitlines()]:
  if len(L) > 0:
    flat.append(L)

for g in [m.group() for m in re.finditer(r'(.)\1*', '|'.join(flat))]:
  if len(g) >= 3:
    output.append(str(len(g)))
    output.append(g[0])
  else:
    output.append(g)

print ''.join(output) 