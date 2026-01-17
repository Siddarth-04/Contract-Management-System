// Dashboard Module - Contract Tracking and Filtering

import { getContracts, deleteContract } from './storage.js';
import { CONTRACT_STATUS, formatDate, getStatusBadgeClass } from './models.js';

let activeFilter = null;
let searchQuery = '';
let statusFilter = 'all';

/**
 * Initialize dashboard page
 */
export function initDashboardPage() {
  loadDashboard();
  setupDashboardListeners();
}

/**
 * Load dashboard with stats and contracts
 */
function loadDashboard() {
  const contracts = getContracts();
  
  renderStats(contracts);
  renderContractsTable(contracts);
}

/**
 * Calculate and render statistics
 */
function renderStats(contracts) {
  const total = contracts.length;
  
  // Active: CREATED, APPROVED, SENT
  const active = contracts.filter(c => 
    c.status === CONTRACT_STATUS.CREATED || 
    c.status === CONTRACT_STATUS.APPROVED || 
    c.status === CONTRACT_STATUS.SENT
  ).length;
  
  // Signed: SIGNED, LOCKED
  const signed = contracts.filter(c => 
    c.status === CONTRACT_STATUS.SIGNED || 
    c.status === CONTRACT_STATUS.LOCKED
  ).length;
  
  // Pending: CREATED, APPROVED
  const pending = contracts.filter(c => 
    c.status === CONTRACT_STATUS.CREATED || 
    c.status === CONTRACT_STATUS.APPROVED
  ).length;
  
  const statsContainer = document.getElementById('statsCards');
  if (!statsContainer) return;
  
  statsContainer.innerHTML = `
    <div class="stat-card ${activeFilter === 'total' ? 'active' : ''}" onclick="window.dashboardModule.filterByGroup('total')">
      <div class="stat-label">Total Contracts</div>
      <div class="stat-value">${total}</div>
      <div class="stat-trend">All contracts</div>
    </div>
    
    <div class="stat-card ${activeFilter === 'active' ? 'active' : ''}" onclick="window.dashboardModule.filterByGroup('active')">
      <div class="stat-label">Active</div>
      <div class="stat-value">${active}</div>
      <div class="stat-trend">In progress</div>
    </div>
    
    <div class="stat-card ${activeFilter === 'signed' ? 'active' : ''}" onclick="window.dashboardModule.filterByGroup('signed')">
      <div class="stat-label">Signed</div>
      <div class="stat-value">${signed}</div>
      <div class="stat-trend">Completed</div>
    </div>
    
    <div class="stat-card ${activeFilter === 'pending' ? 'active' : ''}" onclick="window.dashboardModule.filterByGroup('pending')">
      <div class="stat-label">Pending</div>
      <div class="stat-value">${pending}</div>
      <div class="stat-trend">Awaiting action</div>
    </div>
  `;
}

/**
 * Render contracts table
 */
function renderContractsTable(allContracts) {
  const tableBody = document.getElementById('contractsTableBody');
  if (!tableBody) return;
  
  // Apply filters
  let contracts = filterContracts(allContracts);
  
  if (contracts.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 3rem;">
          <div class="empty-state">
            <div class="empty-state-icon">📄</div>
            <h3>No Contracts Found</h3>
            <p>${allContracts.length === 0 ? 'Create your first contract to get started' : 'Try adjusting your filters'}</p>
            ${allContracts.length === 0 ? '<a href="blueprint.html" class="btn btn-primary mt-lg">Create Blueprint</a>' : ''}
          </div>
        </td>
      </tr>
    `;
    return;
  }
  
  // Sort by most recent
  contracts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  
  tableBody.innerHTML = contracts.map(contract => `
    <tr>
      <td>
        <div class="table-name">${escapeHtml(contract.name)}</div>
        <div class="table-meta">${escapeHtml(contract.blueprintName)}</div>
      </td>
      <td>
        <span class="badge ${getStatusBadgeClass(contract.status)}">${contract.status}</span>
      </td>
      <td>${formatDate(contract.createdAt)}</td>
      <td>${formatDate(contract.updatedAt)}</td>
      <td>
        <div class="table-actions">
          <a href="contract.html?id=${contract.id}" class="btn btn-primary btn-sm">View</a>
          <button 
            class="btn btn-danger btn-sm" 
            onclick="window.dashboardModule.handleDelete('${contract.id}', '${escapeHtml(contract.name)}')"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

/**
 * Filter contracts based on active filters
 */
function filterContracts(contracts) {
  let filtered = [...contracts];
  
  // Apply group filter
  if (activeFilter) {
    filtered = filtered.filter(contract => {
      switch (activeFilter) {
        case 'total':
          return true;
        case 'active':
          return [CONTRACT_STATUS.CREATED, CONTRACT_STATUS.APPROVED, CONTRACT_STATUS.SENT].includes(contract.status);
        case 'signed':
          return [CONTRACT_STATUS.SIGNED, CONTRACT_STATUS.LOCKED].includes(contract.status);
        case 'pending':
          return [CONTRACT_STATUS.CREATED, CONTRACT_STATUS.APPROVED].includes(contract.status);
        default:
          return true;
      }
    });
  }
  
  // Apply status dropdown filter
  if (statusFilter && statusFilter !== 'all') {
    filtered = filtered.filter(contract => contract.status === statusFilter);
  }
  
  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(contract => 
      contract.name.toLowerCase().includes(query) ||
      contract.blueprintName.toLowerCase().includes(query)
    );
  }
  
  return filtered;
}

/**
 * Setup dashboard event listeners
 */
function setupDashboardListeners() {
  const searchInput = document.getElementById('searchInput');
  const statusSelect = document.getElementById('statusFilter');
  const clearFiltersBtn = document.getElementById('clearFilters');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      loadDashboard();
    });
  }
  
  if (statusSelect) {
    statusSelect.addEventListener('change', (e) => {
      statusFilter = e.target.value;
      loadDashboard();
    });
  }
  
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
      clearFilters();
    });
  }
}

/**
 * Filter by stat group
 */
export function filterByGroup(group) {
  // Toggle filter if clicking the same group
  if (activeFilter === group) {
    activeFilter = null;
  } else {
    activeFilter = group;
  }
  
  loadDashboard();
}

/**
 * Clear all filters
 */
function clearFilters() {
  activeFilter = null;
  searchQuery = '';
  statusFilter = 'all';
  
  const searchInput = document.getElementById('searchInput');
  const statusSelect = document.getElementById('statusFilter');
  
  if (searchInput) searchInput.value = '';
  if (statusSelect) statusSelect.value = 'all';
  
  loadDashboard();
}

/**
 * Handle contract delete
 */
export function handleDelete(contractId, contractName) {
  if (confirm(`Are you sure you want to delete "${contractName}"?\n\nThis action cannot be undone.`)) {
    deleteContract(contractId);
    loadDashboard();
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
window.dashboardModule = {
  filterByGroup,
  handleDelete
};
