
function logIn(event){
    event.preventDefault();
    var email = document.getElementById("email").value
  //  var ticketNumber = document.getElementById("ticketNumber").value

    console.log(email)
  //  console.log(ticketNumber)


    // 3. Log user In, then Log the purchase event

    var userIdentities = {userIdentities: {email: email}};
    mParticle.Identity.login(userIdentities, callback)


    function callback() {
      var currentUser = mParticle.Identity.getCurrentUser();
  //    currentUser.setUserAttribute("Park Visit Preference","Star Wars");
      mParticle.logEvent('Logged In',mParticle.EventType.Other,
    );
      }
}

function purchase(event){
    event.preventDefault();

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    var today = mm + '/' + dd + '/' + yyyy;

    var productTitle = document.getElementById("Product").value

    var product = mParticle.eCommerce.createProduct(
    productTitle, //
    'econ-1',
    59.00,
    1
);

// 2. Summarize the transaction
var transactionAttributes = {
    Id: 'foo-transaction-id',
    Revenue: 430.00,
    Tax: 30
};

var currentUser = mParticle.Identity.getCurrentUser();

// Set user attributes associated with the user
currentUser.setUserAttribute("Last_Purchase_Game_Title",productTitle);
currentUser.setUserAttribute("Last_Purchase_Date", today);


// 3. Log the purchase event
mParticle.eCommerce.logPurchase(transactionAttributes, product);

}

function mPEvent(event){
  event.preventDefault();

  mParticle.logEvent(
  'Event did Occur',
  mParticle.EventType.Other,
  {'category':'Generic','Page':'Home'}
   );
}

//"https://cors-anywhere.herokuapp.com/https://api.mparticle.com/v1/app/5174/consumerprofile/search"

  document.getElementById("submit").addEventListener('click', logIn);
  document.getElementById("submit2").addEventListener('click', purchase);
  document.getElementById("submit3").addEventListener('click', mPEvent);
