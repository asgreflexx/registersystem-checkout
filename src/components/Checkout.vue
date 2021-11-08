<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <!--<div class="col-md-12 col-sm-12">
          <a href="" role="button" class="btn btn-default btn-neue-rechnung">Neue Rechnung</a>
        </div>-->
        <div class="col-md-6 col-sm-12">
          <input type="text" class="form-control " name="code" value="" size="80" autofocus="" ref="codeInput" v-model="code" v-on:keyup.enter="getProductByCode(code)">
        </div>
        <div class="col-md-6 col-sm-12">
          <button type="" class="btn btn-primary" v-on:click="getProductByCode($data.code)"><md-add-shopping-cart></md-add-shopping-cart></button>
        </div>
        <div class="col-md-12 col-sm-12">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Menge</th>
              <th scope="col">Produkt</th>
              <th scope="col">Preis</th>
              <th scope="col">Löschen</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="position in positions" :key="position.name">
              <td>{{position.amountPosition}}</td>
              <td>{{position.name}} </td>
              <td>{{position.price}}</td>
              <td><button role="button" class="btn btn-default btn-neue-rechnung" v-on:click="removePosition(position)"><md-delete></md-delete></button></td>
            </tr>
            <tr>
              <th><b>Summe:</b></th>
              <th>{{sum}} €</th>
            </tr>
            </tbody>
          </table>

        </div>
        <div class="col-md-12 col-sm-12">
          <a href="" role="button" class="btn btn-default btn-neue-rechnung" v-on:click="bookPositions($event)">Rechnung buchen</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MdDelete from 'md-svg-vue/dist/action/MdDelete';
import MdAddShoppingCart from 'md-svg-vue/dist/action/MdAddShoppingCart';

export default {
  name: 'Checkout',
  components: {
    MdDelete,
    MdAddShoppingCart
  },
  props: {
    msg: String
  },
  data: function() {
    return {
      responseAvailable: false,
      code: '',
      product: '',
      positions: [],
      sum: 0.0,
      positionsOnBill: [],
  };
},
  methods: {
    focusOnCodeInputField: function() {
      this.$refs.codeInput.focus();
    },
    async getProductByCode(code) {
      try {
        const response = await this.$http.get('http://85.235.66.255:8080/product/code/' + code);
        let newPosition = response.data;
        let samePosition = this.positions.filter(p => p.id === newPosition.id);

        if(samePosition != null && samePosition.length > 0) {
          this.positions.filter(p => p.id === newPosition.id)[0].amountPosition++;
        } else {
          newPosition.amountPosition = 1;
          this.positions.push(newPosition);
        }
        this.calculateSum();
        this.code = '';
        this.focusOnCodeInputField();
      } catch(error) {
        const json = JSON.parse(error.request.response).message.replaceAll("[\"", '');
        const message = json.replaceAll("\"]", '');
        this.$alert(message).then(() => {
          this.code = '';
          this.focusOnCodeInputField();
        });
      }
    },
    removePosition: function(position) {
      this.positions.splice(this.positions.indexOf(position), 1);
      this.positionsOnBill.splice(this.positionsOnBill.indexOf(position.id), 1);
      this.calculateSum();
      this.focusOnCodeInputField();
    },
    calculateSum: function() {
      this.sum = 0.0;
      this.positions.forEach(value => {
        this.sum = this.sum + value.price * value.amountPosition;
      });
    },
    async bookPositions(e) {
      e.preventDefault();
        let bill = {
          positions: [],
          'totalPrice' : 0,
        };

        this.positions.forEach(pos => {
          let position = {
            'productId': pos.id,
            'amount': pos.amountPosition,
          }
          bill.positions.push(position);
        });
        bill.totalPrice = this.sum;

        await this.$http.post('http://85.235.66.255:8080/bill/', bill).then(() => {
          this.$alert('Bill was successfully booked!').then(() => {
            this.positions = [];
            this.positionsOnBill = [];
            this.code = '';
            this.sum = 0.0;
            this.product = '';
            this.focusOnCodeInputField();
          });
        }).catch(error => {
          const json = JSON.parse(error.request.response).message.replaceAll("[\"", '');
          const message = json.replaceAll("\"]", '');
          this.$alert(message).then( () => {
            this.focusOnCodeInputField();
          });
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/zone.js@0.10.3/dist/zone.min.js"></script>

