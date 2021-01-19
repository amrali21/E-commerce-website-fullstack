function add_to_cart(){
    console.log("testing.........")
  //  console.log('changed');
   // console.log(this.getElementsByTagName("input")[1].name);
  //  console.log(this.getElementsByTagName("input")[1].value);
    var product_id = 2; // test
    var amount = 5; //test


    const Http = new XMLHttpRequest();
    const url = '/add_to_cart';

    Http.open("POST", url);

    Http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Http.send(`product_id=${product_id}&amount=${amount}`);

  }

  function checkout(){

console.log("it worked!");
    const Http = new XMLHttpRequest();
    const url = '/checkout';

    Http.open("GET", url);

    Http.send();

  }


  // add_to_cart();