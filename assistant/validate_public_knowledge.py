#!/usr/bin/env python3
"""Best-effort pre-deploy check for the PUBLIC LINK HEALTH website assistant knowledge.
This is not a substitute for confidentiality review: GitHub commits are public at push time.
"""
import json
import pathlib
import re
import sys

path = pathlib.Path("assistant/knowledge.json")
errors = []
try:
    data = json.loads(path.read_text(encoding="utf-8"))
except Exception as exc:
    sys.exit(f"Cannot read public knowledge: {exc}")

topics = data.get("topics")
if not isinstance(topics, list):
    errors.append("topics must be a list")
    topics = []
ids = set()
checks = {
    "monetary amounts": re.compile(r"(?:[¥￥$€]\s*\d[\d,]*(?:\.\d+)?|\d[\d,]*(?:\.\d+)?\s*(?:人民币|日元|美元|元|万元|万日元|RMB|JPY|USD)\b)", re.I),
    "possible phone or ID number": re.compile(r"(?<!\d)(?:1[3-9]\d{9}|\d{17}[0-9Xx])(?!\d)"),
    "email address": re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.I),
    "credential/token": re.compile(r"(?:sk-[A-Za-z0-9_-]{16,}|service_role\s*[:=]|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY)", re.I),
}
for i, item in enumerate(topics):
    if not isinstance(item, dict):
        errors.append(f"topic {i} is not an object")
        continue
    tid = item.get("id")
    if not tid or tid in ids:
        errors.append(f"topic {i} has missing or duplicate ID")
    ids.add(tid)
    for key in ("title", "answer"):
        if not isinstance(item.get(key), str) or not item[key].strip():
            errors.append(f"topic {tid}: missing {key}")
    if not isinstance(item.get("triggers"), list) or not item.get("triggers"):
        errors.append(f"topic {tid}: triggers list required")
    text = "\n".join(str(item.get(k, "")) for k in ("title", "answer"))
    for name, regex in checks.items():
        if regex.search(text):
            errors.append(f"topic {tid}: possible {name} in publicly served text")
if errors:
    print("PUBLIC KNOWLEDGE VALIDATION FAILED:")
    for msg in errors:
        print(" - " + msg)
    print("Review the source before pushing sensitive data; this check cannot protect GitHub commit history.")
    sys.exit(1)
print(f"Public knowledge schema and basic secret pattern check passed: {len(topics)} topics.")
