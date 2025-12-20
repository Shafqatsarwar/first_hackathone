"""
Copy module writing in `modules/module-XX` into both `docusaurus/docs/module-XX`
and the legacy `docs/module-XX` tree so Docusaurus and backend tooling share the
same source. Run this script after editing modules before building or ingesting.
"""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
MODULES_DIR = ROOT / "modules"
TARGETS = [
    ROOT / "docusaurus" / "docs",
    ROOT / "docs",
]


def sync_module(source: Path, target_root: Path):
    """
    Copy module directory from `source` into `target_root/<module_name>`.
    Overwrites existing content to keep docs in sync.
    """
    if not source.is_dir():
        return
    target = target_root / source.name
    if target.exists():
        shutil.rmtree(target)
    shutil.copytree(source, target)


def main():
    if not MODULES_DIR.exists():
        print(f"Modules directory {MODULES_DIR} is missing.")
        return

    for module in sorted(MODULES_DIR.iterdir()):
        if not module.is_dir():
            continue
        for dest_root in TARGETS:
            dest_root.mkdir(parents=True, exist_ok=True)
            sync_module(module, dest_root)

    print("Modules synchronized into:", ", ".join(str(p) for p in TARGETS))


if __name__ == "__main__":
    main()
