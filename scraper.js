var Promise = require('bluebird'),
    fs = require('fs'),
    _ = require('lodash'),
    request = Promise.promisify(require('request')),
    cheerio = require('cheerio'),
    Chance = require('chance'),
    uuid = require('node-uuid'),
    loremIpsum = require('lorem-ipsum');

var chance = new Chance();

var products = [], customers = [];

var search = [
  'http://www.dogsupplies.com/categories/Dog-Toys/',
  'http://www.dogsupplies.com/categories/Dog-Toys/?sort=featured&page=2',
  'http://www.dogsupplies.com/categories/Dog-Toys/?sort=featured&page=3',
  'http://www.dogsupplies.com/categories/Dog-Treats/?sort=featured&page=2',
  'http://www.dogsupplies.com/categories/Dog-Collars/',
  'http://www.dogsupplies.com/categories/Dog-Leads/Dog-Couplers/',
  'http://www.dogsupplies.com/categories/Dog-Leads/',
  'http://www.dogsupplies.com/categories/Aqua-Dog-Supplies/',
  'http://www.dogsupplies.com/categories/Dog-Travel/',
  'http://www.dogsupplies.com/categories/Dog-Bowls/',
  'http://www.dogsupplies.com/categories/Dog-Clothes/',
  'http://www.dogsupplies.com/categories/Dog-Clothes/',
  'http://www.dogsupplies.com/categories/Dog-Health/',
  'http://www.dogsupplies.com/categories/Dog-Crates/',
  'http://www.dogsupplies.com/categories/Dog-Food/'
];

function clientError(e) {
  return e.code >= 400 && e.code < 500;
}

// Q1 = Jan/Apr
// Q2 = May/Aug
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function uRandomCreated() {
  var l = new Date().getTime() - 31556900000;
  var rx = l - (chance.natural({ min: 1, max: 5 }) * 31556900000);

  return randomDate(new Date(rx), new Date(l)).getTime();
}

function uRandomLogin() {
  var l = new Date().getTime();
  var rx = l - (chance.natural({ min: 1, max: 6 }) * 2629740000);

  return randomDate(new Date(rx), new Date(l)).getTime();
}

