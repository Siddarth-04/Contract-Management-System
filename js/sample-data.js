// Sample Data - Initial blueprints and contracts for demonstration

import { getBlueprints, getContracts, saveBlueprints, saveContracts } from './storage.js';
import { CONTRACT_STATUS, FIELD_TYPES, generateId } from './models.js';

export function initializeSampleData() {
  // Only initialize if no data exists
  if (getBlueprints().length > 0 || getContracts().length > 0) {
    return;
  }
  
  const now = new Date().toISOString();
  
  // Sample Blueprints
  const blueprints = [
    {
      id: generateId(),
      name: 'Employment Agreement',
      fields: [
        {
          id: generateId(),
          label: 'Employee Name',
          type: FIELD_TYPES.TEXT,
          required: true
        },
        {
          id: generateId(),
          label: 'Position',
          type: FIELD_TYPES.TEXT,
          required: true
        },
        {
          id: generateId(),
          label: 'Start Date',
          type: FIELD_TYPES.DATE,
          required: true
        },
        {
          id: generateId(),
          label: 'Salary',
          type: FIELD_TYPES.TEXT,
          required: true
        },
        {
          id: generateId(),
          label: 'Benefits Included',
          type: FIELD_TYPES.CHECKBOX,
          required: false
        },
        {
          id: generateId(),
          label: 'Employee Signature',
          type: FIELD_TYPES.SIGNATURE,
          required: true
        },
        {
          id: generateId(),
          label: 'Employer Signature',
          type: FIELD_TYPES.SIGNATURE,
          required: true
        }
      ],
      createdAt: now,
      updatedAt: now
    },
    {
      id: generateId(),
      name: 'Non-Disclosure Agreement',
      fields: [
        {
          id: generateId(),
          label: 'Party Name',
          type: FIELD_TYPES.TEXT,
          required: true
        },
        {
          id: generateId(),
          label: 'Company Name',
          type: FIELD_TYPES.TEXT,
          required: true
        },
        {
          id: generateId(),
          label: 'Effective Date',
          type: FIELD_TYPES.DATE,
          required: true
        },
        {
          id: generateId(),
          label: 'Termination Date',
          type: FIELD_TYPES.DATE,
          required: false
        },
        {
          id: generateId(),
          label: 'Mutual Agreement',
          type: FIELD_TYPES.CHECKBOX,
          required: false
        },
        {
          id: generateId(),
          label: 'Party Signature',
          type: FIELD_TYPES.SIGNATURE,
          required: true
        }
      ],
      createdAt: now,
      updatedAt: now
    },
    {
      id: generateId(),
      name: 'Service Agreement',
      fields: [
        {
          id: generateId(),
          label: 'Client Name',
          type: FIELD_TYPES.TEXT,
          required: true
        },
        {
          id: generateId(),
          label: 'Service Description',
          type: FIELD_TYPES.TEXT,
          required: true
        },
        {
          id: generateId(),
          label: 'Service Fee',
          type: FIELD_TYPES.TEXT,
          required: true
        },
        {
          id: generateId(),
          label: 'Start Date',
          type: FIELD_TYPES.DATE,
          required: true
        },
        {
          id: generateId(),
          label: 'End Date',
          type: FIELD_TYPES.DATE,
          required: false
        },
        {
          id: generateId(),
          label: 'Auto-Renewal',
          type: FIELD_TYPES.CHECKBOX,
          required: false
        },
        {
          id: generateId(),
          label: 'Client Signature',
          type: FIELD_TYPES.SIGNATURE,
          required: true
        }
      ],
      createdAt: now,
      updatedAt: now
    }
  ];
  
  // Sample Contracts
  const employmentBp = blueprints[0];
  const ndaBp = blueprints[1];
  const serviceBp = blueprints[2];
  
  const contracts = [
    // Employment Contracts
    {
      id: generateId(),
      name: 'John Doe - Software Engineer',
      blueprintId: employmentBp.id,
      blueprintName: employmentBp.name,
      fieldValues: {
        [employmentBp.fields[0].id]: 'John Doe',
        [employmentBp.fields[1].id]: 'Senior Software Engineer',
        [employmentBp.fields[2].id]: '2024-01-15',
        [employmentBp.fields[3].id]: '$120,000',
        [employmentBp.fields[4].id]: true,
        [employmentBp.fields[5].id]: 'John Doe',
        [employmentBp.fields[6].id]: 'HR Manager'
      },
      status: CONTRACT_STATUS.LOCKED,
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      name: 'Jane Smith - Product Manager',
      blueprintId: employmentBp.id,
      blueprintName: employmentBp.name,
      fieldValues: {
        [employmentBp.fields[0].id]: 'Jane Smith',
        [employmentBp.fields[1].id]: 'Product Manager',
        [employmentBp.fields[2].id]: '2024-02-01',
        [employmentBp.fields[3].id]: '$135,000',
        [employmentBp.fields[4].id]: true,
        [employmentBp.fields[5].id]: 'Jane Smith',
        [employmentBp.fields[6].id]: 'HR Manager'
      },
      status: CONTRACT_STATUS.SIGNED,
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      name: 'Alice Johnson - UX Designer',
      blueprintId: employmentBp.id,
      blueprintName: employmentBp.name,
      fieldValues: {
        [employmentBp.fields[0].id]: 'Alice Johnson',
        [employmentBp.fields[1].id]: 'UX Designer',
        [employmentBp.fields[2].id]: '2024-03-01',
        [employmentBp.fields[3].id]: '$105,000',
        [employmentBp.fields[4].id]: true,
        [employmentBp.fields[5].id]: 'Alice Johnson',
        [employmentBp.fields[6].id]: 'HR Manager'
      },
      status: CONTRACT_STATUS.SENT,
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      name: 'Bob Williams - DevOps Engineer',
      blueprintId: employmentBp.id,
      blueprintName: employmentBp.name,
      fieldValues: {
        [employmentBp.fields[0].id]: 'Bob Williams',
        [employmentBp.fields[1].id]: 'DevOps Engineer',
        [employmentBp.fields[2].id]: '2024-03-15',
        [employmentBp.fields[3].id]: '$115,000',
        [employmentBp.fields[4].id]: true,
        [employmentBp.fields[5].id]: 'Bob Williams',
        [employmentBp.fields[6].id]: 'HR Manager'
      },
      status: CONTRACT_STATUS.APPROVED,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      name: 'Carol Martinez - Data Analyst',
      blueprintId: employmentBp.id,
      blueprintName: employmentBp.name,
      fieldValues: {
        [employmentBp.fields[0].id]: 'Carol Martinez',
        [employmentBp.fields[1].id]: 'Data Analyst',
        [employmentBp.fields[2].id]: '2024-04-01',
        [employmentBp.fields[3].id]: '$95,000',
        [employmentBp.fields[4].id]: true,
        [employmentBp.fields[5].id]: '',
        [employmentBp.fields[6].id]: ''
      },
      status: CONTRACT_STATUS.CREATED,
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      name: 'David Chen - Backend Developer',
      blueprintId: employmentBp.id,
      blueprintName: employmentBp.name,
      fieldValues: {
        [employmentBp.fields[0].id]: 'David Chen',
        [employmentBp.fields[1].id]: 'Backend Developer',
        [employmentBp.fields[2].id]: '2024-04-15',
        [employmentBp.fields[3].id]: '$110,000',
        [employmentBp.fields[4].id]: true,
        [employmentBp.fields[5].id]: 'David Chen',
        [employmentBp.fields[6].id]: 'HR Manager'
      },
      status: CONTRACT_STATUS.LOCKED,
      createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      name: 'Emma Wilson - Marketing Manager',
      blueprintId: employmentBp.id,
      blueprintName: employmentBp.name,
      fieldValues: {
        [employmentBp.fields[0].id]: 'Emma Wilson',
        [employmentBp.fields[1].id]: 'Marketing Manager',
        [employmentBp.fields[2].id]: '2024-05-01',
        [employmentBp.fields[3].id]: '$125,000',
        [employmentBp.fields[4].id]: true,
        [employmentBp.fields[5].id]: 'Emma Wilson',
        [employmentBp.fields[6].id]: 'HR Manager'
      },
      status: CONTRACT_STATUS.SIGNED,
      createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 48 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      name: 'Frank Garcia - QA Engineer',
      blueprintId: employmentBp.id,
      blueprintName: employmentBp.name,
      fieldValues: {
        [employmentBp.fields[0].id]: 'Frank Garcia',
        [employmentBp.fields[1].id]: 'QA Engineer',
        [employmentBp.fields[2].id]: '2024-05-15',
        [employmentBp.fields[3].id]: '$90,000',
        [employmentBp.fields[4].id]: false,
        [employmentBp.fields[5].id]: '',
        [employmentBp.fields[6].id]: ''
      },
      status: CONTRACT_STATUS.CREATED,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    
    // NDA Contracts
    {
      id: generateId(),
      name: 'TechCorp NDA - Q1 2024',
      blueprintId: ndaBp.id,
      blueprintName: ndaBp.name,
      fieldValues: {
        [ndaBp.fields[0].id]: 'TechCorp Inc.',
        [ndaBp.fields[1].id]: 'ContractFlow Solutions',
        [ndaBp.fields[2].id]: '2024-01-01',
        [ndaBp.fields[3].id]: '2025-01-01',
        [ndaBp.fields[4].id]: true,
        [ndaBp.fields[5].id]: 'Legal Representative'
      },
      status: CONTRACT_STATUS.LOCKED,
      createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 95 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      name: 'InnovateLabs Confidentiality Agreement',
      blueprintId: ndaBp.id,
      blueprintName: ndaBp.name,
      fieldValues: {
        [ndaBp.fields[0].id]: 'InnovateLabs Ltd.',
        [ndaBp.fields[1].id]: 'ContractFlow Solutions',
        [ndaBp.fields[2].id]: '2024-02-15',
        [ndaBp.fields[3].id]: '2025-02-15',
        [ndaBp.fields[4].id]: true,
        [ndaBp.fields[5].id]: 'CEO Signature'
      },
      status: CONTRACT_STATUS.SIGNED,
      createdAt: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 78 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      name: 'StartupXYZ Partnership NDA',
      blueprintId: ndaBp.id,
      blueprintName: ndaBp.name,
      fieldValues: {
        [ndaBp.fields[0].id]: 'StartupXYZ',
        [ndaBp.fields[1].id]: 'ContractFlow Solutions',
        [ndaBp.fields[2].id]: '2024-03-10',
        [ndaBp.fields[3].id]: '2024-12-31',
        [ndaBp.fields[4].id]: false,
        [ndaBp.fields[5].id]: 'Partner Representative'
      },
      status: CONTRACT_STATUS.SENT,
      createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      name: 'GlobalTech Mutual NDA',
      blueprintId: ndaBp.id,
      blueprintName: ndaBp.name,
      fieldValues: {
        [ndaBp.fields[0].id]: 'GlobalTech Corp',
        [ndaBp.fields[1].id]: 'ContractFlow Solutions',
        [ndaBp.fields[2].id]: '2024-04-01',
        [ndaBp.fields[3].id]: '',
        [ndaBp.fields[4].id]: true,
        [ndaBp.fields[5].id]: ''
      },
      status: CONTRACT_STATUS.APPROVED,
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      name: 'VentureCapital NDA - Due Diligence',
      blueprintId: ndaBp.id,
      blueprintName: ndaBp.name,
      fieldValues: {
        [ndaBp.fields[0].id]: 'VentureCapital Partners',
        [ndaBp.fields[1].id]: 'ContractFlow Solutions',
        [ndaBp.fields[2].id]: '2024-05-01',
        [ndaBp.fields[3].id]: '2024-08-01',
        [ndaBp.fields[4].id]: false,
        [ndaBp.fields[5].id]: ''
      },
      status: CONTRACT_STATUS.CREATED,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    },
    
    // Service Agreement Contracts
    {
      id: generateId(),
      name: 'Acme Corp - Web Development Services',
      blueprintId: serviceBp.id,
      blueprintName: serviceBp.name,
      fieldValues: {
        [serviceBp.fields[0].id]: 'Acme Corporation',
        [serviceBp.fields[1].id]: 'Full-stack web application development',
        [serviceBp.fields[2].id]: '$50,000',
        [serviceBp.fields[3].id]: '2024-01-15',
        [serviceBp.fields[4].id]: '2024-06-15',
        [serviceBp.fields[5].id]: false,
        [serviceBp.fields[6].id]: 'Acme Representative'
      },
      status: CONTRACT_STATUS.LOCKED,
      createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 115 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      name: 'BlueSky Consulting - IT Infrastructure',
      blueprintId: serviceBp.id,
      blueprintName: serviceBp.name,
      fieldValues: {
        [serviceBp.fields[0].id]: 'BlueSky Consulting',
        [serviceBp.fields[1].id]: 'IT infrastructure setup and maintenance',
        [serviceBp.fields[2].id]: '$75,000',
        [serviceBp.fields[3].id]: '2024-02-01',
        [serviceBp.fields[4].id]: '2025-02-01',
        [serviceBp.fields[5].id]: true,
        [serviceBp.fields[6].id]: 'BlueSky Manager'
      },
      status: CONTRACT_STATUS.SIGNED,
      createdAt: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 62 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      name: 'Creative Studios - Brand Design',
      blueprintId: serviceBp.id,
      blueprintName: serviceBp.name,
      fieldValues: {
        [serviceBp.fields[0].id]: 'Creative Studios LLC',
        [serviceBp.fields[1].id]: 'Complete brand identity and design package',
        [serviceBp.fields[2].id]: '$35,000',
        [serviceBp.fields[3].id]: '2024-03-01',
        [serviceBp.fields[4].id]: '2024-05-31',
        [serviceBp.fields[5].id]: false,
        [serviceBp.fields[6].id]: 'Creative Director'
      },
      status: CONTRACT_STATUS.SENT,
      createdAt: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      name: 'DataInsight - Analytics Platform',
      blueprintId: serviceBp.id,
      blueprintName: serviceBp.name,
      fieldValues: {
        [serviceBp.fields[0].id]: 'DataInsight Analytics',
        [serviceBp.fields[1].id]: 'Custom analytics dashboard development',
        [serviceBp.fields[2].id]: '$60,000',
        [serviceBp.fields[3].id]: '2024-04-01',
        [serviceBp.fields[4].id]: '2024-09-30',
        [serviceBp.fields[5].id]: false,
        [serviceBp.fields[6].id]: ''
      },
      status: CONTRACT_STATUS.APPROVED,
      createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      name: 'EcoTech - Sustainability Consulting',
      blueprintId: serviceBp.id,
      blueprintName: serviceBp.name,
      fieldValues: {
        [serviceBp.fields[0].id]: 'EcoTech Solutions',
        [serviceBp.fields[1].id]: 'Environmental impact assessment and consulting',
        [serviceBp.fields[2].id]: '$45,000',
        [serviceBp.fields[3].id]: '2024-05-01',
        [serviceBp.fields[4].id]: '2024-12-31',
        [serviceBp.fields[5].id]: true,
        [serviceBp.fields[6].id]: ''
      },
      status: CONTRACT_STATUS.CREATED,
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      name: 'FinanceFirst - Accounting Services',
      blueprintId: serviceBp.id,
      blueprintName: serviceBp.name,
      fieldValues: {
        [serviceBp.fields[0].id]: 'FinanceFirst CPAs',
        [serviceBp.fields[1].id]: 'Monthly bookkeeping and tax preparation',
        [serviceBp.fields[2].id]: '$24,000',
        [serviceBp.fields[3].id]: '2024-01-01',
        [serviceBp.fields[4].id]: '2024-12-31',
        [serviceBp.fields[5].id]: true,
        [serviceBp.fields[6].id]: 'Senior Accountant'
      },
      status: CONTRACT_STATUS.LOCKED,
      createdAt: new Date(Date.now() - 130 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 125 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: generateId(),
      name: 'SecureNet - Cybersecurity Audit',
      blueprintId: serviceBp.id,
      blueprintName: serviceBp.name,
      fieldValues: {
        [serviceBp.fields[0].id]: 'SecureNet Security',
        [serviceBp.fields[1].id]: 'Comprehensive security audit and penetration testing',
        [serviceBp.fields[2].id]: '$40,000',
        [serviceBp.fields[3].id]: '2024-03-15',
        [serviceBp.fields[4].id]: '2024-06-15',
        [serviceBp.fields[5].id]: false,
        [serviceBp.fields[6].id]: 'Security Lead'
      },
      status: CONTRACT_STATUS.APPROVED,
      createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
  
  saveBlueprints(blueprints);
  saveContracts(contracts);
}
