import os, zipfile, json, pathlib, datetime

ROOT = pathlib.Path(".")
OUT = ROOT / "output"
OUT.mkdir(exist_ok=True)

def extract_all_zips():
    for z in ROOT.glob("*.zip"):
        d = OUT / z.stem
        d.mkdir(exist_ok=True)
        with zipfile.ZipFile(z, 'r') as zip_ref:
            zip_ref.extractall(d)
    print("All ZIPs extracted.")

def make_index():
    files = []
    for p in OUT.rglob("*"):
        if p.is_file():
            files.append({
                "path": str(p.relative_to(OUT)),
                "size_kb": round(p.stat().st_size / 1024, 2),
                "modified": datetime.datetime.utcfromtimestamp(p.stat().st_mtime).isoformat()
            })
    with open(OUT / "index.json", "w", encoding="utf-8") as f:
        json.dump(files, f, indent=2, ensure_ascii=False)
    print(f"Indexed {len(files)} files.")
    return files

def make_catalog_html(files):
    html = ["<html><head><meta charset='utf-8'><title>AIUZ Terra Index</title></head><body>"]
    html.append("<h1>AIUZ Terra Research Catalog</h1><ul>")
    for f in files:
        html.append(f"<li>{f['path']} ({f['size_kb']} kB)</li>")
    html.append("</ul><p>Generated {}</p></body></html>".format(datetime.datetime.utcnow().isoformat()))
    with open(OUT / "index.html", "w", encoding="utf-8") as f:
        f.write("\n".join(html))
    print("index.html created.")

def zip_output():
    out_zip = ROOT / "output" / "full_release.zip"
    with zipfile.ZipFile(out_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(OUT):
            for file in files:
                path = pathlib.Path(root) / file
                zipf.write(path, path.relative_to(OUT))
    print(f"Created {out_zip} ({round(out_zip.stat().st_size/1024,2)} kB)")

if __name__ == "__main__":
    extract_all_zips()
    files = make_index()
    make_catalog_html(files)
    zip_output()
