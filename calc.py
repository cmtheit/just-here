import os

suffixes = [".ts", ".sass", ".wxml", ".json", ".scss"]
exclude = ["package-lock.json"]

total = 0
for dirn, dirs, files in os.walk('.'):
    if 'node_modules' not in dirn:
        for file in files:
            for suffix in suffixes:
                if file.endswith(suffix) and not file in exclude:
                    fn = f"{dirn}/{file}"
                    line = len(open(fn).readlines())
                    print(f"{fn} 有码 {line} 行")
                    total += line

print(f"统计完毕，共有码{total}行。")
