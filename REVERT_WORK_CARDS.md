# Revert Work Card Changes

If the flipped work card layout doesn't work, run these commands to restore the original:

```bash
# Restore WorkSection.tsx from backup
cp app/components/v2/WorkSection.tsx.backup app/components/v2/WorkSection.tsx

# Then revert the globals.css changes - the work card CSS block (lines ~686-828)
# Or use: git checkout app/globals.css
```

Or use git to revert:
```bash
git checkout app/components/v2/WorkSection.tsx app/globals.css
```
