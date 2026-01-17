// Contract Module - Contract Creation and Viewing

import { getBlueprintById } from './storage.js';
import { addContract, getContractById, updateContract, deleteContract } from './storage.js';
import { createContract, validateContract, FIELD_TYPES, formatDateTime, getStatusBadgeClass, isContractLocked } from './models.js';
import { getLifecycleActions, getLifecycleSteps, transitionContract } from './lifecycle.js';

/**
 * Initialize create contract page
 */
export function initCreateContractPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const blueprintId = urlParams.get('blueprintId');
  
  if (!blueprintId) {
    showError('No blueprint selected. Please select a blueprint from the blueprints page.');
    return;
  }
  
  const blueprint = getBlueprintById(blueprintId);
  
  if (!blueprint) {
    showError('Blueprint not found.');
    return;
  }
  
  renderContractForm(blueprint);
  setupContractFormListeners(blueprint);
}

/**
 * Render contract creation form
 */
function renderContractForm(blueprint) {
  const container = document.getElementById('contractFormContainer');
  if (!container) return;
  
  container.innerHTML = `
    <div class="form-section">
      <div class="form-section-header">
        <h3 class="form-section-title">Create Contract from: ${escapeHtml(blueprint.name)}</h3>
        <p class="form-section-description">Fill in all required fields to generate your contract</p>
      </div>
      
      <form id="contractForm">
        <div class="form-group">
          <label class="form-label form-label-required">Contract Name</label>
          <input 
            type="text" 
            class="form-input" 
            id="contractName"
            placeholder="e.g., John Doe - Employment Contract"
            required
          >
          <div class="form-hint">Give this contract a unique, descriptive name</div>
        </div>
        
        ${blueprint.fields.map(field => renderFieldInput(field)).join('')}
        
        <div class="flex gap-md mt-lg">
          <button type="submit" class="btn btn-primary">Create Contract</button>
          <a href="blueprint.html" class="btn btn-outline">Cancel</a>
        </div>
      </form>
    </div>
  `;
}

/**
 * Render individual field input
 */
function renderFieldInput(field) {
  const requiredClass = field.required ? 'form-label-required' : '';
  const requiredAttr = field.required ? 'required' : '';
  
  switch (field.type) {
    case FIELD_TYPES.TEXT:
      return `
        <div class="form-group">
          <label class="form-label ${requiredClass}">${escapeHtml(field.label)}</label>
          <input 
            type="text" 
            class="form-input" 
            name="field_${field.id}"
            ${requiredAttr}
          >
        </div>
      `;
    
    case FIELD_TYPES.DATE:
      return `
        <div class="form-group">
          <label class="form-label ${requiredClass}">${escapeHtml(field.label)}</label>
          <input 
            type="date" 
            class="form-input" 
            name="field_${field.id}"
            ${requiredAttr}
          >
        </div>
      `;
    
    case FIELD_TYPES.CHECKBOX:
      return `
        <div class="form-group">
          <label class="form-checkbox">
            <input 
              type="checkbox" 
              name="field_${field.id}"
            >
            <span>${escapeHtml(field.label)}</span>
          </label>
        </div>
      `;
    
    case FIELD_TYPES.SIGNATURE:
      return `
        <div class="form-group">
          <label class="form-label ${requiredClass}">${escapeHtml(field.label)}</label>
          <input 
            type="text" 
            class="form-input" 
            name="field_${field.id}"
            placeholder="Type signature name"
            ${requiredAttr}
          >
          <div class="form-hint">Type the name for the signature</div>
        </div>
      `;
    
    default:
      return '';
  }
}

/**
 * Setup contract form listeners
 */
function setupContractFormListeners(blueprint) {
  const form = document.getElementById('contractForm');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleContractFormSubmit(blueprint);
    });
  }
}

/**
 * Handle contract form submission
 */
function handleContractFormSubmit(blueprint) {
  const nameInput = document.getElementById('contractName');
  const name = nameInput.value.trim();
  
  // Collect field values
  const fieldValues = {};
  blueprint.fields.forEach(field => {
    const input = document.querySelector(`[name="field_${field.id}"]`);
    if (input) {
      if (field.type === FIELD_TYPES.CHECKBOX) {
        fieldValues[field.id] = input.checked;
      } else {
        fieldValues[field.id] = input.value;
      }
    }
  });
  
  // Validate
  const errors = validateContract(name, fieldValues, blueprint.fields);
  
  if (errors.length > 0) {
    alert('Please fix the following errors:\n\n' + errors.join('\n'));
    return;
  }
  
  // Create contract
  const contract = createContract(name, blueprint.id, blueprint.name, fieldValues);
  addContract(contract);
  
  // Redirect to contract view
  window.location.href = `contract.html?id=${contract.id}`;
}

/**
 * Initialize contract view page
 */
export function initContractViewPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const contractId = urlParams.get('id');
  
  if (!contractId) {
    showError('No contract specified.');
    return;
  }
  
  loadContract(contractId);
}

/**
 * Load and display contract
 */
