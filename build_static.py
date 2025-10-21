import os
import shutil
from pathlib import Path

from app import create_app


def render_templates_to_docs(app, docs_path: Path):
    templates = sorted(app.jinja_env.list_templates())

    skipped_prefixes = ("marcos/", "macros/", "mail/partials/")

    for tpl_name in templates:
        # skip templates that are clearly partials/macros
        if tpl_name.startswith(skipped_prefixes) or tpl_name.startswith("_"):
            continue

        # only render html templates
        if not tpl_name.endswith(".html"):
            continue

        out_path = docs_path / tpl_name
        out_path.parent.mkdir(parents=True, exist_ok=True)

        try:
            with app.test_request_context('/'):
                rendered = app.jinja_env.get_template(tpl_name).render()

            # map home template to index.html
            if tpl_name in ("home.html", "index.html"):
                target = docs_path / "index.html"
            else:
                target = out_path

            with open(target, "w", encoding="utf-8") as f:
                f.write(rendered)

            print(f"Rendered {tpl_name} -> {target}")
        except Exception as e:
            print(f"Skipped {tpl_name} (render error): {e}")


def copy_static(src_static: Path, dst_static: Path):
    if dst_static.exists():
        shutil.rmtree(dst_static)
    shutil.copytree(src_static, dst_static)
    print(f"Copied static assets {src_static} -> {dst_static}")


def build(docs_dir: str = "docs"):
    docs_path = Path(docs_dir)
    if docs_path.exists():
        print(f"Removing existing {docs_path}")
        shutil.rmtree(docs_path)
    docs_path.mkdir(parents=True, exist_ok=True)

    # create a Flask app using the project's factory
    app = create_app()

    # ensure templates are found and context processors run
    with app.app_context():
        # render templates
        render_templates_to_docs(app, docs_path)

    # copy static folder (project root/static -> docs/static)
    project_root = Path(__file__).parent
    src_static = project_root / "static"
    if src_static.exists():
        dst_static = docs_path / "static"
        copy_static(src_static, dst_static)
    else:
        print(f"No static folder found at {src_static}; skipping copy")

    print("Build complete. Serve the site with: npx serve docs")


if __name__ == "__main__":
    build()
