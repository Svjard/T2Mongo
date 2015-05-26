SELECT OrderID, CustomerID, Order, DiscountCode, Total, CAST(CAST(Created AS DATE FORMAT 'YYYY-MM-DD') AS VARCHAR(50))
FROM "MyECommerce"."tdOrder"
WHERE created BETWEEN DATE '2015-05-01' AND DATE '2015-06-02' AND status = 'incomplete'
ORDER BY created ASC;