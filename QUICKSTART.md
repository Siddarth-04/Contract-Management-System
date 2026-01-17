# ContractFlow - Quick Start Guide

## Installation & Setup

1. **Download** the ContractFlow folder
2. **Open** `index.html` in any modern web browser
3. **Done!** The application is ready to use

No installation, no dependencies, no configuration needed.

## First Steps

### 1. Explore the Landing Page
- Open `index.html` to see the welcome screen
- Click on feature cards to navigate to different sections
- Sample data is automatically loaded on first visit

### 2. View the Dashboard
- Click "View Dashboard" or navigate to `dashboard.html`
- See 4 sample contracts already created
- Click on statistics cards to filter contracts
- Use the search bar to find specific contracts

### 3. Create Your First Blueprint
- Navigate to "Blueprints" from the header
- See 3 pre-loaded blueprint templates
- Scroll to "Create New Blueprint" section
- Enter a name like "Freelance Agreement"
- Click field type buttons to add fields:
  - 📝 Text Field - for names, descriptions, amounts
  - 📅 Date Field - for dates
  - ☑️ Checkbox - for yes/no options
  - ✍️ Signature - for signature placeholders
- Configure each field's label and mark as required if needed
- Click "Create Blueprint"

### 4. Generate a Contract
- From the blueprints list, click "Use Template" on any blueprint
- Fill in all the required fields (marked with *)
- Give your contract a descriptive name
- Click "Create Contract"
- You'll be redirected to the contract details page

### 5. Manage Contract Lifecycle
- On the contract details page, you'll see:
  - All contract field values
  - Current status badge
  - Lifecycle timeline showing progress
  - Available action buttons
- Click lifecycle buttons to transition:
  - "Approve" - Move from CREATED to APPROVED
  - "Send" - Move from APPROVED to SENT
  - "Sign" - Move from SENT to SIGNED
  - "Lock" - Move from SIGNED to LOCKED (immutable)
- Once locked, the contract cannot be modified

### 6. Filter and Search Contracts
- Return to the Dashboard
- Click statistics cards to filter:
  - Total - Show all contracts
  - Active - Show CREATED, APPROVED, SENT
  - Signed - Show SIGNED, LOCKED
  - Pending - Show CREATED, APPROVED
- Use the search box to find contracts by name
- Use the status dropdown for specific status filtering
- Click "Clear Filters" to reset all filters

## Key Features to Try

✅ **Create multiple blueprints** for different contract types
✅ **Generate several contracts** from the same blueprint
✅ **Practice lifecycle transitions** to see state enforcement
✅ **Try to make invalid transitions** (they'll be blocked)
✅ **Lock a contract** and see how it becomes read-only
✅ **Filter contracts** using multiple methods simultaneously
✅ **Delete contracts or blueprints** (with confirmation)

## Understanding Lifecycle States

```
CREATED → APPROVED → SENT → SIGNED → LOCKED
              ↓
         (can revoke)
              ↓
            CREATED
```

- **CREATED**: Initial state when contract is generated
- **APPROVED**: Contract has been reviewed and approved
- **SENT**: Contract has been sent to signing parties
- **SIGNED**: Contract has been signed by all parties
- **LOCKED**: Final immutable state (cannot be changed)

## Tips

💡 All data is stored locally in your browser
💡 Data persists even after closing the browser
💡 Each browser has independent data
💡 Clear browser data to reset the application
💡 Works offline - no internet required
💡 Responsive - works on mobile, tablet, and desktop

## Common Questions

**Q: Can I export contracts?**
A: Not in this version, but you can copy the data from the UI

**Q: Where is the data stored?**
A: In your browser's localStorage, completely local

**Q: Can I share contracts with others?**
A: No, this is a single-user, local-only application

**Q: What if I delete a blueprint that has contracts?**
A: Contracts keep working; they store the blueprint name

**Q: Can I edit a locked contract?**
A: No, locked contracts are intentionally immutable

**Q: How do I reset everything?**
A: Clear your browser's localStorage for this site

---

Enjoy using ContractFlow! 🎉
