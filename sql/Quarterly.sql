SELECT
TRIM(EXTRACT(year from created)) || '-' || TRIM(EXTRACT(month from created)) as OrderDate,
COUNT (*)
FROM "MyECommerce"."tdOrder"
WHERE created BETWEEN DATE '2015-01-01' AND DATE '2015-06-02'
GROUP BY TRIM(EXTRACT(year from created)) || '-' || TRIM(EXTRACT(month from created))
ORDER BY OrderDate ASC;

SELECT
TRIM(EXTRACT(year from created)) || '-' || TRIM(EXTRACT(month from created)) as OrderDate,
SUM (total)
FROM "MyECommerce"."tdOrder"
WHERE created BETWEEN DATE '2015-01-01' AND DATE '2015-06-02'
GROUP BY TRIM(EXTRACT(year from created)) || '-' || TRIM(EXTRACT(month from created))
ORDER BY OrderDate ASC;