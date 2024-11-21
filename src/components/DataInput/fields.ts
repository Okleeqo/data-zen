// Field definitions for each module's data input

export const getFieldsForModule = (module: string) => {
  switch (module) {
    case 'dashboard':
      return [
        {
          name: 'revenue',
          label: 'Revenue',
          type: 'number',
          placeholder: 'Enter total revenue'
        },
        {
          name: 'profit',
          label: 'Profit',
          type: 'number',
          placeholder: 'Enter total profit'
        },
        {
          name: 'activeUsers',
          label: 'Active Users',
          type: 'number',
          placeholder: 'Enter number of active users'
        },
        {
          name: 'conversionRate',
          label: 'Conversion Rate (%)',
          type: 'number',
          placeholder: 'Enter conversion rate'
        }
      ];

    case 'cashflow':
      return [
        {
          name: 'inflow',
          label: 'Cash Inflow',
          type: 'number',
          placeholder: 'Enter cash inflow amount'
        },
        {
          name: 'outflow',
          label: 'Cash Outflow',
          type: 'number',
          placeholder: 'Enter cash outflow amount'
        },
        {
          name: 'category',
          label: 'Category',
          type: 'text',
          placeholder: 'Enter transaction category'
        }
      ];

    case 'kpi':
      return [
        {
          name: 'cac',
          label: 'Customer Acquisition Cost',
          type: 'number',
          placeholder: 'Enter CAC'
        },
        {
          name: 'ltv',
          label: 'Customer Lifetime Value',
          type: 'number',
          placeholder: 'Enter LTV'
        },
        {
          name: 'roas',
          label: 'Return on Ad Spend',
          type: 'number',
          placeholder: 'Enter ROAS'
        },
        {
          name: 'churnRate',
          label: 'Churn Rate (%)',
          type: 'number',
          placeholder: 'Enter churn rate'
        }
      ];

    case 'uniteconomics':
      return [
        {
          name: 'revenuePerUnit',
          label: 'Revenue Per Unit',
          type: 'number',
          placeholder: 'Enter revenue per unit'
        },
        {
          name: 'costPerUnit',
          label: 'Cost Per Unit',
          type: 'number',
          placeholder: 'Enter cost per unit'
        },
        {
          name: 'units',
          label: 'Number of Units',
          type: 'number',
          placeholder: 'Enter number of units'
        }
      ];

    default:
      return [];
  }
};