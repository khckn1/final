<template>
  <div>
    <div v-if="gettingLocation">
      <i>Getting your location...</i>
    </div>
    <div v-else>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      location: null,
      gettingLocation: false,
      errorStr: null,
    }
    },
    created() {
      //do we support geolocation
      if(!("geolocation" in navigator)) {
        this.errorStr = 'Geolocation is not available.';
        return;
      }

      this.gettingLocation = true;
      // get position
      navigator.geolocation.getCurrentPosition(pos => {
        this.gettingLocation = false;
        this.location = pos;
      }, err => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      })
    },
    watch:{
      selectedTravel(){
        return window.console.log(this.selectedTravel);}
      },
    methods: {
      letsFly() {
            this.showLoader(true)
            var vm = this;
            this.info2 = "";
            let bodyDate = "departure=" +
                this.selectedDateDeparture +
                "&arrival=" +
                this.selectedDateArrival +
                "&locationDeparture=" +
                this.selectedCountryDeparture +
                "&locationArrival=" +
                this.selectedCountryArrival;
            async function postUrlEncoded() {
                const response = await fetch(vm.localhost + "date?" + bodyDate, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *client
                    body: bodyDate // body data type must match "Content-Type" header
                });
                return await response.json(); // parses JSON response into native JavaScript objects
            }
            postUrlEncoded().then((data) => {
                window.console.log(data)
                this.info2 = data.data;
                this.toggleInfo = true;
            }).catch(function(error) {
                window.console.error(error);
            });
        }
    },
    getFlightPrice() {
            var vm = this;
            function chooseCity(flight) {
                return flight.id === vm.selectedTravel; 
            }
            this.searchObject = this.info2.find(chooseCity);
            this.$store.commit('changePricing', this.searchObject);
            var duh = this.searchObject
            async function postSearchPrice() {
                const response = await fetch(vm.localhost + "flightprice", {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *client
                    body: JSON.stringify(duh) // body data type must match "Content-Type" header
                });
                return await response.json(); // parses JSON response into native JavaScript objects
            }
            postSearchPrice().then((data) => {
                this.flightConfirmation = "PriceConfirmed";
                this.info3 = data;
                this.isLoading = true
                this.createOrderAndget()
            });
        },
  }
</script>

<style scoped>
i {
  color: #efe6dd;
}
</style>
