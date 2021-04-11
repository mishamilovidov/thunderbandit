module.exports = {
  "header": "# Changelog",
  "types": [
    {"type": "feat", "section": "✨ Features"},
    {"type": "fix", "section": "🐛 Fixes"},
    {"type": "chore", "section": "🧰 Maintenance"},
    {"type": "build", "section": "🧰 Maintenance"},
    {"type": "ci", "section": "🧰 Maintenance"},
    {"type": "docs", "section": "🧰 Maintenance"},
    {"type": "style", "section": "🧰 Maintenance"},
    {"type": "refactor", "section": "🧰 Maintenance"},
    {"type": "perf", "section": "🧰 Maintenance"},
    {"type": "test", "section": "🧰 Maintenance"}
  ],
  "bumpFiles": [
    {
      "filename": "package.json",
      "type": "json"
    }
  ],
  "commitUrlFormat": "https://github.com/mishamilovidov/thunderbandit/commits/{{hash}}",
  "compareUrlFormat": "https://github.com/mishamilovidov/thunderbandit/compare/{{previousTag}}...{{currentTag}}"
}