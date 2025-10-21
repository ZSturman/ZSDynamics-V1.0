import os
import shutil
from pathlib import Path
import re

from app import create_app
from config import StaticBuildConfig


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


def fix_static_paths(docs_path: Path):
    """Fix absolute static paths to relative paths for GitHub Pages and remove GTM"""
    
    def fix_file_paths(file_path: Path, is_subdirectory: bool = False):
        content = file_path.read_text(encoding='utf-8')
        
        # Determine the correct relative path prefix
        prefix = "../static/" if is_subdirectory else "static/"
        
        # Fix CSS and other href links  
        content = re.sub(r'href="/static/', f'href="{prefix}', content)
        
        # Fix image and script src links
        content = re.sub(r'src="/static/', f'src="{prefix}', content)
        content = re.sub(r'src="\.\./static/', f'src="{prefix}', content)
        
        # Remove Google Tag Manager scripts
        content = re.sub(r'<!-- Google Tag Manager -->.*?<!-- End Google Tag Manager -->', '', content, flags=re.DOTALL)
        content = re.sub(r'<!-- Google Tag Manager \(noscript\) -->.*?<!-- End Google Tag Manager \(noscript\) -->', '', content, flags=re.DOTALL)
        
        # Remove GTM CSS classes
        content = re.sub(r' gtm-[a-zA-Z0-9_-]*', '', content)
        content = re.sub(r'gtm-[a-zA-Z0-9_-]*', '', content)
        
        file_path.write_text(content, encoding='utf-8')
        print(f"Fixed static paths and removed GTM in {file_path}")
    
    # Fix root level HTML files
    for html_file in docs_path.glob("*.html"):
        fix_file_paths(html_file, is_subdirectory=False)
    
    # Fix HTML files in subdirectories
    for html_file in docs_path.glob("*/*.html"):
        fix_file_paths(html_file, is_subdirectory=True)
        
    # Fix HTML files in nested subdirectories
    for html_file in docs_path.glob("*/*/*.html"):
        fix_file_paths(html_file, is_subdirectory=True)


def build(docs_dir: str = "docs"):
    docs_path = Path(docs_dir)
    if docs_path.exists():
        print(f"Removing existing {docs_path}")
        shutil.rmtree(docs_path)
    docs_path.mkdir(parents=True, exist_ok=True)

    # create a Flask app using the project's factory
    app = create_app()
    
    # Override config for static build
    app.config.from_object(StaticBuildConfig)

    # ensure templates are found and context processors run
    with app.app_context():
        # render templates
        render_templates_to_docs(app, docs_path)

    # copy static folder (app/static -> docs/static)
    project_root = Path(__file__).parent
    src_static = project_root / "app" / "static"
    if src_static.exists():
        dst_static = docs_path / "static"
        copy_static(src_static, dst_static)
    else:
        print(f"No static folder found at {src_static}; skipping copy")
    
    # Fix static paths for GitHub Pages
    fix_static_paths(docs_path)

    print("Build complete. Serve the site with: npx serve docs")


if __name__ == "__main__":
    build()
