COLLECT STATISTICS INDEX ("categoryID") ON "MyECommerce"."tdCategory";

CREATE INDEX ("username") ON "MyECommerce"."tdCustomer";
COLLECT STATISTICS INDEX ("customerID") ON "MyECommerce"."tdCustomer";
COLLECT STATISTICS INDEX ("username") ON "MyECommerce"."tdCustomer";

COLLECT STATISTICS INDEX ("productID") ON "MyECommerce"."tdProduct";

CREATE INDEX ("productID") ON "MyECommerce"."tdSKU";
COLLECT STATISTICS INDEX ("skuID") ON "MyECommerce"."tdSKU";
COLLECT STATISTICS INDEX ("productID") ON "MyECommerce"."tdSKU";

COLLECT STATISTICS INDEX ("campaignID") ON "MyECommerce"."tdMarketingCampaign";

CREATE INDEX ("campaignID") ON "MyECommerce"."tdDiscount";
CREATE INDEX ("code") ON "MyECommerce"."tdDiscount";
COLLECT STATISTICS INDEX ("discountID") ON "MyECommerce"."tdDiscount";
COLLECT STATISTICS INDEX ("campaignID") ON "MyECommerce"."tdDiscount";
COLLECT STATISTICS INDEX ("code") ON "MyECommerce"."tdDiscount";

COLLECT STATISTICS INDEX ("orderID", "productID") ON "MyECommerce"."tdOrderItem";

CREATE INDEX ("customerID") ON "MyECommerce"."tdOrder";
CREATE INDEX ("discountCode") ON "MyECommerce"."tdOrder";
CREATE INDEX ("trackingCode") ON "MyECommerce"."tdOrder";
COLLECT STATISTICS INDEX ("orderID") ON "MyECommerce"."tdOrder";
COLLECT STATISTICS INDEX ("customerID") ON "MyECommerce"."tdOrder";
COLLECT STATISTICS INDEX ("discountCode") ON "MyECommerce"."tdDiscount";
COLLECT STATISTICS INDEX ("trackingCode") ON "MyECommerce"."tdDiscount";