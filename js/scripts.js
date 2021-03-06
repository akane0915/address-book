// Business Logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

function Address(type, street, city, state) {
  this.type = type;
  this.street = street;
  this.city = city;
  this.state = state;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}
Address.prototype.fullAddress = function() {
  return "Address type: " + this.type + "<br>" + this.street + ", " + this.city + ", " + this.state;
}

function resetFields() {
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
}


// UI logic
$(document).ready(function(){
  $("#add-address").click(function(){
    //Add an additional set of address inputs when user clicks "Another Address" button
    $("#new-addresses").append('<div id="extra-addresses" class="new-address">'
                              +'<select class="form-group" id="address-type">'
                              + '<option value="home">Home</option>'
                              + '<option value="work">Work</option>'
                              + '</select>'
                              + '<div class="form-group">'
                              + '<label for="new-street">Street</label>'
                              + '<input type="text" class="form-control new-street">'
                              + '</div>'
                              + '<div class="form-group">'
                              + '<label for="new-city">City</label>'
                              + '<input type="text" class="form-control new-city">'
                              + '</div>'
                              + '<div class="form-group">'
                              + '<label for="new-state">State</label>'
                              + '<input type="text" class="form-control new-state">'
                              + '</div>'
                              + '</div>');
  }); //Address click function close

  $("form#new-contact").submit(function(event){
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    //Looping because contact may have multiple addresses
    $(".new-address").each(function(){
      var inputtedType = $(this).find("#address-type").val();
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();

      var newAddress = new Address(inputtedType, inputtedStreet, inputtedCity, inputtedState);
      newContact.addresses.push(newAddress);
    }); //New address loop close

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function(){
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address){
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    }); // Contact click function close

    resetFields();
    $("#extra-addresses").remove(); //Remove extra addresses that were added after clicking "Another Address" button


  }); //New contact form close
}); //Document ready close
