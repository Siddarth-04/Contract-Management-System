// Blueprint Module - Blueprint Management Logic

import { getBlueprints, addBlueprint, deleteBlueprint } from './storage.js';
import { createBlueprint, validateBlueprint, generateId, formatDateTime, FIELD_TYPES } from './models.js';

let fields = [];

/**
 * Initialize blueprint page
 */
export function initBlueprintPage() {
  loadBlueprints();
  setupEventListeners();
}

/**
 * Load and display all blueprints
 */
function loadBlueprints() {
  const blueprints = getBlueprints();
  const container = document.getElementById('blueprintList');
  
  if (!container) return;
  
  if (blueprints.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <h3>No Blueprints Yet</h3>
        <p>Create your first contract blueprint to get started</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = blueprints.map(blueprint => `
    <div class="blueprint-card">
      <div class="blueprint-info">
        <h4>${escapeHtml(blueprint.name)}</h4>
        <div class="blueprint-meta">
          <span class="blueprint-meta-item">
            <span>📝</span>
            ${blueprint.fields.length} field${blueprint.fields.length !== 1 ? 's' : ''}
          </span>
          <span class="blueprint-meta-item">
            <span>📅</span>
            Created ${formatDateTime(blueprint.createdAt)}
          </span>
        </div>
      </div>
      <div class="blueprint-actions">
        <a href="create-contract.html?blueprintId=${blueprint.id}" class="btn btn-primary btn-sm">
          Use Template
        </a>
        <button class="btn btn-danger btn-sm" onclick="window.blueprintModule.confirmDelete('${blueprint.id}', '${escapeHtml(blueprint.name)}')">
          Delete
        </button>
      </div>
    </div>
  `).join('');
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  const form = document.getElementById('blueprintForm');
  const addFieldBtns = document.querySelectorAll('.field-type-btn');
  
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
  
  addFieldBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const fieldType = btn.dataset.type;
      addField(fieldType);
    });
  });
}

/**
 * Add a new field to the builder
 */
function addField(type) {
  const fieldId = generateId();
  const field = {
    id: fieldId,
    label: '',
    type: type,
    required: true
  };
  
  fields.push(field);
  renderFields();
}

/**
 * Render all fields in the builder
 */
function renderFields() {
  const container = document.getElementById('fieldsList');
  if (!container) return;
  
  if (fields.length === 0) {
    container.innerHTML = '<p class="text-muted">No fields added yet. Click a field type button above to add fields.</p>';
    return;
  }
  
  container.innerHTML = fields.map((field, index) => `
    <div class="field-item" data-field-id="${field.id}">
      <div class="field-header">
        <div>
          <div class="field-label-preview">${field.label || 'Untitled Field'}</div>
          <span class="field-type-badge">${getFieldTypeLabel(field.type)}</span>
        </div>
        <div class="field-actions">
          <button type="button" class="btn btn-sm btn-remove" onclick="window.blueprintModule.removeField('${field.id}')">
            Remove
          </button>
        </div>
      </div>
      <div class="field-config">
        <div class="form-group">
          <label class="form-label">Field Label</label>
          <input 
            type="text" 
            class="form-input" 
            value="${escapeHtml(field.label)}"
            onchange="window.blueprintModule.updateFieldLabel('${field.id}', this.value)"
            placeholder="e.g., Employee Name"
          >
        </div>
        <div class="form-group">
          <label class="form-checkbox">
            <input 
              type="checkbox" 
              ${field.required ? 'checked' : ''}
              onchange="window.blueprintModule.updateFieldRequired('${field.id}', this.checked)"
            >
            <span>Required field</span>
          </label>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Update field label
 */
export function updateFieldLabel(fieldId, label) {
  const field = fields.find(f => f.id === fieldId);
  if (field) {
    field.label = label;
    renderFields();
  }
}

/**
 * Update field required status
 */
export function updateFieldRequired(fieldId, required) {
  const field = fields.find(f => f.id === fieldId);
  if (field) {
    field.required = required;
  }
}

/**
 * Remove a field
 */
export function removeField(fieldId) {
  fields = fields.filter(f => f.id !== fieldId);
  renderFields();
}

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
  e.preventDefault();
  
  const nameInput = document.getElementById('blueprintName');
  const name = nameInput.value.trim();
  
  // Validate
  const errors = validateBlueprint(name, fields);
  
  if (errors.length > 0) {
    alert('Please fix the following errors:\n\n' + errors.join('\n'));
    return;
  }
  
  // Create blueprint
  const blueprint = createBlueprint(name, fields);
  addBlueprint(blueprint);
  
  // Reset form
  nameInput.value = '';
  fields = [];
  renderFields();
  loadBlueprints();
  
  // Show success message
  alert('Blueprint created successfully!');
  
  // Scroll to blueprints list
  document.getElementById('blueprintList').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Confirm delete blueprint
 */
export function confirmDelete(id, name) {
  if (confirm(`Are you sure you want to delete the blueprint "${name}"?\n\nThis action cannot be undone.`)) {
    deleteBlueprint(id);
    loadBlueprints();
  }
}

/**
 * Get field type label
 */
function getFieldTypeLabel(type) {
  const labels = {
    [FIELD_TYPES.TEXT]: 'Text',
    [FIELD_TYPES.DATE]: 'Date',
    [FIELD_TYPES.CHECKBOX]: 'Checkbox',
    [FIELD_TYPES.SIGNATURE]: 'Signature'
  };
  return labels[type] || type;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Export for global access
window.blueprintModule = {
  updateFieldLabel,
  updateFieldRequired,
  removeField,
  confirmDelete
};
