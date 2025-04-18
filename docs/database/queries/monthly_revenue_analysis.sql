/*
  Monthly Revenue Analysis
  
  Purpose: Track revenue generation on a monthly basis
  Tables used: gl_invoices
  
  This query provides a monthly breakdown of:
  - Total number of invoices
  - Total revenue
  - Total payments received
  - Outstanding balance
  
  Results are ordered chronologically by year and month.
*/

SELECT
  EXTRACT(YEAR FROM invoice_order_date) AS year,
  EXTRACT(MONTH FROM invoice_order_date) AS month,
  TO_CHAR(invoice_order_date, 'Month') AS month_name,
  COUNT(*) AS invoice_count,
  SUM(total_amount) AS total_revenue,
  SUM(amount_paid) AS payments_received,
  SUM(total_amount - amount_paid) AS outstanding_balance
FROM
  gl_invoices
WHERE
  invoice_order_date >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '12 months')
  AND invoice_order_date < DATE_TRUNC('month', CURRENT_DATE + INTERVAL '1 month')
GROUP BY
  year, month, month_name
ORDER BY
  year, month;
  
/*
  Example Usage:
  
  - Modify the WHERE clause date range to analyze different time periods
  - Add additional filters like customer_id to focus on specific customers
  - Join with gl_accounts to get customer names in the results
  
  Example Extension (with customer breakdown):
  
  SELECT
    EXTRACT(YEAR FROM i.invoice_order_date) AS year,
    EXTRACT(MONTH FROM i.invoice_order_date) AS month,
    TO_CHAR(i.invoice_order_date, 'Month') AS month_name,
    a.account_name AS customer_name,
    COUNT(*) AS invoice_count,
    SUM(i.total_amount) AS total_revenue,
    SUM(i.amount_paid) AS payments_received,
    SUM(i.total_amount - i.amount_paid) AS outstanding_balance
  FROM
    gl_invoices i
    JOIN gl_accounts a ON i.customer_id = a.id
  WHERE
    i.invoice_order_date >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '12 months')
    AND i.invoice_order_date < DATE_TRUNC('month', CURRENT_DATE + INTERVAL '1 month')
    AND a.client_type = 'customer'
  GROUP BY
    year, month, month_name, customer_name
  ORDER BY
    year, month, total_revenue DESC;
*/ 