function oRandomCreated(qtr) {
  var l;
  if (qtr === 0) {
    l = chance.natural({ min: new Date('2015-01-01T00:00:00').getTime(), max: new Date('2015-04-30T23:59:59').getTime() });
  }
  else if (qtr === 1) {
    l = chance.natural({ min: new Date('2015-05-01T00:00:00').getTime(), max: new Date('2015-05-31T23:59:59').getTime() });
  }

  return l;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setupProducts() {
  var id = 1, id2 = 1, i = 0;
  fs.truncateSync("tdProduct.sql", 0);
  fs.truncateSync("tdSKU.sql", 0);
  _.each(search, function(url) {
    request(url).then(function(contents) {
      var $ = cheerio.load(contents[1]);
      _.each($('.ProductList').find('.ProductDetails'), function(n) {
        request($(n).find('a').attr('href')).then(function(contents) {
          var t = cheerio.load(contents[1]);
          var uid = uuid.v4();
          var sku = t('.VariationProductSKU').text();
          var brand = t('.ProductBrand').find('.Value').find('a').text();
          var inventory = t('.VariationProductInventory').text();
          var price = t('.VariationProductPrice').text().replace('$', ''),
              cost = +price * ((100 - getRandomInt(3, 15)) / 100),
              retailPrice = t('.RetailPrice').find('strike').text().replace('$', '');
          var title = t('h1.ProductTitle').text();
          var weight = getRandomInt(1, 100);
          title = title.replace('\'', '\\\'').replace('"', '\"');

          products.push({ 'id': id, 'sku': sku, 'price': price, 'weight': weight, 'code': uid.substring(0, uid.indexOf('-')) });

          var query = 'INSERT INTO MyECommerce.tdProduct(' + id + ',\'' + uid.substring(0, uid.indexOf('-')) + '\',\'' + title + '\',\'' + loremIpsum({count: 5, units: 'words'}).split(' ').join(',') + '\',\'' + loremIpsum({count: 5, units: 'sentences'}) + '\',1,' + cost + ',' + price + ',' + retailPrice + ',' + weight + ',1,\'dummy.png\',NULL,NULL,NULL,NULL,NULL,' + getRandomInt(1, 71) + ',' + i + ');';
          fs.appendFileSync("tdProduct.sql", query + "\n");
          id++;
          i++;

          var query = 'INSERT INTO MyECommerce.tdSKU(' + id2 + ',' + id + ',\'' + sku + '\',NULL,NULL,NULL,1,' + inventory + ',NULL);';
          fs.appendFileSync("tdSKU.sql", query + "\n");
          id2++;

        }).catch(clientError, function(e) {
          // A client error like 400 Bad Request happened
        });
      });
    }).catch(clientError, function(e) {
      // A client error like 400 Bad Request happened
    });
  });
}

function setupCategories() {
  var id = 1;
  var categories = {
    'Dog Toys': ['Kong Toys', 'Nylabone Chews', 'Durable Toys', 'Fetch Toys', 'Small Breed', 'Tug Toys', 'Chew Toys', 'Squeaker Toys', 'Interactive'],
    'Dog Treats': ['Bully Sticks', 'Greenies', 'Rawhide Bones', 'Deer Antler Chews', 'Pig Ears', 'All Natural', 'Dog Training', 'Crunchy'],
    'Dog Harness': ['No Pull', 'Mesh'],
    'Dog Collars': ['Nylon', 'Leather', 'NCAA', 'NFL', 'Trendy', 'Training', 'Martingale'],
    'Dog Leads': ['Nylon', 'Slip', 'NCAA', 'NFL', 'Retractable', 'Leather'],
    'Dog Muzzles': [],
    'Dog Couplers': [],
    'Dog Life Jackets': [],
    'Dog Seat Covers': [],
    'Dog Carriers': [],
    'Dog Bowls': ['Raised Feeder', 'Three Bowl Feeder', 'Travel Bowl'],
    'Dog Clothes': ['Doggles Sunglasses', 'Thundershirt', 'Hair Bows', 'Costumes', 'Clothing Accessories'],
    'Dog Beds': ['Crate Beds', 'Orthopedic Beds', 'Elevated Cots'],
    'Dog Health': ['Flea Medications', 'Supplements', 'Pet Waste', 'Pee Pads', 'Dog Shampoo', 'Toothpaste & Dental', 'Nail Trimmers', 'Diapers', 'Brushes'],
    'Dog Crates': ['Empire Dog Crate', 'Soft Crates'],
    'Exercise Pens': [],
    'Dog Food': []
  };

  fs.truncateSync("tdCategory.sql", 0);

  _.each(_.keys(categories), function(n, i) {
    var uid = uuid.v4();
    var query = 'INSERT INTO MyECommerce.tdCategory(' + id + ',\'' + uid.substring(0, uid.indexOf('-')) + '\',\'' + n + '\',\'' + loremIpsum({count: 5, units: 'words'}).split(' ').join(',') + '\',\'' + loremIpsum({count: 5, units: 'sentences'}) + '\',1,\'dummy.png\',NULL,NULL,NULL,NULL,' + i + ');';
    // query
    fs.appendFileSync("tdCategory.sql", query + "\n");
    var parentId = id;
    id++;

    _.each(categories[n], function(m, j) {
      uid = uuid.v4();
      query = 'INSERT INTO MyECommerce.tdCategory(' + id + ',\'' + uid.substring(0, uid.indexOf('-')) + '\',\'' + m + '\',\'' + loremIpsum({count: 5, units: 'words'}).split(' ').join(',') + '\',\'' + loremIpsum({count: 5, units: 'sentences'}) + '\',1,\'dummy.png\',NULL,NULL,NULL,' + parentId + ',' + ((j * i) + j) + ');';
      fs.appendFileSync("tdCategory.sql", query + "\n");
      id++;
    });
  });
}

function setupCustomers() {
  var id = 1;
  fs.truncateSync("tdCustomer.sql", 0);

  var TOTAL_CUSTOMERS = 123000,
      //TOTAL_CUSTOMERS = 5,
      id = 1;
  _.each(_.range(TOTAL_CUSTOMERS), function(n) {
    var username = chance.twitter().replace('@', ''),
        password = chance.hash(),
        created = uRandomCreated(),
        lastLogin = uRandomLogin(),
        status = 'active',
        firstname = chance.first(),
        lastname = chance.last(),
        organization = chance.word(),
        address1 = chance.address(),
        address2 = 'NULL',
        city = chance.city(),
        state = chance.state(),
        country = chance.country({ full: true }),
        zip = chance.postal(),
        phonenumber1 = chance.phone(),
        phonenumber2 = chance.phone(),
        email = chance.email();

    customers.push({ 'id': id, 'username': username, 'firstname': firstname, 'lastname': lastname, 'organization': organization, 'address1': address1, 'address2': address2, 'city': city, 'state': state, 'zip': zip, 'country': country, 'phonenumber1': phonenumber1, 'phonenumber2': phonenumber2, 'email': email, 'orders': 0 });

    query = 'INSERT INTO MyECommerce.tdCustomer(' + id + ',\'' + 
      username + '\',\'' + 
      password + '\',cast(cast(700101 as date) + ' + 
      created + ' / 86400 as timestamp(6)) + (' + created + ' mod 86400) * interval \'00:00:01\' hour to second' + ',cast(cast(700101 as date) + ' + 
      lastLogin + ' / 86400 as timestamp(6)) + (' + lastLogin + ' mod 86400) * interval \'00:00:01\' hour to second,\'' +
      status + '\',\'' +
      firstname + '\',\'' +
      lastname + '\',\'' +
      organization + '\',\'' +
      address1 + '\',' +
      address2 + ',\'' +
      city + '\',\'' +
      state + '\',\'' +
      zip + '\',\'' +
      country + '\',\'' +
      phonenumber1 + '\',\'' +
      phonenumber2 + '\',\'' +
      email + '\',' +
      'NULL,NULL,NULL);';
    fs.appendFileSync("tdCustomer.sql", query + "\n");
    id++;
  });
}

function setupOrders() {
// - Qtr1 is between Jan 1 2015 and Apr 30 2015
// - Qtr2 is between May 1 2015 and Aug 31 2015
// - Qtr1 (120 days) had 84K orders totaling $1,051,600 in sales, avg order $18.1865
// - Qtr2 (32 days so far) has had 22400 so far totaling $187,885.87 which is 67% of current track

  var id = 1;
  fs.truncateSync("tdOrder.sql", 0);

  var TOTAL_ORDERS = 84000,
      id = 1; 
  _.each(_.range(TOTAL_ORDERS), function(n) {
    var created, total, discount, weight = 0;
    var status = 'completed';
    if (n <= 83999) {
      created = oRandomCreated(0);
      var items = chance.natural({ min: 1, max: 8 });
      var total = 0;
      _.each(_.range(items), function(i) {
        var qty = chance.weighted([1,2,3,4,5], [20, 10, 5, 2, 1]);
        var p = chance.natural({ min: 1, max: products.length });

        total += qty * products[p - 1].price;
        weight += qty * products[p - 1].weight;

        var queryi = 'INSERT INTO MyECommerce.tdOrderItem(' + id + ',' + p.id + ',' + qty + ');';
        fs.appendFileSync("tdOrderItem.sql", queryi + "\n");
      });
      
      totalQ1 += total;
      discount = 'foo';
    }
    /*else {
      created = oRandomCreated(1);
      var items = chance.natural({ min: 1, max: 8 });
      var total = 0;
      _.each(_.range(items), function(i) {
        var qty = chance.weighted([1,2,3,4,5], [20, 10, 5, 2, 1]);
        var p = chance.natural({ min: 1, max: products.length });

        total += qty * products[p - 1].price;
        weight += qty * products[p - 1].weight;

        var queryi = 'INSERT INTO MyECommerce.tdOrderItem(' + id + ',' + p.id + ',' + qty + ');';
        fs.appendFileSync("tdOrderItem.sql", queryi + "\n");
      });
      
      totalQ2 += total;

      var ch = chance.natural({min: 1, max: 100});
      if (ch < 68) {
        discount = 'foo';
      }
      else {
        discount = chance.word({length: 5});
        status = 'incomplete';
      }
    }*/

    var customer = chance.natural({min: 1, max: 123000}),
        order = customers[customer - 1].order++,
        tax = chance.floating({min: 0, max: 8.5, fixed: 2}) * total;

    query = 'INSERT INTO MyECommerce.tdOrder(' + id + ',' + 
      customer + ',' + 
      order + ',\'' + 
      discount + ',\'' +
      chance.guid() + '\',' +
      total + ',' +
      (0.32455 * weight) + ',' +
      tax + ',' +
      weight + ',cast(cast(700101 as date) + ' + 
      created + ' / 86400 as timestamp(6)) + (' + created + ' mod 86400) * interval \'00:00:01\' hour to second' + ',cast(cast(700101 as date) + ' + 
      created + ' / 86400 as timestamp(6)) + (' + created + ' mod 86400) * interval \'00:00:01\' hour to second,' +
      ((status === 'completed') ? 1 : 0) + ',\'' +
      status + '\',NULL,' +
      customers[customer - 1].firstname + '\',\'' +
      customers[customer - 1].lastname + '\',\'' +
      customers[customer - 1].organization + '\',\'' +
      customers[customer - 1].address1 + '\',' +
      customers[customer - 1].address2 + ',\'' +
      customers[customer - 1].city + '\',\'' +
      customers[customer - 1].state + '\',\'' +
      customers[customer - 1].zip + '\',\'' +
      customers[customer - 1].country + '\',\'' +
      customers[customer - 1].phonenumber1 + '\',\'' +
      customers[customer - 1].phonenumber2 + '\',\'' +
      customers[customer - 1].email + '\',' +
      'NULL,NULL,NULL);';
    fs.appendFileSync("tdCustomer.sql", query + "\n");
    id++;
  });
}


setupCategories();
setupProducts();
setupCustomers();
//setupOrders();