function loadContract(contractId) {
  const contract = getContractById(contractId);
  
  if (!contract) {
    showError('Contract not found.');
    return;
  }
  
  const blueprint = getBlueprintById(contract.blueprintId);
  
  if (!blueprint) {
    showError('Blueprint not found for this contract.');
    return;
  }
  
  renderContract(contract, blueprint);
  renderLifecycleControls(contract);
  setupContractViewListeners(contract);
}

/**
 * Render contract view
 */
function renderContract(contract, blueprint) {
  const container = document.getElementById('contractView');
  if (!container) return;
  
  const isLocked = isContractLocked(contract.status);
  
  container.innerHTML = `
    <div class="contract-preview">
      <div class="contract-header">
        <h1 class="contract-title">${escapeHtml(contract.name)}</h1>
        <p class="contract-subtitle">Based on: ${escapeHtml(blueprint.name)}</p>
        <div class="flex-center gap-md mb-md">
          <span class="badge ${getStatusBadgeClass(contract.status)}">${contract.status}</span>
        </div>
        <div class="text-muted" style="font-size: 0.875rem;">
          Created: ${formatDateTime(contract.createdAt)} | Last Updated: ${formatDateTime(contract.updatedAt)}
        </div>
      </div>
      
      ${blueprint.fields.map(field => renderContractField(field, contract.fieldValues[field.id], isLocked)).join('')}
    </div>
  `;
}

/**
 * Render contract field
 */
function renderContractField(field, value, isLocked) {
  let displayValue = value;
  
  if (field.type === FIELD_TYPES.CHECKBOX) {
    displayValue = value ? '✓ Yes' : '✗ No';
  } else if (field.type === FIELD_TYPES.SIGNATURE) {
    displayValue = value ? `${value} _______________` : '[Not signed]';
  } else if (!value) {
    displayValue = '[Not provided]';
  }
  
  const lockedClass = isLocked ? 'locked' : '';
  
  return `
    <div class="contract-field">
      <div class="contract-field-label">${escapeHtml(field.label)}</div>
      <div class="contract-field-value ${lockedClass}">${escapeHtml(String(displayValue))}</div>
    </div>
  `;
}

/**
 * Render lifecycle controls
 */
function renderLifecycleControls(contract) {
  const container = document.getElementById('lifecycleControls');
  if (!container) return;
  
  const actions = getLifecycleActions(contract);
  const steps = getLifecycleSteps(contract.status);
  const isLocked = isContractLocked(contract.status);
  
  container.innerHTML = `
    <div class="lifecycle-controls">
      <div class="lifecycle-header">
        <h3>Contract Lifecycle</h3>
        ${isLocked ? '<div class="alert alert-info">🔒 This contract is locked and cannot be modified.</div>' : ''}
      </div>
      
      <div class="lifecycle-status mb-lg">
        <span class="badge ${getStatusBadgeClass(contract.status)}">${contract.status}</span>
      </div>
      
      <div class="lifecycle-timeline">
        ${steps.map(step => `
          <div class="lifecycle-step ${step.active ? 'active' : ''} ${step.completed ? 'completed' : ''}">
            <div class="lifecycle-step-circle">${step.completed ? '✓' : ''}</div>
            <div class="lifecycle-step-label">${step.label}</div>
          </div>
        `).join('')}
      </div>
      
      ${actions.length > 0 ? `
        <div class="lifecycle-actions">
          ${actions.map(action => `
            <button 
              class="btn ${action.class}" 
              onclick="window.contractModule.handleLifecycleAction('${contract.id}', '${action.status}')"
            >
              ${action.label}
            </button>
          `).join('')}
        </div>
      ` : '<p class="text-muted">No actions available for this contract.</p>'}
      
      <div class="flex gap-md mt-lg">
        <a href="dashboard.html" class="btn btn-outline">Back to Dashboard</a>
        ${!isLocked ? `
          <button 
            class="btn btn-danger" 
            onclick="window.contractModule.handleDelete('${contract.id}')"
          >
            Delete Contract
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

/**
 * Setup contract view listeners
 */
function setupContractViewListeners(contract) {
  // Listeners are handled via onclick attributes for simplicity
}

/**
 * Handle lifecycle action
 */
export function handleLifecycleAction(contractId, newStatus) {
  const contract = getContractById(contractId);
  
  if (!contract) {
    alert('Contract not found.');
    return;
  }
  
  try {
    transitionContract(contract, newStatus);
    // Reload the page to show updated status
    window.location.reload();
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

/**
 * Handle contract delete
 */
export function handleDelete(contractId) {
  if (confirm('Are you sure you want to delete this contract?\n\nThis action cannot be undone.')) {
    deleteContract(contractId);
    window.location.href = 'dashboard.html';
  }
}

/**
 * Show error message
 */
function showError(message) {
  const main = document.querySelector('main');
  if (main) {
    main.innerHTML = `
      <div class="container container-sm">
        <div class="alert alert-danger">
          <strong>Error:</strong> ${escapeHtml(message)}
        </div>
        <a href="dashboard.html" class="btn btn-primary">Go to Dashboard</a>
      </div>
    `;
  }
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
window.contractModule = {
  handleLifecycleAction,
  handleDelete
};
