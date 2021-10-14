<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <!--<div class="col-md-12 col-sm-12">
          <a href="" role="button" class="btn btn-default btn-neue-rechnung">Neue Rechnung</a>
        </div>-->
        <div class="col-md-12 col-sm-12">
          <table>
            <tbody>
              <tr>
                <td>
                  <div class="form-row align-items-center">
                    <div class="col-auto">
                      <input type="text" class="form-control form-control-lg form-control mb-2" name="code" value="" size="80" autofocus="" v-model="code" v-on:keyup.enter="getProductByCode(code)">
                    </div>
                    <div class="col-auto add-to-cart">
                      <button type="" class="btn btn-primary mb-2" name="+" value="+"
                              v-on:click="getProductByCode($data.code)"><i class="fas fa-cart-plus"></i></button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-12 col-sm-12">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Produkt</th>
              <th scope="col">Preis</th>
              <th scope="col">Löschen</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="position in positions" :key="position.name">
              <td>{{position.name}} </td>
              <td>1€</td>
              <td><button role="button" class="btn btn-default btn-neue-rechnung">Löschen</button></td>
            </tr>
            <tr>
              <th><b>Summe:</b></th>
              <th> €</th>
            </tr>
            </tbody>
          </table>

        </div>
        <div class="col-md-12 col-sm-12">
          <a href="" role="button" class="btn btn-default btn-neue-rechnung">Rechnung buchen</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Checkout',
  props: {
    msg: String
  },
  data: function() {
    return {
      responseAvailable: false,
      code: '',
      product: '',
      positions: [],
  };
},
  methods: {
    async getProductByCode(code) {
      try {
        const response = await this.$http.get('http://localhost:8081/product/code/' + code);
        this.positions.push(response.data);
      } catch(error) {
        console.log(error);
      }
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

