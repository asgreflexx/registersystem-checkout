<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="col-md-12 col-sm-12">
          <a href="" role="button" class="btn btn-default btn-neue-rechnung">Neue Rechnung</a>
        </div>
        <div class="col-md-12 col-sm-12">
          <table>
            <tbody>
              <tr>
                <td>
                  <form action="" enctype="multipart/form-data" method="post" name="buchen">
                    <div class="form-row align-items-center">
                      <div class="col-auto">
                        <input type="text" class="form-control form-control-lg form-control mb-2" name="code" value="" size="80" autofocus="">
                      </div>
                      <div class="col-auto add-to-cart">
                        <button type="submit" class="btn btn-primary mb-2" name="+" value="+"><i class="fas fa-cart-plus"></i></button>
                      </div>
                    </div>
                  </form>
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

            <tr>
              <th><b>Summe:</b></th>
              <th> €</th>
            </tr>
<!--            <tr>
              <td><h3> Mit Karte bezahlen!</h3></td>
              <td><a href=""><i class="far fa-credit-card"></i></a></td>
            </tr>-->

            </tbody>
          </table>

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
  methods: {

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

