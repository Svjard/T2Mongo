SELECT b."name", b.description, CAST(CAST(b."start" AS DATE FORMAT 'YYYY-MM-DD') AS VARCHAR(50)), CAST(CAST(b."end" AS DATE FORMAT 'YYYY-MM-DD') AS VARCHAR(50)), a.code, a.amount
FROM "MyECommerce"."tdDiscount" a
JOIN "MyECommerce"."tdMarketingCampaign" b
ON a.campaignId = b.campaignId 
WHERE b.id = 32516;