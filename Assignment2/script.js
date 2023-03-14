const finalReceiptOutputString = {};
let totalPrice = 0;

function itemQuantity(giftName, giftPrice, giftQuantity, giftErrorId) {
  console.log(giftName, giftPrice, giftQuantity, giftErrorId);

  //function to generate output string.
  if (giftQuantity < 0 || isNaN(giftQuantity)) {
    var d = document.getElementById(giftErrorId);
    d.innerHTML = "<b>Please enter quantities in digits only.</b>";
    return;
  } else {
    var d = document.getElementById(giftErrorId);
    d.innerHTML = "";
    finalReceipt(giftName, giftPrice, giftQuantity);
  }
}
//function to generate output string.
function finalReceipt(giftName, giftPrice, giftQuantity) {
  finalReceiptOutputString[giftName] =
    "You have selected <b>" +
    giftQuantity +
    " quantities</b> for <b>" +
    giftName +
    "</b> and it would cost you: <b>$" +
    giftQuantity * giftPrice +
    "</b><br>";

  //printing this totalPrice in final receipt output string.
  totalPrice = totalPrice + giftQuantity * giftPrice;
}
function finalReceiptOutput() {
  let fName = document.getElementById("fullName").value;
  let phoneNumber = document.getElementById("phone").value;

  let creditCardNumber = document.getElementById("creditCard").value;
  let creditCardMonthNumber = document.getElementById("month").value;
  let creditCardYearNumber = document.getElementById("year").value;

  const returnFlag = validation(
    fName,
    phoneNumber,
    creditCardNumber,
    creditCardMonthNumber,
    creditCardYearNumber
  );
  if (returnFlag === true) {
    var receiptOutputString = document.getElementById("receiptOutput");
    receiptOutputString.innerHTML = "";
    return;
  }
}

function validation(
  fName,
  phoneNumber,
  creditCardNumber,
  creditCardMonthNumber,
  creditCardYearNumber
) {
  var flagError;
  //check for empty name and phone number
  var nameRegex = /^[a-zA-Z ]{2,30}$/;
  var phoneRegex = /^([0-9]{3}-[0-9]{3}-?[0-9]{4})$/;

  var creditCardNumberRegex = /^([0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4})$/;
  var creditCardMonthRegex = /^([0-9]{2})$/;
  var creditCardYearRegex = /^([0-9]{4})$/;

  //calling the error message function to clear out the fields error message..
  // errorMessagesClear();

  if (!nameRegex.test(fName)) {
    var nameError = document.getElementById("invalidName");
    nameError.innerHTML = "<b>Please enter a valid name.</b>";
    flagError = true;
  }
  if (!phoneRegex.test(phoneNumber)) {
    var phoneError = document.getElementById("invalidPhone");
    phoneError.innerHTML =
      "Please enter a valid Phone Number. Format: <b>123-456-7890</b>";
    flagError = true;
  }
  if (!creditCardNumberRegex.test(creditCardNumber)) {
    var creditCardNumberError = document.getElementById("invalidCreditCard");
    creditCardNumberError.innerHTML =
      "Please enter a valid Credit Card Number. <b>Format: 4111-1111-1111-1111</b>";
    flagError = true;
  }
  if (
    creditCardMonthNumber < 1 ||
    creditCardMonthNumber > 12 ||
    !creditCardMonthRegex.test(creditCardMonthNumber)
  ) {
    var creditCardMonthError = document.getElementById("invalidMonth");
    creditCardMonthError.innerHTML =
      "Please enter a valid Credit Card Month within rage of 00 to 12. <b>Format: 12 or 08</b>";
    flagError = true;
  }
  if (
    creditCardYearNumber < 2023 ||
    creditCardYearNumber > 2030 ||
    !creditCardYearRegex.test(creditCardYearNumber)
  ) {
    var creditCardYearError = document.getElementById("invalidYear");
    creditCardYearError.innerHTML =
      "Please enter a valid Credit Card Year between 2023 and 2030. <b>Format: 2023 or 2030</b>";
    flagError = true;
  }

  //condition will run in case of no error.
  if (flagError !== true) {
    errorMessagesClear();
    document.getElementById("invalidGift1").innerHTML = "";
    document.getElementById("invalidGift2").innerHTML = "";
    document.getElementById("invalidGift3").innerHTML = "";
    document.getElementById("invalidGift4").innerHTML = "";
    //to reset the value of all the fields
    document.getElementById("fullName").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("creditCard").value = "";
    document.getElementById("month").value = "";
    document.getElementById("year").value = "";
    document.getElementById("gift1").value = "";
    document.getElementById("gift2").value = "";
    document.getElementById("gift3").value = "";
    document.getElementById("gift4").value = "";

    let customerReceipt = "";
    for (let i of Object.keys(finalReceiptOutputString)) {
      customerReceipt = customerReceipt + finalReceiptOutputString[i];
    }

    if (totalPrice > 9) {
      //when your order value is above $10.
      var receiptOutputString = document.getElementById("receiptOutput");
      receiptOutputString.innerHTML =
        "<h2>Receipt</h2><br> Hello <b>" +
        fName +
        "! <br></b>" +
        "Here is your total bill summary which is sent to you provided phone number(<b>" +
        phoneNumber +
        "</b>):<br>" +
        customerReceipt +
        "<br>" +
        "GST@13 on total purchased item is: $" +
        totalPrice * 0.13 +
        "<br><b> Your total bill with 13% GST is: $" +
        (totalPrice + totalPrice * 0.13) +
        "</b>";
    } else if (totalPrice < 5) {
      var receiptOutputString = document.getElementById("receiptOutput");
      receiptOutputString.innerHTML =
        "<h2>In order to checkout items, you should select atleast 1 item from above Thank You!</h2>";
    } else {
      //when your order value is below $10.
      var receiptOutputString = document.getElementById("receiptOutput");
      receiptOutputString.innerHTML =
        "<h2>Your order is below $10. In order to check out, your order total price should be above $10.<br> Thank You!</h2>";
    }
    totalPrice = 0;
  }

  return flagError;
}

//declared separate function to just remove already printed error message.
function errorMessagesClear() {
  var nameError = document.getElementById("invalidName");
  nameError.innerHTML = "";
  var phoneError = document.getElementById("invalidPhone");
  phoneError.innerHTML = "";
  var creditCardNumberError = document.getElementById("invalidCreditCard");
  creditCardNumberError.innerHTML = "";
  var creditCardMonthError = document.getElementById("invalidMonth");
  creditCardMonthError.innerHTML = "";
  var creditCardYearError = document.getElementById("invalidYear");
  creditCardYearError.innerHTML = "";
}
//change gft items images and types.
